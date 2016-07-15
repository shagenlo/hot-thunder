(function (){
    'use strict'
    
    angular
        .module('app.auth')
        .directive('shAuthForm', shAuthForm);
    
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
    
    function AuthFormController() {
        var vm = this;
        vm.user = {email:'', password:'', role:vm.role, uid:''};
        //email:    Set in form
        //password: Set in form
        //role:     Set in HTML template
        //uid:      Retrieved and set when user registers or logs in
    }
})();
