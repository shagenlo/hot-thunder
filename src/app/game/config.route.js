/**
* Configuration module for app.join
*
* Angular Type: Configuration
* @namespace join
* @class configFunction
* @constructor
* @param {Object} $routeProvider
* Configuration definitions for Join Module (app.join.js)
*/
(function () {
    'use strict';
    
    angular
        .module('app.join')
        .config(configFunction);
    
    configFunction.$inject = ['$routeProvider'];
    function configFunction($routeProvider) {
        $routeProvider.when('/join', {
            templateUrl: 'app/game/join.html',
            controller: 'JoinController',
            controllerAs: 'vm',
            resolve: {user: resolveUser}
        });
    }

    

    /**
    * function resolveUser
    * @method resolveUser
    * @param {Object} authService
    */
    resolveUser.$inject = ['authService'];
    function resolveUser(authService) {
        return authService.firebaseAuthObject.$requireSignIn();
    }

 })();