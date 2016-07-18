/**
* Configuration definitions for player module (player.module.js)
*
* Sets up routes and controller bindings for player data entry views
*
* Angular Type: Configuration
* @namespace player
* @class configFunction
* @constructor
*/
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

    

    /**
    * resolveUser function
    * @method resolveUser
    * @param {Object} authService
    * @return {Object} promise
    */
    resolveUser.$inject = ['authService'];
    function resolveUser(authService) {
        return authService.firebaseAuthObject.$requireSignIn();
    }

 })();