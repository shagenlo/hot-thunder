(function() {
  'use strict';

  angular
    .module('app.layout')
    .directive('shNavbar', shNavbar);

  function shNavbar() {
    return {
      templateUrl: 'app/layout/navbar.html',
      restrict: 'E',
      scope: {},
      controller: NavbarController,
      controllerAs: 'vm'
    };
  }

  NavbarController.$inject = ['$rootScope', '$location', 'authService', 'playerService'];

  function NavbarController($rootScope, $location, authService, playerService) {
    var vm = this;
    var originatorEv;
      
    vm.playerIsRegistered = false;
    vm.isLoggedIn = authService.isLoggedIn;
    vm.logout = logout;
    vm.navigate = navigate;
    vm.openMenu = openMenu;

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
      
    function logout() {
        $rootScope.$broadcast('logout');
        authService.logout();
        $location.path('/');
    }
      
    function navigate(to) {
        $location.path(to);
    }
  }

})();