/**
* AngularJS Controller for Player Module
*
* Angular Type: Controller
* @namespace player
* @class PlayerController
* @constructor
* @param playerService
*/
(function (){
    'use strict'
    
    angular
        .module('app.player')
        .controller('PlayerController', PlayerController);
    
    PlayerController.$inject = ['playerService'];
    function PlayerController(playerService){
        /**
        * ViewModel Alias
        * @property vm
        * @type Object
        */
        var vm = this;
        
        /**
        * Error object
        * @property error
        * @type error
        */
        vm.error = null; 
        //vm.users = playerService.getUsers();
    }
})();