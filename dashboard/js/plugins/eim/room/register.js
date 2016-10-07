demo.Default.registerCreator('mono-tv', function(box, json){
	var translate=json.translate || [0,0,0];
	var x=translate[0],
		y=translate[1],
		z=translate[2];
	var edgeX=4,
		edgeY=2;
	var picture=json.picture || '../room/images/screen.jpg';
	var rotate=json.rotate || [0,0,0];

	var parts = [{
		//tv body
		type: 'cube',
		width: 150,
		height: 80,
		depth: 5,
		translate: [0, y, 0],
		op: '+',
		style: {
			'm.type': 'phong',
			'm.color': '#2D2F31',
			'm.ambient': '#2D2F31',
			'm.normalmap.image':'../room/images/metal_normalmap.jpg',
			'm.texture.repeat': new mono.Vec2(10,6),
			'm.specularStrength': 100,
		},
	},{
		//'tv cut off',
		type: 'cube',
		width: 130,
		height: 75,
		depth: 5,
		translate: [0, y+edgeY, edgeX],
		op: '-',
		style: {
			'm.type': 'phong',
			'm.color': '#2D2F31',
			'm.ambient': '#2D2F31',
			'm.normalmap.image':'../room/images/metal_normalmap.jpg',
			'm.texture.repeat': new mono.Vec2(10,6),
			'm.specularStrength': 100,
		},
	},{
		//'tv screen',
		type: 'cube',
		width: 130,
		height: 75,
		depth: 1,
		translate: [0, y+edgeY, 1.6],
		op: '+',
		style: {
			'm.type': 'phong',
			'm.specularStrength': 200,
			'front.m.texture.image': picture,
		},
	}];

	parts.push({
		//tv stand
		type: 'cube',
		width: 70,
		height: y+40,
		depth: 5,
		op: '+',
		translate: [0, 0, -4],
		style: {
			'm.type': 'phong',
			'm.color': '#2D2F31',
			'm.ambient': '#2D2F31',
			'm.normalmap.image':'../room/images/metal_normalmap.jpg',
			'm.texture.repeat': new mono.Vec2(5,5),
			'm.specularStrength': 10,
		},
	});
	parts.push({
		//tv bottom
		type: 'cube',
		width: 120,
		height: 5,
		depth: 50,
		floorShadow: true,
		op: '+',
		style: {
			'm.type': 'phong',
			'm.color': '#2D2F31',
			'm.ambient': '#2D2F31',
			'm.normalmap.image':'../room/images/metal_normalmap.jpg',
			'm.texture.repeat': new mono.Vec2(5,5),
			'm.specularStrength': 10,
		},
	});

	var tv=demo.Default.createCombo(parts);
	tv.setRotation(rotate[0], rotate[1], rotate[2]);
	tv.setPosition(x, 0, z);
	box.add(tv);
	return parts;
});

demo.Default.registerCreator('mono-island', function(box, json){
	var translate=json.translate || [0,0,0];
	var x=translate[0],
		y=translate[1],
		z=translate[2];
	var rotate=json.rotate || [0,0,0];

 	 var desk = 'M367.718,0.573c6.593,0,10.814,5.148,16.3,14.649l8.954,15.451c5.51,9.546,9.173,17.408,2.216,24.417'+
            'c-2.187,1.669-63.375,48.579-80.999,79.106c-1.697,2.94-53.291,92.303-54.988,95.242c-17.624,30.527-27.657,106.972-28.01,109.7'+
            'c-2.589,9.53-11.229,10.288-22.252,10.288h-17.876c-11.023,0-19.664-0.758-22.254-10.287'+
            'c-0.352-2.728-10.383-79.174-28.009-109.698c-1.888-3.276-54.562-94.507-54.987-95.245C68.186,103.668,6.999,56.759,4.813,55.09'+
            'c-6.959-7.01-3.296-14.872,2.215-24.417l8.922-15.452c5.485-9.5,9.707-14.648,16.298-14.648c1.176,0,2.433,0.175,3.739,0.52'+
            'c2.539,1.059,73.757,30.593,109.007,30.593h109.976c35.25,0,106.47-29.534,109.008-30.593Z';
     var node = demo.Default.createShapeNode(drawPath(desk), 10, x,y+75,z);
     node.s({
     	'm.color': '#464646',
     	'm.ambient': '#464646',
     });
     node.setRotation(rotate[0], rotate[1], rotate[2]);
     box.add(node);

     var node01 = demo.Default.createPathCube(drawPath(desk), 2, 10, x, y+75, z+3);

     node01.s({
     	'm.color': '#c0c0c0',
     	'm.ambient': '#c0c0c0',
     });
     node01.setRotation(rotate[0], rotate[1], rotate[2]);
     node01.setScale(1.008,1.008,1.008);
     box.add(node01);

    

     var desk1 = 'M204.904,328.822c-1.811-57.041,11.75-115.271,42.383-168.331c30.645-53.076,74.311-93.943,124.634-120.897l-4.964-8.502'+
		'c-48.495,30.087-105.704,47.459-166.971,47.459c-61.286,0-118.512-17.383-167.017-47.487l-4.891,8.555'+
		'c50.304,26.954,93.953,67.813,124.586,120.871c30.644,53.076,44.202,111.326,42.384,168.385L204.904,328.822';
		
     var node1 = demo.Default.createShapeNode(drawPath(desk1), 120, x, y, z);
     node1.s({
     	'm.color': '#7D7D7D',
     	'm.ambient': '#7D7D7D',
     });
     node1.setRotation(rotate[0], rotate[1], rotate[2]);
     box.add(node1);

     var desk11 = 'M198.131,325.858c1.289-58.379-13.506-116.011-42.868-166.868C125.904,108.14,83.4,66.516,32.206,38.444l1.832-3.204'+
	'C83.95,65.546,141.261,81.551,199.986,81.551c58.718,0,116.02-15.999,165.927-46.298l1.856,3.179'+
	'c-51.201,28.072-93.716,69.702-123.079,120.56c-29.36,50.853-44.155,108.478-42.867,166.848L198.131,325.858z';
     var node11 = demo.Default.createPathCube(drawPath(desk11), 6, 6, x, y+120, z);

     node11.s({
     	'm.color': '#c0c0c0',
     	'm.ambient': '#c0c0c0',
     });
     node11.setRotation(rotate[0], rotate[1], rotate[2]);
     box.add(node11);

     var desk2 = 'M200,179.97L160.172,110.988L239.827,110.988';

     var node2 = demo.Default.createShapeNode(drawPath(desk2), 50, x, y+120, z);
     node2.s({
     	'm.color': '#555555',
     	'm.ambient': '#555555',
     });
     node2.setRotation(rotate[0], rotate[1], rotate[2]);
     box.add(node2);

     var chairObjects = [
	     	{
	     		translate: [80, 40, 0],
			 	rotate: [0, Math.PI/9*5, 0]
			},{
				translate: [170, 40, -10],
			 	rotate: [0, Math.PI/2, 0]
			},{
				translate: [280, 40, 0],
			 	rotate: [0, Math.PI/9*4, 0]
			},{
				translate: [340, 40, -100],
			 	rotate: [0, Math.PI/9*11, 0]
			},{
	     		translate: [290, 40, -180],
			 	rotate: [0, Math.PI/18*21, 0]
			},{
				translate: [250, 40, -260],
			 	rotate: [0, Math.PI/18*19, 0]
			},{
				translate: [50, 40, -100],
			 	rotate: [0, Math.PI/18*33, 0]
			},{
	     		translate: [100, 40, -180],
			 	rotate: [0, Math.PI/18*34, 0]
			},{
				translate: [150, 40, -260],
			 	rotate: [0, Math.PI/18*35, 0]
			}
     ];

     for(var i = 0; i < chairObjects.length; i++){
     	var chair = chairObjects[i];
     	var creator = demo.Default.getCreator('mono-staff-chair');
	     if(creator){
			var chairobj = creator(box, chair, node1);
		 }
     }

	 //create tv
     var tvs = [{
     			translate: [200, 25, -109],
			 	rotate: [0, 0, 0]
	    	 },{
	     		translate: [222, 25, -147],
			 	rotate: [0, Math.PI/3*2, 0]
	     	},{
	     		translate: [178, 25, -147],
			 	rotate: [0, Math.PI/3*4, 0]
	     	}];
     for(var i = 0; i < tvs.length; i++){
     	var tvjson = tvs[i];
     	var screenCreator = demo.Default.getCreator('mono_table_tv');
	    if(screenCreator){
	     	var mono_screen = screenCreator(box, tvjson);
	     	mono_screen.setParent(node2);
	    }
     }

     //create screen
     var screens = [{
	     		translate: [80, 98, -50],
			 	rotate: [0, Math.PI/9, 0]
			},{
				translate: [125, 98, -62],
			 	rotate: [0, Math.PI/18, 0]
			},{
				translate: [170, 98, -67],
			 	rotate: [0, 0, 0]
			},{
	     		translate: [215, 98, -67],
			 	rotate: [0, 0, 0]
			},{
				translate: [260, 98, -62],
			 	rotate: [0, -Math.PI/18, 0]
			},{
				translate: [305, 98, -50],
			 	rotate: [0, -Math.PI/9, 0]
			},{
	     		translate: [325, 98, -80],
			 	rotate: [0, Math.PI/9*7, 0]
			},{
				translate: [295, 98, -110],
			 	rotate: [0, Math.PI/18*13, 0]
			},{
				translate: [265, 98, -145],
			 	rotate: [0, Math.PI/18*12.5, 0]
			},{
	     		translate: [245, 98, -185],
			 	rotate: [0, Math.PI/18*11.5, 0]
			},{
				translate: [225, 98, -230],
			 	rotate: [0, Math.PI/9*5.5, 0]
			},{
				translate: [215, 98, -270],
			 	rotate: [0, Math.PI/9*5, 0]
			},{
	     		translate: [65, 98, -75],
			 	rotate: [0, -Math.PI/9*7, 0]
			},{
				translate: [100, 98, -110],
			 	rotate: [0, -Math.PI/18*13, 0]
			},{
				translate: [130, 98, -145],
			 	rotate: [0, -Math.PI/18*12.5, 0]
			},{
	     		translate: [150, 98, -185],
			 	rotate: [0, -Math.PI/18*11.5, 0]
			},{
				translate: [170, 98, -230],
			 	rotate: [0, -Math.PI/9*5.5, 0]
			},{
				translate: [180, 98, -270],
			 	rotate: [0, -Math.PI/9*5, 0]
			}];
     for(var i = 0; i < screens.length; i++){
     	var screenjson = screens[i];
     	var screenCreator = demo.Default.getCreator('mono_table_screen');
	    if(screenCreator){
	     	var mono_screen = screenCreator(box, screenjson);
	     	mono_screen.setParent(node1);
	    }
     }  
});

demo.Default.registerCreator('mono_table_screen', function(box, json){
	var rotate = json.rotate || [0,0,0];
	var scale=json.scale || [1,1,1];
	var scaleX=scale[0],
		scaleY=scale[1],
		scaleZ=scale[2];
	// var delay=json.delay || true;
	var translate=json.translate || [0,0,0];
	var x=translate[0],
		y=translate[1],
		z=translate[2];

	var parts = [{
			//tv body
			type: 'cube',
			width: 35,
			height: 22,
			depth: 1.5,
			rotate: [-Math.PI/12, 0, 0],
			translate: [0, -12, 0],
			op: '+',
			style: {
				'm.type': 'phong',
				'm.color': '#888888',
				'm.ambient': '#888888',
				'm.specular': '#e0e0e0',
				'front.m.texture.image':'../room/images/dc.png',
				// 'm.normalmap.image':'../room/images/metal_normalmap.jpg',
				'm.specularStrength': 2,
			},
		},{
			//tv body
			type: 'cube',
			width: 10,
			height: 10,
			depth: 1.5,
			rotate: [Math.PI/12, 0, 0],
			translate: [0, -10, -3],
			op: '+',
			style: {
				'm.type': 'phong',
				'm.color': '#888888',
				'm.ambient': '#888888',
				'm.specularStrength': 50,
			}
		}]

	var monoscreen=demo.Default.createCombo(parts);
	monoscreen.setRotation(rotate[0], rotate[1], rotate[2]);
	monoscreen.setPosition(x, y, z);
	box.add(monoscreen);

	return monoscreen;
});

demo.Default.registerCreator('mono_table_tv', function(box, json){
	var rotate = json.rotate || [0,0,0];
	var scale=json.scale || [1,1,1];
	var scaleX=scale[0],
		scaleY=scale[1],
		scaleZ=scale[2];
	// var delay=json.delay || true;
	var translate=json.translate || [0,0,0];
	var x=translate[0],
		y=translate[1],
		z=translate[2];

	var monoscreen = new mono.Cube(76, 50, 3);
	monoscreen.setPosition(x,y,z);
	monoscreen.setRotation(rotate[0],rotate[1],rotate[2]);
	monoscreen.s({				
			'm.type': 'phong',
			'm.color': '#888888',
			'm.ambient': '#888888',
			'front.m.texture.image':'../room/images/tv.jpg',
			'm.specularStrength': 50,
		});
	box.add(monoscreen);
	return monoscreen;
});

demo.Default.registerFilter('mono_gb_wall', function(box, json){
	var translate=json.translate || [0,0,0];
	var x=translate[0],
		y=translate[1],
		z=translate[2],
		picture = json.picture || '../room/images/bg-wall.jpg';
	return {
		type: 'cube',
		width: json.width,
		height: json.height,
		depth: 1,
		translate: [x, y, z],
		rotate: json.rotate,
		op: '+',
		style: {
			'm.type': 'phong',
			'm.color': '#BEC9BE',
			'm.ambient': '#BEC9BE',
			'front.m.texture.image': picture,
		}
	};
});

demo.Default.registerCreator('mono-staff-chair', function(box, json, parent){
	var translate=json.translate || [0,0,0];
	var x=translate[0],
		y=translate[1],
		z=translate[2];
	var rotate=json.rotate || [0,0,0];
	var delay = json.delay || true;

	var loader=function(x, y, z, rotateX, rotateY, rotateZ){
		var time1=new Date().getTime();
		var templates = demo.Default.getTemplates('mono-staff-chair');
		var chair = templates.clone();
		chair.setPosition(x, y, z);
		chair.setRotation(rotate[0], rotate[1], rotate[2]);
		box.addByDescendant(chair);
		chair.setParent(parent);
		var time2 = new Date().getTime();
		console.log('chair loaded. time used: '+(time2-time1));
	};

	if(delay){
		var loaderFunc=function(x, y, z, rotateX, rotateY, rotateZ){
			return function(){
				loader(x, y, z, rotateX, rotateY, rotateZ);
			};
		};
		setTimeout(loaderFunc(x,y,z,rotate[0],rotate[1],rotate[2]), demo.Default.getRandomLazyTime());					
	}else{					
		loader(x,y,z,rotate[0],rotate[1],rotate[2]);
	}
})

demo.Default.registerCreator('mono-conf-table', function(box, json){
	var translate=json.translate || [0,0,0];
	var x=translate[0],
		y=translate[1],
		z=translate[2];
	var picture=json.picture || '../room/images/wood01.png';
	var rotate=json.rotate || [0,0,0];
	var legsPos = [{x: -192, z: -42},
				  {x: -192, z: 42},
				  {x: 0, z: -42},
				  {x: 0, z: 42},
				  {x: 192, z: -42},
				  {x: 192, z: 42}];

	var parts = [{
		//table body
		type: 'cube',
		width: 400,
		height: 3,
		depth: 120,
		translate: [0, 75, 0],
		op: '+',
		style: {
			'm.type': 'phong',
			'm.color': '#FFFFFF',
			'm.ambient': '#FFFFFF',
			'm.texture.image': picture,
			'm.normalmap.image':'../room/images/rack_inside.png',
			'm.texture.repeat': new mono.Vec2(1,1),
			'm.specularStrength': 10,
		},
	}];
	for(var i = 0; i < legsPos.length; i++){
		var legPos = legsPos[i];
		parts.push({
				//table leg
				type: 'cylinder',
				topRadius: 3,
				bottomRadius: 3,
				height: 75,
				translate: [legPos.x, 0, legPos.z],
				op: '+',
				style: {
					'm.type': 'phong',
					'm.color': '#838383',
					'm.ambient': '#838383',
					'm.normalmap.image':'../room/images/rack_inside.png',
					'm.specularStrength': 10,
				}
			});
	}

	var confTable = demo.Default.createCombo(parts);
	confTable.setRotation(rotate[0], rotate[1], rotate[2]);
	confTable.setPosition(x, 0, z);
	box.add(confTable);
});

demo.Default.registerFilter('mono-conf-chairs',function(box, json){
	var objects=[];
	var translates=json.translates;
	var rotates=json.rotates || [];
	if(translates){
		for(var i=0;i<translates.length;i++){
			var translate=translates[i];
			var rotate=rotates[i];
			var chair={
				type: 'mono-conf-chair',
				floorShadow: true,
				translate: translate,
				rotate: rotate,
			};
			demo.Default.copyProperties(json, chair, ['type', 'translates', 'translate', 'rotates']);
			objects.push(chair);
		}
	}
	return objects;
});

demo.Default.registerCreator('mono-conf-chair', function(box, json){
	var translate=json.translate || [0,0,0];
	var delay = json.delay || true;
	var x=translate[0],
		y=translate[1],
		z=translate[2];
	var rotate=json.rotate || [0,0,0];

	var loader=function(x, y, z, rotateX, rotateY, rotateZ){
		var time1=new Date().getTime();
		var templates=demo.Default.getTemplates('mono-conf-chair');
		var chair = templates.clone();
		chair.setPosition(x, y, z);
		chair.setRotation(rotateX, rotateY, rotateZ);
		box.addByDescendant(chair);
		// var time2 = new Date().getTime();
		// console.log('chair loaded. time used: '+(time2-time1));
	};

	if(delay){
		var loaderFunc=function(x, y, z, rotateX, rotateY, rotateZ){
			return function(){
				loader(x, y, z, rotateX, rotateY, rotateZ);
			};
		};
		setTimeout(loaderFunc(x,y,z,rotate[0],rotate[1],rotate[2]), demo.Default.getRandomLazyTime());					
	}else{					
		loader(x,y,z,rotate[0],rotate[1],rotate[2]);
	}
});

demo.Default.registerFilter('building', function(box, json){
	var translate=json.translate || [0,0,0];
	var x=translate[0],
		y=translate[1],
		z=translate[2];
	var rotate=json.rotate || [0,0,0];
	var parts = [{//激活区域：PS整车排放及性能试验室
			type: 'cube',
			width: 160,
			height: 58,
			depth: 60,
	        sideColor: '#759bc2',
	        topColor: '#759bc2',
			translate: [-252, 0, -170],
			style: {
				'm.type': 'phong',
				'm.normalScale': new mono.Vec2(0.2,0.2),
				'm.envmap.image': ['./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png'],	
				// 'm.reflectRatio': 0.8,
				// 'left.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
				// 'right.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				// 'front.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				// 'back.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
			},
			client:{
				'lazy.function': 'loadBuilding2',
			},
		},{//激活区域：PS整车排放及性能试验室
			type: 'cube',
			width: 70,
			height: 58,
			depth: 100,
	        sideColor: '#759bc2',
	        topColor: '#759bc2',
			translate: [-297, 0, -100],
			style: {
				'm.type': 'phong',
				'm.normalScale': new mono.Vec2(0.2,0.2),
				'm.envmap.image': ['./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png'],	
				// 'm.reflectRatio': 0.8,
				// 'left.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
				// 'right.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				// 'front.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				// 'back.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
			},
			client:{
				'lazy.function': 'loadBuilding2',
			},
		},{//激活区域：试验室
			type: 'cube',
			width: 224,
			height: 48,
			depth: 60,
	        sideColor: '#759bc2',
	        topColor: '#759bc2',
			translate: [110, 0, -88],
			style: {
				'm.type': 'phong',
				'm.normalScale': new mono.Vec2(0.2,0.2),
				'm.envmap.image': ['./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png'],	
				// 'm.reflectRatio': 0.8,
				// 'left.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
				// 'right.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				// 'front.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				// 'back.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
			},
			client:{
				'lazy.function': 'loadBuilding1',
			},
		},{
			//王港前排
			type: 'cube',
			width: 660,
			height: 50,
			depth: 160,
			translate: [0, 0, 70],
	        sideColor: '#FFFFFF',
	        topColor: '#759bc2',
			style: {
				'm.type': 'phong',
				'm.texture.image': './js/plugins/eim/images/building.png',
				'm.texture.repeat': new mono.Vec2(10,1),
				'top.m.texture.repeat': new mono.Vec2(10,2),
				'top.m.texture.image': './js/plugins/eim/images/building_side.png',
				// 'm.normalmap.image':'./js/plugins/eim/images/building_normalmap.png',
				// 'm.normalScale': new mono.Vec2(0.2,0.2),
				'm.envmap.image': ['./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png'],	
				// 'm.reflectRatio': 0.8,
				// 'left.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
				// 'right.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				// 'front.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				// 'back.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
			}
		},{//王港主楼T字部分
			type: 'cube',
			width: 264,
			height: 50,
			depth: 360,
			translate: [-198, 0, -40],
	        sideColor: '#FFFFFF',
	        topColor: '#759bc2',
			style: {
				'm.type': 'phong',
				'm.texture.image': './js/plugins/eim/images/building.png',
				'm.texture.repeat': new mono.Vec2(4,1),
				'top.m.texture.repeat': new mono.Vec2(4,4),
				'top.m.texture.image': './js/plugins/eim/images/building_side.png',
				// 'm.normalmap.image':'./js/plugins/eim/images/building_normalmap.png',
				'm.normalScale': new mono.Vec2(0.2,0.2),
				'm.envmap.image': ['./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png'],	
				'm.reflectRatio': 0.8,
				'left.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
				'right.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				'front.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				'back.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
			}
		},{//王港辅楼
			type: 'cube',
			width: 220,
			height: 38,
			depth: 160,
			translate: [110, 0, -140],
			style: {
				'm.type': 'phong',
				'm.texture.image': './js/plugins/eim/images/building.png',
				'm.texture.repeat': new mono.Vec2(4,0.5),
				'top.m.texture.repeat': new mono.Vec2(4,2),
				'm.normalmap.image':'./js/plugins/eim/images/building_normalmap.png',
				'm.normalScale': new mono.Vec2(0.2,0.2),
				'm.envmap.image': ['./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png'],	
				'm.reflectRatio': 0.8,
				'left.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
				'right.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				'front.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				'back.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
			},
			client:{
				'lazy.function': 'loadBuilding1',
			},

		},{//王港辅楼
			type: 'cube',
			width: 90,
			height: 38,
			depth: 90,
			translate: [265, 0, -160],
			style: {
				'm.type': 'phong',
				'm.texture.image': './js/plugins/eim/images/building.png',
				'm.texture.repeat': new mono.Vec2(2,2),
				'top.m.texture.repeat': new mono.Vec2(2,1),
				'm.normalmap.image':'./js/plugins/eim/images/building_normalmap.png',
				'm.normalScale': new mono.Vec2(0.2,0.2),
				'm.envmap.image': ['./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png'],	
				'm.reflectRatio': 0.8,
				'left.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
				'right.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				'front.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				'back.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
			}
		},{
			type: 'annotation',
			label: '结构试验室',
			text: '【双击建筑进入】结构试验室',
			translate: [100, 70, -80],
		},{
			type: 'annotation',
			label: 'PS整车排放及性能试验室',
			text: '【双击建筑进入】PS整车排放及性能试验室',
			translate: [-330, 80, -100],
		},{//前排灰色办公楼凸出门窗1
			type: 'cube',
			width: 100,
			height: 52,
			depth: 30,
			translate: [150, 0, 175],
			style: {
				'm.color': '#FFFFFF',
				'm.ambient': '#FFFFFF',
				'm.specular': '#FFFFFF',
				'm.type': 'phong',
				'm.texture.image': './js/plugins/eim/images/building_side.png',
				'm.texture.repeat': new mono.Vec2(40,1),
				'front.m.texture.image': './js/plugins/eim/images/bdoor.png',
				'front.m.texture.repeat': new mono.Vec2(1,1),
				'front.m.normalmap.image': './js/plugins/eim/images/bdoor_normalmap.png',
				'front.m.normalScale': new mono.Vec2(0.3,0.3),
				'left.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
				'right.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				'front.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				'back.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
			},
		},{//前排灰色办公楼凸出门窗2
			type: 'cube',
			width: 100,
			height: 52,
			depth: 30,
			translate: [-150, 0, 175],
			style: {
				'm.color': '#FFFFFF',
				'm.ambient': '#FFFFFF',
				'm.specular': '#FFFFFF',
				'm.type': 'phong',
				'm.texture.image': './js/plugins/eim/images/building_side.png',
				'm.texture.repeat': new mono.Vec2(40,1),
				'front.m.texture.image': './js/plugins/eim/images/bdoor.png',
				'front.m.texture.repeat': new mono.Vec2(1,1),
				'front.m.normalmap.image': './js/plugins/eim/images/bdoor_normalmap.png',
				'front.m.normalScale': new mono.Vec2(0.3,0.3),
				'left.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
				'right.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				'front.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				'back.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
			},
		},{//前排灰色办公楼
			type: 'cube',
			width: 650,
			height: 40,
			depth: 80,
			translate: [0, 0, 140],
			style: {
				'm.type': 'phong',
				'm.color': '#FFFFFF',
				'm.ambient': '#FFFFFF',
				'm.specular': '#FFFFFF',
				'm.texture.image': './js/plugins/eim/images/building_side.png',
				'm.texture.repeat': new mono.Vec2(120,12),
				'left.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
				'right.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				'front.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				'back.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
			},
		},{//后排灰色办公楼1
			type: 'cube',
			width: 320,
			height: 50,
			depth: 50,
			translate: [158, 0, -200],
			style: {
				'm.type': 'phong',
				'm.color': '#FFFFFF',
				'm.ambient': '#FFFFFF',
				'm.specular': '#FFFFFF',
				'm.texture.image': './js/plugins/eim/images/building_side.png',
				'm.texture.repeat': new mono.Vec2(40,8),
				'left.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
				'right.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				'front.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				'back.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
			},
		},{//后排灰色办公楼2
			type: 'cube',
			width: 60,
			height: 50,
			depth: 100,
			translate: [288, 0, -130],
			style: {
				'm.type': 'phong',
				'm.color': '#FFFFFF',
				'm.ambient': '#FFFFFF',
				'm.specular': '#FFFFFF',
				'm.texture.image': './js/plugins/eim/images/building_side.png',
				'm.texture.repeat': new mono.Vec2(10,15),
				'left.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
				'right.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				'front.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				'back.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
			},
		},{//最后排灰色办公楼2-1
			type: 'cube',
			width: 130,
			height: 50,
			depth: 80,
			translate: [-68, 0, -368],
			style: {
				'm.type': 'phong',
				'm.color': '#FFFFFF',
				'm.ambient': '#FFFFFF',
				'm.specular': '#FFFFFF',
				'm.texture.image': './js/plugins/eim/images/building_side.png',
				'm.texture.repeat': new mono.Vec2(30,10),
				'left.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
				'right.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				'front.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				'back.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
			},
		},{//最后排灰色办公楼2-2
			type: 'cube',
			width: 30,
			height: 40,
			depth: 80,
			translate: [8, 0, -368],
			style: {
				'm.type': 'phong',
				'm.color': '#FFFFFF',
				'm.ambient': '#FFFFFF',
				'm.specular': '#FFFFFF',
				'm.texture.image': './js/plugins/eim/images/building_side.png',
				'm.texture.repeat': new mono.Vec2(30,10),
				'left.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
				'right.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				'front.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				'back.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
			},
		},{//最后排灰色办公楼1
			type: 'cube',
			width: 160,
			height: 30,
			depth: 50,
			translate: [-268, 0, -380],
			style: {
				'm.type': 'phong',
				'm.color': '#FFFFFF',
				'm.ambient': '#FFFFFF',
				'm.specular': '#FFFFFF',
				'm.texture.image': './js/plugins/eim/images/building_side.png',
				'm.texture.repeat': new mono.Vec2(30,10),
				'left.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
				'right.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				'front.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				'back.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
			},
		},{//最后排灰色办公楼3
			type: 'cube',
			width: 160,
			height: 30,
			depth: 50,
			translate: [268, 0, -380],
			style: {
				'm.type': 'phong',
				'm.color': '#FFFFFF',
				'm.ambient': '#FFFFFF',
				'm.specular': '#FFFFFF',
				'm.texture.image': './js/plugins/eim/images/building_side.png',
				'm.texture.repeat': new mono.Vec2(30,10),
				'left.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
				'right.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				'front.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				'back.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
			},
		},{
			//玻璃窗顶1
			type: 'cube',
			width: 660,
			height: 5,
			depth: 160,
			translate: [0, 50, 70],
			style: {
				'm.texture.image': './js/plugins/eim/images/door-grass.png',
				'm.transparent': true,
				'm.opacity': 1,
				'left.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
				'right.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				'front.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				'back.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
			}
		},{
			//玻璃窗顶2
			type: 'cube',
			width: 264,
			height: 5,
			depth: 200,
			translate: [-198, 50, -120],
			style: {
				'm.texture.image': './js/plugins/eim/images/door-grass.png',
				'm.transparent': true,
				'm.opacity': 1,
				'left.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
				'right.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				'front.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				'back.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
			},
			client:{
				'lazy.function': 'loadBuilding2',
			}
		},{
			//玻璃窗副楼1
			type: 'cube',
			width: 220,
			height: 5,
			depth: 160,
			translate: [110, 38, -140],
			style: {
				'm.texture.image': './js/plugins/eim/images/door-grass.png',
				'm.transparent': true,
				'm.opacity': 1,
				'left.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
				'right.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				'front.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				'back.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
			},
			client:{
				'lazy.function': 'loadBuilding2',
			}
		},{
			//玻璃副楼2
			type: 'cube',
			width: 90,
			height: 5,
			depth: 90,
			translate: [265, 38, -160],

			style: {
				'm.texture.image': './js/plugins/eim/images/door-grass.png',
				'm.transparent': true,
				'm.opacity': 1,
				'left.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
				'right.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				'front.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				'back.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
			},
			client:{
				'lazy.function': 'loadBuilding2',
			}
		},{//门卫
			type: 'cube',
			width: 20,
			height: 15,
			depth: 30,
			translate: [0, 0, 310],
			style: {
				'm.type': 'phong',
				'm.color': '#FFFFFF',
				'm.ambient': '#FFFFFF',
				'm.specular': '#FFFFFF',
				'm.texture.image': './js/plugins/eim/images/building_side.png',
				'm.texture.repeat': new mono.Vec2(4,6),
				'left.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
				'right.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				'front.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
				'back.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
			},
		},{//大门喷泉1
			type: 'cube',
			width: 20,
			height: 5,
			depth: 20,
			translate: [0, 0, 240],
	        sideColor: '#599cbf',
	        topColor: '#599cbf',
			scale: [1,1,1],
			style: {
				'm.type': 'phong',
				'm.normalScale': new mono.Vec2(0.2,0.2),
				'm.envmap.image': ['./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png'],	
				
			},
		},{//大门喷泉1
			type: 'cylinder',
			width: 30,
			height: 5,
			depth: 40,
			translate: [0, 0, 250],
	        sideColor: '#599cbf',
	        topColor: '#599cbf',
			scale: [1,1,1],
			style: {
				'm.type': 'phong',
				'm.normalScale': new mono.Vec2(0.2,0.2),
				'm.envmap.image': ['./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png'],	
				
			},
		},{//大门喷泉1
			type: 'cylinder',
			width: 30,
			height: 5,
			depth: 40,
			translate: [0, 0, 230],
	        sideColor: '#599cbf',
	        topColor: '#599cbf',
			scale: [1,1,1],
			style: {
				'm.type': 'phong',
				'm.normalScale': new mono.Vec2(0.2,0.2),
				'm.envmap.image': ['./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png','./js/plugins/eim/images/sky.png'],	
				
			},
		}
	];

	// for(var i = 0; i < 9; i++){
	// 	var column = {
	// 		type: 'cube',
	// 		width: 5,
	// 		height: 3,
	// 		depth: 30,
	// 		translate: [(i-4)*15, 47, 70],
	// 		style: {
	// 			'm.texture.image': './js/plugins/eim/images/building_side.png',
	// 			'left.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
	// 			'right.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
	// 			'front.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
	// 			'back.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
	// 		},
	// 	}
	// 	parts.push(column);

	// }

	return parts;
	
});

demo.Default.registerFilter('lawn', function(box, json){
	var width=json.width || 50;
	var depth=json.depth || 50;
	var translate = json.translate || [0,0,0];
	return {
		type: 'cube',
		width: width,
		height: 10,
		depth: depth,
		translate: translate,
		op: '+',
		style: {
			'm.type': 'phong',
			'm.color': 'green',
			'm.ambient': 'green',
			'top.m.color': '#ffffff',
			'top.m.ambient': '#ffffff',
			'top.m.type':'basic',
			'top.m.texture.image': './js/plugins/eim/images/caodi.jpg',
		}
	}
});

demo.Default.registerFilter('building-floor', function(box, json){
	var width=json.width || 842;
	var depth=json.depth || 780;
	return [{
		type: 'cube',
		width: width,
		height: 5,
		depth: depth,
		translate: [0, -1, 0],
		shadowHost: true,
		style: {
			'm.color': '#ffffff',
			'm.ambient': '#ffffff',
			'm.specular': '#FFFFFF',
			'm.type': 'phong',
			'top.m.texture.image': './js/plugins/eim/images/floor-3.jpg',
			'top.m.texture.repeat': new mono.Vec2(30, 30),
			'm.normalmap.image': './js/plugins/eim/images/floor_normalmap.jpg',
		}
	},{
		type: 'pathNode',
		radius: 50,
		pathImage: './js/plugins/eim/images/floor_way.jpg',
		repeat: new mono.Vec2(20,2),
		translate: [0,5,0],
		scale: [1,0.1,1],
		data: [[400,-420],[400,350],['c',400,400,350,400],[-350,400],['c',-400,400,-400,350],[-400,-420]],
		// data: [[400,-400],[400,400],[-400,400],[-400,-400]],
	},{
		type: 'cube',
		width: 300,
		height: 5,
		depth: 240,
		translate: [205, 0, 235],
		style: {
			'm.type': 'phong',
			'm.color': 'green',
			'm.ambient': 'green',
			'top.m.color': '#ffffff',
			'top.m.ambient': '#ffffff',
			'top.m.type':'basic',
			'm.texture.image': './js/plugins/eim/images/caodi.jpg',
		}
	},{
		type: 'cube',
		width: 300,
		height: 5,
		depth: 240,
		translate: [-205, 0, 235],
		style: {
			'm.type': 'basic',
			'top.m.type':'basic',
			'm.texture.image': './js/plugins/eim/images/caodi.jpg',
		}
	},{
		type: 'cube',
		width: 710,
		height: 5,
		depth: 300,
		translate: [0, 1, -265],
		style: {
			'm.type': 'basic',
			'top.m.type':'basic',
			'm.texture.image': './js/plugins/eim/images/caodi.jpg',
		}
	}];
});


