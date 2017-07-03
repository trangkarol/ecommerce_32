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
