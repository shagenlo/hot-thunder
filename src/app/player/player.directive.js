/**
* shPlayerForm Directive
*
* Angular Type: Directive
* @namespace player
* @class shPlayerForm
* @constructor
* @return {Object} shPlayerForm directive instance
* View: app/player/playerForm.html
*/
(function () {
    'use strict';
    
    angular
        .module('app.player')
        .directive('shPlayerForm', shPlayerForm);
    
    function shPlayerForm() {
        return {
            templateUrl: 'app/player/playerForm.html',
            restrict: 'E',
            controller: PlayerFormController,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                error: "=",
                formTitle: '@',
                buttonTitle: '@',
                ariaLabel: '@',
                users: '='
            }
        };
    }
 
    
    
    /**
    * shPlayerForm Controller
    * @method PlayerFormController
    * @param {Object} $location
    * @param {Object} playerService
    * @param {Object} $scope
    */
    PlayerFormController.$inject = ['$location', 'playerService', '$scope'];
    function PlayerFormController($location, playerService, $scope) {
        /**
        * ViewModel Alias
        * @property vm
        * @type Object
        */
        var vm = this;
        
        /**
        * newPlayer playerService.Player() Object
        * @property newPlayer
        * @type Object
        */
        vm.newPlayer = new playerService.Player();
        
        vm.createPlayer = createPlayer;
        vm.playerExists = playerExists;
       

        /**
        * If the player exists on the backend, we'll want to get the data
        * and put it into the newPlayer data model so that it populates the
        * view's form fields.
        */
        playerExists();
        
        
        /**
        * function playerExists definition
        * @method playerExists
        */
        function playerExists() {
            playerService.getPlayer()
            .then(function (snapshot) {
                if (snapshot.exists()) {
                    playerService.copySnapshotToPlayer(vm.newPlayer,snapshot);
                    $scope.$apply();
                } //Otherwise this is a new player
            })
            .catch(function (error) {
                vm.error = error;
            });
        }
        
        
        /**
        * function createPlayer definition
        *   publishes the newPlayer form fields to the backend
        *   then moves to the next step in the workflow
        * @method createPlayer
        */
        function createPlayer() {
            playerService.updatePlayer(vm.newPlayer)
            .then(function(p) {
                $location.path('/playerAvi');
                $scope.$apply();
            })
            .catch(function(error) {
                vm.error = error;
            });
        };  
    }
    
})();