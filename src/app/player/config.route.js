(function () {
    'use strict';
    
    angular
        .module('app.player')
        .config(configFunction);
    
    configFunction.$inject = ['$routeProvider'];
    
    function configFunction($routeProvider){
        $routeProvider.when('/player', {
            templateUrl: 'app/player/player.html',
            controller: 'PlayerController',
            controllerAs: 'vm',
            resolve: {user: resolveUser}
        });
        $routeProvider.when('/playerAvi', {
            templateUrl: 'app/player/playerAvi.html',
            controller: 'PlayerController',
            controllerAs: 'vm',
            caseInsensitiveMatch: true,
            resolve: {user: resolveUser}            
        });
    }

    resolveUser.$inject = ['authService'];

    function resolveUser(authService) {
        return authService.firebaseAuthObject.$requireSignIn();
    }

 })();