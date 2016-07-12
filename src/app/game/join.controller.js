(function (){
    'use strict'
    
    angular
        .module('app.join')
        .controller('JoinController', JoinController);
    
    JoinController.$inject = [];
    
    function JoinController(){
        var vm = this;
        vm.error = null; 
    }
})();