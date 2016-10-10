angular.module('MetronicApp').controller('LabController', function($rootScope, $scope, $http, $timeout,$state,$window,$filter) {
    $scope.$on('$viewContentLoaded', function() {  
       

        $(window).resize(function(){
            // 基于准备好的dom，初始化echarts实例
            myChart1 = echarts.init(document.getElementById('startRate'),theme);
            // 使用刚指定的配置项和数据显示图表。
            myChart1.setOption($scope.startRate );

            // 基于准备好的dom，初始化echarts实例
            myChart2 = echarts.init(document.getElementById('intactRate'),theme);
            myChart2.setOption($scope.intactRate );

            // 基于准备好的dom，初始化echarts实例
            myChart3 = echarts.init(document.getElementById('utilizRate'),theme);
            myChart3.setOption($scope.utilizRate );

            // 基于准备好的dom，初始化echarts实例
            myChart4 = echarts.init(document.getElementById('durautilizRate'),theme);
            myChart4.setOption($scope.durautilizRate );

            // 基于准备好的dom，初始化echarts实例
            myChart5 = echarts.init(document.getElementById('efficiencyCoeff'),theme);
            myChart5.setOption($scope.efficiencyCoeff );
        })

        var labInfo = {
            "LAB02" : {
                name:"结构试验室",
                area:[
                    {
                        name:'车身结构试验区',
                        json:LAB02_HPU
                    },
                    {
                        name:'底盘结构试验区',
                        json:LAB02_MTS
                    }
                ]
            },
            "LAB03" : {
                name:"PS整车排放及性能试验室",
                area:[
                    {
                        name:'PS整车排放及性能试验区',
                        json:LAB03_BEP
                    }
                ]
            }
        }
        if(typeof labInfo[$state.params.id] == "undefined"){
            $window.history.back();
            return;
        }

        $rootScope.labName = labInfo[$state.params.id].name;
        var tooltip = new Tooltip(['设备名：'],['000000']);

        
        if(labInfo[$state.params.id].area.length ==2){
            
            var position = {
                w:800,
                h:1400,
                d:1400
            };
        
            $scope.doubleLabel = true;
            $scope.areaName = [labInfo[$state.params.id].area[0].name,labInfo[$state.params.id].area[1].name];
            demo.init('3d_view1',labInfo[$state.params.id].area[0]['json'],1200,500,position,tooltip);
            demo.init('3d_view2',labInfo[$state.params.id].area[1]['json'],1200,500,position,tooltip);

        }else if(labInfo[$state.params.id].area.length ==1){

        
            var position = {
                w:800,
                h:1400,
                d:1400
            };
            $scope.doubleLabel = false;
            $scope.areaName = [labInfo[$state.params.id].area[0].name];
            demo.init('3d_view1',labInfo[$state.params.id].area[0]['json'],360,500,position,tooltip);
        }
           
    });

    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
    $rootScope.settings.layout.setSidebar = false;
    $rootScope.settings.layout.setFullscreen = false;
    $rootScope.settings.layout.setDeviceButton = false;
    $rootScope.settings.layout.setLabButton = true;

    
    // console.log(labName[$state.params.id]);

    // var url = "/experipage/getExperiIndex";
    // url = "/equippage/getWarnningBEP";
    // url = "/equippage/getWarnningRPC";
    // url = "/equippage/getWarnningMTS";
    // url = "/equippage/getMainEquipMenu";

    // var data  = {experiNo:"MTS01",indexName:"startRate"} ;
    // data = {equipNo:"PEC0-03894-0002"};
    // data = {equipNo:"marshallhis"};
    // data = {equipNo:"PEC0-02024",equipType:"MPT",statusType:"normal"}; //statusType:warn  type:station

    // var param = [];
    // $http.get($rootScope.settings.apiPath + url,data).success(function(json){
    //     // console.log(json);
    //     $scope.EquipMenu = json;
    // });

     // 指定图表的配置项和数据
    var option = {

        grid:{
            x:28,
            y:28,
            x2:28,
            y2:24,
            borderWidth:0
        },
        legend:{
            data:[{
              name : "今年平均", 
              textStyle : {
                color:"#fff"
              }
            },{
              name : "去年平均", 
              textStyle : {
                color:"#26a1ab"
              }
            }]
        },
        tooltip : {
            show:true
        },
        calculable : false,

        xAxis : [
            {
                type : 'category',
                data : ['当月值','上月值','同期值'],
                splitLine:{ 
                    show:false
                },
                axisLabel:{
                    textStyle:{
                        color:'#fff'
                    }
                }
                
            }
        ],
        yAxis : [
            {
                type : 'value',
                //max:5,
                splitLine:{ 
                    show:false
                },
                axisLabel:{
                    textStyle:{
                        formatter: function (val) {
                            return val + '%';
                        },
                        color:'#fff'
                    }
                },
                splitNumber: 5
                // data:[78, 59, 60]
            }
        ],
        series : [
            {
                type:'bar',
                itemStyle:{
                    emphasis: {barBorderRadius: 10},
                    normal:{
                        label: {
                            show: true,
                            position:'top'
                        }
                    }
                },
                barWidth:20,
                data:[1.2, 2.1, 1.5]
            },{
                type:'line',
                name:'今年平均',
                
                markLine : {
                    data:[
                    {   
                        name:'今年平均',
                        yAxis: 3
                    }],
                    itemStyle:{
                        normal: {
                            color: '#FFF',
                            lineStyle: {
                                type: 'solid'
                            }
                        }

                    }
                }
            },{
                type:'line',
                name:'去年平均',
                
                markLine : {
                    data:[
                    {   
                        name:'去年平均',
                        yAxis: 2,
                        itemStyle:{
                            normal: {
                                color: '#26a1ab',
                                lineStyle: {
                                    type: 'solid'
                                },
                                label:{
                                    show:true,
                                    formatter:'{b} {c} '
                                }
                            }

                        }
                    }]
                }
            }
        ]
    };

    // var myChart = echarts.init(document.getElementById('startRate'),theme);
    // myChart.setOption(option);
    // var myChart = echarts.init(document.getElementById('intactRate'),theme);
    // myChart.setOption(option);
    // var myChart = echarts.init(document.getElementById('utilizRate'),theme);
    // myChart.setOption(option);
    // var myChart = echarts.init(document.getElementById('durautilizRate'),theme);
    // myChart.setOption(option);
    // var myChart = echarts.init(document.getElementById('efficiencyCoeff'),theme);
    // myChart.setOption(option);


    console.log("LabController");

    //实验室对应指标
    var url = "/experipage/getExperiIndex";
    var data  = {experiNo:$state.params.id,indexName:["startRate","intactRate","utilizRate","durautilizRate","efficiencyCoeff"]} ;
    $http.post($rootScope.settings.apiPath + url,JSON.stringify(data)).success(function(json){
        
        $scope.getExperiIndex = json;

        for(var i=0;i<json.length;i++){
           
            //(function(i){
            var maxNum=Math.max(json[i].indexAvgValue,json[i].indexLastValue,Math.max.apply(null,json[i].indexValue));
                maxNum=Math.ceil(maxNum+maxNum*0.2);
                if(json[i].indexName==="startRate"){console.log(option)
                    var op=JSON.stringify(option);
                    $scope.startRate=JSON.parse(op);
                    $scope.startRate.tooltip.text = "设备开动率";
                    $scope.startRate.series[0].data = json[i].indexValue;
                    $scope.startRate.series[1].markLine.data[0].yAxis = json[i].indexAvgValue;
                    $scope.startRate.series[2].markLine.data[0].yAxis = json[i].indexLastValue;
                    //maxNum=maxNum>100?100:maxNum;
                    $scope.startRate.yAxis[0].max=100;
                    var myChart1 = echarts.init(document.getElementById('startRate'),theme);
                    myChart1.setOption($scope.startRate);

                }else if(json[i].indexName==="intactRate"){

                    var op=JSON.stringify(option);
                    $scope.intactRate = JSON.parse(op);
                    $scope.intactRate.series[0].data = json[i].indexValue;
                    $scope.intactRate.series[1].markLine.data[0].yAxis = json[i].indexAvgValue;
                    $scope.intactRate.series[2].markLine.data[0].yAxis = json[i].indexLastValue;
                    maxNum=maxNum>100?100:maxNum;
                    $scope.intactRate.yAxis[0].max=maxNum;
                    var myChart2 = echarts.init(document.getElementById('intactRate'),theme);
                    myChart2.setOption($scope.intactRate);

                }else if(json[i].indexName==="utilizRate"){
                    var op=JSON.stringify(option);
                    $scope.utilizRate = JSON.parse(op);
                    $scope.utilizRate.series[0].data = json[i].indexValue;
                    $scope.utilizRate.series[1].markLine.data[0].yAxis = json[i].indexAvgValue;
                    $scope.utilizRate.series[2].markLine.data[0].yAxis = json[i].indexLastValue;

                    $scope.utilizRate.yAxis[0].max=100;
                    var myChart3 = echarts.init(document.getElementById('utilizRate'),theme);
                    myChart3.setOption($scope.utilizRate);

                }else if(json[i].indexName==="durautilizRate"){

                    var op=JSON.stringify(option);
                    $scope.durautilizRate = JSON.parse(op);
                    $scope.durautilizRate.series[0].data = json[i].indexValue;
                    $scope.durautilizRate.series[1].markLine.data[0].yAxis = json[i].indexAvgValue;
                    $scope.durautilizRate.series[2].markLine.data[0].yAxis = json[i].indexLastValue;
                    //maxNum=maxNum>100?100:maxNum;
                    $scope.durautilizRate.yAxis[0].max=300;
                    var myChart4 = echarts.init(document.getElementById('durautilizRate'),theme);
                    myChart4.setOption($scope.durautilizRate);

                }else if(json[i].indexName==="efficiencyCoeff"){

                    var op=JSON.stringify(option);
                    $scope.efficiencyCoeff = JSON.parse(op);
                    $scope.efficiencyCoeff.series[0].data = json[i].indexValue;
                    $scope.efficiencyCoeff.series[1].markLine.data[0].yAxis = json[i].indexAvgValue;
                    $scope.efficiencyCoeff.series[2].markLine.data[0].yAxis = json[i].indexLastValue;

                    $scope.efficiencyCoeff.yAxis[0].max=maxNum;
                    var myChart5 = echarts.init(document.getElementById('efficiencyCoeff'),theme);
                    myChart5.setOption($scope.efficiencyCoeff);
                }
            //})(i);
        }
    });

    //实验室对应设备
    var url = "/experipage/getMainExperiMenu";
    var data  = {experiNo:$state.params.id}  ;
    $http.post($rootScope.settings.apiPath + url,JSON.stringify(data)).success(function(json){
        // console.log(json);
        $rootScope.getMainExperiMenu = json;
    });

    var url = "/experipage/getEquipState";
    $scope.status = {
        "0":0,
        "1":0,
        "2":0,
        "3":0,
        "4":0,
        "5":0,
    };

    if($state.params.id=="LAB02"){

        
        var data = {equipType:"MTS"};
        $http.post($rootScope.settings.apiPath + url,JSON.stringify(data)).success(function(json){
            for(var i=0;i<json.length;i++){
                $scope.status[json[i].status]++;
            }
        });

        var data = {equipType:"HPU"};
        $http.post($rootScope.settings.apiPath + url,JSON.stringify(data)).success(function(json){
            for(var i=0;i<json.length;i++){
                $scope.status[json[i].status]++;
            }
        });

    }else if($state.params.id=="LAB03"){

        var data = {equipType:"BEP"};
        $http.post($rootScope.settings.apiPath + url,JSON.stringify(data)).success(function(json){
            
            for(var i=0;i<json.length;i++){
                $scope.status[json[i].status]++;
            }

        });
    }
    

});