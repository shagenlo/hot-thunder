/**
* shAuthForm Directive
*
* Angular Type: Directive
* @namespace auth
* @class shAuthForm
* @constructor
* View: app/auth/authForm.html
*/
(function () {
    'use strict'
    
    angular
        .module('app.auth')
        .directive('shAuthForm', shAuthForm);
    
    
    /**
    * shAuthForm directive function definition
    * @method shAuthForm
    * @return {Object} description
    */
    function shAuthForm(){
        return {
            templateUrl: 'app/auth/authForm.html',
            restrict: 'E',
            controller: AuthFormController,
            controllerAs: 'vm',
            bindToController:  true,
            scope: {
                error: '=',          //bind as object
                formTitle: '@',      //bind as string
                buttonTitle: '@',    //bind as string
                ariaLabel: '@',      //bind as string
                submitAction: '&',    //bind as function
                role: '@'
            }
        }
    }
    
    
    /**
    * Controller for shAuthForm Directive
    * @method AuthFormController
    * @property vm   ViewModel alias
    * @property {Object} user
    */
    function AuthFormController() {
        var vm = this;
        vm.user = {email:'', password:'', role:vm.role, uid:''};
        //email:    Set in form
        //password: Set in form
        //role:     Set in HTML template, the template determines the role (player, operator) 
        //uid:      Retrieved and set when user registers or logs in
        //            used to help set the user role immediately after registration, when it becomes available.
    }
})();
