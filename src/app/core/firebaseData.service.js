/**
* Firebase Data Service
*
* Angular Type: Service
*
* Service provider for Firebase Database
* @namespace core
* @class firebaseDataService
* @constructor
* @static
* @param {Constant} FIREBASE_LOGGING
* @return {Object} Service Map Object
*/
(function() {
    'use strict';
    
    angular
        .module('app.core')
        .factory('firebaseDataService', firebaseDataService);
    
    firebaseDataService.$inject = ['FIREBASE_LOGGING'];
    function firebaseDataService(FIREBASE_LOGGING){
        /**
        * Firebase API root database reference
        * @property root
        * @type firebase.database().ref()
        */
        var root = firebase.database().ref();
        
        /**
        * Firebase API Auth service reference
        * @property auth
        * @type firebase.auth()
        */
        var auth = firebase.auth();
        if (FIREBASE_LOGGING){firebase.database.enableLogging(true);};
        
        /**
        * FirebaseDataService Service Map
        * @property service
        * @type Object
        */
        var service = {
            auth:auth,
            root:root,
            users:root.child('users'),
            emails:root.child('emails'),
            textMessages: root.child('textMessages'),
            
            getPlayer: getPlayer,
            getRegistered: getRegistered,
            setRole: setRole,
            updatePlayer: updatePlayer
        };
        return service;
        
        
        ///////////////
        
        
        /**
        * getPlayer() uses the 'once' functionality of firebase queries to lookup 
        * and return a user's firebase record as an array
        * @method getPlayer
        * @param {string} uid A Firebase UID string
        * @return promise
        */
        function getPlayer(uid) {
            return firebase.database().ref('users/' + uid).once('value');
        }
        
        
        /**
        * getRegistered() looks up the user's 'registered' property in /users/{uid}/registered
        * @method getRegistered
        * @param {string} uid
        * @return {Object} promise, resolves to boolean or null
        */
        function getRegistered(uid) {
            return firebase.database().ref('users/' + uid + '/registered').once('value');
        }
        
                                     
        /**
        * setRole() sets the users role in /users/{uid}/roles ie. 'player':true
        * @method setRole
        * @param {Object} user  user:{email:'', password:'', role:'', uid:''}
        * @return {Object} promise, resolves to success/error object
        */
        function setRole(user) {
            return firebase.database().ref('users/' + user.uid + '/roles/'+user.role).set(true);  
        }
        
                                
        /**
        * updatePlayer uses Firebase .update() to merge an updated player object into the current player record
        * @method updatePlayer
        * @param {string} playerKey  a Firebase UID
        * @param {Object} player an instance of the player() object type from player.service.js
        * @return {Object} promise, resolves to success/error object
        */
        function updatePlayer(playerKey,player) {
            //  Can't use 'set' because with the addition of /uid/roles/... it will overwrite
            //  unless the full data set is supplied
            //  return firebase.database().ref('users/' + playerKey).set(player);
            return firebase.database().ref('users/' + playerKey).update(player);
        }
    }
}) ();