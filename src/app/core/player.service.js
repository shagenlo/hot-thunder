/**
* Application Player Service
*
* Angular Type: Factory
*
* Service provider for the Player functionality of the application
* @namespace core
* @class playerService
* @constructor
* @static
* @param {Object} $rootScope 
* @param {Object} $firebaseArray
* @param {Object} firebaseDataService
* @return {Object} service definition object
*/
(function () {
    'use strict'
    
    angular
        .module('app.core')
        .factory('playerService', playerService);
    
    playerService.$inject = ['$rootScope', '$firebaseArray', 'firebaseDataService'];
    function playerService($rootScope, $firebaseArray, firebaseDataService) {
        
        /**
        * Description for fbUsers
        * @property fbUsers
        * @type {Object} AngularFire database reference to @root/Users
        * @deprecated
        */
        var fbUsers = null;
        
        /**
        * Description for fbPlayer
        * @property fbPlayer
        * @type {Object} AngularFire database reference to @root/Users/{uid}/
        * @deprecated
        */
        var fbPlayer = null;
        
        var service = {
            Player:Player,
            getUsers:getUsers,
            getUid:getUid,
            getRegisteredStatus:getRegisteredStatus,
            getPlayer:getPlayer,
            updatePlayer:updatePlayer,
            copySnapshotToPlayer:copySnapshotToPlayer
        };
        
        
        
        /**
        * On logout, all Firebase references need to be closed
        */
        $rootScope.$on('logout', function () {
            if (fbUsers) {
                fbUsers.$destroy();
            }
        });
        //TODO: Implement $rootscope listener $destroy to avoid memory leaks
        //  see below
        //unsubscribe = $rootScope.$on 'event', scope.key = value;
        //scope.$on '$destroy', unsubscribe;
        
        return service;
        
        ////////////////
        
        
        /**
        * Player function.  Data model template for view and firebase
        * @method Player
        */
        function Player() {
            this.firstname = '';
            this.lastname = '';
            this.phone = '';
            this.email = firebase.auth().currentUser.email;
            this.address = '';
            this.nickname = '';
            this.avatar = '';
            this.team = '';
            this.registered = null;
            this.uid = firebase.auth().currentUser.uid;
        };
        
        /**
        * getUsers() Get the firebase:/users AngularFire Array
        * @method getUsers
        * @return {Object} fbUsers - an AngularFire array
        */
        function getUsers() {
            if (!fbUsers) {
                fbUsers = $firebaseArray(firebaseDataService.users); 
            }
            return fbUsers;
        };
        
    
        /**
        * getUid() Get the UID of the currently logged in user
        * @method getUid
        * @return {string} UID of current user
        */
        function getUid() {
            return firebase.auth().currentUser.uid;
        };
        

        /**
        * getRegisteredStatus() Get the registered status of the currently logged-in user
        * @private playerKey - a UID
        * @method getRegisteredStatus
        * @return {Object} promise, resolves to a boolean or null
        */
        function getRegisteredStatus() {
            var playerKey = getUid();
            return firebaseDataService.getRegistered(playerKey);
        }
     
                                        
        /**
        * getPlayer() Check if the player already exists, In which case we'll take a snapshot into the player model
        * @method getPlayer
        * @return {Object} promise
        */
        function getPlayer() {
            return firebaseDataService.getPlayer(getUid());
        };
        
                              
        /**
        * updatePlayer() Create Player in database
        * @method updatePlayer
        * @param {Object} player
        * @return {Object} promise
        */
        function updatePlayer(player) {
            var playerKey = getUid();
            return firebaseDataService.updatePlayer(playerKey,player);
        };
        

        /**
        * copySnapshotToPlayer() Apply data in the firebase snapshot to a Player array
        * @method copySnapshotToPlayer
        * @param {Object} player
        * @param {Object} snapshot
        * @return Nothing.  This utility function copies contents of the snapshot into the player object.
        */
        function copySnapshotToPlayer(player,snapshot) {
            var snap = snapshot.val();
            for (var key in snap) {
                if (!snap.hasOwnProperty(key)) continue;
                if (typeof snap[key] !== 'object'){
                    // key/value pair
                    if (player.hasOwnProperty(key)) {
                        player[key] = snap[key];
                    } else {
                        console.log("dumping key because not in player:",key);
                        //TODO: Not sure how this would happen yet, but structure in place to discover
                        //      an occurance.
                    }
    
                } else {
                    // key/array pair
                    console.log("dumping key because object encountered:", key);
                    //TODO: If this happens, it's because we've encountered an array or something in the
                    //      firebase record snapshot - probably a nested data situation, in which case we'll
                    //      need to re-architect this function for recursion or other
                }
            }
          //Replaced with above, allows Player{} property definitions to be defined in a single location    
          /*player.name = snapshot.val().name;
            player.email = snapshot.val().email;
            player.phone = snapshot.val().phone;
            player.address = snapshot.val().address;
            player.nickname = snapshot.val().nickname;
            player.avatar = snapshot.val().avatar;
            player.team = snapshot.val().team; */           
        }
    }
})();