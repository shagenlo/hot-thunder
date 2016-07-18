/**
* AngularJS Controller for Authentication Module
*
* Angular Type: Controller
* @namespace auth
* @class authController
* @constructor
* @param $location              AngularJS Routing Service
* @param $scope                 AngularJS Scope Service
* @param authService            Application Authentication Service
* @param firebaseDataService    Application Firebase Data Service
*/
(function () {
    'use strict'
    
    angular
        .module('app.auth')
        .controller('AuthController',AuthController);
    

    AuthController.$inject = ['$location', '$scope', 'authService', 'firebaseDataService'];
    function AuthController($location,  $scope, authService, firebaseDataService) {
        
        /**
        * ViewModel Alias
        * @property vm
        * @type {Object} instance alias
        */
        var vm = this;
        
        /**
        * Error object
        * @property error
        * @type {Object}
        */
        vm.error = null;
        
        vm.register = register;
        vm.login = login;
        
        /**
        * Registers a user in the system via the firebaseDataService, 
        *                     sets the user role, 
        *                     sets the view path based on user role 
        * @method register
        * @param {Object} user  user:{email:'', password:'', role:'', uid:''}
        * @return {Object} The return object isn't used, may be ble to remove it.
        */
        function register(user){  
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
                            //This is an error condition that we shouldn't encounter
                            $location.path('/');
                    }                    
                })
                .catch(function(error){
                    //Error in setting user role flag at /users/{{firebase_guid}}/role
                    vm.error = error;
                })
            })
            .then(function() {
              return authService.sendWelcomeEmail(user.email);
            })
            .catch(function(error) {
              //Error in user registration
              vm.error = error;
            });                    
        }        
        
        
        
        
        /**
        * Logs a user into the system, then sets the view path based on user role
        * @method login
        * @param {Object} user  user:{email:'', password:'', role:'', uid:''}
        * @return {Object} The return object isn't used, may be able to remove it.
        */
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