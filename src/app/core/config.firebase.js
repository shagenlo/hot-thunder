/**
* Configuration information is defined as Constants in app/core/constants.js
* This javascript is defined and executed as part of the bootstrap process.
* It initializes the Firebase system.
*/
var config = {
    apiKey:         angular.injector(['app.core']).get('API_KEY'),
    authDomain:     angular.injector(['app.core']).get('AUTH_DOMAIN'),
    databaseURL:    angular.injector(['app.core']).get('DATABASE_URL'),
    storageBucket:  angular.injector(['app.core']).get('STORAGE_BUCKET'),
};
firebase.initializeApp(config); 