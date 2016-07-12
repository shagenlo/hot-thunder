(function () {
    'use strict';
    
    angular
        .module('app.join')
        .config(configFunction);
    
    configFunction.$inject = ['$routeProvider'];
    
    function configFunction($routeProvider){
        $routeProvider.when('/join', {
            templateUrl: 'app/game/join.html',
            controller: 'JoinController',
            controllerAs: 'vm',
            resolve: {user: resolveUser}
        });
    }

    resolveUser.$inject = ['authService'];

    function resolveUser(authService) {
        return authService.firebaseAuthObject.$requireSignIn();
    }

 })();