/**
* AngularJS Controller for Join Module
*
* Angular Type: Controller
* @namespace join
* @class JoinController
* @constructor
*/
(function (){
    'use strict'
    
    angular
        .module('app.join')
        .controller('JoinController', JoinController);
    
    JoinController.$inject = [];
    function JoinController() {
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
    }
})();