/**
* shNavbar Directive Definition
*
* Angular Type: Directive
* @namespace layout
* @class shNavbar
* @constructor
* view app/layout/navbar.html
*/

(function() {
  'use strict';

  angular
    .module('app.layout')
    .directive('shNavbar', shNavbar);

  /**
  * shNavbar directive declaration
  * @method shNavbar
  */
  function shNavbar() {
    return {
      templateUrl: 'app/layout/navbar.html',
      restrict: 'E',
      scope: {},
      controller: NavbarController,
      controllerAs: 'vm'
    };
  }

  

  /**
  * function NavbarController definition
  * @private vm viewModel alias
  * @private originatorEv 
  * @private playerIsRegistered {boolean} 
  * @private isLoggedIn {boolean}
  * @private logout {function}
  * @private navigate {function}
  * @private openMenu {function}
  * @method NavbarController
  * @param {Object} $rootScope
  * @param {Object} $location
  * @param {Object} authService
  * @param {Object} playerService
  * @return {Object} description
  */
  NavbarController.$inject = ['$rootScope', '$location', 'authService', 'playerService'];
  function NavbarController($rootScope, $location, authService, playerService) {
    var vm = this;
    var originatorEv;
      
    vm.playerIsRegistered = false;
    vm.isLoggedIn = authService.isLoggedIn;
    vm.logout = logout;
    vm.navigate = navigate;
    vm.openMenu = openMenu;

      
    /**
    * function openMenu
    * @method openMenu
    * @param {Object} $mdOpenMenu
    * @param {Object} ev
    */
    function openMenu($mdOpenMenu, ev) {
        
        //Some menu items are only available to
        //fully registered users - determine status and set
        // playerIsRegistered to that status before opening menu
        playerService.getRegisteredStatus()
        .then(function(snapshot){
             vm.playerIsRegistered = snapshot.val(); 
        })
        .catch(function(error) {
            vm.error = error;
        });
        
        originatorEv = ev;
        $mdOpenMenu(ev);
    };      
      
      
    /**
    * Logout function
    *
    * Logout user, broadcast 'logout' event and set $location = '/'
    * @method logout
    */
    function logout() {
        $rootScope.$broadcast('logout');
        authService.logout();
        $location.path('/');
    }
      
    /**
    * Navigate function
    *
    * @method navigate
    * @param {string} to $location path
    */
    function navigate(to) {
        $location.path(to);
    }
  }

})();