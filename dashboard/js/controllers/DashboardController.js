angular.module('MetronicApp')
.controller('DashboardController', function($rootScope, $scope, $http, $timeout,$interval) {
    $scope.$on('$viewContentLoaded', function() {   

        var timer = $interval(function(){
            console.log($rootScope.threeReady);
            if($rootScope.threeReady){

                console.log(lab0);
                var position = {
                    w:1000,
                    h:1000,
                    d:2000
                };
                var tooltip = new Tooltip(['试验室名：'],['000000']);
                demo.init('3d_view',lab0,0,0,position,tooltip);

                $interval.cancel(timer);
            }

        },1000);
        
        
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


});