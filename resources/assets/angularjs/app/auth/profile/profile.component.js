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
