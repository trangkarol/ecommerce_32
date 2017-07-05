App
.controller('CartCtrl', function ($scope, $stateParams, API, $location, Cart, auth) {
    $scope.cart = Cart.cart;
    $scope.isAuthenticated = false;
    auth.isAuthenticated()
    .then(function() {
        $scope.isAuthenticated = true;
        $scope.user = auth.getCurrentUser();
    });

    $scope.order = function() {
        if (!$scope.isAuthenticated) {
            return;
        }
        var data = {
            address: $scope.user.address,
            phone: $scope.user.phone,
            user_id: $scope.user.id,
            price: $scope.cart.getTotalPrice(),
            order_items: $scope.cart.items
        };

        var order = API.service('order', null, data);
        order.post()
        .then(function(response) {
            $scope.cart.clearItems();
            alert(response.message);
        })

    }
});
