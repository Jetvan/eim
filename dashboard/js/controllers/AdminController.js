angular.module('MetronicApp')

.controller('UserController', function($rootScope, $scope, $http, $timeout,$state) {
    
    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
    $rootScope.settings.layout.setSidebar = true;
    $rootScope.settings.layout.setFullscreen = false;
    $rootScope.settings.layout.setLabButton = false;
    $rootScope.settings.layout.setDeviceButton = false;
    $scope.obj = "user";
    //var modal=$("#draggable");

    $scope.$on('$viewContentLoaded', function() {

        $(".modal").on('hidden.bs.modal',function(){
            $(".form-group").removeClass("has-error");
        

        });
        
    });

    $scope.datas=[];
    $scope.data={};

    $scope.$on('ngRepeatFinished', function(repeatFinishedEvent, element) {

        var table = $("#"+$scope.obj);

        table.removeClass("hide");
        table.find(".checkboxes").uniform();
        table.find('.group-checkable').change(function () {
            var set = jQuery(this).attr("data-set");
            var checked = jQuery(this).is(":checked");
            jQuery(set).each(function () {
                if (checked) {
                    $(this).prop("checked", true);
                } else {
                    $(this).prop("checked", false);
                }
            });
            jQuery.uniform.update(set);
        });

        var config = {
            "bStateSave": false,
            "lengthMenu": [
                [10, 15, 20, -1],
                [10, 15, 20, "All"] // change per page values here
            ],
            "aoColumns": [
                  {
                      sWidth: '200px'
                  },{
                      sWidth: '200px'
                  },{
                      sWidth: '200px'
                  },{
                      sWidth: '200px'
                  },{
                      sWidth: '200px'
                  },{
                      sWidth: '200px'
                  }
            ],
            "columnDefs": [{  // set default column settings
                'orderable': false,
                "targets": [0,1,2,3,4]
            }, {
                "searchable": false,
                "targets": [0]
            }],
            rowCallback: function( nRow, aData, iDisplayIndex ,dataIndex) {
              
              $("button[action=delete]", nRow).click(function() {

                if(!confirm("确定要删除记录吗?")){
                    return false
                }

                var url = $rootScope.settings.apiPath + "/"+$scope.obj+"/delete";
                var id = $(this).data('id');

                $http({
                    method:"GET",
                    url:url,
                    params:{ids:id}
                }).then(function(json){
                    if(status==0){
                        $(nRow).remove();
                    }
                })

              });

              $("button[action=edit]", nRow).click(function() {

                    $scope.action = "编辑用户";
                    //$scope.data = $scope.datas[dataIndex];
                    //console.log($scope.datas.length, dataIndex);
                    //$scope.$apply();
              });

              return nRow;
            }
        }

        $.extend($rootScope.tableConfig,config);
        $scope.datatable = table.DataTable($rootScope.tableConfig);


    });


    

    $http.get($rootScope.settings.apiPath+"/role/list").success(function(json){

        //TODO: getRoleResList
        $http.get($rootScope.settings.apiPath+"/"+ $scope.obj +"/getUserRoleList").success(function(json){
            console.log(json);
        });
        
        var data = [];
        for(var i =0;i<json.length;i++){
            data.push({text:json[i].roleName,id:parseInt(json[i].id)});
        }
        $('#tree_2').jstree({
            'plugins': ["wholerow", "checkbox", "types"],
            'core': {
                "themes" : {
                    "responsive": false
                },    
                'data': data
            },
            "types" : {
                "default" : {
                    "icon" : "fa fa-user font-green icon-lg"
                },
                "file" : {
                    "icon" : "fa fa-file icon-state-warning icon-lg"
                }
            }
        });

        $('#tree_2').on("changed.jstree", function (e, data) {
          console.log(data.selected);
        });
    })

    $scope.getUserList = function(){
        $http.get($rootScope.settings.apiPath+"/"+ $scope.obj +"/list").success(function(json){
            $scope.datas = json;
            $('#'+ $scope.obj +' .checkboxes').uniform();
        });
    }

    $scope.getUserList();

    $scope.save = function(form){

        if(!form.validate()) {
            return;
        }

        var selectedElmsIds = $('#tree_2').jstree("get_selected");
        $scope.data.roleids = selectedElmsIds.join(",");

        $(".modal").modal('hide');
        $http.post($rootScope.settings.apiPath+"/"+ $scope.obj +"/addOrUpdate",$scope.data).success(function(json){
            
            // window.location.reload();
        });
    }

    $scope.create = function(){
        $scope.action = "创建用户";
        $scope.data = {};
        $(".modal").modal('show');
    }
    /*
    * 修改按钮
    * 获取点击当条数据
    * */
    $scope.upDataUser=function(ev){

        var srcEl=ev.target,
            id=srcEl.getAttribute("data-id");
        for(var i= 0,len=$scope.datas.length;i<len;i++){
           if($scope.datas[i].id==id){
               $scope.data=$scope.datas[i];
           }
        }

    }
})
.controller('RoleController', function($rootScope, $scope, $http, $timeout) {
    
    $scope.obj = "role";
    $scope.$on('$viewContentLoaded', function() {   

    });

    $scope.datas=[];
    $scope.data={};

    $scope.$on('ngRepeatFinished', function(repeatFinishedEvent, element) {

        
        var table = $("#"+$scope.obj);
        table.removeClass("hide");
        // table.find(".checkboxes").uniform();
        // table.find('.group-checkable').change(function () {
        //     var set = jQuery(this).attr("data-set");
        //     var checked = jQuery(this).is(":checked");
        //     jQuery(set).each(function () {
        //         if (checked) {
        //             $(this).prop("checked", true);
        //         } else {
        //             $(this).prop("checked", false);
        //         }
        //     });
        //     jQuery.uniform.update(set);
        // });

        var config = {
            "bStateSave": true,
            "lengthMenu": [
                [10, 15, 20, -1],
                [10, 15, 20, "All"] // change per page values here
            ],
            "aoColumns": [
                  {
                      sWidth: '30px',
                      visible:false,
                  },{
                      sWidth: '200px'
                  },{
                      sWidth: '200px'
                  },{
                      sWidth: '200px'
                  },{
                      sWidth: '160px'
                  }
            ],
            "columnDefs": [{  // set default column settings
                'orderable': false,
                "targets": [0,1,2,3,4]
            }, {
                "searchable": false,
                "targets": [0]
            }],
            rowCallback: function( nRow, aData, iDisplayIndex,dataIndex ) {
              
              $("button[action=delete]", nRow).click(function() {

                if(!confirm("确定要删除角色吗?")){
                    return false
                }
                
                var url = $rootScope.settings.apiPath + "/role/delete";
                var id = $(this).data('id');
                console.log(id);
                $http({
                    method:"GET",
                    url:url,
                    params:{ids:id}
                }).then(function(json){
                    if(status==0){
                        $(nRow).remove();
                    }
                })

              });


              $("button[action=edit]", nRow).click(function() {

                    //$scope.data = $scope.datas[dataIndex];
                    $scope.action = "编辑角色 id:"+$scope.data.id;
                    //$scope.$apply();
              });

              return nRow;
            }
        };

        $.extend($rootScope.tableConfig,config);
        table.DataTable($rootScope.tableConfig);
    });

    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
    $rootScope.settings.layout.setSidebar = true;
    $rootScope.settings.layout.setFullscreen = false;

    $scope.save = function(form){
        var selectedElmsIds = $('#tree_2').jstree("get_selected");
        $scope.data.resourceIds = selectedElmsIds.join(",");

        if(!form.validate()) {
            return;
        }

        $(".modal").modal('hide');
        $http.post($rootScope.settings.apiPath+"/"+ $scope.obj +"/addOrUpdate",$scope.data).success(function(json){
            
            window.location.reload();
        });
    }

    $http.get($rootScope.settings.apiPath+"/resource/list").success(function(json){
        
        var data = [];
        for(var i =0;i<json.length;i++){
            data.push({text:json[i].resourceName,id:parseInt(json[i].id)});
        }
        $('#tree_2').jstree({
            'plugins': ["wholerow", "checkbox", "types"],
            'core': {
                "themes" : {
                    "responsive": false
                },    
                'data': data
            },
            "types" : {
                "default" : {
                    "icon" : "fa fa-user font-green icon-lg"
                },
                "file" : {
                    "icon" : "fa fa-file icon-state-warning icon-lg"
                }
            }
        });

        $('#tree_2').on("changed.jstree", function (e, data) {
          console.log(data.selected);
        });
    })

    $scope.getRoleList = function(){
        $http.get($rootScope.settings.apiPath+"/"+ $scope.obj +"/list").success(function(json){
            $scope.datas = json;
        });
    }
    $scope.getRoleList();

    $scope.create = function(){
        $scope.action = "创建角色";
        $scope.data = {};
        $(".modal").modal('show');
    }
    /*
     * 修改按钮
     * 获取点击当条数据
     * */
    $scope.upData=function(ev){

        var srcEl=ev.target,
            id = $(srcEl).data('id');
        for(var i= 0,len=$scope.datas.length;i<len;i++){
            if($scope.datas[i].id==id){
                $scope.data=$scope.datas[i];
            }
        }

    }
})


.controller('ResourceController', function($rootScope, $scope, $http, $timeout) {
    
    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
    $rootScope.settings.layout.setSidebar = true;
    $rootScope.settings.layout.setFullscreen = false;
    $scope.obj = "resource";
    $scope.datas=[];
    $scope.data={};
    
    $scope.$on('$viewContentLoaded', function() {   

    });

    $scope.$on('ngRepeatFinished', function(repeatFinishedEvent, element) {

        console.log("ResourceController");

        var table = $("#"+$scope.obj);
        table.removeClass("hide");
        // table.find(".checkboxes").uniform();
        // table.find('.group-checkable').change(function () {
        //     var set = jQuery(this).attr("data-set");
        //     var checked = jQuery(this).is(":checked");
        //     jQuery(set).each(function () {
        //         if (checked) {
        //             $(this).prop("checked", true);
        //         } else {
        //             $(this).prop("checked", false);
        //         }
        //     });
        //     jQuery.uniform.update(set);
        // });

        var config = {
            "bStateSave": true,
            "aoColumns": [
                  {
                      sWidth: '200px'
                  },{
                      sWidth: '200px'
                  },{
                      sWidth: '200px'
                  },{
                      sWidth: '100px'
                  },{
                      sWidth: '100px'
                  },{
                      sWidth: '100px'
                  },{
                      sWidth: '200px'
                  }
            ],
            "columnDefs": [{  // set default column settings
                'orderable': false,
                "targets": [0,1,2,3,4]
            }, {
                "searchable": false,
                "targets": [0]
            }],
            "bStateSave": false,
            "lengthMenu": [
                [10, 15, 20, -1],
                [10, 15, 20, "All"] // change per page values here
            ],
            rowCallback: function( nRow, aData, iDisplayIndex ,dataIndex) {
              
              $("button[action=delete]", nRow).click(function() {

                if(!confirm("确定要删除记录吗?")){
                    return false
                }

                var url = $rootScope.settings.apiPath + "/resource/delete";
                var id = $(this).data('id');
                $http({
                    method:"GET",
                    url:url,
                    params:{ids:id}
                }).success(function(json){
                    if(status==0){
                        $(nRow).remove();
                    }
                })
              });


              /*$("button[action=edit]", nRow).click(function() {
                    var id = $(this).data('id');
                    $scope.action = "编辑资源 id:"+$scope.data.id;
                    //$scope.$apply();
              });*/

              return nRow;
            }
        };

        $.extend($rootScope.tableConfig,config);
        table.DataTable($rootScope.tableConfig);
    });

    $scope.getResourceList = function(){
        $http.get($rootScope.settings.apiPath+"/"+ $scope.obj +"/list").success(function(json){
            $scope.datas = json;
            $('#'+ $scope.obj +' .checkboxes').uniform();
        });
    }
    $scope.getResourceList();

    $scope.save = function(form){

        if(!form.validate()) {
            console.log('fail');
            return;
        }

        $http.post($rootScope.settings.apiPath+"/"+ $scope.obj +"/addOrUpdate",$scope.data).success(function(json){
            console.log(json);
            $(".modal").modal('hide');
            window.location.reload();
        });
    }

    $scope.create = function(){
        $scope.action = "创建资源";
        $scope.data = {};
        $(".modal").modal('show');
    }

    // $http.get($rootScope.settings.apiPath+"/resource/list").success(function(json){
        
    //     var data = [];
    //     for(var i =0;i<json.length;i++){
    //         data.push({text:json[i].resourceName});
    //     }

    //     $('#tree_2').jstree({
    //         'plugins': ["wholerow", "checkbox", "types"],
    //         'core': {
    //             "themes" : {
    //                 "responsive": false
    //             },    
    //             'data': data
    //         },
    //         "types" : {
    //             "default" : {
    //                 "icon" : "fa fa-file font-green icon-lg"
    //             },
    //             "file" : {
    //                 "icon" : "fa fa-file icon-state-warning icon-lg"
    //             }
    //         }
    //     });

    //     $('#jstree_demo_div').on("changed.jstree", function (e, data) {
    //       console.log(data.selected);
    //     });
    // })

    /*
     * 修改按钮
     * 获取点击当条数据
     * */
    $scope.upData=function(ev){
        var srcEl=ev.target,
            id = $(srcEl).data('id');
        for(var i= 0,len=$scope.datas.length;i<len;i++){
            if($scope.datas[i].id==id){
                $scope.data=$scope.datas[i];
            }
        }
        $scope.action = "编辑资源 id:"+id;

    }



    // $scope.delete = function(id){
    //     console.log(111);
    //     if(!confirm("确定要删除记录吗?")){
    //         return false;
    //     }

    //     var url = $rootScope.settings.apiPath + "/hpualarm/delete";
    //     $http.post(url,{eqptNo:[id]}).success(function(json){
    //         $(nRow).remove();
    //     })
    // }
})

.controller('WarningController', function($rootScope, $scope, $http, $timeout) {
    
    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
    $rootScope.settings.layout.setSidebar = true;
    $rootScope.settings.layout.setFullscreen = false;

    $scope.datas=[];
    $scope.data={};
    
    $scope.$on('$viewContentLoaded', function() {   

    });

    $scope.$on('ngRepeatFinished', function(repeatFinishedEvent, element) {

        console.log("ResourceController");

        var table = $("#warning");
        table.removeClass("hide");
        table.find(".checkboxes").uniform();
        table.find('.group-checkable').change(function () {
            var set = jQuery(this).attr("data-set");
            var checked = jQuery(this).is(":checked");
            jQuery(set).each(function () {
                if (checked) {
                    $(this).prop("checked", true);
                } else {
                    $(this).prop("checked", false);
                }
            });
            jQuery.uniform.update(set);
        });

        var config = {
            "aoColumns": [
                  {
                      sWidth: '200px'
                  },{
                      sWidth: '200px'
                  },{
                      sWidth: '200px'
                  },{
                      sWidth: '200px'
                  },{
                      sWidth: '100px'
                  }
            ],
            "bStateSave": false,
            "lengthMenu": [
                [10, 15, 20, -1],
                [10, 15, 20, "All"] // change per page values here
            ],

            "columnDefs": [{  // set default column settings
                'orderable': false,
                "targets": [0,1,2,3,4]
            }, {
                "searchable": false,
                "targets": [0]
            }],
            rowCallback: function( nRow, aData, iDisplayIndex ,dataIndex) {
              
              $("button[action=delete]", nRow).click(function() {
                console.log(111);
                if(!confirm("确定要删除记录吗?")){
                    return false
                }

                var url = $rootScope.settings.apiPath + "/hpualarm/delete";
                var id = $(this).attr('data-id');
                $http.post(url,{eqptNo:[id]}).success(function(json){
                    $(nRow).remove();
                })
              });


              /*$("button[action=edit]", nRow).click(function() {
                    console.log(1);
                    $scope.temp = $scope.datas[dataIndex];
                    console.log($scope.data);
                    $scope.action = "编辑HPU出油口温度";
                    $scope.$apply();
              });*/

              return nRow;
            }
        };

        $.extend($rootScope.tableConfig,config);
        table.DataTable($rootScope.tableConfig);
    });

    $scope.getWarningList = function(){
        $http.get($rootScope.settings.apiPath+"/hpualarm/getHpuAlarmList").success(function(json){
            $scope.datas = json;
            $('#'+ $scope.obj +' .checkboxes').uniform();
        });
    }
    $scope.getWarningList();

    $scope.save = function(form){

        if(!form.validate()) {
            console.log('fail');
            return;
        }

        $http.post($rootScope.settings.apiPath+"/hpualarm/addOrUpdate",$scope.temp).success(function(json){
            console.log(json);
            $(".modal").modal('hide');
            // window.location.reload();
        });
    }

    $scope.create = function(){
        $scope.action = "创建编辑HPU出油口温度";
        $scope.data = {};
        $(".modal").modal('show');
    }

    /*
     * 修改按钮
     * 获取点击当条数据
     * */
    $scope.upData=function(ev){
        var srcEl=ev.target,
            id = $(srcEl).data('id');
        for(var i= 0,len=$scope.datas.length;i<len;i++){
            if($scope.datas[i].eqptNo==id){
                $scope.temp=$scope.datas[i];
            }
        }
        $scope.action = "编辑HPU出油口温度";

    }

    // $http.get($rootScope.settings.apiPath+"/resource/list").success(function(json){
        
    //     var data = [];
    //     for(var i =0;i<json.length;i++){
    //         data.push({text:json[i].resourceName});
    //     }
    //     $('#tree_2').jstree({
    //         'plugins': ["wholerow", "checkbox", "types"],
    //         'core': {
    //             "themes" : {
    //                 "responsive": false
    //             },    
    //             'data': data
    //         },
    //         "types" : {
    //             "default" : {
    //                 "icon" : "fa fa-file font-green icon-lg"
    //             },
    //             "file" : {
    //                 "icon" : "fa fa-file icon-state-warning icon-lg"
    //             }
    //         }
    //     });
    // })


})

.config(function ($validatorProvider) {
    $validatorProvider.setDefaults({
        errorElement: 'span',
        errorClass: 'help-block',
        highlight: function (element) { // hightlight error inputs
            
            $(element)
                .closest('.form-group').addClass('has-error'); // set error class to the control group
        },

        errorPlacement: function (error, element) {
            error.insertAfter(element);
            $(error).show();
        },

        success:function(error, element){
          $(error).parents(".form-group").removeClass("has-error");
          $(error).remove();
        }
    });

    $validatorProvider.setDefaultMessages({
        required: "请输入必填项.",
        remote: "请修改.",
        email: "错误邮箱格式.",
        url: "错误url格式.",
        date: "错误时间格式.",
        dateISO: "错误ISO时间格式.",
        number: "非法数字格式.",
        digits: "Please enter only digits.",
        creditcard: "请输入正确信用卡格式.",
        equalTo: "2次输入不一致.",
        accept: "请输入正确验证信息.",
        tnc: "请先阅读政策",
        maxlength: $validatorProvider.format("最大不超过 {0} 位."),
        minlength: $validatorProvider.format("最小不超过 {0} 位."),
        rangelength: $validatorProvider.format("可以输入 {0} 到 {1} 位."),
        range: $validatorProvider.format("可输入 {0} 到 {1}."),
        max: $validatorProvider.format("不大于 {0}."),
        min: $validatorProvider.format("不小于 {0}.")
    });
});

