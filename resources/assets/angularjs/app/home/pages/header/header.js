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
