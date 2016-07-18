/**
* Authentication Service class for Authentication Module
*
* Angular Type: Factory
* @namespace auth
* @class authService
* @constructor
* @static
* @param {Object} $firebaseAuth Instance of AngularFire $firebaseAuth
* @param {Object} firebaseDataService Application Service for Firebase interaction
* @return {object} AuthService factory object
*/
(function () {
    'use strict';
    
    angular
        .module('app.auth')
        .factory('authService', authService);
      
    authService.$inject = ['$firebaseAuth', 'firebaseDataService'];
    function authService($firebaseAuth, firebaseDataService) {
        
        /**
        * firebaseAuthObject
        * @property firebaseAuthObject
        * @type Instance of $firebaseAuth, an AngularFire service.
        */
        var firebaseAuthObject = $firebaseAuth(); //$firebaseAuth is an AngularFire service; 
        
        /**
        * authService Service definition
        * @property service
        * @type Array
        */
        var service = {
            firebaseAuthObject: firebaseAuthObject,
            register: register,
            login: login,
            logout: logout,
            isLoggedIn: isLoggedIn,
            setRole: setRole,
            sendWelcomeEmail: sendWelcomeEmail
        };
        
        return service;
        
        
        ////////////////////////////////////////
        
        
        /**
        * Registration function using the Firebase $createUserWithEmailAndPassword() method
        * @method register
        * @param {Object} user  user:{email:'', password:'', role:'', uid:''}
        * @return {Object} promise object
        */
        function register(user) {
            return firebaseAuthObject.$createUserWithEmailAndPassword(user.email, user.password);
        }
        
        /**
        * This method sets the appropriate role in the user record by calling firebaseDataService.setRole(user).
        * @method setRole
        * @param {Object}  user user:{email:'', password:'', role:'', uid:''}
        * @return {Object} promise object
        */
        function setRole(user) {
            return firebaseDataService.setRole(user);
        }
        
                                
        /**
        * Logs user into the system using the Firebase $signInWithEmailAndPassword() method.
        * @method login
        * @param {Object} user  user:{email:'', password:'', role:'', uid:''}
        * @return {Object} promise object
        */
        function login(user) {
            return firebaseAuthObject.$signInWithEmailAndPassword(user.email, user.password);
        }       
        
                              
        /**
        * Logout function using the Firebase $signOut() method.
        * @method logout
        */
        function logout() {
            firebaseAuthObject.$signOut();
        }
        
                           
        /**
        * This method determines if a user is currently logged in using the Firebase $getAuth() method.
        * @method isLoggedIn
        * @return {Object} An object containing the fields uid (the unique user ID), provider 
        *                  (string identifying the provider), * auth (the authentication token 
        *                  payload), and expires (expiration time in seconds since the Unix epoch) 
        *                  - and more, depending upon the provider used to authenticate
        */
        function isLoggedIn() {
            return firebaseAuthObject.$getAuth();
        }
        
                               
        /**
        * sendWelcomeEmail - Unimplemented
        * @method sendWelcomeEmail
        * @param {Object} emailAddress
        * @return {Object} description
        */
        function sendWelcomeEmail(emailAddress) {
            console.log("ToDo: implement sendWelcomEmail("+emailAddress+") in auth.service.js");   
        }
    }
})();