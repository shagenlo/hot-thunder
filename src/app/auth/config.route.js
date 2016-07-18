
/**
* Configuration module for app.auth
*
* Angular Type: config function, run function
* @namespace auth
* @class configFunction
* @constructor
* Configuration and Run definitions for Authentication Module (app.module.js)
*/
(function () {
    'use strict';
    
    angular
        .module('app.auth')
        .config(configFunction)
        .run(runFunction);   
    
    /**
    * configFunction definition.  Sets up routes and controllers for registration and login views
    * @method configFunction
    * @param {Object} $routeProvider An AngularJS service object
    */
    configFunction.$inject = ['$routeProvider'];
    function configFunction($routeProvider) {
        $routeProvider.when('/register', {
            templateUrl: 'app/auth/register.html',
            controller: 'AuthController',
            controllerAs: 'vm'
        });
        $routeProvider.when('/login', {
            templateUrl:'app/auth/login.html',
            controller: 'AuthController',
            controllerAs:'vm'
        });
        $routeProvider.when('/register_operator', {
            templateUrl:'app/auth/register_operator.html',
            controller: 'AuthController',
            controllerAs:'vm'
        });
        $routeProvider.when('/login_operator', {
            templateUrl:'app/auth/login_operator.html',
            controller: 'AuthController',
            controllerAs:'vm'
        });        
    };
    
    
    
    /**
    * runFunction definition.  Sets up a listener for onAuthStateChanged, where we ensure that
    *                          protected paths are accessed by authenticated users only
    * @method runFunction
    * @param {Object} $location                 AngularJS service object
    * @param {Object} authService               Service object defined aat /auth/auth.service.js
    * @param {Object} firebaseDataService       Service object defined at /core/firebaseData.service
    * @param {Object} PROTECTED_PATHS           Array of strings defined in /core/constants.js
    */
    runFunction.$inject = ['$location', 'authService', 'firebaseDataService', 'PROTECTED_PATHS'];
    function runFunction($location, authService, firebaseDataService, PROTECTED_PATHS) {
        firebaseDataService.auth.onAuthStateChanged(function(authData) {
            if (!authData && pathIsProtected($location.path())) {
                authService.logout();
                $location.path('/login');
            };
        });

        
        /**
        * pathIsProtected function definition
        * @method pathIsProtected
        * @param {string} path
        * @return {boolean} path is protected?
        */
        function pathIsProtected(path) {
            return PROTECTED_PATHS.indexOf(path) !== -1;
        }
    };
    
    
})();