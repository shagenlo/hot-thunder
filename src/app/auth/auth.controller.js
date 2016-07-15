(function (){
    'use strict'
    
    angular
        .module('app.auth')
        .controller('AuthController',AuthController);
    
    AuthController.$inject = ['$location','authService', 'firebaseDataService', '$scope'];
    
    function AuthController($location,  authService, firebaseDataService, $scope) {
        var vm = this;
        vm.error = null;
        vm.register = register;
        vm.login = login;
        

        //Register either a role=player or a role=operator   user:{email:'', password:'', role:''}
        function register(user){   //TODO: In retrospect, I think this function is a mess - rebuild it      
            return authService.register(user)
            .then(function(u) {
                user.uid = u.uid;
                authService.setRole(user) //user.role 'player' || 'operator'
                .then(function() {
                    switch (user.role) {
                        case 'player':
                            $location.path('/player');
                            break;
                        case 'operator':
                            alert("registered operator")
                            break;
                        default:
                            $location.path('/');
                    }                    
                })
                .catch(function(error){
                    vm.error = error;
                })
            })
            .then(function() {
              return authService.sendWelcomeEmail(user.email);
            })
            .catch(function(error) {
              vm.error = error;
            });                    
        }        
                
        //Register either a role=player or a role=operator   user:{email:'', password:'', role:''}
        function xregister(user){   //TODO: In retrospect, I think this function is a mess - rebuild it      
            return authService.register(user)
            .then(function() {
                switch (user.role) {
                    case 'player':
                        $location.path('/player');
                        break;
                    case 'operator':
                        alert("registered operator")
                        break;
                    default:
                        $location.path('/');
                }
            })
            .then(function() {
              return authService.sendWelcomeEmail(user.email);
            })
            .catch(function(error) {
              vm.error = error;
            });                    
        }        
        
        
        //Login either a role=player or a role=operator   user:{email:'', password:'', role:''}
        function login(user){
            return authService.login(user)
            .then(function(u) {
                switch (user.role) {
                    case 'player':
                        firebaseDataService.getRegistered(u.uid)
                        .then(function(snapshot) {
                            if (snapshot.val()) {
                                $location.path('/join');
                                $scope.$apply();
                            } else {
                                $location.path('/player');
                                $scope.$apply();
                            }
                        })
                        .catch (function(error) {
                            vm.error = error;
                        })                            
                        break;
                    case 'operator':
                        alert('logged in operator');
                        break;
                }
            })
            .catch(function(error) {
                vm.error = error;
            });            
        }
        
    }
})();