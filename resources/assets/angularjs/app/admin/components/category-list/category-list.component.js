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
