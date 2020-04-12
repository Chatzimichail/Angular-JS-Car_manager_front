protocolApp.controller('homeController',['$scope','protocolService','$http','$window',function($scope, protocolService, $http,$window ){

     $scope.addCar = function(){
        
        $http.post('http://localhost:8080/api/newcar?pinakida='+$scope.pinakida + '&name='+$scope.name+'&lastName='+$scope.lastName+'&plasio='+$scope.plasio+'&kibika='+$scope.kibika+'&aloga='+$scope.aloga+'&kodikosKinitira='+$scope.kodikosKinitira+'&xronoligia='+$scope.xronoligia+'&marka='+$scope.marka+'&modelo='+$scope.modelo).then(
            function (response) {
                
                if (response.data == 1)
                $window.alert("Ενημερώθηκε με επιτυχία το αυτοκίνητο" );
                else
                $window.alert("ΔΕΝ ενημερώθηκε με επιτυχία το αυτοκίνητο" );

             
            }, function (response) {
                $window.alert(response.data);
       
                $window.alert("Αποτυχία με το αυτοκίνητο δεν επικοινωνεί με την βάση δεδομένων" );
              
                      
         });
        
    } 
    
}]);

protocolApp.controller('outgoingController',['$scope','$http','$window','$location',function($scope,$http,$window,$location){
    

    
    $scope.num= '';
    $scope.outYear= '2020'  ;
    $scope.outDate='';
    $scope.subject='';
    $scope.receiver='';
    $scope.shared='';
    
    $http.post('http://localhost:8080/api/associate?usageCode=service1').
        then(function (response) {
  
            $scope.senders = response.data;
        
            }, function (response) {
                $window.alert("Error with the accosiates");

            });
    
    $scope.outgoing = function(){
        
        $http.post('http://localhost:8080/api/outgoing?theProtocolNum='+ $scope.num+'&year='+$scope.outYear+'&date='+$scope.outDate+'&subject='+$scope.subject+'&receiver='+$scope.receiver+'&shared='+$scope.shared).then(
            function (response) {

                $window.alert("Ενημερώθηκε με επιτυχία το εξερχόμενο αρχείο" );
                $location.url('home') ;

            
             
            }, function (response) {
                        
                $window.alert("Αποτυχία με το εξερχόμενο αρχείο" );
              
                      
         });
        
    }   
    
     
     
}]);


protocolApp.controller('signInController',['$scope','$location','$http','$window',function($scope,$location ,$http,$window){

    $scope.username ='admin';
    $scope.password = '0t$db@';
    $scope.usage = 'service1';
    
    $scope.num = true;
    
     $scope.signIn = function(){
         $http.post('http://localhost:8080/api/sign?username='+$scope.username+'&password='+$scope.password+'&usageCode='+$scope.usage).then(function (response) {

             if(response.data == 1)  $location.url('home');
             else $window.alert("Incorect Username, Password, Usage!!");
            
             
            }, function (response) {
                        
                if(response.data == 1)  $location.url('home');
                else $window.alert("Incorect Username or Password, Usage!!");
                      
         })
         
         
     }
     
     
}]);


protocolApp.controller('oikothenController',['$scope','$http','$window','$location',function($scope,$http,$window,$location){
    
    
    
    $scope.numberOik= 'test num';
    $scope.subjectOik= 'test sub';
    $scope.receiverOik='';
    $scope.outDayOik='';
    
    $scope.numOik = true;
    $scope.fileOik = true;
    
     $http.post('http://localhost:8080/api/associate?usageCode=service1').
        then(function (response) {
  
            $scope.senders = response.data;
        
            }, function (response) {
                $window.alert("Error with the accosiates");

            }); 
    
    $scope.oikothen = function(){
        
        $http.post('http://localhost:8080/api/oikothen?subject='+$scope.subjectOik+'&receiver='+$scope.receiverOik+'&outDay='+$scope.outDayOik).then(
            function (response) {
                
                if(response.data== -1){
                    $window.alert("Αποτυχία με το οίκοθεν αρχείο" );
                }
                else if (response.data > 0) {
                    $window.alert("δημιουργήθηκε με επιτυχία το οίκοθεν αρχείο" );
                    $scope.outDayOik=$scope.outDayOik;
                    $scope.numOik = false;
                    $scope.fileOik = false;
                    $scope.numberOik=response.data;
                }
            
             
            }, function (response) {
                        
                $window.alert("Αποτυχία με το οίκοθεν αρχείο" );
              
                      
         });
        
    }
    

     
      $scope.ProtNum = function(){
         
         $http.post('http://localhost:8080/api/protNum?theProtocolNum='+$scope.numberOik).then(
             function(response){
                 
                 
             
            }), 
             function(response){
                $window.alert("To πρωτόκολο δεν ενημερώθηκε !!" );

               
               
             
            }
         
     }
    
    
    
     
     
}]);



protocolApp.controller('FileController',['$scope','$http','$window','$location','$resource',function($scope,$http,$window,$location,$resource){
    
    

			var Files = $resource('/files/:id', { id: "@id" });

			angular.extend($scope, {

				model: { file: null },

				upload: function(model) {
					Files.prototype.$save.call(model.file, function(self, headers) {
						// Handle server response
					});
				}
			});
		

}]);

protocolApp.controller('searchFileController',['$scope','$location','$http','$window',function($scope,$location,$http,$window){
    
  
    $scope.search_button = false;
    $scope.update_button = true;
    
    
    $scope.search = function(){
        
             $scope.search_button = true;
             $scope.update_button = false;
            
            $http.post('http://localhost:8080/api/car?pinakida='+$scope.pinakida).
            then(function (response) {
                
                $scope.name = response.data.name;
                $scope.lastName = response.data.lastName;
                $scope.kibika = response.data.kibika;
                $scope.aloga = response.data.aloga;
                $scope.kodikosKinitira = response.data.kodikosKinitira;
                $scope.marka = response.data.marka;
                $scope.modelo = response.data.modelo;
                $scope.plaisio = response.data.plaisio;
                $scope.xronologia = response.data.xronologia;
                
                $scope.data = response.data;
                
               
            
                }, function (response) {
    
                    $window.alert("Error");

                
                }); 
        
                
            $http.post('http://localhost:8080/api/services?pinakida='+$scope.pinakida).
            then(function (response) {
                
                $scope.services = response.data
                }, function (response) {
    
                    $window.alert("Error");

                
                });
        };
    
    $scope.update = function(){
        
        $http.post('http://localhost:8080/api/service?pinakida='+$scope.pinakida + '&xml1='+$scope.xml1+'&xml2='+$scope.xml2+'&sxolia='+$scope.sxolia).
            then(function (response) {
                
                $window.alert("Ενειμερώθηκε με επιτυχία το service");

                $scope.search_button = false;
                $scope.update_button = true;
            
        
                        
            
                }, function (response) {
    
                    $window.alert("Error");

                
                }); 
        
    }
    
    
    
}]);

protocolApp.controller('updateController',['$scope','$http','$window',function($scope,$http,$window){
    
        $scope.search = function(){
        
             $scope.search_button = true;
             $scope.update_button = false;
            
            $http.post('http://localhost:8080/api/car?pinakida='+$scope.pinakida).
            then(function (response) {
                
                $scope.name = response.data.name;
                $scope.lastName = response.data.lastName;
                $scope.kibika = response.data.kibika;
                $scope.aloga = response.data.aloga;
                $scope.kodikosKinitira = response.data.kodikosKinitira;
                $scope.xronologia = response.data.xronologia;
                $scope.marka = response.data.marka;
                $scope.modelo = response.data.modelo;
                $scope.plaisio = response.data.plaisio;
                
                $scope.data = response.data;
                
               
            
                }, function (response) {
    
                    $window.alert("Error");

                
                }); 
        
        };
    
        $scope.updateCar = function(){
        
        $http.post('http://localhost:8080/api/updatecar?pinakida='+$scope.pinakida + '&name='+$scope.name+'&lastName='+$scope.lastName+'&plasio='+$scope.plaisio+'&kibika='+$scope.kibika+'&aloga='+$scope.aloga+'&kodikosKinitira='+$scope.kodikosKinitira+'&xronoligia='+$scope.xronoligia+'&marka='+$scope.marka+'&modelo='+$scope.modelo).then(
            function (response) {
                
                if (response.data == 1)
                $window.alert("Ενημερώθηκε με επιτυχία το αυτοκίνητο");
                else
                $window.alert("ΔΕΝ ενημερώθηκε με επιτυχία το αυτοκίνητο" );

             
            }, function (response) {
                $window.alert(response.data);
       
                $window.alert("Αποτυχία με το αυτοκίνητο δεν επικοινωνεί με την βάση δεδομένων" );
              
                      
         });
        
        } 
    
    }]);


protocolApp.controller('indexController',['$scope','$location','$window','$http',function($scope,$location,$window,$http){
    
    
    $scope.$on('$routeChangeStart', function($event, next, current) { 
        
        $scope.number = $location.path();
        
        if ( $scope.number == '/' ) {$scope.head = true}
        else {$scope.head = false}
    });
    
        $scope.signOut = function(){
            
            $http.post('http://localhost:8080/api/signout').
            then(function (response) {
                    
                    if(response.data == 1) {
                        $window.alert("Αποσυνδέθηκες επιτυχώς");
                    }
                    else{
                        $window.alert("Δεν αποσυνδέθηκες");
                    }
            
                }, function (response) {
                    $window.alert("Error with the signout"); 
    
                }); 
            
        }; 
        
    }]);


    


























