/**
* Configuration module for app.landing.  Set up routeProvider to use the template app/landing/landing.html on '/' route.
*
* Angular type: configuration definition
* @namespace landing
* @class configFunction
* @constructor
* Configuration definitions for Landing page
*/
(function () {
    'use strict';
    angular.module('app.landing')
        .config(configFunction);
    
    configFunction.$inject = ['$routeProvider'];
    function configFunction($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/landing/landing.html'
        });
    }
 })();