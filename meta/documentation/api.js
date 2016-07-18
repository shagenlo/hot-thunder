YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "auth.authController",
        "auth.authService",
        "auth.configFunction",
        "auth.shAuthForm",
        "core.firebaseDataService",
        "core.playerService",
        "landing.configFunction",
        "layout.shNavbar",
        "player.PlayerController",
        "player.configFunction",
        "player.shPlayerAviForm",
        "player.shPlayerForm"
    ],
    "modules": [
        "app",
        "app.auth",
        "app.core",
        "app.core.constant",
        "app.landing",
        "app.layout",
        "app.player"
    ],
    "allModules": [
        {
            "displayName": "app",
            "name": "app",
            "description": "Main Angular Application Module\n\nAngular Type: Module\n\nIn configFunction configures the following services:\n\n  $routeProvider        https://docs.angularjs.org/api/ngRoute/provider/$routeProvider\n\n  $mdIconProvider       https://docs.angularjs.org/api/ng/provider/$logProvider\n\n  $logProvider          https://material.angularjs.org/latest/api/service/$mdIconProvider\n\n  $mdThemingProvider    https://material.angularjs.org/latest/api/service/$mdThemingProvider\n\nIn runFunction set up watcher for routeChangeError event and route to root view in case of AUTH_REQUIRED"
        },
        {
            "displayName": "app.auth",
            "name": "app.auth",
            "description": "The Authentication module provides \nregistration and login services and views to the application.\n\nAngular Type: Module"
        },
        {
            "displayName": "app.core",
            "name": "app.core",
            "description": "Core Angular Application Module\n\nAngular Type: Module"
        },
        {
            "displayName": "app.core.constant",
            "name": "app.core.constant",
            "description": "Constants Definitions - this is not actually a module, just naming it so the documentation generator can catch it.\n\n 'FIREBASE_URL','https://totalwine-7d7d5.firebaseio.com/'\n\n 'API_KEY','AIzaSyBXjwIZIm-KpJKRhBoqjlIW0mH5Bo2VAV0'\n\n 'AUTH_DOMAIN','totalwine-7d7d5.firebaseapp.com'\n\n 'DATABASE_URL','https://totalwine-7d7d5.firebaseio.com'\n\n 'STORAGE_BUCKET',''\n\n 'PROTECTED_PATHS', ['/player', '/playerAvi', '/join']\n\n 'FIREBASE_LOGGING',false\n\n 'AVATAR_COUNT',32\n\n 'AVATAR_PREFIX','svg-'\n\nAngular Type: Constants"
        },
        {
            "displayName": "app.landing",
            "name": "app.landing",
            "description": "Landing module definition\n\nAngular Type: module"
        },
        {
            "displayName": "app.layout",
            "name": "app.layout",
            "description": "Layout Module manges the applications title bar\n\nAngular Type: Module"
        },
        {
            "displayName": "app.player",
            "name": "app.player",
            "description": "The Player manages player information.\n\nAngular Type: Module"
        }
    ],
    "elements": []
} };
});