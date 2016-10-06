var scenceJson={	
	clearColor: 'white',
	objects: [{
		type: 'floor',
		width: 4820,
		depth: 1340,
	},{
		type: 'wall',
		height: 300,		
		data:[
			[-2400, 660],
			[2400, 660],
			[2400, -660],
			[-2400, -660],
			[-2400, 660],
		],		
		children: [{
			type: 'window',
			translate: [2100, 10, 660],
			width: 200,
			height: 280,
			depth: 50, 
			glassDepth: 6,
			picture: 'images/window.png',
		},{
			type: 'window',
			translate: [1500, 10, 660],
			width: 200,
			height: 280,
			depth: 50, 
			glassDepth: 6,
			picture: 'images/window.png',
		},{
			type: 'window',
			translate: [900, 10, 660],
			width: 200,
			height: 280,
			depth: 50, 
			glassDepth: 6,
			picture: 'images/window.png',
		},{
			type: 'window',
			translate: [300, 10, 660],
			width: 200,
			height: 280,
			depth: 50, 
			glassDepth: 6,
			picture: 'images/window.png',
		},{
			type: 'door',
			width: 300,
			height: 280,
			depth: 26,
			translate: [500, 10, -660],
		}],
	},{
		type: 'glass_wall',
		height: 300,	
		width: 1320,
		rotate: [0, Math.PI/180*90, 0],
	},{
		type: 'wall',
		width: 10,
		height: 200,			
		insideColor: '#B8CAD5',
		outsideColor: '#B8CAD5',
		floorShadow: false,
		insideImage: 'images/wall01.png',
		outsideImage: 'images/wall01.png',
		repeat: 200,
		style: {
			'm.transparent': true,
			'm.opacity': 0.9,
		},
		data:[
			[2400, -300],
			[1900, -300],
		],		
	},{
		type: 'wall',
		width: 10,
		height: 200,			
		insideColor: '#B8CAD5',
		outsideColor: '#B8CAD5',
		floorShadow: false,
		insideImage: 'images/wall01.png',
		outsideImage: 'images/wall01.png',
		repeat: 200,
		style: {
			'm.transparent': true,
			'm.opacity': 0.9,
		},
		data:[
			[1820, -300],
			[1800, -300],
			[1800, -660],
		],		
	},{
		type: 'wall',
		width: 10,
		height: 300,	
		insideColor: '#B8CAD5',
		outsideColor: '#B8CAD5',	
		data:[
			[2400, 0],
			[1800, 0],
			[1800, 660],
		],	
	},{
		type: 'wall',
		width: 20,
		height: 250,	
		insideColor: '#B8CAD5',
		outsideColor: '#B8CAD5',	
		data:[
			[1780, 0],
			[1780, 600],
			[700, 600],
			[700, 660],
		],	
	},{
		type: 'mono_gb_wall',
		translate: [600, 10, 649],
		rotate: [0, Math.PI, 0],
		width: 390,
		height: 290
	},{
		type: 'mono-island',
		shadowImage: {src: 'images/table_shadow.png', width: 400, height: 400, xOffset: 200, yOffset:-150},
		translate: [600, 0, 0],
		rotate: [0, Math.PI/3, 0],
	},{
		type: 'mono-island',
		shadowImage: {src: 'images/table_shadow.png', width: 400, height: 350, xOffset: 200, yOffset:-150},
		translate: [300, 0, 550],
		rotate: [0, Math.PI/3, 0],
	},{
		type: 'mono-island',
		shadowImage: {src: 'images/table_shadow.png', width: 400, height: 350, xOffset: 200, yOffset:-150},
		translate: [900, 0, 550],
		rotate: [0, Math.PI/3, 0],
	},{
		type: 'mono-island',
		shadowImage: {src: 'images/table_shadow.png', width: 400, height: 350, xOffset: 200, yOffset:-150},
		translate: [1500, 0, 550],
		rotate: [0, Math.PI/3, 0],
	},{
		type: 'mono-tv',
		shadowImage: {src: 'images/outside_lightmap.png', width: 120, height: 50},
		translate: [1300, 60, -140],
		picture: 'images/desktop.jpg',
		rotate: [0, Math.PI, 0],
	},{
		type: 'mono-conf-table',
		shadowImage: {src: 'images/conf_table_shadow.png', width: 560, height: 400, xOffset: 10},
		translate: [2100, 60, 460],
		picture: 'images/wood01.png',
		rotate: [0, 0, 0],
	},{
		type: 'mono-conf-chairs',
		translates: [[1960, 160, 390],[2050, 160, 390],[2140, 160, 390],[2230, 160, 390],[2230, 160, 540],[2140, 160, 540],[2050, 160, 540],[1960, 60, 540]],
		rotates: [[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, Math.PI, 0],[0, Math.PI, 0],[0, Math.PI, 0],[0, Math.PI, 0]],
	},{
		type: 'plants',
		floorShadow: true,
		translates: [[60, 50, 580],[1090, 50, 580],[1320, 50, 580],[1730, 50, 580],[2340, 50, 580]],
	},{
		type: 'floor_box',
		width: 120,
		height: 50,
		depth: 50,
		translate: [1500, 50, -140],
	},{
		type: 'floor_box',
		width: 120,
		height: 50,
		depth: 50,
		translate: [1100, 50, -140],
	},{
		type: 'floor_box',
		width: 100,
		height: 300,
		depth: 80,
		translate: [1200, 50, 610],
	},{
		type: 'racks',		
		translates: (function(){
			var racks=[];
			var column=4, row=4, xOffset = 180 , yOffset = 390, xGap = 240, yGap = 100 ;
			for(var i=0;i<row;i++){
				for(var j=0;j<column;j++){
					var count = 5;
					if(j >= 2) count = 6;
					for(var k=0; k < count; k++){
						if(i >= 2){
							racks.push([-(k+1+5*j)*62 - xOffset - xGap*j, 0,  yOffset - (yGap+80)*i - 260]);
						}else{
							racks.push([-(k+1+5*j)*62 - xOffset - xGap*j, 0,  yOffset - (yGap+80)*i]);
						}						
					}

				}
			}
			return racks;
		})(),
	},{
		type: 'electrics',	
		translates: [[-1102, 0, 390],[-1102, 0, -410]]
	}],
};