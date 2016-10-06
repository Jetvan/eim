demo.Default.setEnvmap('envmap1', ['../room/images/room.jpg','../room/images/room.jpg','../room/images/room.jpg','../room/images/room.jpg','../room/images/room.jpg','../room/images/room.jpg']);

demo.Default.registerCreator('rack', function(box, json){
	var lazy=json.lazy || true;
	var translate=json.translate || [0,0,0];
	var x=translate[0],
		y=translate[1],
		z=translate[2];
	var width=json.width || 60;
	var height=json.height || 200;
	var depth=json.depth || 80;
	var severity=json.severity;

	var rack= new mono.Cube(width, height, depth);
	rack.s({				
		'm.color': '#557E7A',
		'left.m.lightmap.image':'../room/images/outside_lightmap.png',
		'right.m.lightmap.image':'../room/images/outside_lightmap.png',
		'front.m.lightmap.image':'../room/images/outside_lightmap.png',
		'back.m.lightmap.image':'../room/images/outside_lightmap.png',
		'top.m.normalmap.image':'../room/images/metal_normalmap.jpg',
		'left.m.normalmap.image':'../room/images/metal_normalmap.jpg',
		'right.m.normalmap.image':'../room/images/metal_normalmap.jpg',
		'back.m.normalmap.image':'../room/images/metal_normalmap.jpg',
		'top.m.specularmap.image': '../room/images/outside_lightmap.png',	
		'left.m.specularmap.image': '../room/images/outside_lightmap.png',	
		'right.m.specularmap.image': '../room/images/outside_lightmap.png',	
		'back.m.specularmap.image': '../room/images/outside_lightmap.png',	
		'top.m.envmap.image': demo.Default.getEnvmap('envmap1'),
		'left.m.envmap.image': demo.Default.getEnvmap('envmap1'),
		'right.m.envmap.image': demo.Default.getEnvmap('envmap1'),
		'back.m.envmap.image': demo.Default.getEnvmap('envmap1'),				
		'm.ambient': '#557E7A',
		'm.type':'phong',
		'm.specularStrength': 50,
		'front.m.texture.image':'../room/images/rack.png',
		'front.m.texture.repeat': new mono.Vec2(1,1),
		'front.m.specularmap.image':'../room/images/white.png',
		'front.m.color':'white',
		'front.m.ambient':'white',
		'front.m.specularStrength': 200,
		'front.m.envmap.image': demo.Default.getEnvmap('envmap1'),
	});
	rack.setPosition(x, height/2+1+y, z);	

	var loader=function(box, x, y, z, width, height, depth, severity, rack, json){
		var cube=rack;
		var cut=new mono.Cube(width*0.75, height-10, depth*0.7);
		cut.s({
			'm.color': '#333333',
			'm.ambient': '#333333',
			'm.lightmap.image': '../room/images/inside_lightmap.png',
			'bottom.m.texture.repeat': new mono.Vec2(2,2),			
			'left.m.texture.image': '../room/images/rack_panel.png',
			'right.m.texture.image': '../room/images/rack_panel.png',
			'back.m.texture.image': '../room/images/rack_panel.png',
			'back.m.texture.repeat': new mono.Vec2(1,1),
			'top.m.lightmap.image': '../room/images/floor.png',
		});
		cut.setPosition(x+0.5, cut.getHeight()/2+2+y, z+cube.getDepth()/2-cut.getDepth()/2+1);

		box.remove(rack);
		
		var newRack=new mono.ComboNode([rack, cut], ['-']);
		box.add(newRack);

		if(severity){
			var alarm = new mono.Alarm(newRack.getId(), newRack.getId(), severity);
			newRack.setStyle('alarm.billboard.vertical', true);
			box.getAlarmBox().add(alarm);
		}

		demo.Default.loadRackContent(box, x, y, z, width, height, depth, severity, rack, cut, json);
	};

	if(lazy){
		if(severity){
			var alarm = new mono.Alarm(rack.getId(), rack.getId(), severity);
			rack.setStyle('alarm.billboard.vertical', true);
			box.getAlarmBox().add(alarm);
		}
		box.add(rack);			
		var lazyLoadFunction = function(){
			loader(box, x, y, z, width, height, depth, severity, rack, json);
		};
		rack.setStyle('lazy.function', lazyLoadFunction);
	}else{		
		loader(box, x, y, z, width, height, depth, severity, rack, json);
	}
});

demo.Default.registerCreator('electric', function(box, json){
	var translate=json.translate || [0,0,0];
	var x=translate[0],
		y=translate[1],
		z=translate[2];
	var width=json.width || 60;
	var height=json.height || 200;
	var depth=json.depth || 80;

	var source= new mono.Cube(width, height, depth);
	source.s({				
		'left.m.lightmap.image':'../room/images/outside_lightmap.png',
		'right.m.lightmap.image':'../room/images/outside_lightmap.png',
		'front.m.lightmap.image':'../room/images/outside_lightmap.png',
		'back.m.lightmap.image':'../room/images/outside_lightmap.png',
		'top.m.normalmap.image':'../room/images/metal_normalmap.jpg',
		'left.m.normalmap.image':'../room/images/metal_normalmap.jpg',
		'right.m.normalmap.image':'../room/images/metal_normalmap.jpg',
		'back.m.normalmap.image':'../room/images/metal_normalmap.jpg',
		'm.specularmap.image': '../room/images/outside_lightmap.png',
		'top.m.envmap.image': demo.Default.getEnvmap('envmap1'),
		'left.m.envmap.image': demo.Default.getEnvmap('envmap1'),
		'right.m.envmap.image': demo.Default.getEnvmap('envmap1'),
		'back.m.envmap.image': demo.Default.getEnvmap('envmap1'),
		'm.color': '#F0F0F0',				
		'm.ambient': '#F0F0F0',
		'm.type':'phong',
		'm.specularStrength': 50,
		'front.m.texture.image':'../room/images/electric.jpg',
		'front.m.texture.repeat': new mono.Vec2(1,1),
		'front.m.specularmap.image':'../room/images/white.png',
		'front.m.color':'white',
		'front.m.ambient':'white',
		'front.m.specularStrength': 200,
	});
	source.setPosition(x, height/2+1+y, z);	
	box.add(source);	
});

demo.Default.registerCreator('plant', function(box, json){
	var scale=json.scale || [2,2,2];
	var scaleX=scale[0],
		scaleY=scale[1],
		scaleZ=scale[2];
	var delay=json.delay || true;
	var translate=json.translate || [0,0,0];
	var x=translate[0],
		y=translate[1],
		z=translate[2];

	var loader=function(x, y, z, scaleX, scaleY, scaleZ){
		var time1=new Date().getTime();
		var plant=demo.Default.createPlant(x, y, z, scaleX, scaleY, scaleZ);
		box.add(plant);
		var time2=new Date().getTime();
		//console.log('plant loaded. time used: '+(time2-time1));
	};

	if(delay){
		var loaderFunc=function(x, y, z, scaleX, scaleY, scaleZ){
			return function(){
				loader(x, y, z, scaleX, scaleY, scaleZ);
			};
		};
		setTimeout(loaderFunc(translate[0],translate[1],translate[2],scale[0],scale[1],scale[2]), demo.Default.getRandomLazyTime());					
	}else{					
		loader(translate[0],translate[1],translate[2],scale[0],scale[1],scale[2]);
	}
});

demo.Default.registerCreator('tree', function(box, json){
	var scale=json.scale || [2,2,2];
	var scaleX=scale[0],
		scaleY=scale[1],
		scaleZ=scale[2];
	var delay=json.delay || true;
	var translate=json.translate || [0,0,0];
	var x=translate[0],
		y=translate[1],
		z=translate[2];

	var loader=function(x, y, z, scaleX, scaleY, scaleZ){
		var time1=new Date().getTime();
		var tree=demo.Default.createTree(x, y, z, scaleX, scaleY, scaleZ);
		box.add(tree);
		var time2=new Date().getTime();
		//console.log('plant loaded. time used: '+(time2-time1));
	};

	if(delay){
		var loaderFunc=function(x, y, z, scaleX, scaleY, scaleZ){
			return function(){
				loader(x, y, z, scaleX, scaleY, scaleZ);
			};
		};
		setTimeout(loaderFunc(translate[0],translate[1],translate[2],scale[0],scale[1],scale[2]), demo.Default.getRandomLazyTime());					
	}else{					
		loader(translate[0],translate[1],translate[2],scale[0],scale[1],scale[2]);
	}
});

demo.Default.registerFilter('floor', function(box, json){
	var width=json.width || 1000;
	var depth=json.depth || 1000;
	return {
		type: 'cube',
		width: width,
		height: 10,
		depth: depth,
		translate: [0, -10, 0],
		shadowHost: true,
		op: '+',
		style: {
			'm.type': 'phong',
			'm.color': '#BEC9BE',
			'm.ambient': '#BEC9BE',
			'top.m.type':'basic',
			'top.m.texture.image': '../room/images/floor.png',
			'top.m.texture.repeat': new mono.Vec2(width/100, depth/100),
			'top.m.color': '#DAF0F5',
			'top.m.polygonOffset':true,
			'top.m.polygonOffsetFactor':3,
			'top.m.polygonOffsetUnits':3,
		}
	};
});

demo.Default.registerFilter('floor_cut', function(box, json){
	return {
		type: 'cube',
		width: 100,
		height: 100,
		depth: 100,
		op: '-',
		style: {
			'm.texture.image': '../room/images/floor.png',
			'm.texture.repeat': new mono.Vec2(4,4),
			'm.color': '#DAF0F5',
			'm.lightmap.image': '../room/images/outside_lightmap.png',
			'm.polygonOffset':true,
			'm.polygonOffsetFactor':3,
			'm.polygonOffsetUnits':3,
		}
	};
});

demo.Default.registerFilter('floor_box', function(box, json){
	return {
		type: 'cube',
		width: 100,
		height: 100,
		depth: 100,
		floorShadow: true,
		sideColor: '#C3D5EE',
		topColor: '#D6E4EC',
	};
});

demo.Default.registerFilter('plants', function(box, json){
	var objects=[];
	var translates=json.translates;
	if(translates){
		for(var i=0;i<translates.length;i++){
			var translate=translates[i];
			var plant={
				type: 'plant',
				floorShadow: false,
				scale: [2,2,2],
				translate: translate,
			};
			demo.Default.copyProperties(json, plant, ['type', 'translates', 'translate']);
			objects.push(plant);
		}
	}
	return objects;
});

demo.Default.registerFilter('trees', function(box, json){
	var objects=[];
	var translates=json.translates;
	if(translates){
		for(var i=0;i<translates.length;i++){
			var translate=translates[i];
			var tree={
				type: 'tree',
				floorShadow: true,
				scale: [2,2,2],
				translate: translate,
			};
			demo.Default.copyProperties(json, tree, ['type', 'translates', 'translate']);
			objects.push(tree);
		}
	}
	return objects;
});

demo.Default.registerFilter('electrics', function(box, json){
	var objects=[];
	var translates=json.translates;
	if(translates){
		for(var i=0;i<translates.length;i++){
			var translate=translates[i];
			var electric={
				type: 'electric',
				floorShadow: true,
				translate: translate
			};
			demo.Default.copyProperties(json, electric, ['type', 'translates', 'translate']);
			objects.push(electric);
		}
	}
	return objects;
});

demo.Default.registerFilter('racks', function(box, json){
	var objects=[];
	var translates=json.translates;
	var severities=json.severities || [];
	if(translates){
		for(var i=0;i<translates.length;i++){
			var translate=translates[i];
			var severity=severities[i];
			var rack={
				type: 'rack',
				floorShadow: true,
				translate: translate,
				severity: severity,
			};
			demo.Default.copyProperties(json, rack, ['type', 'translates', 'translate', 'severities']);
			objects.push(rack);
		}
	}
	return objects;
});

demo.Default.registerFilter('wall', function(box, json){	
	var objects=[];

	var wall = {
		type: 'path',
		op: '+',
		width: json.width || 20,
		height: json.height || 200,
		floorShadow: true,
		insideColor: json.insideColor || '#B8CAD5',
		outsideColor: json.outsideColor || '#A5BDDD',	
		asideColor: json.asideColor || '#D6E4EC',	
		zsideColor: json.zsideColor || '#D6E4EC',	
		topColor: '#D6E4EC',
		bottomColor: json.bottomColor || 'red',
		insideImage: json.insideImage,
		outsideImage: json.outsideImage,
		repeat: json.repeat,
		translate: json.translate,
		data:json.data,
	};	
	objects.push(wall);		

	if(json.children){	
		var children=demo.Default.filterJson(box, json.children);				
		objects=objects.concat(children);	
	}

	var comboChildren=[];
	var returnObjects=[];
	for(var i=0;i<objects.length;i++){
		var child=objects[i];
		if(child.op){
			comboChildren.push(child);
		}else{
			returnObjects.push(child);
		}
	}
	
	var combo=demo.Default.createCombo(comboChildren);
	if(json.style){
		combo.s(json.style);
	}
	box.add(combo);

	wall.shadowGhost=true;
	returnObjects.push(wall);
	return returnObjects;
});

demo.Default.registerFilter('window', function(box, json){
	var translate=json.translate || [0,0,0];
	var x=translate[0],
		y=translate[1],
		z=translate[2];
	var width=json.width || 100,
		height=json.height || 100,
		depth=json.depth || 50;
	var glassDepth=json.glassDepth || 4;
	var platformHeight=5,
		platformDepth=45,
		platformOffsetZ=10;

	var platform=json.platform;

	var cutoff={
		// window cut off
		type: 'cube',
		width: width,
		height: height,
		depth: depth, 
		translate: [x, y, z],
		op: '-',
		sideColor: '#B8CAD5',
		topColor: '#D6E4EC',				
	};

	var glass = {
		//window glass
		type: 'cube',
		width: width-0.5,
		height: height-0.5,
		depth: glassDepth,
		translate: [x, y, z],
		op: '+',
		style: {			
			'm.color':'#F0F0F0',
			'm.ambient':'#F0F0F0',
			'm.type':'phong',
			'm.specularStrength': 0.1,
			'm.envmap.image': demo.Default.getEnvmap('envmap1'),
			'm.specularmap.image': '../room/images/rack_inside_normal.jpg',	
			'm.texture.repeat': new mono.Vec2(10,5),
			'front.m.transparent': true,
			'front.m.opacity':0.4,
			'back.m.transparent': true,
			'back.m.opacity':0.4,
		},			
	};
	
	if(json.picture){
		glass.style['m.texture.image']=json.picture;
		glass.style['m.texture.repeat']=new mono.Vec2(1,1);
		glass.style['m.specularmap.image']=null;
		glass.style['front.m.opacity']=1;
		glass.style['back.m.opacity']=1;
	}

	var parts = [cutoff, glass];
			
	if(platform){
		parts.push({
			//window bottom platform.
			type: 'cube',
			width: width,
			height: platformHeight,
			depth: platformDepth, 
			translate: [x, y, z+platformOffsetZ],
			op: '+',
			sideColor: '#A5BDDD',
			topColor: '#D6E4EC',
		});
	}
	return parts;
});

demo.Default.registerCreator('tv', function(box, json){
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
		translate: [x, y, z],
		rotate: rotate,
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
		translate: [x, y+edgeY, z+edgeX],
		rotate: rotate,
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
		translate: [x, y+edgeY, z+1.6],
		rotate: rotate,
		op: '+',
		style: {
			'm.type': 'phong',
			'm.specularStrength': 200,
			'front.m.texture.image': picture,
		},
	}];

	var tv=demo.Default.createCombo(parts);
	box.add(tv);
});

demo.Default.registerFilter('door', function(box, json){
	var translate=json.translate || [0,0,0];
	var x=translate[0],
		y=translate[1],
		z=translate[2];
	var width=json.width || 205,
		height=json.height || 180,
		depth=json.depth || 26;	
	var frameEdge=10,
		frameBottomEdge=2;

	return [{
		//door frame.
		type: 'cube',
		width: width,
		height: height,
		depth: depth,
		translate: [x, y, z],
		op: '+',
		sideColor: '#C3D5EE',
		topColor: '#D6E4EC',
	},{
		//door cut off.
		type: 'cube',
		width: width-frameEdge,
		height: height-frameEdge/2-frameBottomEdge,
		depth: depth+2,
		op: '-',
		translate:[x,y+frameBottomEdge,z],
		sideColor: '#B8CAD5',
		topColor: '#D6E4EC',			
	},{
		//left door.
		type: 'cube',
		width: (width-frameEdge)/2-2,
		height: height-frameEdge/2-frameBottomEdge-2,
		depth: 2,
		translate:[x-(width-frameEdge)/4,frameBottomEdge+1,z],
		sideColor: 'orange',
		topColor: 'orange',
		style:{
			'm.type': 'phong',
			'm.transparent': true,
			'front.m.texture.image': '../room/images/door_left.png',					
			'back.m.texture.image': '../room/images/door_right.png',					
			'm.specularStrength': 100,
			'm.envmap.image': demo.Default.getEnvmap('envmap1'),
			'm.specularmap.image': '../room/images/white.png',	
		},
		client:{
			'animation': 'rotate.left.-90',
		},
	},{
		//right door.
		type: 'cube',
		width: (width-frameEdge)/2-2,
		height: height-frameEdge/2-frameBottomEdge-2,
		depth: 2,
		translate:[x+(width-frameEdge)/4,frameBottomEdge+1,z],
		sideColor: 'orange',
		topColor: 'orange',
		style:{
			'm.type': 'phong',
			'm.transparent': true,
			'front.m.texture.image': '../room/images/door_right.png',					
			'back.m.texture.image': '../room/images/door_left.png',					
			'm.specularStrength': 100,
			'm.envmap.image': demo.Default.getEnvmap('envmap1'),
			'm.specularmap.image': '../room/images/white.png',	
		},		
		client:{
			'animation': 'rotate.right.90',
		},
	}];
});

demo.Default.registerFilter('glass_wall', function(box, json){
	var translate=json.translate || [0,0,0];
	var x=translate[0],
		y=translate[1],
		z=translate[2];
	var width=json.width || 100,
		height=json.height || 200,
		depth=json.depth || 20;	
	var glassHeight=height*0.6;
	var rotate=json.rotate || [0,0,0];

	var parts=[{
		//wall body.
		type: 'cube',
		width: width,
		height: height,
		depth: depth,
		floorShadow: true,
		translate: [x, y, z],
		rotate: rotate,
		op: '+',
		sideColor: '#A5BDDD',
		topColor: '#D6E4EC',
	},{
		//wall middle cut off
		type: 'cube',
		width: width+2,
		height: glassHeight,
		depth: depth+2,
		translate: [x, (height-glassHeight)/3*2, z],
		rotate: rotate,
		op: '-',
		sideColor: '#A5BDDD',
		topColor: '#D6E4EC',
	},{
		//wall middle glass.
		type: 'cube',
		width: width,
		height: glassHeight,
		depth: 4,
		translate: [x, (height-glassHeight)/3*2, z],
		rotate: rotate,
		op: '+',
		sideColor: '#58ACFA',
		topColor: '#D6E4EC',
		style: {
			'm.transparent': true,
			'm.opacity':0.6,
			'm.color':'#01A9DB',
			'm.ambient':'#01A9DB',
			'm.type':'phong',
			'm.specularStrength': 100,
			'm.envmap.image': demo.Default.getEnvmap('envmap1'),
			'm.specularmap.image': '../room/images/rack_inside_normal.jpg',	
			'm.texture.repeat': new mono.Vec2(30, 5),
		},
	}];
	
	var wall=demo.Default.createCombo(parts);
	box.add(wall);

	var wallBody=parts[0];
	wallBody.shadowGhost=true;
	return [wallBody];
});

demo.Default.registerCreator('room_field', function(box, json){
	var translate=json.translate || [0,0,0];
	var x=translate[0],
		y=translate[1],
		z=translate[2];
	var height=json.height || 200;
	var rotate=json.rotate || [0,0,0];
	var pathData = json.data;
	var path;

	for(var j=0;j<pathData.length;j++){
		var point=pathData[j];
		if(path){
			path.lineTo(point[0],point[1], 0);
		}else{
			path=new mono.Path();
			path.moveTo(point[0],point[1], 0);
		}
	}

	var node = demo.Default.createShapeNode(path, height, x, y, z);
     node.s({
     	'm.color': '#7D7D7D',
     	'm.ambient': '#7D7D7D',
     	'm.texture.repeat': new mono.Vec2(2,2),	
     	'm.texture.image':'../room/images/bg-wall.jpg'
     });
     node.setRotation(rotate[0], rotate[1], rotate[2]);
     box.add(node);

});
