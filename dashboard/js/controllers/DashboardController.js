angular.module('MetronicApp')
.controller('DashboardController', function($rootScope, $scope, $http, $timeout) {
    $scope.$on('$viewContentLoaded', function() {   
        var position = {
            w:1000,
            h:1000,
            d:2000
        };
        var tooltip = new Tooltip(['试验室名：'],['000000']);
        demo.init('3d_view',lab0,0,0,position,tooltip);
        
    });

    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
    $rootScope.settings.layout.setSidebar = true;
    $rootScope.settings.layout.setFullscreen = true;
    $rootScope.settings.layout.setLabButton = false;
    $rootScope.settings.layout.setDeviceButton = false;

    

    

    
    // SUCCESS
    // $http.post($rootScope.settings.apiPath+"/experipage/getHoverContent",{equipNo:'MTS01'})
    // .success(function(json){
    //     console.log(json);
    // });

    //indexName: startRate/intactRate/utilizRate/durautilizRate/efficiencyCoeff
    // $http.post($rootScope.settings.apiPath+"/experipage/getExperiIndex",{equipNo:'MTS01',indexName:'startRate'})
    // .success(function(json){
    //     console.log(json);
    // });


})

.controller('LoginController', function($rootScope, $scope, $http, $timeout,$state) {
    
    $http.post($rootScope.settings.apiPath+"/user/login",{userName:$state.params.username})
        .success(function(json){
            console.log(json);
    });
});