/***
Metronic AngularJS App Main Script
***/

/* Metronic App */
var MetronicApp = angular.module("MetronicApp", [
    "ui.router", 
    "ui.bootstrap", 
    "oc.lazyLoad",  
    "ngSanitize",
]); 

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
MetronicApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global mconfigs go here
    });
}]);

/*Content-Type application/json*/
MetronicApp.config(['$httpProvider', function($httpProvider){
    $httpProvider.interceptors.push("$httpInterceptor");
}]);

/********************************************
 BEGIN: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/
/**
`$controller` will no longer look for controllers on `window`.
The old behavior of looking on `window` for controllers was originally intended
for use in examples, demos, and toy apps. We found that allowing global controller
functions encouraged poor practices, so we resolved to disable this behavior by
default.

To migrate, register your controllers with modules rather than exposing them
as globals:

Before:

```javascript
function MyController() {
  // ...
}
```

After:

```javascript
angular.module('myApp', []).controller('MyController', [function() {
  // ...
}]);

Although it's not recommended, you can re-enable the old behavior like this:

```javascript
angular.module('myModule').config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);
**/

//AngularJS v1.3.x workaround for old style controller declarition in HTML
MetronicApp.config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/

/* Setup global settings */
MetronicApp.factory('settings', ['$rootScope', function($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000, // auto scroll to top on page load
            hideSidebar: true,
            setFullscreen: false,
            setDeviceButton:false,
            setLabButton:false,
        },
        assetsPath: '../assets',
        globalPath: '../assets/global',
        layoutPath: '../assets/layouts/layout',
        apiPath:'',
        jsPath:'',
        mode:'local',
        version:'2.1.3',
        api:{
            dashboard:"http://10.203.97.123:7003/pataceim-rest",
            local:"http://10.6.96.47:8080/pataceim-rest",
            //local:"http://10.203.97.123:7003/pataceim-rest",
        },
        debug: {
        	request:false,
        	requestError:false,
        	response:false,
        	responseError:false
        }
    };

    settings.apiPath = settings.mode==="local"?settings.api.local:settings.api.dashboard;

    $rootScope.settings = settings;
    $rootScope.isLogin = true;
    return settings;
}]);


/*HttpInterceptor Factory*/
MetronicApp.factory("$httpInterceptor",["$q", "$rootScope", function($q, $rootScope) {
	return {
		request: function(json) {
			if($rootScope.settings.debug.request){
				console.log("[request]:"+json.url);
			}

            json.headers['Content-Type'] = 'application/json;charset=utf-8';
            json.headers['Cache-Control'] = 'no-cache';
            json.headers['Pragma'] = 'no-cache';

			return json || $q.when(json);
		},
	　　 requestError: function(json) {
			if($rootScope.settings.debug.requestError){
				console.log("[requestError]:" + json.status);
			}
			
	　　　　 return $q.reject(json)
	　　 },
		response: function(json) {
			// console.log(json);
			if($rootScope.settings.debug.response){
				console.log("[response]:"+json.status+","+json.config.url);
			}
            
			return json || $q.when(json);
		},
		responseError : function(json) {
			if($rootScope.settings.debug.responseError){
				console.log("[responseError]:"+JSON.stringify(json));
			}

			return $q.reject(json);
		}
	};
}]);

MetronicApp.directive('onRepeatFinished', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    };
})

MetronicApp.directive('onRepeatFinished2', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinished2');
                });
            }
        }
    };
});
MetronicApp.directive('onRepeatFinished3', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinished3');
                });
            }
        }
    };
});
MetronicApp.directive('onRepeatFinished4', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinished4');
                });
            }
        }
    };
});
/* Setup App Main Controller */
MetronicApp.controller('AppController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function() {
        App.initComponents(); // init core components
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 
    });
}]);

/***
Layout Partials.
By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial 
initialization can be disabled and Layout.init() should be called on page load complete as explained above.
***/

/* Setup Layout Part - Header */
MetronicApp.controller('HeaderController', ['$rootScope','$scope','$http','$state', function($rootScope,$scope,$http,$state) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initHeader(); // init header
    });
    
    $scope.setDevice = function(type,id,name){
        $rootScope.deviceName = name;
        $state.go(type,{id:id});
    }

    $scope.setLab = function(id){
        $state.go("lab",{id:id});
    }

    $scope.logInOut = function(isLogin){
        $rootScope.isLogin = isLogin;
        if(isLogin){
           
        }else{
            window.location.href = "/pkmslogout.html?filename=eimlogout.html";
        }
    }

}]);

/* Setup Layout Part - Sidebar */
MetronicApp.controller('SidebarController', ['$scope', function($scope,$state) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initSidebar(); // init sidebar
    });

    $scope.open = function(router,$event){
        window.open(router);
        $event.stopPropagation();
    }
}]);

/* Setup Layout Part - Quick Sidebar */
MetronicApp.controller('QuickSidebarController', ['$scope', function($scope) {    
    $scope.$on('$includeContentLoaded', function() {
       setTimeout(function(){
            QuickSidebar.init(); // init quick sidebar        
        }, 2000)
    });
}]);

/* Setup Layout Part - Theme Panel */
MetronicApp.controller('ThemePanelController', ['$scope', function($scope) {    
    $scope.$on('$includeContentLoaded', function() {
        Demo.init(); // init theme panel
    });
}]);

/* Setup Layout Part - Footer */
MetronicApp.controller('FooterController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initFooter(); // init footer
    });
}]);

/* Setup Rounting For All Pages */
MetronicApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    var jsPath = '../dashboard/js/3d';
    // var jsPath = '../plugins';

    $urlRouterProvider.otherwise("/dashboard");  
    
    $stateProvider
        // Dashboard
        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "views/dashboard.html",            
            data: {pageTitle: 'Admin Dashboard Template'},
            controller: "DashboardController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                           jsPath + '/eim/libs/t.min.js',
                           jsPath + '/eim/libs/twaver.min.js',
                           jsPath + '/eim/room/core.min.js'
                        ] 
                    })
                    .then(function(){
                        return $ocLazyLoad.load({
                            name: 'MetronicApp',
                            insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                            files: [

                                jsPath + '/eim/room/inbuilts.min.js',
                                jsPath + '/eim/room/register.min.js',
                                jsPath + '/eim/building.min.js',
                                jsPath + '/eim/index.min.js',
                                './js/controllers/DashboardController.js',
                            ] 
                        })
                    });
                }]
            }
        })

        .state('login',{
            url:"/login/:username",
            templateUrl: "views/dashboard.html", 
            controller: "LoginController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            './js/controllers/DashboardController.js',
                        ] 
                    })
                }]
            }
        })

        // Lab
        .state('lab', {
            url: "/lab/:id",
            templateUrl: "views/lab.html",            
            data: {pageTitle: 'Lab Template'},
            controller: "LabController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [

                            './js/scripts/macarons.js',
                            '../assets/global/plugins/echarts/echarts.js',
                            jsPath + '/3d/libs/t.min.js',
                            jsPath + '/3d/init.min.js',
                        ] 
                    })
                    .then(function(){
                        return $ocLazyLoad.load({
                            name: 'MetronicApp',
                            insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                            files: [

                                './js/controllers/LabController.js',
                                jsPath + '/3d/data.min.js',
                                jsPath + '/3d/tooltip.min.js',
                            ] 
                        })
                    })
                    ;
                }]
            }
        })

        // Dashboard
        .state('MTS', {
            url: "/MTS/:id",
            templateUrl: "views/mts.html",            
            data: {pageTitle: 'Device Template'},
            controller: "MTSController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [

                            '../assets/global/plugins/datatables/datatables.min.css',
                            '../assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
                            '../assets/global/plugins/datatables/datatables.all.min.js',

                            '../assets/global/plugins/moment.min.js',
                            "../assets/global/plugins/echarts/echarts.js",

                            './js/scripts/macarons.js',
                            './js/controllers/DeviceController.js',
                        ] 
                    });
                }]
            }
        })

        // Dashboard
        .state('HPU', {
            url: "/HPU/:id",
            templateUrl: "views/hpu.html",            
            data: {pageTitle: 'Device1 Template'},
            controller: "HPUController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            './js/scripts/macarons.js',
                            "../assets/global/plugins/echarts/echarts.js",
                            './js/controllers/DeviceController.js',
                        ] 
                    });
                }]
            }
        })

        // Dashboard
        .state('BEP', {
            url: "/BEP/:id",
            templateUrl: "views/bep.html",            
            data: {pageTitle: 'Device Template'},
            controller: "BEPController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [

                            '../assets/global/plugins/datatables/datatables.min.css',
                            '../assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
                            '../assets/global/plugins/datatables/datatables.all.min.js',

                            './js/scripts/macarons.js',
                            "../assets/global/plugins/echarts/echarts.js",
                            './js/controllers/DeviceController.js',
                        ] 
                    });
                }]
            }
        })

        // Dashboard
        .state('admin', {
            url: "/admin",
            templateUrl: "views/admin.html",            
            data: {pageTitle: 'Lab Template'},
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/global/plugins/jstree/dist/themes/default/style.min.css',

                            '../assets/global/plugins/jquery-validation/js/jquery.validate.min.js',
                            '../assets/global/plugins/jquery-validation/js/additional-methods.min.js',
                            '../assets/global/plugins/jpkleemans-angular-validate/dist/angular-validate.min.js',

                            '../assets/global/plugins/datatables/datatables.min.css',
                            '../assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
                            '../assets/global/plugins/datatables/datatables.all.min.js',
                            '../assets/global/plugins/jstree/dist/jstree.min.js',
                            '../assets/global/plugins/jquery-ui/jquery-ui.min.js',
                            './js/controllers/AdminController.js',
                        ] 
                    });
                }]
            }
        })

        // Dashboard
        .state('admin.user', {
            url: "/user",
            templateUrl: "views/admin-user.html",  
            controller: "UserController",          
            data: {pageTitle: 'Lab Template'},
        })

        // Dashboard
        .state('admin.user.edit', {
            url: "/edit",
            templateUrl: "views/admin-user-edit.html",  
            
        })

        // Dashboard
        .state('admin.role', {
            url: "/role",
            templateUrl: "views/admin-role.html",  
            controller: "RoleController",          
            data: {pageTitle: 'Lab Template'},
        })

        // Dashboard
        .state('admin.resource', {
            url: "/resource",
            templateUrl: "views/admin-resource.html", 
            controller: "ResourceController",           
            data: {pageTitle: 'Lab Template'},
        })

        // Dashboard
        .state('admin.alarm', {
            url: "/alarm",
            templateUrl: "views/admin-warning.html", 
            controller: "WarningController",           
            data: {pageTitle: 'Alarm Template'},
        })

        // Dashboard
        .state('admin.log', {
            url: "/log",
            templateUrl: "views/admin-log.html", 
            controller: "LogController",           
            data: {pageTitle: 'Log Template'},
        });;
        

}]);

/* Init global settings and run the app */
MetronicApp.run(["$rootScope", "settings", "$state", "$http", "$interval", function($rootScope, settings, $state,$http,$interval) {
    var timer = $interval(function(){
        $rootScope.time = moment().format('YYYY年 MM月D日 HH:mm:ss');
    },1000);
    

    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view

    toastr.options = {
      "closeButton": true,
      "debug": false,
      "positionClass": "toast-top-center",
      "onclick": null,
      "showDuration": "1000",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    };

    $rootScope.tableConfig = {
            //"ordering": false,
            "searching":false,
            "bLengthChange":false,
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "空表",
                "info": " _START_ - _END_ /共 _TOTAL_ 条",
                "infoEmpty": "没有数据",
                "infoFiltered": "(从 _MAX_ 条数据中检索)",
                "lengthMenu": "每页显示 _MENU_ 条记录",
                "search": "查询:",
                "zeroRecords": "无查询结果",
                "sProcessing": "正在加载中...", 
                "paginate": {
                    "previous":"上一页",
                    "next": "下一页",
                    "last": "尾页",
                    "first": "首页",
                    "page": "第",
                    "pageOf": "页"
                }
            },
            "bStateSave": true,
            "lengthMenu": [
                [5, 10, 20, -1],
                [5, 10, 20, "All"] // change per page values here
            ],
            "columnDefs": [{  // set default column settings
                'orderable': false,
                "targets": [0]
            }, {
                "searchable": false,
                "targets": [0]
            }]
        };

        if($rootScope.settings.mode==="") $rootScope.threeReady = true;

        //server apis
        $http.get($rootScope.settings.apiPath+"/user/getLoginUser")
            .success(function(json){

                $rootScope.realName = '测试用户01';
                $rootScope.userName = 'apptest01';
                //TODO: userstatus 01 没有权限  02 session过期  00 正常登陆

                if(settings.mode==="server"){
                    $rootScope.userName = json.userName;
                    $rootScope.realName = json.realName;
                    switch(json.userstatus){
                        case "01":
                            toastr.clear();
                            toastr["warning"]("没有权限","");
                            setTimeout(function(){window.location.href = "/pkmslogout.html?filename=eimlogout.html";},3000);
                            break;

                        case "02":
                            toastr.clear();
                            toastr["warning"]("session过期","");
                            setTimeout(function(){window.location.href = "/pkmslogout.html?filename=eimlogout.html";},3000);
                            break;

                        case "00":
                        default:
                            break;
                    }
                }

                $http.post($rootScope.settings.apiPath+"/user/login",{userName:$rootScope.userName})
                .success(function(json){
                var menu = [];

                for(var i=0;i<json.length;i++){

                    if(json[i].parentId == undefined){
                        json[i].parentId=0;
                    }

                    if(typeof menu[json[i].parentId] == "undefined"){
                        menu[json[i].parentId]=[];
                    }

                }


                // 权限校验
                $rootScope.license = json;

                $rootScope.threeReady = true;

                

                var tmp = [];
                for(var i=json.length-1;i>=0;i--){
                    for(var j=0;j<json.length;j++){
                        if(json[j].id==json[i].parentId){
                            if(json[j]['child']==undefined) json[j]['child'] = [];
                            json[j]['child'].unshift( json[i] );
                        }
                    }
                   
                }

                var menuList = [];
                for(var i=0;i<json.length;i++){
                    if(json[i].parentId==0){
                        menuList.push(json[i]);
                    }

                }

                $rootScope.menu = menuList;

            }); 
        })

        
}]);