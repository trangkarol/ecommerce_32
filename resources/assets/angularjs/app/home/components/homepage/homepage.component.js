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
