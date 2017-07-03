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
});
