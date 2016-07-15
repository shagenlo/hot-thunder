(function () {
    'use strict';
    
    angular
        .module('app.auth')
        .config(configFunction)
        .run(runFunction);   
    
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
    
    runFunction.$inject = ['$location', 'authService', 'firebaseDataService', 'PROTECTED_PATHS'];
    
    function runFunction($location, authService, firebaseDataService, PROTECTED_PATHS) {
        firebaseDataService.auth.onAuthStateChanged(function(authData) {
            if (!authData && pathIsProtected($location.path())) {
                authService.logout();
                $location.path('/login');
            };
        });

        function pathIsProtected(path) {
            return PROTECTED_PATHS.indexOf(path) !== -1;
        }
    };
    
    
})();