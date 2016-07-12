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
 
    PlayerFormController.$inject = ['$location', 'playerService', '$scope', '$timeout'];
    
    function PlayerFormController($location, playerService, $scope, $timeout) {
        var vm = this;
        vm.createPlayer = createPlayer;
        vm.playerExists = playerExists;
        
        vm.newPlayer = new playerService.Player();
       
        
        //If the player exists on the backend, we'll want to get the data
        //  and put it into the newPlayer data model so that it populates the
        //  view's form fields.
        
        playerExists();
        //$timeout(function () {playerExists()}, 100); //Use this to delay lookup
        
        
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
        
        //Submit function - publishes the newPlayer form fields to the backend
        //  then moves to the next step in the workflow
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