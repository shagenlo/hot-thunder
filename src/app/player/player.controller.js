(function (){
    'use strict'
    
    angular
        .module('app.player')
        .controller('PlayerController', PlayerController);
    
    PlayerController.$inject = ['playerService'];
    
    function PlayerController(playerService){
        var vm = this;
        vm.error = null; 
        //vm.users = playerService.getUsers();
    }
})();