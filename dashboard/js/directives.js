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

//table
/*
mainApp.directive("table",function(){
    return{
        restrict:"AE",
        transclude:true,
        template:
            ''
        ,
        link:function(scope,element,attr){
            //console.log(scope,element,attr)
            if(!scope.pageData){
                console.log("未传页数");
                return false;
            }
            scope.page=function(ev){
                var el=ev.target,
                    val=el.dataset.val;
                switch(val){
                    case "first":
                        scope.pageData.page=1;
                        break;
                    case "prev":
                        if(scope.pageData.page<2){
                            return false;
                        }
                        scope.pageData.page--;
                        break;
                    case "next":
                        if(++scope.pageData.page>scope.pageData.altogetherPage){
                            scope.pageData.page=scope.pageData.altogetherPage;
                            return false;
                        }
                        break;
                    case "last":
                        scope.pageData.page=scope.pageData.altogetherPage;
                        break;
                    default:return false;
                }
                console.log("第"+scope.pageData.page+"页",location.hash.substr(1));
            }
            scope.setPage=function(ev){
                if(ev.keyCode!=13){//enter键
                    return false;
                }
                var el=ev.target;
                var page=el.value;
                if(page<1||page>scope.pageData.altogetherPage || isNaN(page)){
                    //设置页数无效
                    return false;
                }
                scope.pageData.page=page;
                console.log("第"+scope.pageData.page+"页",window.location.hash.substr(1));
            }
        }
    }
});*/
