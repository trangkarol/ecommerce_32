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
