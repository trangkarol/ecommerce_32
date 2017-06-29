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

    $stateProvider
    .state('home', {
        abstract : true,
        views : {
            'layout': {
                templateUrl : 'resources/assets/angularjs/app/home/index.html',
            },
            'header@home' : {
                templateUrl : 'resources/assets/angularjs/app/home/pages/header/header.html',
                controller : 'HeaderCtrl'
            },
            'footer@home' : {
                templateUrl : 'resources/assets/angularjs/app/home/pages/footer/footer.html',
            },
            main: {}
        },
    })
    .state('home.login', {
        url : '/login',
        views : {
            'main@home' : {
                templateUrl : 'resources/assets/angularjs/app/auth/login/login.component.html',
                controller : 'LoginCtrl',
            }
        },
        css : [
            'resources/assets/angularjs/app/home/css/style.css',
            'resources/assets/angularjs/app/home/css/style1.css',
        ],
        data : {
            pageTitle : 'Project 1 - Login',
        },
        resolve : {
            skipIfLoggedIn : skipIfLoggedIn,
        },
    })
    .state('logout', {
        url : '/logout',
        views : {
            'layout': {
                templateUrl: null,
                controller : 'LogoutCtrl',
            },
        },
    })
    .state('home.signup', {
        url : '/signup',
        views : {
            'main@home': {
                templateUrl : 'resources/assets/angularjs/app/auth/signup/signup.component.html',
                controller : 'SignupCtrl',
            }
        },
        css : [
            'resources/assets/angularjs/app/home/css/style.css',
            'resources/assets/angularjs/app/home/css/style1.css',
        ],
        data : {
            pageTitle : 'Project 1 - Signup',
        },
        resolve : {
            skipIfLoggedIn : skipIfLoggedIn,
        },
    })
    .state('home.profile', {
        url : '/profile',
        views : {
            'main@home': {
                templateUrl : 'resources/assets/angularjs/app/auth/profile/profile.component.html',
                controller : 'ProfileCtrl',
            }
        },
        css : [
            'resources/assets/angularjs/app/home/css/style.css',
            'resources/assets/angularjs/app/home/css/style1.css',
        ],
        data : {
            pageTitle : 'Project 1 - Profile',
        },
        resolve : {
            loginRequired : loginRequired,
        },
    })
    .state('home.page', {
        url : '/',
        views : {
            'main@home' : {
                templateUrl : getLayout('home', 'homepage'),
                controller : 'HomePageCtrl',
            }
        },
        css : [
            'resources/assets/angularjs/app/home/css/style.css',
            'resources/assets/angularjs/app/home/css/style1.css',
        ],
        data : {
            pageTitle : 'Project 1 - Home Page',
        },
    });
}
