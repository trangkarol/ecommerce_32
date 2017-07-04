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
    })
    /**
     * admin
     */
    .state('admin', {
        abstract : true,
        views : {
            'layout' : {
                templateUrl : 'resources/assets/angularjs/app/admin/index.html',
            },
            'header@admin' : {
                templateUrl : 'resources/assets/angularjs/app/admin/pages/header/header.html',
                controller : 'AdminHeaderCtrl',
            },
            'footer@admin' : {
                templateUrl : 'resources/assets/angularjs/app/admin/pages/footer/footer.html',
            },
            main : {}
        },
        data : {
            bodyClass : 'hold-transition skin-blue sidebar-mini',
        },
        resolve : {
            loginRequired : loginRequired,
            isAdmin: isAdmin,
        },
    })
    // category
    .state('admin.category-list', {
        url : '/admin/category-list',
        views : {
            'main@admin' : {
                templateUrl : getLayout('admin', 'category-list'),
                controller : 'CategoryListCtrl',
            }
        },
        css : [
            'resources/assets/angularjs/app/admin/css/AdminLTE.min.css',
            'resources/assets/angularjs/app/admin/css/skins/_all-skins.min.css',
            'node_modules/angular-loading-bar/build/loading-bar.min.css',
        ],
        data : {
            pageTitle : 'Project 1 - Admin category list',
        }
    })
    .state('admin.category-create', {
        url : '/admin/category-create',
        views : {
            'main@admin' : {
                templateUrl : getLayout('admin', 'category-create'),
                controller : 'CategoryCreateCtrl',
            }
        },
        css : [
            'resources/assets/angularjs/app/admin/css/AdminLTE.min.css',
            'resources/assets/angularjs/app/admin/css/skins/_all-skins.min.css',
            'node_modules/angular-loading-bar/build/loading-bar.min.css',
        ],
        data : {
            pageTitle : 'Project 1 - Admin category create',
        }
    })
    .state('admin.category-edit', {
        url : '/admin/category-edit/:name',
        views : {
            'main@admin' : {
                templateUrl : getLayout('admin', 'category-edit'),
                controller : 'CategoryEditCtrl',
            }
        },
        css : [
            'resources/assets/angularjs/app/admin/css/AdminLTE.min.css',
            'resources/assets/angularjs/app/admin/css/skins/_all-skins.min.css',
            'node_modules/angular-loading-bar/build/loading-bar.min.css',
        ],
        data : {
            pageTitle : 'Project 1 - Admin category edit',
        }
    })
    // product
    .state('admin.product-list', {
        url : '/admin/product-list',
        views : {
            'main@admin' : {
                templateUrl : getLayout('admin', 'product-list'),
                controller : 'ProductListCtrl',
            }
        },
        css : [
            'resources/assets/angularjs/app/admin/css/AdminLTE.min.css',
            'resources/assets/angularjs/app/admin/css/skins/_all-skins.min.css',
            'node_modules/angular-datatables/dist/css/angular-datatables.min.css',
            'node_modules/angular-loading-bar/build/loading-bar.min.css',
        ],
        data : {
            pageTitle : 'Project 1 - Admin product list',
        }
    })
    .state('admin.product-edit', {
        url : '/admin/product-edit/:id',
        views : {
            'main@admin' : {
                templateUrl : getLayout('admin', 'product-edit'),
                controller : 'ProductEditCtrl',
            }
        },
        css : [
            'resources/assets/angularjs/app/admin/css/AdminLTE.min.css',
            'resources/assets/angularjs/app/admin/css/skins/_all-skins.min.css',
            'node_modules/angular-loading-bar/build/loading-bar.min.css',
            'resources/assets/angularjs/app/admin/css/style.css',
        ],
        data : {
            pageTitle : 'Project 1 - Admin product edit',
        }
    })
    .state('admin.product-create', {
        url : '/admin/product-create',
        views : {
            'main@admin' : {
                templateUrl : getLayout('admin', 'product-create'),
                controller : 'ProductCreateCtrl',
            }
        },
        css : [
            'resources/assets/angularjs/app/admin/css/AdminLTE.min.css',
            'resources/assets/angularjs/app/admin/css/skins/_all-skins.min.css',
            'node_modules/angular-loading-bar/build/loading-bar.min.css',
        ],
        data : {
            pageTitle : 'Project 1 - Admin product create',
        }
    })
    .state('home.search', {
        url : '/products?search',
        views : {
            'main@home' : {
                templateUrl : getLayout('home', 'search'),
                controller : 'SearchCtrl'
            }
        },
        css : [
            'resources/assets/angularjs/app/home/css/style.css',
            'resources/assets/angularjs/app/home/css/style1.css',
        ],
        data : {
            pageTitle : 'Project 1 - search',
        }
    })
    .state('home.product-list', {
        url : '/:name',
        views : {
            'main@home' : {
                templateUrl : getLayout('home', 'product-list'),
                controller : 'ProductsCtrl'
            }
        },
        css : [
            'resources/assets/angularjs/app/home/css/style.css',
            'resources/assets/angularjs/app/home/css/style1.css',
        ],
        data : {
            pageTitle : 'Project 1 - product list',
        }
    })
    .state('home.product-detail', {
        url : '/product/:name',
        views : {
            'main@home' : {
                templateUrl : getLayout('home', 'product-detail'),
                controller : 'ProductDetailCtrl'
            }
        },
        css : [
            'resources/assets/angularjs/app/home/css/style.css',
            'resources/assets/angularjs/app/home/css/flexslider.css',
            'resources/assets/angularjs/app/home/css/style1.css',
        ],
        data : {
            pageTitle : 'Project 1 - product detail',
        }
    });
}
