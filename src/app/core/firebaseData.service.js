(function() {
    'use strict';
    
    angular
        .module('app.core')
        .factory('firebaseDataService', firebaseDataService);
    
    firebaseDataService.$inject = ['FIREBASE_LOGGING'];
    function firebaseDataService(FIREBASE_LOGGING){
        var root = firebase.database().ref();
        var auth = firebase.auth();
        if (FIREBASE_LOGGING){firebase.database.enableLogging(true);};
        
        var service = {
            auth:auth,
            root:root,
            users:root.child('users'),
            emails:root.child('emails'),
            textMessages: root.child('textMessages'),
            
            getPlayer:getPlayer,
            getRegistered:getRegistered,
            updatePlayer:updatePlayer
        };
        return service;
        
        ///////////////
        
        function getPlayer(uid) {
            return firebase.database().ref('users/' + uid).once('value');
        }
        
        function getRegistered(uid) {
            return firebase.database().ref('users/' + uid + '/registered').once('value');
        }
        
        function updatePlayer(playerKey,player) {
            return firebase.database().ref('users/' + playerKey).set(player);
        }
    };
}) ();