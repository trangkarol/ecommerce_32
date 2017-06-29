function RoutesConfig($stateProvider, $urlRouterProvider) {

    var skipIfLoggedIn = ['$q', '$auth', function($q, $auth) {
        var deferred = $q.defer();

        if ($auth.isAuthenticated()) {
            deferred.reject();
        } else {
            deferred.resolve();
        }

        return deferred.promise;
    }];

    var loginRequired = ['$q', '$location', '$auth', function($q, $location, $auth) {
        var deferred = $q.defer();

        if ($auth.isAuthenticated()) {
            deferred.resolve();
        } else {
            $location.path('/login');
        }

        return deferred.promise;
    }];

    var isAdmin = ['$location', '$q', function($location, $q) {
        var deferred = $q.defer();
        var user = angular.fromJson(localStorage.getItem("User"));

        if (user.is_admin) {
            deferred.resolve();
        } else {
            $location.path('/');
        }

        return deferred.promise;
    }];

    function getLayout(folder, layout) {
        return `resources/assets/angularjs/app/${folder}/components/${layout}/${layout}.component.html`;
    }

    /**
    * App routes
    */
    $urlRouterProvider.otherwise('/');

}
