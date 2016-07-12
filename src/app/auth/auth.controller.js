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
        
        function register(user){   //TODO: In retrospect, I think this function is a mess - rebuild it
            return authService.register(user)
                .then(function() {
                    //return vm.login(user); //TODO: Firebase 3.0 automatically logs in user on Create
                    $location.path('/player');
                })
                .then(function() {
                  return authService.sendWelcomeEmail(user.email);
                })
                .catch(function(error) {
                  vm.error = error;
                });            
        }
        
        function login(user){
            return authService.login(user)
                .then(function(u) {
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
                })
                .catch(function(error) {
                    vm.error = error;
                });            
        }
    }
})();