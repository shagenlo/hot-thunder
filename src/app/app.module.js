/**
* Main Angular Application Module
*
* Angular Type: Module
*
* In configFunction configures the following services:
*
*   $routeProvider        https://docs.angularjs.org/api/ngRoute/provider/$routeProvider
*
*   $mdIconProvider       https://docs.angularjs.org/api/ng/provider/$logProvider
*
*   $logProvider          https://material.angularjs.org/latest/api/service/$mdIconProvider
*
*   $mdThemingProvider    https://material.angularjs.org/latest/api/service/$mdThemingProvider
*
* In runFunction set up watcher for routeChangeError event and route to root view in case of AUTH_REQUIRED
* @module app
* @requires ngMaterial
* @requires ngRoute
* @requires ngMessages
* @requires ngAria
* @requires firebase
* @requires app.core
* @requires app.landing
* @requires app.layout
* @requires app.auth
* @requires app.player
* @requires app.join
* @method configFunction
* @method runFunction
*/
(function() {
    'use strict';
    
    angular
        .module('app', [
            'ngMaterial',
            'ngRoute',
            'ngMessages',
            'ngAria',
            'firebase',
            /*'utils.autofocus',*/
            'app.core',
            'app.landing',
            'app.layout',
            'app.auth',
            'app.player',
            'app.join'
    ])
    .config(configFunction)
    .run(runFunction);
    
    
    
    
    /**
    * Main App Module Configuration function - pre-operational configuration setup
    * @method configFunction
    * @param {Object} $routeProvider        https://docs.angularjs.org/api/ngRoute/provider/$routeProvider
    * @param {Object} $mdIconProvider       https://docs.angularjs.org/api/ng/provider/$logProvider
    * @param {Object} $logProvider          https://material.angularjs.org/latest/api/service/$mdIconProvider
    * @param {Object} $mdThemingProvider    https://material.angularjs.org/latest/api/service/$mdThemingProvider
    */
    configFunction.$inject = ['$routeProvider', '$mdIconProvider', '$logProvider', '$mdThemingProvider'];
    function configFunction($routeProvider,  $mdIconProvider, $logProvider, $mdThemingProvider) {
        $routeProvider.otherwise({
            redirectTo: '/'
        });
        
        $logProvider.debugEnabled(true);  

        $mdIconProvider
            .defaultIconSet("./content/img/icons/avatars.svg", 128)
            .icon("unknown"    , "content/img/icons/avatar-unknown.svg" , 24);        
        
        $mdThemingProvider.theme('docs-dark', 'default')
        .primaryPalette('yellow')
        .dark();        
    };  
    
    
    
    
    /**
    * Main App Module Run function - post-operational configuration
    * Configures:
    *   Here we setup a listener for the routeChangeError event, if the error is
    *   AUTH_REQUIRED we take the $location back to the root view.    
    * @method runFunction
    * @param {Object} $rootScope
    * @param {Object} $location
    */    
    runFunction.$inject = ['$rootScope', '$location'];
    function runFunction($rootScope, $location) {
        $rootScope.$on('routeChangeError', function(event, next, previous, error) {
            if (error === 'AUTH_REQUIRED') {
                $location.path('/');  
            };
        });  
    };
})();