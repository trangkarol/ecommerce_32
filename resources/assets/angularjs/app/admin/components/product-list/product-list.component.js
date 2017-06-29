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
