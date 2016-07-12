(function(){
    'use strict';
    
    angular
        .module('app.core')
        //Firebase configuration constants / initialized at config.firebase.js
        .constant('FIREBASE_URL','https://totalwine-7d7d5.firebaseio.com/')
        .constant('API_KEY','AIzaSyBXjwIZIm-KpJKRhBoqjlIW0mH5Bo2VAV0')
        .constant('AUTH_DOMAIN','totalwine-7d7d5.firebaseapp.com')
        .constant('DATABASE_URL','https://totalwine-7d7d5.firebaseio.com')
        .constant('STORAGE_BUCKET','')
        //App constants
        .constant('PROTECTED_PATHS', ['/player', '/playerAvi', '/join'])
        .constant('FIREBASE_LOGGING',false)
        .constant('AVATAR_COUNT',32)
        .constant('AVATAR_PREFIX','svg-'); 
}) ();
    
