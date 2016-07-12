(function (){
    'use strict'
    
    angular
        .module('app.core')
        .factory('playerService', playerService);
    
    playerService.$inject = ['$rootScope', '$firebaseArray', 'firebaseDataService'];
    
    function playerService($rootScope, $firebaseArray, firebaseDataService) {
        var fbUsers = null;
        var fbPlayer = null;
        var fbPlayerIsRegistered = null;
        
        var service = {
            Player:Player,
            getUsers:getUsers,
            getUid:getUid,
            getRegisteredStatus:getRegisteredStatus,
            getPlayer:getPlayer,
            updatePlayer:updatePlayer,
            copySnapshotToPlayer:copySnapshotToPlayer
        };
        
        //On logout, all Firebase references need to be closed
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
        
        //Data model template for view and firebase
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
        
        //Get the firebase:/users AngularFire Array
        function getUsers() {
            if (!fbUsers) {
                fbUsers = $firebaseArray(firebaseDataService.users); 
            }
            return fbUsers;
        };
        
        //Get the UID of the currently logged in user
        function getUid() {
            return firebase.auth().currentUser.uid;
        };
        
        //Get the registered status of the currently logged-in user
        function getRegisteredStatus() {
            var playerKey = getUid();
            return firebaseDataService.getRegistered(playerKey);
        }
     
        //Check if the player already exists
        //  In which case we'll take a snapshot into the player model
        //  Returns a promise
        function getPlayer() {
            return firebaseDataService.getPlayer(getUid());
        };
        
        //Create Player in database
        //  Returns a promise
        function updatePlayer(player) {
            var playerKey = getUid();
            return firebaseDataService.updatePlayer(playerKey,player);
        };
        
        //Apply data in the firebase snapshot to a Player array
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