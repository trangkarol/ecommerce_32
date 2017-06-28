<!DOCTYPE html>
<html lang="en" ng-app="App">
<head>
    <meta charset="UTF-8">
    <title ng-bind="$state.current.data.pageTitle"></title>
    <!-- Bootstrap v3.3.7 -->
    {{ Html::style('node_modules/bootstrap/dist/css/bootstrap.min.css') }}
    <!-- Font Awesome -->
    {{ Html::style('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css') }}
    <!-- Ionicons -->
    {{ Html::style('https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css') }}
    <!-- bootstrap-social -->
    {{ Html::style('node_modules/bootstrap-social/bootstrap-social.css') }}
</head>
<body ng-class="$state.current.data.bodyClass">

    <div ui-view="layout"></div>

    <!-- jquery v3.2.1 -->
    {{ Html::script('node_modules/jquery/dist/jquery.min.js') }}
    <!-- Bootstrap v3.3.7 -->
    {{ Html::script('node_modules/bootstrap/dist/js/bootstrap.min.js') }}
    <!-- jquery-easing v1.4.1 -->
    {{ Html::script('node_modules/jquery.easing/jquery.easing.min.js') }}
    <!-- jquery.dataTables -->
    {{ Html::script('node_modules/datatables/media/js/jquery.dataTables.min.js') }}
    <!-- angular -->
    {{ Html::script('node_modules/angular/angular.js') }}
    <!-- angular ui-router -->
    {{ Html::script('node_modules/angular-ui-router/release/angular-ui-router.min.js') }}
    <!-- satellizer -->
    {{ Html::script('node_modules/satellizer/dist/satellizer.js') }}
    <!-- angular css -->
    {{ Html::script('node_modules/angular-css/angular-css.min.js') }}
    <!-- angular file upload -->
    {{ Html::script('node_modules/angular-file-upload/dist/angular-file-upload.min.js') }}
    <!-- angular translate -->
    {{ Html::script('node_modules/angular-translate/dist/angular-translate.min.js') }}
    <!-- dataTables.bootstrap -->
    {{ Html::script('node_modules/angular-datatables/dist/plugins/bootstrap/angular-datatables.bootstrap.min.js') }}
    <!-- angular-datatables -->
    {{ Html::script('node_modules/angular-datatables/dist/angular-datatables.min.js') }}
    <!-- angular-loading-bar -->
    {{ Html::script('node_modules/angular-loading-bar/build/loading-bar.min.js') }}
    <!-- chart -->
    {{ Html::script('node_modules/chart.js/dist/Chart.min.js') }}
    <!-- angular-chart -->
    {{ Html::script('node_modules/angular-chart.js/dist/angular-chart.min.js') }}
    <!-- angular-cookies -->
    {{ Html::script('node_modules/angular-cookies/angular-cookies.min.js') }}
    <!-- jquery flexslider -->
    {{ Html::script('node_modules/flexslider/jquery.flexslider-min.js') }}
    <!-- angular-flexslider -->
    {{ Html::script('node_modules/angular-flexslider/angular-flexslider.js') }}
    <!-- admin script -->
    {{ Html::script('resources/assets/angularjs/app/admin/js/app.min.js') }}
    <!-- app script -->
    {{ Html::script('public/js/app.js') }}
    
</body>
</html>
