/**
* shPlayerAviForm Directive
*
* Angular Type: Directive
* @namespace player
* @class shPlayerAviForm
* @constructor
* @return {Object} shPlayerAviForm directive instance
* View: app/player/playerAviForm.html
*/
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
 
    
    
    /**
    * PlayerAviFormController Controller
    * @method PlayerAviFormController
    * @param {Object} $location
    * @param {Object} playerService
    * @param {Object} $scope
    * @param {Object} AVATAR_COUNT
    * @param {Object} AVATAR_PREFIX
    */
    PlayerAviFormController.$inject = ['$location', 'playerService', '$scope', 'AVATAR_COUNT', 'AVATAR_PREFIX'];
    function PlayerAviFormController($location, playerService, $scope, AVATAR_COUNT, AVATAR_PREFIX) {
        /**
        * ViewModel Alias
        * @property vm
        * @type Object
        */        
        var vm = this;
        vm.playerExists = playerExists;
        vm.createPlayerAvatar = createPlayerAvatar;
        vm.selectAvatar = selectAvatar;
        
        /**
        * newPlayer playerService.Player() Object
        * @property newPlayer
        * @type Object
        */        
        vm.newPlayer = new playerService.Player();
        
        /**
        * avatars array of avatar SVG IDs
        * @property avatars
        * @type array
        */
        vm.avatars = [];
        
        playerExists();
        vm.avatars = createAvatars(vm.avatars);
        
        
        
        /**
        * Function createAvatars
        * @method createAvatars
        * @param {Array} avatars
        * @return {Array} avatars array, filled in and shuffled
        */
        function createAvatars(avatars) {
            for (var i=1; i<=AVATAR_COUNT; i++) {
                avatars.push(AVATAR_PREFIX+String(i));
            }
            avatars = shuffle(avatars);
            return avatars;
        }
        
                                         
        /**
        * Function shuffle - utility function to shuffle elements of an array
        * @method shuffle
        * @param {Array} array
        * @return {Array} array
        */
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
        
                                         
        /**
        * Function selectAvatar
        * @method selectAvatar
        * @param {Object} selected
        */
        function selectAvatar(selected) {
            vm.newPlayer.avatar = selected;
        };
        
                                         
        /**
        * Function playerExists
        *          If the player exists in the backend, retrieve a snapshot of the player data
        *          and have it copied into the vm.Player data structure, which is bound to the view
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
        * function createPlayerAvatar
        *   At this point, a player can be assumed to be registered and the avatar setup
        *   so before navigating to the next screen, let's set a 'registered' property on
        *   the player record 
        * @method createPlayerAvatar
        */
        function createPlayerAvatar() {
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