/***
GLobal Directives
***/

// Route State Load Spinner(used on page or content load)
MetronicApp.directive('ngSpinnerBar', ['$rootScope','$http','$state',
    function($rootScope,$http,$state) {
        return {
            link: function(scope, element, attrs) {
                // by defult hide the spinner bar
                element.addClass('hide'); // hide spinner bar by default

                // display the spinner bar whenever the route changes(the content part started loading)
                $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                    element.removeClass('hide'); // show spinner bar

                    if(toState.name=='login') return;

                });

                // hide the spinner bar on rounte change success(after the content loaded)
                $rootScope.$on('$stateChangeSuccess', function() {
                    element.addClass('hide'); // hide spinner bar
                    $('body').removeClass('page-on-load'); // remove page loading indicator
                    // Layout.setSidebarMenuActiveLink('match'); // activate selected link in the sidebar menu
                    
                   
                    // auto scorll to page top
                    // setTimeout(function () {
                    //     App.scrollTop(); // scroll to the top on content load
                    // }, $rootScope.settings.layout.pageAutoScrollOnLoad);     
                });

                // handle errors
                $rootScope.$on('$stateNotFound', function() {
                    element.addClass('hide'); // hide spinner bar
                });

                // handle errors
                $rootScope.$on('$stateChangeError', function() {
                    element.addClass('hide'); // hide spinner bar
                });
            }
        };
    }
])

// Handle global LINK click
MetronicApp.directive('a', function() {
    return {
        restrict: 'E',
        link: function(scope, elem, attrs) {
            if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                elem.on('click', function(e) {
                    e.preventDefault(); // prevent link click for above criteria
                });
            }
        }
    };
});

// Handle Dropdown Hover Plugin Integration
MetronicApp.directive('dropdownMenuHover', function () {
  return {
    link: function (scope, elem) {
      elem.dropdownHover();
    }
  };  
});
MetronicApp.factory("commService",function() {
    var commService={};
    commService.emailPattern=function(email){
        var result={};
        result.error=0;
        if(email!="" && email!=undefined){
            var emailPattern=/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
            //var emailPattern=/\w[-\w.+]*@saic-gm.com/;
            var arr=email.split(";");
            for (var i = 0; i < arr.length; i++) {
                if(!emailPattern.test(arr[i])&&arr[i]!=""){
                    if(arr.length==1){
                        //alert("邮箱有误");
                        result.error=1;
                        result.msg="邮箱有误";
                        return result;
                    }
                    //alert("第"+(i+1)+"个邮箱有误");
                    result.error=1;
                    result.msg="第"+(i+1)+"个邮箱有误";
                    return result;
                }else if(arr[i]==""){
                    //alert("第"+(i+1)+"个为空邮箱");
                    result.error=1;
                    result.msg="第"+(i+1)+"个为空邮箱";
                    return result;
                }else if(/\,|\:|\；/.test(email)){
                    //alert("邮箱分隔符有误");
                    result.error=1;
                    result.msg="邮箱分隔符有误";
                    return result;
                }
            }
            result.error=0;
            result.msg='';
            return result;
        }

    };
    commService.getTime=function(opts){
        /*获取当前时间*/
        var d=new Date(opts.time)||new Date();
        var year=d.getFullYear();
        var month=d.getMonth()+1;
        //month=common.fillZero(month);
        var date=d.getDate();
        //date=common.fillZero(date);
        var hours=d.getHours();
        //hours=common.fillZero(hours);
        var minutes=d.getMinutes();
        //minutes=common.fillZero(minutes);
        var seconds=d.getSeconds();
        //seconds=common.fillZero(seconds);
        switch(opts.rule){
            case "yyyy-MM-dd":
                return year+"-"+month+"-"+date;
                break;
            case "yyyy-MM-dd hh:mm:ss":
                return month+"/"+date+" "+hours+":"+minutes+":"+seconds;
                break;
            default:
                return year+"-"+month+"-"+date+" "+hours+":"+minutes+":"+seconds;
        }

    };
    return commService;
});
//邮箱错误信息
MetronicApp.directive("errorMsg",function(){
    return {
        restrict: "AE",
        transclude: true,
        template: '<div  class="emailError" style="display:none;position: absolute;left:0;top:113px;color: "red">\
                            <span>{{email.error}}</span>\
                     </div>'
        ,
        link: function (scope, element, attr) {
            //console.log(scope,element,attr)
            var email=element[0].querySelector(".emailError");
            scope.email={};
            scope.emailPattern=function(msg,simple){
                console.log(msg)
                if(!simple){
                    scope.email.error=msg;
                    email.style.display="block";
                }else{
                    console.log(msg)
                    if(msg==""){
                        email.parentNode.parentNode.classList.remove("has-error");
                    }else{
                        email.parentNode.parentNode.classList.add("has-error");
                    }

                }
            };
            //has-error

        }
    }
});