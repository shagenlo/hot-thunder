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
    
    configFunction.$inject = ['$routeProvider', '$mdIconProvider', '$logProvider', '$mdThemingProvider'];
    function configFunction($routeProvider,  $mdIconProvider, $logProvider, $mdThemingProvider) {
        $routeProvider.otherwise({
            redirectTo: '/'
        });
        
        $logProvider.debugEnabled(true);  

        $mdIconProvider
            .defaultIconSet("./content/img/icons/avatars.svg", 128)
            .icon("unknown"    , "content/img/icons/avatar-unknown.svg"          , 24);        
        
        $mdThemingProvider.theme('docs-dark', 'default')
        .primaryPalette('yellow')
        .dark();        
    };  
    
    runFunction.$inject = ['$rootScope', '$location'];
    function runFunction($rootScope, $location) {
        $rootScope.$on('routeChangeError', function(event, next, previous, error) {
            if (error === 'AUTH_REQUIRED') {
                $location.path('/');  
            };
        });  
    };
})();