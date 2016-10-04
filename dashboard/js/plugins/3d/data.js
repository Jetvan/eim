//10#
var LAB02_HPU={ 
    objects: [{
        type: 'floor',
        width: 800,
        depth: 800
    },{
        type: 'floor',
        width: 325,
        depth: 700,
        op:"-",
        translate: [-240, -10, 240],
    },{
        type: 'floor_box',
        width: 150,
        height: 20,
        depth: 150,
        translate: [-240, 60, -240]
    },{
        type: 'floor_box',
        width: 150,
        height: 20,
        depth: 150,
        translate: [40, 60, -240]
    },{
        type: 'floor_box',
        width: 90,
        height: 20,
        depth: 150,
        translate: [280, 60, -240]
    },{
        type: 'floor_box',
        width: 90,
        height: 20,
        depth: 150,
        translate: [280, 60, 60]
    }]
};

//10#
var LAB02_MTS={  
    objects: [{
        type: 'floor',
        width: 800,
        depth: 800,
    },{
        type: 'floor',
        width: 325,
        depth: 700,
        translate: [-240, -10, -540],
    },{
        type: 'floor_box',
        width: 250,
        height: 20,
        depth: 100,
        translate: [-240, 60, 340],
        client:{
            isTooltip:true,
            type: 'floor_box',
            name:'16通道多轴道路模拟试验系统MTS329',
            id:'PEC0-01982',
            type:'MTS'
        }
    },{
        type: 'floor_box',
        width: 250,
        height: 20,
        depth: 100,
        translate: [-240, 60, 210],
        client:{
            isTooltip:true,
            type: 'floor_box',
            name:'四通道道路模拟试验系统MTS320',
            id:'PEC0-01983',
            type:'MTS'
        }
    },{
        type: 'floor_box',
        width: 250,
        height: 20,
        depth: 100,
        translate: [-240, 60, -30],
        client:{
            isTooltip:true,
            type: 'floor_box',
            name:'整车道路模拟系统（24CH）',
            id:'PEC0-02024',
            type:'MTS'
        }
    },{
        type: 'floor_box',
        width: 250,
        height: 20,
        depth: 100,
        translate: [-240, 60, -160],
        client:{
            isTooltip:true,
            type: 'floor_box',
            name:'多轴振动试验台（MAST1）',
            id:'PEC0-01991',
            type:'MTS'
        }
    },{
        type: 'floor_box',
        width: 120,
        height: 20,
        depth: 60,
        translate: [280, 60, 360],
        client:{
            isTooltip:true,
            type: 'floor_box',
            name:'柔性液压试验系统（转向&悬挂）',
            id:'PEC0-01992-05',
            type:'MTS'
        }
    },{
        type: 'floor_box',
        width: 120,
        height: 20,
        depth: 60,
        translate: [280, 60, 280],
        client:{
            isTooltip:true,
            type: 'floor_box',
            name:'柔性液压试验系统（转向&悬挂）',
            id:'PEC0-01992-04',
            type:'MTS'
        }
    },{
        type: 'floor_box',
        width: 120,
        height: 20,
        depth: 60,
        translate: [280, 60, 200],
        client:{
            isTooltip:true,
            type: 'floor_box',
            name:'柔性液压试验系统（转向&悬挂）',
            id:'PEC0-01992-03',
            type:'MTS'
        }
    },{
        type: 'floor_box',
        width: 120,
        height: 20,
        depth: 60,
        translate: [280, 60, 120],
        client:{
            isTooltip:true,
            type: 'floor_box',
            name:'柔性液压试验系统（转向&悬挂）',
            id:'PEC0-01992-02',
            type:'MTS'
        }
    },{
        type: 'floor_box',
        width: 120,
        height: 20,
        depth: 100,
        translate: [280, 60, -40],
        client:{
            isTooltip:true,
            type: 'floor_box',
            name:'多轴振动试验台（MAST2）',
            id:'null',
            type:'MTS'
        }
    },{
        type: 'floor_box',
        width: 120,
        height: 20,
        depth: 100,
        translate: [280, 60, -160],
        client:{
            isTooltip:true,
            type: 'floor_box',
            name:'柔性液压试验系统（mini MAST）',
            id:'PEC0-01992-01',
            type:'MTS'
        }
    },{
        type: 'floor_box',
        width: 80,
        height: 20,
        depth: 60,
        translate: [-200, 60, -800],
        client:{
            isTooltip:true,
            type: 'floor_box',
            name:'HPU 1#',
            id:'PE00-01993-01',
            type:'HPU'
        }
    },{
        type: 'floor_box',
        width: 80,
        height: 20,
        depth: 60,
        translate: [-200, 60, -730],
        client:{
            isTooltip:true,
            type: 'floor_box',
            name:'HPU 2#',
            id:'PE00-01993-02',
            type:'HPU'
        }
    },{
        type: 'floor_box',
        width: 80,
        height: 20,
        depth: 60,
        translate: [-200, 60, -660],
        client:{
            isTooltip:true,
            type: 'floor_box',
            name:'HPU 3#',
            id:'PE00-01993-03',
            type:'HPU'
        }
    },{
        type: 'floor_box',
        width: 80,
        height: 20,
        depth: 60,
        translate: [-200, 60, -590],
        client:{
            isTooltip:true,
            type: 'floor_box',
            name:'HPU 4#',
            id:'PE00-01993-04',
            type:'HPU'
        }
    },{
        type: 'floor_box',
        width: 80,
        height: 20,
        depth: 60,
        translate: [-200, 60, -520],
        client:{
            isTooltip:true,
            type: 'floor_box',
            name:'HPU 5#',
            id:'PE00-01993-05',
            type:'HPU'
        }
    },{
        type: 'floor_box',
        width: 80,
        height: 20,
        depth: 60,
        translate: [-200, 60, -450],
        client:{
            isTooltip:true,
            type: 'floor_box',
            name:'HPU 6#',
            id:'PE00-01993-06',
            type:'HPU'
        }
    }]
};

//16#
var LAB03_BEP={  
    canvasId:'#LAB03_BEP',
    objects: [{
        type: 'floor',
        width: 1600,
        depth: 1300,
    },{
        type: 'floor_box',
        width: 135,
        height: 20,
        depth: 200,
        translate: [-580, 60, 400],
        sideColor: '#e47930',
        topColor: '#f19149',
        client:{
            isTooltip:true,
            type: 'floor_box',
            name:'低温排放转鼓系统',
            id:'PEC0-03896-0002',
            type:'BEP'
        }
    },{
        type: 'floor_box',
        width: 135,
        height: 20,
        depth: 200,
        translate: [-280, 60, 400],
        sideColor: '#e47930',
        topColor: '#f19149',
        client:{
            isTooltip:true,
            type: 'floor_box',
            name:'常温排放转鼓系统',
            id:'PEC0-03894-0002',
            type:'BEP'
        }
    },{
        type: 'floor_box',
        width: 135,
        height: 20,
        depth: 200,
        translate: [280, 60, 400],  
        sideColor: '#e47930',
        topColor: '#f19149',
        client:{
            isTooltip:true,
            type: 'floor_box',
            name:'高温汽车性能转鼓',
            id:'PEC0-03908-0001',
            type:'BEP'
        }
    },{
        type: 'floor_box',
        width: 135,
        height: 20,
        depth: 200,
        translate: [580, 60, 400], 
        sideColor: '#e47930',
        topColor: '#f19149', 
        client:{
            isTooltip:true,
            type: 'floor_box',
            name:'低温汽车性能转鼓',
            id:'PEC0-03909-0001',
            type:'BEP'
        }
    },{
        type: 'floor_box',
        width: 85,
        height: 20,
        depth: 180,
        translate: [680, 60, -480],  
        client:{
            isTooltip:true,
            type: 'floor_box',
            name:'低温汽车性能转鼓',
            id:'PEC0-03909-0001',
            type:'BEP'
        }
    },{
        type: 'floor_box',
        width: 80,
        height: 20,
        depth: 180,
        translate: [560, 60, -480]
    },{
        type: 'floor_box',
        width: 80,
        height: 20,
        depth: 180,
        translate: [410, 60, -480]
    },{
        type: 'floor_box',
        width: 80,
        height: 20,
        depth: 180,
        translate: [290, 60, -480]
    },{
        type: 'floor_box',
        width: 85,
        height: 20,
        depth: 180,
        translate: [680, 60, -250]
    },{
        type: 'floor_box',
        width: 80,
        height: 20,
        depth: 180,
        translate: [560, 60, -250]
    },{
        type: 'floor_box',
        width: 80,
        height: 20,
        depth: 180,
        translate: [410, 60, -250]
    },{
        type: 'floor_box',
        width: 80,
        height: 20,
        depth: 180,
        translate: [290, 60, -250]
    }]
};


//dashboard
var lab0={  
    objects: [{
        type: 'floor',
        width: 1600,
        depth: 1300,
    },{
        type: 'floor_box',
        width: 535,
        height: 10,
        depth: 145,
        translate: [-400, 60, 500],  
    },{
        type: 'floor_box',
        width: 178,
        height: 10,
        depth: 100,
        translate: [0, 60, 550]
    },{
        type: 'floor_box',
        width: 140,
        height: 40,
        depth: 145,
        translate: [130, 60, 400],
        sideColor: '#e47930',
        topColor: '#f19149',
        client: {
            isTooltip:true,
            type: 'floor_box',
            name:'PS整车排放及性能试验室',
            id:'LAB03',
            type:'lab'
        }

    },{
        type: 'floor_box',
        width: 74,
        height: 40,
        depth: 60,
        op:'+',
        translate: [97, 60, 305],
        sideColor: '#e47930',
        topColor: '#f19149',
        client: {
            isTooltip:true,
            type: 'floor_box',
            name:'PS整车排放及性能试验室',
            id:'LAB03',
            type:'lab'
        } 
    },{
        type: 'floor_box',
        width: 126,
        height: 10,
        depth: 209,
        translate: [-40, 60, 105],   
    },{
        type: 'floor_box',
        width: 80,
        height: 10,
        depth: 141,
        translate: [310, 60, 205]
    },{
        type: 'floor_box',
        width: 82,
        height: 10,
        depth: 279,
        translate: [100, 60, -165],   
    },{
        type: 'floor_box',
        width: 100,
        height: 40,
        depth: 222,
        translate: [207, 60, -110],
        sideColor: '#e47930',
        topColor: '#f19149',
        client: {
            isTooltip:true,
            name:'结构试验室',
            id:'LAB02',
            type:'lab'
        }   
    },{
        type: 'floor_box',
        width: 96,
        height: 10,
        depth: 278,
        translate: [320, 60, -138]
    },{
        type: 'floor_box',
        width: 64,
        height: 10,
        depth: 271,
        translate: [460, 60, -98],   
    },{
        type: 'floor_box',
        width: 90,
        height: 10,
        depth: 506,
        translate: [524, 60, -98],   
    },{
        type: 'floor_box',
        width: 67,
        height: 10,
        depth: 89,
        translate: [600, 60, -98],   
    },{
        type: 'floor_box',
        width: 67,
        height: 10,
        depth: 113,
        translate: [600, 60, -368],    
    }],
};
