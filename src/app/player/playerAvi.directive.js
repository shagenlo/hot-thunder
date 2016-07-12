(function () {
    'use strict'
    
    angular
        .module('app.player')
        .directive('shPlayerAviForm', shPlayerAviForm);
    
    function shPlayerAviForm() {
        return {
            templateUrl: 'app/player/playerAviForm.html',
            restrict: 'E',
            controller: PlayerAviFormController,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                error: "=",
                formTitle: '@',
                buttonTitle: '@',
                ariaLabel: '@',
                player: '='
            }
        };
    }
 
    PlayerAviFormController.$inject = ['$location', 'playerService', '$scope', 'AVATAR_COUNT', 'AVATAR_PREFIX'];
    
    function PlayerAviFormController($location, playerService, $scope, AVATAR_COUNT, AVATAR_PREFIX) {
        var vm = this;
        vm.playerExists = playerExists;
        vm.createPlayerAvatar = createPlayerAvatar;
        vm.selectAvatar = selectAvatar;
        
        vm.newPlayer = new playerService.Player();
        vm.avatars = [];
        
        playerExists();
        vm.avatars = createAvatars(vm.avatars);
        
        function createAvatars(avatars) {
            for (var i=1; i<=AVATAR_COUNT; i++) {
                avatars.push(AVATAR_PREFIX+String(i));
            }
            avatars = shuffle(avatars);
            return avatars;
        }
        
        function shuffle(array) {
          var currentIndex = array.length, temporaryValue, randomIndex;

          // While there remain elements to shuffle...
          while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
          }
          return array;
        }
        
        function selectAvatar(selected) {
            vm.newPlayer.avatar = selected;
        };
        
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
      
        function createPlayerAvatar() {
                //At this point, a player can be assumed to be registered and the avatar setup
                //so before navigating to the next screen, let's set a 'registered' property on
                //the player record
            vm.newPlayer['registered'] = true;
            playerService.updatePlayer(vm.newPlayer)
            .then(function(p) {
                $location.path('/join');
                $scope.$apply();
            })
            .catch(function(error) {
                vm.error = error;
            });         
        }
    }
    
})();