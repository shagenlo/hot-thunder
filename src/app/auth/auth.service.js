(function (){
    'use strict';
    
    angular
        .module('app.auth')
        .factory('authService', authService);
    
    authService.$inject = ['$firebaseAuth', 'firebaseDataService'];
    
    function authService($firebaseAuth, firebaseDataService){
        //var firebaseAuthObject = $firebaseAuth(firebaseDataService.root); //deprecated since AngularFire 2.x
        
        var firebaseAuthObject = $firebaseAuth(); //$firebaseAuth is an AngularFire service
        var service = {
            firebaseAuthObject: firebaseAuthObject,
            register: register,
            login: login,
            logout: logout,
            isLoggedIn: isLoggedIn,
            sendWelcomeEmail: sendWelcomeEmail
        };
        
        return service;
        
        
        ////////////////////////////////////////

        function register(user){
            //return firebaseAuthObject.$createUser(user); //deprecated since AngularFire 2.x
            return firebaseAuthObject.$createUserWithEmailAndPassword(user.email, user.password);
        }
        
        function login(user){
            //return firebaseAuthObject.$authWithPassword(user); //deprecated since AngularFire 2.x
            return firebaseAuthObject.$signInWithEmailAndPassword(user.email, user.password);
        }
        
        function logout(){
            firebaseAuthObject.$signOut();
        }
        
        function isLoggedIn(){
            return firebaseAuthObject.$getAuth();
        }
        
        function sendWelcomeEmail(emailAddress){
            
        }
    }
})();