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
    // dashboard
    .state('admin.dashboard', {
        url : '/admin/dashboard',
        views : {
            'main@admin' : {
                templateUrl : getLayout('admin', 'dashboard'),
                controller : 'DashboardCtrl'
            }
        },
        css : [
            'resources/assets/angularjs/app/admin/css/AdminLTE.min.css',
            'resources/assets/angularjs/app/admin/css/skins/_all-skins.min.css',
            'node_modules/angular-loading-bar/build/loading-bar.min.css',
        ],
        data : {
            pageTitle : 'Project 1 - Admin Dashboard',
        }
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
    // user
    .state('admin.user-list', {
        url : '/admin/user-list',
        views : {
            'main@admin' : {
                templateUrl : getLayout('admin', 'user-list'),
                controller : 'UserListCtrl',
            }
        },
        css : [
            'resources/assets/angularjs/app/admin/css/AdminLTE.min.css',
            'resources/assets/angularjs/app/admin/css/skins/_all-skins.min.css',
            'node_modules/angular-datatables/dist/css/angular-datatables.min.css',
            'node_modules/angular-loading-bar/build/loading-bar.min.css',
        ],
        data : {
            pageTitle : 'Project 1 - Admin user list',
        }
    })
    .state('admin.user-edit', {
        url : '/admin/user-edit/:id',
        views : {
            'main@admin' : {
                templateUrl : getLayout('admin', 'user-edit'),
                controller : 'UserEditCtrl',
            }
        },
        css : [
            'resources/assets/angularjs/app/admin/css/AdminLTE.min.css',
            'resources/assets/angularjs/app/admin/css/skins/_all-skins.min.css',
            'node_modules/angular-loading-bar/build/loading-bar.min.css',
        ],
        data : {
            pageTitle : 'Project 1 - Admin user edit',
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
    // suggest
    .state('admin.suggest-list', {
        url : '/admin/suggest-list',
        views : {
            'main@admin' : {
                templateUrl : getLayout('admin', 'suggest-list'),
                controller : 'SuggestListCtrl',
            }
        },
        css : [
            'resources/assets/angularjs/app/admin/css/AdminLTE.min.css',
            'resources/assets/angularjs/app/admin/css/skins/_all-skins.min.css',
            'node_modules/angular-datatables/dist/css/angular-datatables.min.css',
            'node_modules/angular-loading-bar/build/loading-bar.min.css',
        ],
        data : {
            pageTitle : 'Project 1 - Admin suggest list',
        }
    })
    .state('admin.suggest-edit', {
        url : '/admin/suggest-edit/:id',
        views : {
            'main@admin' : {
                templateUrl : getLayout('admin', 'suggest-edit'),
                controller : 'SuggestEditCtrl',
            }
        },
        css : [
            'resources/assets/angularjs/app/admin/css/AdminLTE.min.css',
            'resources/assets/angularjs/app/admin/css/skins/_all-skins.min.css',
            'node_modules/angular-loading-bar/build/loading-bar.min.css',
            'resources/assets/angularjs/app/admin/css/style.css',
        ],
        data : {
            pageTitle : 'Project 1 - Admin suggest edit',
        }
    })
    // home
    .state('home.cart', {
        url : '/cart',
        views : {
            'main@home' : {
                templateUrl : getLayout('home', 'cart'),
                controller : 'CartCtrl'
            }
        },
        css : [
            'resources/assets/angularjs/app/home/css/style.css',
            'resources/assets/angularjs/app/home/css/style1.css',
        ],
        data : {
            pageTitle : 'Project 1 - cart',
        }
    })
    .state('home.recently', {
        url : '/recently',
        views : {
            'main@home' : {
                templateUrl : getLayout('home', 'recently'),
                controller : 'RecentlyCtrl'
            }
        },
        css : [
            'resources/assets/angularjs/app/home/css/style.css',
            'resources/assets/angularjs/app/home/css/style1.css',
        ],
        data : {
            pageTitle : 'Project 1 - recently',
        }
    })
    .state('home.suggest', {
        url : '/suggest',
        views : {
            'main@home' : {
                templateUrl : getLayout('home', 'suggest'),
                controller : 'SuggestCtrl'
            }
        },
        css : [
            'resources/assets/angularjs/app/home/css/style.css',
            'resources/assets/angularjs/app/home/css/style1.css',
        ],
        data : {
            pageTitle : 'Project 1 - suggest',
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

function SatellizerConfig ($authProvider, API_URL) {
    'ngInject'

    $authProvider.httpInterceptor = function () {
        return true;
    }

    $authProvider.loginUrl = API_URL + 'auth/login';
    $authProvider.signupUrl = API_URL + 'auth/signup';

    $authProvider.facebook({
        clientId: '491224784419802'
    });

    $authProvider.google({
        clientId: '511036233663-j09c0lelfbtstlr9qtfl31290dnrvqb7.apps.googleusercontent.com'
    });

    // Facebook
    $authProvider.facebook({
        name: 'facebook',
        url: API_URL + 'auth/facebook',
        authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
        redirectUri: window.location.origin + '/',
        requiredUrlParams: ['display', 'scope'],
        scope: ['email'],
        scopeDelimiter: ',',
        display: 'popup',
        oauthType: '2.0',
        popupOptions: { width: 580, height: 400 }
    });

    // Google
    $authProvider.google({
        url: API_URL + 'auth/google',
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
        redirectUri: window.location.origin,
        requiredUrlParams: ['scope'],
        optionalUrlParams: ['display'],
        scope: ['profile', 'email'],
        scopePrefix: 'openid',
        scopeDelimiter: ' ',
        display: 'popup',
        oauthType: '2.0',
        popupOptions: { width: 452, height: 633 }
    });

    // Twitter
    $authProvider.twitter({
        url: API_URL + 'auth/twitter',
        authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
        redirectUri: window.location.origin,
        oauthType: '1.0',
        popupOptions: { width: 495, height: 645 }
    });
}

var translationsEN = {
    AUTH: {
        // login
        BTN_LOGIN: 'Login',
        LOGIN_TITLE: 'Sign in with your account',
        BTN_LOGIN_FB: 'Sign in with Facebook',
        BTN_LOGIN_GG: 'Sign in with Google',
        BTN_LOGIN_TT: 'Sign in with Twitter',
        FORGOT_PASSWORD: 'Forgot password?',
        REMEMBER_ME: 'Remember me.',
        // logout
        BTN_LOGOUT: 'Logout',
        // signup
        SIGNUP_TITLE: 'Sign up new account',
        BTN_SIGNUP: 'Sign up',
        NAME: 'Name',
        EMAIL: 'Email',
        PASSWORD: 'Password',
        RE_PASSWORD: 'Re-Password',
        PHONE: 'Phone',
        ADDRESS: 'Address',
        GENDER: 'Gender',
        MALE: 'Male',
        FEMALE: 'Female',
        AVATAR: 'Avatar',
        // profile
        PROFILE: 'Profile',
        LABEL_UPDATE: 'Update information',
        LABEL_CHANGE_PASSWORD: 'Change password',
        BUTTON_UPDATE: 'Update',
        OLD_PASSWORD: 'Old password',
        NEW_PASSWORD: 'New password',
    },

    LB_SEARCH_TEXT: 'Search',

    HEADER: {
        HOME: 'Home',
        SUGGEST: 'Suggest',
        CART: {
            ITEMS: 'Items',
            EMPTY: 'Empty Cart'
        },
        CATEGORY: 'Category',
        VIEW_RECENTLY: 'View recently'
    },

    PRODUCT_LIST: {
        CATEGORY: 'Category',
        NAME: 'Name',
        PRICE: 'Price',
        RATE: 'Rate',
        DEFAULT: 'Default',
        NAME_ASC: 'Name(A - Z)',
        NAME_DESC: 'Name(Z - A)',
        PRICE_ASC: 'Price(High - Low)',
        PRICE_DESC: 'Price(Low - High)',
        RATE_ASC: 'Rate(High - Low)',
        RATE_DESC: 'Rate(Low - High)',
        ADD_TO_CART: 'Add to cart',
        QUICK_VIEW: 'Quick view',
        LOAD_MORE: 'Load more',
        DESCRIPTION: 'Description',
        PRICE: 'Price',
        STOCK: 'Stock',
        RATE: 'Rate',
        NEW: 'New',
        SEARCH: 'Search',
        RECENTLY: 'Product view recently',
        LATEST: 'Latest Products',
    },

    PRODUCT_DETAIL: {
        ADD_TO_CART: 'Add to cart',
        DESCRIPTION: 'Description',
        COMMENT: 'Comment',
        PRODUCT_DESCRIPTION: 'Product Description',
        RATE: 'Rate',
    },

    CART: {
        CART_TITEL: 'My Shopping Bag',
        IMAGE: 'Image',
        NAME: 'Product Name',
        PRICE: 'Price',
        QUANTITY: 'Quantity',
        VALUE: 'Value',
        REMOVE: 'Remove',
        BACK_TO_SHOPPING: 'Back To Shopping',
        TOTAL: 'Total',
        CLEAR_SHOPPING_CART: 'CLEAR SHOPPING CART',
        SHOPPING_BASKET: 'Shopping basket',
    },
    SUGGEST: {
        SUGGEST_TITLE: 'Suggest',
        EMAIL: 'Email',
        NAME: 'Product name',
        PRICE: 'Price',
        DESCRIPTION: 'Description',
        CATEGORY: 'Catrgory',
        IMAGE: 'Image',
        BTN_SEND: 'Send',
    },

    ADMIN: {
        HEADER: {
            PROFILE: 'Profile',
            LOGOUT: 'Logout',
            DASHBOARD: 'DashBoard',
            USER: 'User',
            USER_LIST: 'User list',
            CATEGORY: 'Category',
            CATEGORY_LIST: 'Category list',
            PRODUCT: 'Product',
            PRODUCT_LIST: 'Product list',
            SUGGEST: 'Suggest',
            SUGGEST_LIST: 'Suggest list',
        },
        BUTTON: {
            CREATE: 'Create',
            UPDATE: 'Update',
            BACK: 'Back',
            SEND: 'Accept and Send'
        },
        FORM: {
            CATEGORY_CREATE: 'Category Create',
            CATEGORY_EDIT: 'Category Edit',
            USER_EDIT: 'User edit',
            PRODUCT_CREATE: 'Product Create',
            PRODUCT_EDIT: 'Product Edit',
        },
        LABEL: {
            CATEGORY_LIST: 'Category List',
            CATEGORY: 'Category',
            NAME: 'Name',
            PARENT: 'Parent',
            IMAGE: 'Image',
            PRICE: 'Price',
            EMAIL: 'User email',
            DESCRIPTION: 'Description',
            STOCK: 'Stock',
            USER_LIST: 'User list',
            PRODUCT_LIST: 'Product list',
            SUGGEST_LIST: 'Suggest list',
            SUGGEST_EDIT: 'Suggest information',
            FROM: 'from',
            MESSAGE: 'Message',
            SUBJECT: 'Subject',
            DASHBOARD: 'Dashboard',
            ORDER: 'Order',
            NEW_SUGGEST: 'New Suggest',
            USER: 'User',
            PRODUCT: 'Product',
            MORE_INFO: 'More Info',
            STATISTIC: 'Statistics',
        },
    },
};

function TranslateConfig($translateProvider) {
    $translateProvider.translations('en', translationsEN);
    $translateProvider.preferredLanguage('en');
    $translateProvider.fallbackLanguage('en');
}

function Auth($http, API_URL, $q, $auth) {

    return {
        isAuthenticated: function() {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.resolve();
            } else {
                deferred.reject();
            }

            return deferred.promise;
        },

        skipIfLoggedIn: function() {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.reject();
            } else {
                deferred.resolve();
            }

            return deferred.promise;
        },

        isAdmin: function(){
            var deferred = $q.defer();
            var user = angular.fromJson(localStorage.getItem("User"));
            if (user.is_admin) {
                deferred.resolve();
            } else {
                deferred.reject();
            }

            return deferred.promise;
        },

        me: function() {
            var deferred = $q.defer();
            $http.get(API_URL + 'auth/me')
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (error) {
                deferred.reject(error);
            });
            
            return deferred.promise;
        },

        profile: function() {
            var deferred = $q.defer();
            $http.get(API_URL + 'auth/profile')
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (error) {
                deferred.reject(error);
            });
            
            return deferred.promise;
        },

        updateProfile: function(data) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: API_URL + 'auth/me',
                headers: {
                    'Content-Type': undefined
                },
                data: data,
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (data, status) {
                deferred.reject(data);
            });

            return deferred.promise;
        },

        getCurrentUser: function() {
            return angular.fromJson(localStorage.getItem("User"));
        },
    };
};

function API($http, API_URL, $q, $cookies) {

    function get(url) {
        var deferred = $q.defer();
        $http.get(url)
        .success(function (data) {
            deferred.resolve(data);
        })
        .error(function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }

    function post(url, data) {
        var deferred = $q.defer();
        $http.post(url,data)
        .success(function (data) {
            deferred.resolve(data);
        }).error(function (data, status) {
            deferred.reject(data);
        });

        return deferred.promise;
    }

    function postWithFile(url, data) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': undefined
            },
            data: data,
        }).success(function (data) {
            deferred.resolve(data);
        }).error(function (data, status) {
            deferred.reject(data);
        });

        return deferred.promise;
    }

    function put(url, data) {
        var deferred = $q.defer();
        $http.put(url,data)
        .success(function (data) {
            deferred.resolve(data);
        }).error(function (data, status) {
            deferred.reject(data);
        });

        return deferred.promise;
    }

    function remove(url) {
        var deferred = $q.defer();
        $http.delete(url)
        .success(function (data) {
            deferred.resolve(data);
        }).error(function (data, status) {
            deferred.reject(data);
        });

        return deferred.promise;
    }

    var array = [];
    function formatCategory(categories) {
        angular.forEach(categories, function(value) {
            array.push(value)
            if (value.categories && value.categories.length > 0) {
                formatCategory(value.categories);
            }
        })

        return array;
    }

    return {
        formatCategory: function(categories) {
            array = [];

            return formatCategory(categories);
        },
        serviceAdmin: function(name,id = null, data = null) {
            return {
                getList: function() {
                    return get(API_URL + 'admin/' + name);
                },
                getOne: function() {
                    return get(API_URL + 'admin/' + name + '/' + id);
                },
                post: function() {
                    return post(API_URL + 'admin/' + name, data);
                },
                postWithFile: function() {
                    if (id) {
                        return postWithFile(API_URL + 'admin/' + name + '/' + id, data);
                    }
                    return postWithFile(API_URL + 'admin/' + name, data);
                },
                put: function() {
                    return put(API_URL + 'admin/' + name + '/' + id, data);
                },
                remove: function() {
                    return remove(API_URL + 'admin/' + name + '/' + id);
                }
            }
        }, service: function(name = null, option = null, data = null) {
            return {
                getNewProducts: function() {
                    return get(API_URL + 'products-new');
                },
                getListCategory: function() {
                    return get(API_URL + 'category');
                },
                getListProduct: function() {
                    var url = API_URL + name;
                    if(option != null) {
                        url += "?";
                        angular.forEach(option, function(value,key) {
                            if (value != '') {
                                url += key + "=" + value + "&";
                            }
                        })
                    }
                    
                    return get(url);
                },
                getProductRecently: function() {
                    return get(API_URL + 'products-recently?id=' + JSON.parse($cookies.get('rid')));
                },
                getOne: function() {
                    return get(API_URL + 'product/' + name);
                },
                post: function() {
                    return post(API_URL + name, data);
                },
                postWithFile: function() {
                    return postWithFile(API_URL + name, data);
                }
            }
        }
    };
};

function shoppingCart() {
    this.items = [];
    this.loadItems();
}

shoppingCart.prototype.loadItems = function () {
    var items = sessionStorage != null ? sessionStorage['cart_items'] : null;
    if (items != null && JSON != null) {
        try {
            var items = JSON.parse(items);
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (item.id != null && item.name != null && item.image != null && item.price != null && item.quantity != null) {
                    item = new cartItem(item.id, item.name, item.image, item.price, item.quantity);
                    this.items.push(item);
                }
            }
        }
        catch (err) {
            // ignore errors while loading...
        }
    }
}

shoppingCart.prototype.saveItems = function () {
    if (sessionStorage != null && JSON != null) {
        sessionStorage['cart_items'] = JSON.stringify(this.items);
    }
}

shoppingCart.prototype.addItem = function (id, name, image, price, quantity) {
    quantity = this.toNumber(quantity);
    if (quantity != 0) {
        var found = false;
        for (var i = 0; i < this.items.length && !found; i++) {
            var item = this.items[i];
            if (item.id == id) {
                found = true;
                item.quantity = this.toNumber(item.quantity + quantity);
                if (item.quantity <= 0) {
                    this.items.splice(i, 1);
                }
            }
        }

        if (!found) {
            var item = new cartItem(id, name, image, price, quantity);
            this.items.push(item);
        }

        this.saveItems();
    }
}

shoppingCart.prototype.getTotalPrice = function (id) {
    var total = 0;
    for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];
        if (id == null || item.id == id) {
            total += this.toNumber(item.quantity * item.price);
        }
    }

    return total;
}

shoppingCart.prototype.getTotalCount = function (id) {
    var count = 0;
    for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];
        if (id == null || item.id == id) {
            count += this.toNumber(item.quantity);
        }
    }

    return count;
}

shoppingCart.prototype.clearItems = function () {
    this.items = [];
    this.saveItems();
}

shoppingCart.prototype.toNumber = function (value) {
    value = value * 1;
    
    return isNaN(value) ? 0 : value;
}

function cartItem(id, name, image, price, quantity) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.price = price * 1;
    this.quantity = quantity * 1;
}

function recently($cookies) {

    if (!$cookies.get('rid')) {
        $cookies.put('rid', JSON.stringify([]));
    }

    function add(id) {
        var rid = [];
        if ($cookies.get('rid')) {
            rid = JSON.parse($cookies.get('rid'));
        }
        rid.push(id);
        $cookies.put('rid', JSON.stringify(rid));
    }

    return {
        add: function(id) {
            return add(id);
        }
    }
}

function ngThumb($window) {
    var helper = {
        support: !!($window.FileReader && $window.CanvasRenderingContext2D),
        isFile: function(item) {
            return angular.isObject(item) && item instanceof $window.File;
        },
        isImage: function(file) {
            var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    };

    return {
        restrict: 'A',
        template: '<canvas/>',
        link: function(scope, element, attributes) {
            if (!helper.support) return;

            var params = scope.$eval(attributes.ngThumb);

            if (!helper.isFile(params.file)) return;
            if (!helper.isImage(params.file)) return;

            var canvas = element.find('canvas');
            var reader = new FileReader();

            reader.onload = onLoadFile;
            reader.readAsDataURL(params.file);

            function onLoadFile(event) {
                var img = new Image();
                img.onload = onLoadImage;
                img.src = event.target.result;
            }

            function onLoadImage() {
                var width = params.width || this.width / this.height * params.height;
                var height = params.height || this.height / this.width * params.width;
                canvas.attr({ width: width, height: height });
                canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
            }
        }
    };
};

function fbLike($window, $rootScope) {
    return {
        restrict: 'A',
        scope: {
            fbLike: '=?'
        },
        link: function (scope, element, attrs) {
            if (!$window.FB) {
                $.getScript('//connect.facebook.net/en_US/sdk.js', function () {
                    $window.FB.init({
                        appId: $rootScope.facebookAppId,
                        status: true, 
                        cookie: true, 
                        xfbml: true,
                        version: 'v2.4'
                    });
                    renderLikeButton();
                });
            } else {
                renderLikeButton();
            }

            var watchAdded = false;
            function renderLikeButton() {
                if (!!attrs.fbLike && !scope.fbLike && !watchAdded) {
                    watchAdded = true;
                    var unbindWatch = scope.$watch('fbLike', function (newValue, oldValue) {
                        if (newValue) {
                            renderLikeButton();
                            unbindWatch();
                        }
                    });

                    return;
                } else {
                    element.html(
                        '<div class="fb-like"' + 
                        (!!scope.fbLike ? ' data-href="' + scope.fbLike + '"' : '') + 
                        ' data-layout="button_count" data-action="like" data-show-faces="true" data-share="true"></div>'
                    );
                    $window.FB.XFBML.parse(element.parent()[0]);
                }
            }
        }
    };
}

function dynFbCommentBox($window, $rootScope) {
    function createHTML(href, numposts, colorscheme) {
        return '<div class="fb-comments" ' +
           'data-href="' + href + '" ' +
           'data-numposts="' + numposts + '" ' +
           'data-colorsheme="' + colorscheme + '">' +
       '</div>';
    }

    return {
        restrict: 'A',
        scope: {},
        link: function (scope, elem, attrs) {
            if (!$window.FB) {
                $.getScript('//connect.facebook.net/en_US/sdk.js', function () {
                    $window.FB.init({
                        appId: $rootScope.facebookAppId,
                        status: true, 
                        cookie: true, 
                        xfbml: true,
                        version: 'v2.4'
                    });
                    postLink(scope, elem, attrs);
                });
            } else {
                postLink(scope, elem, attrs);
            }

            function postLink(scope, elem, attrs) {
                attrs.$observe('pageHref', function (newValue) {
                    var href = newValue;
                    var numposts = attrs.numposts || 5;
                    var colorscheme = attrs.colorscheme || 'light';
                    elem.html(createHTML(href, numposts, colorscheme));
                    FB.XFBML.parse(elem[0]);
                });
            }
        }
    };
}

function starRating() {
    return {
        restrict: 'EA',
        template:
        '<ul class="star-rating" ng-class="{readonly: readonly}">' +
        '    <li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}" ng-click="toggle($index)">' +
        '        <i class="fa fa-star"></i>' +
        '    </li>' +
        '</ul>',
        scope: {
            ratingValue: '=ngModel',
            max: '=?',
            onRatingSelect: '&?',
            readonly: '=?'
        },
        link: function(scope, element, attributes) {
            if (scope.max == undefined) {
                scope.max = 5;
            }
            function updateStars() {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            };
            scope.toggle = function(index) {
                if (scope.readonly == undefined || scope.readonly === false){
                    scope.ratingValue = index + 1;
                    scope.onRatingSelect({
                        rating: index + 1
                    });
                }
            };
            scope.$watch('ratingValue', function(oldValue, newValue) {
                if (newValue || newValue === 0) {
                    updateStars();
                }
            });
        }
    };
}

var App = angular.module('App', [
    'ui.router',
    'satellizer',
    'angularCSS',
    'angularFileUpload',
    'pascalprecht.translate',
    'datatables',
    'datatables.bootstrap',
    'angular-loading-bar',
    'chart.js',
    'ngCookies',
    'angular-flexslider',
]);

App
.constant('API_URL', 'http://api.ecommerce.com/');

App
.run([ '$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.facebookAppId = '491224784419802';
}]);

App
.config(RoutesConfig)
.config(SatellizerConfig)
.config(TranslateConfig);

App
.factory('auth', Auth)
.factory('API', API)
.factory('recently', recently)
.factory('Cart', function() {
    return {
        cart: new shoppingCart(),
    }
});

App
.directive('ngThumb', ngThumb)
.directive('fbLike', fbLike)
.directive('dynFbCommentBox', dynFbCommentBox)
.directive('starRating', starRating);

App
.controller('HeaderCtrl', function($auth, auth, $scope, API, Cart, $state) {

    $scope.cart = Cart.cart;

    auth.isAuthenticated()
    .then(function() {
        $scope.isAuthenticated = true;
        var user = auth.getCurrentUser();
        $scope.username = user.name;
    });
    var categories = API.service('category');
    categories.getListCategory()
    .then(function(response) {
        $scope.categories = response.categories;
    })

    $scope.search = function() {
        $state.go('home.search', { search: $scope.search_text });
    }
});

App
.controller('HomePageCtrl', function ($scope, API, Cart, recently) {
    $scope.cart = Cart.cart;
    $scope.recently = recently;
    var product = API.service();
    product.getNewProducts()
    .then(function(response) {
        $scope.products = response.products;
    })
});

App
.controller('SearchCtrl', function ($scope, $location, API, Cart) {
    $scope.cart = Cart.cart;
    $scope.search = $location.search().search;
    var filter = {};
    filter.search = $location.search().search;
    var product = API.service('search', filter);
    product.getListProduct()
    .then(function(response) {
        $scope.products = response.products.data;
    })

    var lastPage = 1;
    $scope.showLoadMore = true;
    $scope.loadMore = function() {
        $scope.showLoadMore = false;
        lastPage += 1;
        filter.page = lastPage;
        var product = API.service('search', filter);
        product.getListProduct()
        .then(function(response) {
            $scope.products = $scope.products.concat(response.products.data);
        })
        .finally(function() {
            $scope.showLoadMore = true;
        })
    }
});

App
.controller('LoginCtrl', function($scope, $state, $auth, auth) {
    $scope.email = 'admin@gmail.com';
    $scope.password = '123456';
    $scope.login = function() {
        var credentials = {
            email: $scope.email,
            password: $scope.password
        }
        $auth.login(credentials)
        .then(function() {
            return auth.me();
        })
        .then(function(response) {
            localStorage.setItem("User", JSON.stringify(response.user));
            $state.go('home.page', {}, {reload: true});
        })
        .catch(function(response) {
            alert(response.data.error);
        })
    };

    $scope.authenticate = function(provider) {
        $auth.authenticate(provider)
        .then(function() {
            return auth.me();
        })
        .then(function(response) {
            localStorage.setItem("User", JSON.stringify(response.user));
            $state.go('home.page', {}, {reload: true});
        })
    };
});

App
.controller('LogoutCtrl', function($auth, $state) {

    if (!$auth.isAuthenticated()) {
        return;
    }
    
    $auth.logout()
    .then(function() {
        localStorage.removeItem("User");
        $state.go('home.page', {}, {reload: true});
    });
});

App
.controller('SignupCtrl', function($scope, $location, $auth) {
    $scope.signup = function() {
        $auth.signup($scope.user)
        .then(function(response) {
            $location.path('/');
        })
        .catch(function(er) {
            if ($scope.hasErrorName = !!er.data.error.name) {
                $scope.errorName = er.data.error.name[0];
            } else {
                $scope.errorName = null;
            }
            if ($scope.hasErrorEmail = !!er.data.error.email) {
                $scope.errorEmail = er.data.error.email[0];
            } else {
                $scope.errorEmail = null;
            }
            if ($scope.hasErrorPassword = !!er.data.error.password) {
                $scope.errorPassword = er.data.error.password[0];
            } else {
                $scope.errorPassword = null;
            }
            if ($scope.hasErrorRepassword = !!er.data.error.repassword) {
                $scope.errorRepassword = er.data.error.repassword[0];
            } else {
                $scope.errorRepassword = null;
            }
            if ($scope.hasErrorPhone = !!er.data.error.phone) {
                $scope.errorPhone = er.data.error.phone[0];
            } else {
                $scope.errorPhone = null;
            }
            if ($scope.hasErrorAddress = !!er.data.error.address) {
                $scope.errorAddress = er.data.error.address[0];
            } else {
                $scope.errorAddress = null;
            }
            if ($scope.hasErrorGender = !!er.data.error.gender) {
                $scope.errorGender = er.data.error.gender[0];
            } else {
                $scope.errorGender = null;
            }
        });
    };
});

App
.controller('ProfileCtrl', function($scope, $state, $auth, auth, $stateParams, FileUploader) {
    auth.profile()
    .then(function(response) {
        $scope.user = response.user;
    })

    var uploader = $scope.uploader = new FileUploader();

    uploader.onAfterAddingFile = function(fileItem) {
        uploader.queue = [fileItem];
    };

    $scope.tab = 1;
    $scope.setTab = function(newTab){
        $scope.tab = newTab;
    };
    $scope.isSet = function(tabNum){
        return $scope.tab === tabNum;
    };

    $scope.update = function($stateParams) {
        var formData = new FormData();
        angular.forEach($stateParams.user, function(value, key){
            formData.append(key, value);
        });

        formData.append('file', $scope.uploader.queue[0]._file);

        auth.updateProfile(formData)
        .then(function(response) {
            alert(response.message);
            $scope.user = response.user;
        })
    }
});

App
.controller('ProductsCtrl', function ($scope, $stateParams, API, Cart) {

    $scope.cart = Cart.cart;

    var category = $stateParams.name;
    var categories = API.service();
    var product = API.service(category);
    categories.getListCategory()
    .then(function(response) {
        $scope.categories = response.categories;
        return product.getListProduct();
    })
    .then(function(response) {
        $scope.products = response.products.data;
    })

    $scope.showList = true;

    var lastPage = 1;
    $scope.showLoadMore = true;

    var filter = {};
    $scope.softByName = '';
    $scope.softByPrice = '';
    $scope.softByRate = '';
    $scope.filter = function() {
        filter.name = $scope.softByName;
        filter.price = $scope.softByPrice;
        filter.rate = $scope.softByRate;
        lastPage = 1;
        filter.page = lastPage;
        var product = API.service(category, filter);
        product.getListProduct()
        .then(function(response) {
            $scope.products = response.products.data;
        })
    }

    $scope.loadMore = function() {
        $scope.showLoadMore = false;
        lastPage += 1;
        filter.page = lastPage;
        var product = API.service(category, filter);
        product.getListProduct()
        .then(function(response) {
            $scope.products = $scope.products.concat(response.products.data);
        })
        .finally(function() {
            $scope.showLoadMore = true;
        })
    }
})

App
.controller('ProductDetailCtrl', function ($scope, $stateParams, API, $location, Cart, recently, auth) {
    $scope.cart = Cart.cart;
    $scope.recently = recently;

    auth.isAuthenticated()
    .then(function() {
        $scope.isAuthenticated = true;
    })
    .catch(function() {
        $scope.isAuthenticated = false;
    })

    $scope.rating = 0;
    $scope.isReadonly = true;
    var name = $stateParams.name;
    var product = API.service(name);
    product.getOne()
    .then(function(response) {
        $scope.product = response.product;
        recently.add(response.product.id);
        $scope.like = {
            Url: $location.$$absUrl,
        };

        $scope.images = [];
        angular.forEach($scope.product.images, function(value, key) {
            $scope.images.push(value.image);
        })

        $scope.tab = 1;
        $scope.setTab = function(newTab){
            $scope.tab = newTab;
        };
        $scope.isSet = function(tabNum){
            return $scope.tab === tabNum;
        };
    })
    
    $scope.rate = function(rate) {
        var data = {
            rate: rate,
            name: $stateParams.name
        };
        var rate = API.service('rate', null, data)
        rate.post()
        .then(function(response) {
            $scope.product.rate = response.rate;
        })
    };
});

App
.controller('RecentlyCtrl', function ($scope, API, Cart) {
    $scope.cart = Cart.cart;
    var product = API.service();
    product.getProductRecently()
    .then(function(response) {
        $scope.products = response.products;
    })
})

App
.controller('SuggestCtrl', function ($scope, API, $stateParams, FileUploader) {
    var uploader = $scope.uploader = new FileUploader();
    var categories = API.service('category');
    categories.getListCategory()
    .then(function(response) {
        $scope.categories = API.formatCategory(response.categories);
    })

    $scope.send = function($stateParams) {
        var formData = new FormData();
        angular.forEach($stateParams.info, function(value, key){
            formData.append(key, value);
        });

        angular.forEach($scope.uploader.queue, function(value, key) {
            formData.append('file[]', value._file)
        });

        var suggest = API.service('suggest', null, formData);
        suggest.postWithFile()
        .then(function(response) {
            alert(response.message);
        })
        .catch(function(response) {
            if ($scope.hasErrorEmail = !!response.error.email) {
                $scope.errorEmail = response.error.email[0];
            } else {
                $scope.errorEmail = null;
            }
            if ($scope.hasErrorName = !!response.error.name) {
                $scope.errorName = response.error.name[0];
            } else {
                $scope.errorName = null;
            }
            if ($scope.hasErrorPrice = !!response.error.price) {
                $scope.errorPrice = response.error.price[0];
            } else {
                $scope.errorPrice = null;
            }
            if ($scope.hasErrorCategory = !!response.error.category_id) {
                $scope.errorCategory = response.error.category_id[0];
            } else {
                $scope.errorCategory = null;
            }
        })
    }
})

App
.controller('CartCtrl', function ($scope, $stateParams, API, $location, Cart) {
    $scope.cart = Cart.cart;
});

App
.controller('AdminHeaderCtrl', function($scope, $state, $auth, auth) {
    auth.isAuthenticated()
    .then(function() {
        $scope.isAuthenticated = true;
        $scope.user = auth.getCurrentUser();
    });
})

App
.controller('DashboardCtrl', function($scope, API, $stateParams, $state, cfpLoadingBar) {
    var dashboard = API.serviceAdmin('dashboard');
    dashboard.getList()
    .then(function(response) {
        $scope.new_suggest = response.new_suggest;
        $scope.user = response.user;
        $scope.product = response.product;
    })

    $scope.options = { legend: { display: true } };
    $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90],
    ];
});

App
.controller('UserListCtrl', function($scope, DTOptionsBuilder, DTColumnBuilder, 
        $compile, API, $state, cfpLoadingBar) {

    cfpLoadingBar.start();

    var fnRowCallback = (nRow, aData, iDisplayIndex, iDisplayIndexFull) => {
        $compile(nRow)($scope);
    }

    var actionsHtml = (data) => {
        return `
        <div class="btn-group">
            <a class="btn btn-info" ui-sref="admin.user-edit({id: ` + data.id + `})">
                <i class="fa fa-lg fa-edit"></i>
            </a>
            <button class="btn btn-warning" ng-click="delete(${data.id})">
                <i class="fa fa-lg fa-trash"></i>
            </button>
        </div>`
    }

    var user = API.serviceAdmin('user');

    $scope.dtOptions = DTOptionsBuilder
    .fromFnPromise(function() {
        return user.getList()
        .then(function(response){
            return response.users;
        })
        .finally(function() {
            cfpLoadingBar.complete();
        });
    })
    .withDataProp('data')
    .withOption('fnRowCallback', fnRowCallback)
    .withBootstrap();

    $scope.dtColumns = [
        DTColumnBuilder.newColumn('name').withTitle('Name'),
        DTColumnBuilder.newColumn('email').withTitle('Email'),
        DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().renderWith(actionsHtml)
    ];

    $scope.delete = function(id){
        var user = apiService.serviceAdmin('user',id);
        user.remove()
        .then(function(response){
            $state.reload();
        })
    }
});

App
.controller('UserEditCtrl', function($scope, $stateParams, API, cfpLoadingBar) {

    cfpLoadingBar.start();

    var id = $stateParams.id;
    var user = API.serviceAdmin('user', id);
    user.getOne()
    .then(function(response) {
        $scope.user = response.user;
    })
    .finally(function() {
        cfpLoadingBar.complete();
    });
});

App
.controller('CategoryListCtrl', function($scope, API, $stateParams, $state, cfpLoadingBar) {

    cfpLoadingBar.start();

    var categories = API.serviceAdmin('category');
    categories.getList()
    .then(function(response) {
        $scope.categories = response.categories;
    })
    .finally(function() {
        cfpLoadingBar.complete();
    });

    $scope.remove = function($stateParams) {
        var category = API.serviceAdmin('category', $stateParams.id);
        category.remove()
        .then(function(response) {
            alert(response.message);
            $state.reload();
        })
        .catch(function(response) {
            alert(response.message);
        })
    }
});

App
.controller('CategoryCreateCtrl', function($scope, $state, $stateParams, API, cfpLoadingBar) {

    cfpLoadingBar.start();

    var categories = API.serviceAdmin('category').getList();
    categories.then(function(response) {
        $scope.categories = API.formatCategory(response.categories);
    })
    .finally(function() {
        cfpLoadingBar.complete();
    });

    $scope.save = function($stateParams) {
        cfpLoadingBar.start();
        var category = API.serviceAdmin('category', null, $stateParams.data);
        category.post()
        .then(function(response) {
            alert(response.message);
            $state.reload();
        })
        .catch(function(response) {
            if ($scope.hasErrorName = !!response.error.name) {
                $scope.errorName = response.error.name[0];
            } else {
                $scope.errorName = null;
            }
            if ($scope.hasErrorParent = !!response.error.parent) {
                $scope.errorParent = response.error.parent[0];
            } else {
                $scope.errorParent = null;
            }
        })
        .finally(function() {
            cfpLoadingBar.complete();
        });
    }
});

App
.controller('CategoryEditCtrl', function($scope, $stateParams, API, cfpLoadingBar) {

    cfpLoadingBar.start();

    var name = $stateParams.name;
    var categories = API.serviceAdmin('category');
    var category = API.serviceAdmin('category', name);

    categories.getList()
    .then(function(response) {
        $scope.categories = API.formatCategory(response.categories);
        return category.getOne();
    })
    .then(function(response) {
        $scope.category = response.category;
    })
    .finally(function() {
        cfpLoadingBar.complete();
    });

    $scope.save = function($stateParams) {
        cfpLoadingBar.start();
        var category = API.serviceAdmin('category',name,$stateParams.data);
        category.put()
        .then(function(response) {
            alert(response.message);
        })
        .catch(function(response) {
            if ($scope.hasErrorName = !!response.error.name) {
                $scope.errorName = response.error.name[0];
            } else {
                $scope.errorName = null;
            }
            if ($scope.hasErrorParent = !!response.error.parent) {
                $scope.errorParent = response.error.parent[0];
            } else {
                $scope.errorParent = null;
            }
        })
        .finally(function() {
            cfpLoadingBar.complete();
        });
    }
});

App
.controller('ProductListCtrl', 
function($scope, DTOptionsBuilder, DTColumnBuilder, $compile, API, $state, cfpLoadingBar) {

    cfpLoadingBar.start();

    var fnRowCallback = (nRow, aData, iDisplayIndex, iDisplayIndexFull) => {
        $compile(nRow)($scope);
    }

    var actionsHtml = (data) => {
        return `
        <div class="btn-group">
            <a class="btn btn-info" ui-sref="admin.product-edit({id: ` + data.id + `})">
                <i class="fa fa-lg fa-edit"></i>
            </a>
            <button class="btn btn-warning" ng-click="delete(${data.id})">
                <i class="fa fa-lg fa-trash"></i>
            </button>
        </div>`
    }

    var product = API.serviceAdmin('product');

    $scope.dtOptions = DTOptionsBuilder
    .fromFnPromise(function() {
        return product.getList()
        .then(function(response){
            return response.products;
        })
        .finally(function() {
            cfpLoadingBar.complete();
        });
    })
    .withDataProp('data')
    .withOption('fnRowCallback', fnRowCallback)
    .withBootstrap();

    $scope.dtColumns = [
        DTColumnBuilder.newColumn('name').withTitle('Name'),
        DTColumnBuilder.newColumn('price').withTitle('Price'),
        DTColumnBuilder.newColumn('rate').withTitle('Rate'),
        DTColumnBuilder.newColumn('stock').withTitle('Stock'),
        DTColumnBuilder.newColumn('category.name').withTitle('Category'),
        DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().renderWith(actionsHtml)
    ];

    $scope.delete = function(id){
        var product = API.serviceAdmin('product',id);
        product.remove()
        .then(function(response){
            alert(response.message);
            $state.reload();
        })
    }

});

App
.controller('ProductEditCtrl', function($scope, $stateParams, API, cfpLoadingBar, FileUploader) {

    cfpLoadingBar.start();

    var uploader = $scope.uploader = new FileUploader();
    var id = $stateParams.id;
    var product = API.serviceAdmin('product', id);
    var category = API.serviceAdmin('category');
    category.getList()
    .then(function(response) {
        $scope.categories = API.formatCategory(response.categories);
        return product.getOne();
    })
    .then(function(response) {
        $scope.product = response.product;
    })
    .finally(function() {
        cfpLoadingBar.complete();
    });

    $scope.removeImage = function(index) {
        $scope.product.images.splice(index, 1);
    }

    $scope.save = function($stateParams) {
        cfpLoadingBar.start();
        var formData = new FormData();

        angular.forEach($stateParams.product, function(value, key){
            formData.append(key, value);
        });

        angular.forEach($scope.product.images, function(value, key){
            formData.append('images[]', value.id);
        });

        angular.forEach($scope.uploader.queue, function(value, key) {
            formData.append('file[]', value._file)
        });

        var product = API.serviceAdmin('product', id, formData);
        product.postWithFile()
        .then(function(response){
            alert(response.message);
        })
        .catch(function(response) {
            if ($scope.hasErrorName = !!response.error.name) {
                $scope.errorName = response.error.name[0];
            } else {
                $scope.errorName = null;
            }
            if ($scope.hasErrorPrice = !!response.error.price) {
                $scope.errorPrice = response.error.price[0];
            } else {
                $scope.errorPrice = null;
            }
            if ($scope.hasErrorStock = !!response.error.stock) {
                $scope.errorStock = response.error.stock[0];
            } else {
                $scope.errorStock = null;
            }
            if ($scope.hasErrorCategory = !!response.error.category_id) {
                $scope.errorCategory = response.error.category_id[0];
            } else {
                $scope.errorCategory = null;
            }
        })
        .finally(function() {
            cfpLoadingBar.complete();
        });
    }
});

App
.controller('ProductCreateCtrl', 
function($scope, $stateParams, API, cfpLoadingBar, FileUploader, $state) {

    cfpLoadingBar.start();

    var uploader = $scope.uploader = new FileUploader();
    var uploader1 = $scope.uploader1 = new FileUploader();
    var category = API.serviceAdmin('category');
    category.getList()
    .then(function(response) {
        $scope.categories = API.formatCategory(response.categories);
    })
    .finally(function() {
        cfpLoadingBar.complete();
    });

    $scope.save = function($stateParams) {
        cfpLoadingBar.start();
        var formData = new FormData();

        angular.forEach($stateParams.product, function(value, key){
            formData.append(key, value);
        });

        angular.forEach($scope.uploader.queue, function(value, key) {
            formData.append('file[]', value._file)
        });

        var product = API.serviceAdmin('product', null, formData);
        product.postWithFile()
        .then(function(response){
            alert(response.message);
        })
        .catch(function(response) {
            if ($scope.hasErrorName = !!response.error.name) {
                $scope.errorName = response.error.name[0];
            } else {
                $scope.errorName = null;
            }
            if ($scope.hasErrorPrice = !!response.error.price) {
                $scope.errorPrice = response.error.price[0];
            } else {
                $scope.errorPrice = null;
            }
            if ($scope.hasErrorStock = !!response.error.stock) {
                $scope.errorStock = response.error.stock[0];
            } else {
                $scope.errorStock = null;
            }
            if ($scope.hasErrorCategory = !!response.error.category_id) {
                $scope.errorCategory = response.error.category_id[0];
            } else {
                $scope.errorCategory = null;
            }
        })
        .finally(function() {
            cfpLoadingBar.complete();
        });
    }

    $scope.import = function() {
        cfpLoadingBar.start();
        var formData = new FormData();
        formData.append('file', $scope.uploader1.queue[0]._file)

        var product = API.serviceAdmin('import-products', null, formData);
        product.postWithFile()
        .then(function(response){
            alert(response.message);
        })
        .catch(function(response) {
            alert(response.error);
        })
        .finally(function() {
            cfpLoadingBar.complete();
        });
    }
});

App
.controller('SuggestListCtrl', 
function($scope, DTOptionsBuilder, DTColumnBuilder, $compile, API, $state, cfpLoadingBar) {

    cfpLoadingBar.start();

    var fnRowCallback = (nRow, aData, iDisplayIndex, iDisplayIndexFull) => {
        $compile(nRow)($scope);
    }

    var actionsHtml = (data) => {
        return `
        <div class="btn-group">
            <a class="btn btn-info" ui-sref="admin.suggest-edit({id: ` + data.id + `})">
                <i class="fa fa-lg fa-edit"></i>
            </a>
            <button class="btn btn-warning" ng-click="delete(${data.id})">
                <i class="fa fa-lg fa-trash"></i>
            </button>
        </div>`
    }

    var statusHtml = (data) => {
        if (data.status) {
            return `<span class="label label-info">accepted</span>`;
        } else {
            return `<span class="label label-warning">Not accepted yet</span>`;
        }
    }

    var suggest = API.serviceAdmin('suggest');

    $scope.dtOptions = DTOptionsBuilder
    .fromFnPromise(function() {
        return suggest.getList()
        .then(function(response){
            return response.suggests;
        })
        .finally(function() {
            cfpLoadingBar.complete();
        });
    })
    .withDataProp('data')
    .withOption('fnRowCallback', fnRowCallback)
    .withBootstrap();

    $scope.dtColumns = [
        DTColumnBuilder.newColumn('email').withTitle('Email'),
        DTColumnBuilder.newColumn('name').withTitle('Name'),
        DTColumnBuilder.newColumn('price').withTitle('Price'),
        DTColumnBuilder.newColumn('category.name').withTitle('Category'),
        DTColumnBuilder.newColumn(null).withTitle('Status').renderWith(statusHtml),
        DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().renderWith(actionsHtml)
    ];

    $scope.delete = function(id){
        var suggest = API.serviceAdmin('suggest',id);
        suggest.remove()
        .then(function(response){
            alert(response.message);
            $state.reload();
        })
    }

});

App
.controller('SuggestEditCtrl', function ($scope, $stateParams, API) {
    var id = $stateParams.id;
    var suggest = API.serviceAdmin('suggest', id);
    suggest.getOne()
    .then(function(response) {
        $scope.suggest = response.suggest;
    })

    $scope.accept = function() {
        var data = {
            message: $scope.message,
            subject: $scope.subject
        }
        var suggest = API.serviceAdmin('suggest', id, data);
        suggest.put()
        .then(function(response) {
            alert(response.message);
        })
        .catch(function(response) {
            alert(response.error);
        })
    }
});
