if(!demo){
	var demo={};
}

demo.Default={
	LAZY_MIN: 1000,
	LAZY_MAX: 6000,
	CLEAR_COLOR: '#000000',

	_envmaps: {},
	
	//all registered object creaters.
	_creators: {},

	//all registered object filters.
	_filters: {},

	//all registered object template.
	_templates: {},

	registerCreator: function(type, creator){
		this._creators[type] = creator;
	},
	
	getCreator: function(type){
		return this._creators[type];
	},
	
	registerFilter: function(type, filter){
		this._filters[type] = filter;
	},
	
	getFilter: function(type){
		return this._filters[type];
	},

	registerTemplates: function(type, template){
		this._templates[type] = template;
	},
	
	getTemplates: function(type){
		return this._templates[type];
	},
	
	setup: function(htmlElementId){	
		demo.Default.loadImages(['images/outside_lightmap.png','images/table_shadow.png','images/conf_table_shadow.png']);		
		var network= new mono.Network3D();

		var camera = new mono.PerspectiveCamera(30, 1.5, 30, 50000);
		camera.setPosition(1500,3200,4000);
		network.setCamera(camera);
		
		var interaction = network.getDefaultInteraction();
		interaction.yLowerLimitAngle=Math.PI/180*2;
		interaction.yUpLimitAngle=Math.PI/2;
		interaction.maxDistance=30000;
		interaction.minDistance=50;
		interaction.zoomSpeed=3;
		interaction.panSpeed=0.2;

		network.isSelectable = function(element){return false;};		
		document.getElementById(htmlElementId).appendChild(network.getRootView());
		mono.Utils.autoAdjustNetworkBounds(network,document.documentElement,'clientWidth','clientHeight');
		network.getRootView().addEventListener('dblclick', function(e){
			demo.Default.handleDoubleClick(e, network);
		});	

		demo.Default.setupLights(network.getDataBox());

		demo.Default.loadTempJson();
		var time1=new Date().getTime();
		var json= demo.Default.filterJson(network.getDataBox(), scenceJson.objects);
		//console.log(scenceJson);
		demo.Default.loadJson(network, json, scenceJson.clearColor);

		var time2=new Date().getTime();
	},

	setupLights: function(box){
		var pointLight = new mono.PointLight(0xFFFFFF,0.3);
		pointLight.setPosition(0,1000,-1000);
		box.add(pointLight);     
		
		var pointLight = new mono.PointLight(0xFFFFFF,0.3);
		pointLight.setPosition(0,1000,1000);
		box.add(pointLight);        

		var pointLight = new mono.PointLight(0xFFFFFF,0.3);
		pointLight.setPosition(1000,-1000,-1000);
		box.add(pointLight);        

		box.add(new mono.AmbientLight('white'));	
	},

	handleDoubleClick: function(e, network){
		var camera=network.getCamera();
		var interaction=network.getDefaultInteraction();
		var firstClickObject=demo.Default.findFirstObjectByMouse(network,e);
		if(firstClickObject){
			var element=firstClickObject.element;					
			var newTarget=firstClickObject.point;
			var oldTarget=camera.getTarget();
			demo.Default.animateCamera(camera, interaction, oldTarget, newTarget, function(){
				if(element.getClient('animation')){
					demo.Default.playAnimation(element, element.getClient('animation'));
				}				
			});
			if(element.getStyle('lazy.function')){
				var loader=element.getStyle('lazy.function');
				var time1=new Date().getTime();
				loader();
				var time2=new Date().getTime();
				//console.log('rack loaded. time used: ' + (time2-time1));
			}
		}else{
			var oldTarget=camera.getTarget();
			var newTarget=new mono.Vec3(0,0,0);
			demo.Default.animateCamera(camera, interaction, oldTarget, newTarget);
		}
	},

	getEnvmap: function(id){
		return this._envmaps[id];
	},
	setEnvmap: function(id, envmap){
		this._envmaps[id]=envmap;
	},

	copyProperties: function(from, to, ignores){
		if(from && to){
			for(var name in from){
				if(ignores && ignores.indexOf(name)>=0){
					//ignore.
				}else{
					to[name]=from[name];
				}
			}
		}
	},

	createAnnotationObject: function(json){
		var translate=json.translate || [0,0,0];
		var label = json.label;
		var text = json.text;
		var annotation=new mono.Annotation(label, text);		
		annotation.setPosition(translate[0], translate[1], translate[2]);
		return annotation;
	},

	createCubeObject: function(json){
		var translate=json.translate || [0,0,0];
		var width=json.width;
		var height=json.height;
		var depth=json.depth;
		var sideColor=json.sideColor;
		var topColor=json.topColor;

		var object3d=new mono.Cube(width, height, depth);				
		object3d.setPosition(translate[0], translate[1]+height/2, translate[2]);					
		object3d.s({
			'm.color': sideColor,
			'm.ambient': sideColor,
			'left.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
			'right.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
			'front.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
			'back.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
			'top.m.color': topColor,
			'top.m.ambient': topColor,						
			'bottom.m.color': topColor,
			'bottom.m.ambient': topColor,						
		});

		return object3d;
	},

	createCylinderObject: function(json){
		var translate=json.translate || [0,0,0];
		var radius = json.radius || 10;
		var topRadius = json.topRadius || radius;
		var bottomRadius = json.bottomRadius || radius;
		var height = json.height;
		var sideColor = json.sideColor || '#A5BDDD';

		var object3d = new mono.Cylinder(topRadius, bottomRadius, height);
		object3d.setPosition(translate[0], translate[1]+height/2, translate[2]);
		object3d.s({
			'm.normalType': mono.NormalTypeSmooth,
			'm.type': 'phong',
			'm.color': sideColor,
			'm.ambient': sideColor,
			'side.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
		});

		return object3d;
	},

	createPathObject: function(json){
		var translate=json.translate || [0,0,0];
		var pathWidth=json.width;
		var pathHeight=json.height;		
		var pathData=json.data;					
		var path=undefined;
		var pathInsideColor=json.insideColor;
		var pathOutsideColor=json.outsideColor;
		var pathAsideColor = json.asideColor || pathOutsideColor;
		var pathZsideColor = json.zsideColor || pathOutsideColor;
		var pathTopColor=json.topColor;
		var pathBottomColor = json.bottomColor || pathTopColor;
		var pathInsideImage = json.insideImage;
		var pathOutsideImage = json.outsideImage;
		var pathTopImage = json.topImage;
		var repeat = json.repeat || json.height;
		for(var j=0;j<pathData.length;j++){
			var point=pathData[j];
			if(path){
				path.lineTo(point[0],point[1], 0);
			}else{
				path=new mono.Path();
				path.moveTo(point[0],point[1], 0);
			}
		}
		var object3d=this.createWall(path, pathWidth, pathHeight, pathInsideColor, pathOutsideColor, pathAsideColor, pathZsideColor, pathTopColor, pathBottomColor,
			pathInsideImage, pathOutsideImage, pathTopImage, repeat);
		object3d.setPosition(translate[0], translate[1], -translate[2]);		
		return object3d;
	},

	createPathNodeObject : function(json){
		var translate=json.translate || [0,0,0];
		var scale = json.scale || [1, 1, 1];
		var radius=json.radius || 5;				
		var path=undefined;
		var pathData = json.data;
		var pathImage=json.pathImage;
		var repeat = json.repeat;
		for(var j=0;j<pathData.length;j++){
			var point=pathData[j];
			if(path){
				if(point[0] === 'c'){
					path.quadraticCurveTo(point[1],10,point[2],point[3],10,point[4]);
				}else{
					path.lineTo(point[0], 10, point[1]);
				}
			}else{
				path=new mono.Path();
				path.moveTo(point[0], 10, point[1]);
			}
		}
		var object3d=this.createPathNode(path, radius, pathImage, repeat, translate, scale);		
		return object3d;
	},

	filterJson: function(box, objects){
		var newObjects=[];

		for(var i=0; i<objects.length; i++){
			var object=objects[i];
			var type=object.type;
			var filter=this.getFilter(type);
			if(filter){
				var filteredObject=filter(box, object);
				if(filteredObject){
					if(filteredObject instanceof Array){
						newObjects=newObjects.concat(filteredObject);						
					}else{
						this.copyProperties(object, filteredObject, ['type']);
						newObjects.push(filteredObject);
					}
				}
			}else{
				newObjects.push(object);				
			}
		}
		
		return newObjects;
	},

	createCombo: function(parts){
		var children=[];		
		var ops=[];
		var ids=[];
		for(var i=0;i<parts.length;i++){
			var object=parts[i];
			var op=object.op || '+';
			var style=object.style;
			var client = object.client;
			var translate=object.translate || [0,0,0];
			var rotate=object.rotate || [0,0,0];
			var object3d=null;
			if(object.type==='path'){			
				object3d=this.createPathObject(object);
			}
			if(object.type==='cube'){
				object3d=this.createCubeObject(object);
			}	
			if(object.type === 'cylinder'){
				object3d = this.createCylinderObject(object);
			}	
			if(object.type === 'pathNode'){
				object3d = this.createPathNodeObject(object);
			}	
			if(object3d){
				object3d.setRotation(rotate[0], rotate[1], rotate[2]);
				if(style){
					object3d.s(style);
				}	
				if(client){
					for(var i in client){
						object3d.setClient(i, client[i]);
					}
				}					
				children.push(object3d);
				if(children.length>1){
					ops.push(op);
				}
				ids.push(object3d.getId());
			}
		}

		if(children.length>0){
			var combo=new mono.ComboNode(children, ops);
			combo.setNames(ids);
			return combo;
		}
		return null;
	},

	loadJson: function(network, json, clearColor){
		var box=network.getDataBox();
		var clearColor= clearColor || demo.Default.CLEAR_COLOR;
		network.setClearColor(clearColor);


		network.setClearColor(0, 0, 0);
		network.setClearAlpha(0);

		var children=[];
		var ops=[];
		var ids=[];
		var shadowHost;
		var shadowHostId;
		for(var i=0;i<json.length;i++){
			var object=json[i];
			if(object.shadowGhost){
				continue;
			}
			var op=object.op;
			var style=object.style;
			var client=object.client;
			var translate=object.translate || [0,0,0];
			var rotate=object.rotate || [0,0,0];
			var object3d=null;

			if(object.type==='path'){				
				object3d=this.createPathObject(object);
			}
			if(object.type==='cube'){
				object3d=this.createCubeObject(object);				
			}
			if(object.type === 'annotation'){
				object3d = this.createAnnotationObject(object);
			}
			if(object.type === 'pathNode'){
				object3d = this.createPathNodeObject(object);
			}
			if(object.type === 'cylinder'){
				object3d = this.createCylinderObject(object);
			}

			if(object.shadowHost){
				shadowHost=object3d;
				shadowHostId=object3d.getId();
			}

			var creator=demo.Default.getCreator(object.type);
			if(creator){
				creator(box, object);
				continue;
			}

			if(object3d){
				object3d.setRotation(rotate[0], rotate[1], rotate[2]);
				if(style){
					object3d.s(style);
				}		
				if(client){
					object3d.c(client);					
				}	
				if(op){
					children.push(object3d);
					if(children.length>1){
						ops.push(op);
					}
					ids.push(object3d.getId());
				}else{						
					box.add(object3d);
				}
			}
		}
		
		if(children.length>0){
			var combo=new mono.ComboNode(children, ops);			
			combo.setNames(ids);
			box.add(combo);

			//lazy load floor shadow map.
			if(shadowHost && shadowHostId){
				var updateFloorShadowMap=function(combo, shadowHost, shadowHostId){					
					return function(){						
						var time1=new Date().getTime();
						var shadowMapImage=demo.Default.createShadowImage(json, shadowHost.getWidth(), shadowHost.getDepth());
						var floorTopFaceId=shadowHostId+'-top.m.lightmap.image';						
						combo.setStyle(floorTopFaceId, shadowMapImage);
						var time2=new Date().getTime();
						//console.log('floor shadow updated, time use: '+(time2-time1));
					}
				};

				setTimeout(updateFloorShadowMap(combo, shadowHost, shadowHostId), demo.Default.LAZY_MAX);
			}
		}
	},

	loadRackContent: function(box, x, y, z, width, height, depth, severity, cube, cut, json){
		var positionY=10;
		var serverTall=9;
		var serverGap=2;
		var findFaultServer=false;
		while(positionY<200){
			var pic='server'+(parseInt(Math.random()*3)+1)+'.png';
			var color=(positionY>100 && !findFaultServer && severity) ? severity.color : null;
			var server=this.createServer(box, cube, cut, pic, color);
			if(color){
				findFaultServer=true;
			}

			server.setPositionY(positionY);
			server.setPositionZ(server.getPositionZ()+5);					
			if(pic==='server3.png'){
				server.setScaleY(6);
				positionY+=serverTall*6;
			}else{
				positionY+=serverTall;
			}
			positionY+=serverGap;
			if(positionY>200){
				box.remove(server);
				break;
			}
		}
	},

	createServer: function(box, cube, cut, pic, color){
		var x=cube.getPositionX();
		var z=cube.getPositionZ();
		var width=cut.getWidth();
		var height=8;
		var depth=cut.getDepth();

		var serverBody=new mono.Cube(width, height, depth);
		color=color?color:'#5B6976';
		serverBody.s({
			'm.color': color,
			'm.ambient': color,
			'm.type':'phong',
			'm.texture.image': './js/plugins/eim/room/images/rack_inside.png',
		});
		serverBody.setPosition(x+0.5, height/2, z+(cube.getDepth()-serverBody.getDepth())/2);

		var serverPanel=new mono.Cube(width+2, height+1, 0.5);
		color=color?color:'#5BA1AF';
		serverPanel.s({			
			'm.type':'phong',
			'm.texture.image': './js/plugins/eim/room/images/rack_inside.png',
			'front.m.texture.image': './js/plugins/eim/room/images/'+pic,
			'front.m.texture.repeat': new mono.Vec2(1,1),
			'm.specularStrength': 100,
			'm.color': color,
			'm.ambient': color,
		});
		serverPanel.setPosition(x+0.5, (height+1)/2, z+serverBody.getDepth()/2+(cube.getDepth()-serverBody.getDepth())/2);

		var server=new mono.ComboNode([serverBody, serverPanel], ['+']);
		server.setClient('animation', 'pullOut.z');
		server.setPositionZ(server.getPositionZ()-5);
		box.add(server);

		return server;
	},

	createWall: function(path, thick, height, insideColor, outsideColor, asideColor, zsideColor, topColor, bottomColor, insideImage, outsideImage, topImage,
		repeat){
		var wall= new mono.PathCube(path, thick, height);
		wall.s({
			'outside.m.color': outsideColor,
			'inside.m.type': 'basic',
			'inside.m.color': insideColor,
			'aside.m.color': asideColor,
			'zside.m.color': zsideColor,
			'top.m.color': topColor,
			'bottom.m.color': bottomColor,
			'inside.m.texture.image': insideImage,
			'outside.m.texture.image': outsideImage,
			'top.m.texture.image': topImage,
			'inside.m.lightmap.image': './js/plugins/eim/room/images/inside_lightmap.png',
			'outside.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
			'aside.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
			'zside.m.lightmap.image': './js/plugins/eim/room/images/outside_lightmap.png',
		});
		wall.setRepeat(repeat);
		return wall;
	},

	createShadowImage: function(json, floorWidth, floorHeight){			
		var canvas = document.createElement('canvas');
		canvas['width']=floorWidth;
		canvas['height']=floorHeight;
		var context = canvas.getContext('2d');
		context.beginPath();
		context.rect(0, 0, floorWidth, floorHeight);
		context.fillStyle = 'white';
		context.fill();

		var debug=false;
		if(debug){
			context.lineWidth = 1;
			context.strokeStyle = 'black';
			context.stroke();
		}

		for(var i=0;i<json.length;i++){
			var object=json[i];
			if(object.floorShadow){
				var translate=object.translate || [0,0,0];	
				var rotate=object.rotate || [0,0,0];
				var rotate=-rotate[1];

				if(object.type==='path'){			
					var translateX=floorWidth/2+translate[0];
					var translateY=floorHeight-(floorHeight/2+translate[2]);
					var pathData=object.data;			
					
					context.save();
					context.translate(translateX, translateY);
					context.rotate(rotate);
					context.beginPath();
					var first=true;
					for(var j=0;j<pathData.length;j++){
						var point=pathData[j];
						if(first){
							context.moveTo(point[0], -point[1]);
							first=false;
						}else{
							context.lineTo(point[0], -point[1]);
						}
					}

					context.lineWidth = object.width;		

					context.strokeStyle = '#C8C8C8';
					context.shadowColor = '#222222';
					context.shadowBlur = 60;
					context.shadowOffsetX = 0;
					context.shadowOffsetY = 0;
					context.stroke();
					
					context.restore();
				}
				if(object.type==='cube'){
					var translateX=floorWidth/2+translate[0];
					var translateY=floorHeight/2+translate[2];

					var width=object.width;
					var lineWidth=object.depth;

					context.save();
			
					context.translate(translateX, translateY);
					context.rotate(rotate);

					context.beginPath();
					context.moveTo(-width/2, 0);
					context.lineTo(width/2, 0);
					
					context.lineWidth = lineWidth;
					context.strokeStyle = 'white';
					context.shadowColor = '#222222';
					context.shadowBlur = 60;
					context.shadowOffsetX = 0;
					context.shadowOffsetY = 0;						
					context.stroke();	

					context.restore();
				}
				if(object.type==='rack' || object.type === 'electric'){
					var translateX=floorWidth/2+translate[0];
					var translateY=floorHeight/2+translate[2];
					var width=json.width || 60;
					var height=json.height || 200;
					var depth=json.depth || 80;
					var width=width*0.99;
					var lineWidth=depth*0.99;

					context.beginPath();
					context.moveTo(translateX-width/2, translateY);
					context.lineTo(translateX+width/2, translateY);
					
					context.lineWidth = lineWidth;
					context.strokeStyle = 'black';
					context.shadowColor = 'black';
					context.shadowBlur = 100;
					context.shadowOffsetX = 0;
					context.shadowOffsetY = 0;						
					context.stroke();	

					context.restore();					
				}
				if(object.type==='plant'){
					var translateX=floorWidth/2+translate[0];
					var translateY=floorHeight/2+translate[2];
					var scale=object.scale || [1,1,1];
					var radius=11*Math.min(scale[0],scale[2]);

					context.beginPath();
					context.arc(translateX, translateY, radius, 0, 2 * Math.PI, false);
					
					context.lineWidth = lineWidth;
					context.fillStyle='black';
					context.shadowColor = 'black';
					context.shadowBlur = 25;
					context.shadowOffsetX = 0;
					context.shadowOffsetY = 0;						
					context.fill();	

					context.restore();					
				}
			}else if(object.shadowImage && demo.Default.loaded){
				var translate=object.translate || [0,0,0];	
				var translateX=floorWidth/2 + translate[0];
				var translateY=floorHeight/2 + translate[2];

				var rotate = object.rotate || [0,0,0];
				rotate = -rotate[1];

				var shadowImage = object.shadowImage;
				var src = shadowImage.src, 
					width = shadowImage.width || 100, 
					height = shadowImage.height || 100,
					xOffset = shadowImage.xOffset || 0, 
					yOffset = shadowImage.yOffset || 0;

				context.save();
				context.translate(translateX,translateY);
				context.rotate(rotate);
				context.globalAlpha = 0.5;
				context.shadowColor = 'black';
				context.shadowBlur = 50;
				context.shadowOffsetX = 0;
				context.shadowOffsetY = 0;	
				var img = demo.Default.images[src];
				context.drawImage(img, -width/2 + xOffset, -height/2 + yOffset,width,height);
				context.translate(-translateX,-translateY);
				context.restore();	
			}
		}

		//console.log(canvas.toDataURL("image/png"));
		
		return canvas;
	},	

	createTree: function(x, y, z, scaleX, scaleY, scaleZ){
		var tree;
		if(!demo.Default._treeInstance){
			var w=100;
			var h=200;
			var pic='./js/plugins/eim/images/tree.png';
			var objects=[];

			var cylinder=new mono.Cylinder(1,5,h,10,1,false,false);
			cylinder.s({
				'm.type': 'phong',
				'm.color': '#411212',
				'm.ambient': '#411212',
				'm.texture.repeat': new mono.Vec2(10,4),
				'm.specularmap.image': './js/plugins/eim/room/images/metal_normalmap.jpg',
				'm.normalmap.image':'./js/plugins/eim/room/images/metal_normalmap.jpg',
			});	
			objects.push(cylinder);		
			var count=5;
			for(var i=0;i<count;i++){
				var leaf=new mono.Cube(w,h+20,0.01);	

				leaf.s({
					'm.transparent': true,
					'front.m.visible': true,
					'front.m.texture.image': pic,
					'back.m.visible': true,
					'back.m.texture.image': pic,
				});
				leaf.setSelectable(false);
                leaf.setEditable(false);
				leaf.setParent(cylinder);
				leaf.setPositionY(20);
				leaf.setRotationY(Math.PI * i/count);
				objects.push(leaf);
			}

			demo.Default._treeInstance=new mono.ComboNode(objects);				
			demo.Default._treeInstance.setClient('tree.original.y', cylinder.getHeight()/2*scaleY);			
			tree = demo.Default._treeInstance;
			//console.log('create plant from brand new');
		}else{
			tree = demo.Default._treeInstance.clone();
			//console.log('create plant from instance');
		}

		tree.setPosition(x,tree.getClient('tree.original.y')+y,z);
		tree.setScale(scaleX, scaleY, scaleZ);
		return tree;

	},

	createPlant: function(x, y, z, scaleX, scaleY, scaleZ){
		var plant;
		if(!demo.Default._plantInstance){
			var w=30;
			var h=30;
			var pic='./js/plugins/eim/room/images/plant.png';
			var objects=[];

			var cylinderVase=new mono.Cylinder(w*0.5,w*0.4,h*2,20,1,false,false);
			cylinderVase.s({
				'm.type': 'phong',
				'm.color': '#ADADAD',
				'm.ambient': '#ADADAD',
				'm.texture.repeat': new mono.Vec2(10,4),
				'm.specularmap.image': './js/plugins/eim/room/images/metal_normalmap.jpg',
				'm.normalmap.image':'./js/plugins/eim/room/images/metal_normalmap.jpg',
			});			
			var cylinderHollow=cylinderVase.clone();
			cylinderHollow.setScale(0.9,1,0.9);
			var cylinderMud=cylinderHollow.clone();
			cylinderMud.setScale(0.9,0.9,0.9);
			cylinderMud.s({
				'm.type': 'phong',
				'm.color': '#163511',
				'm.ambient': '#163511',
				'm.texture.repeat': new mono.Vec2(10,4)
			});
			var vase=new mono.ComboNode([cylinderVase,cylinderHollow,cylinderMud],['-','+']);
			objects.push(vase);

			var count=5;
			for(var i=0;i<count;i++){
				var plant=new mono.Cube(w*2,h+20,0.01);	

				plant.s({
					'm.transparent': true,
					'front.m.visible': true,
					'front.m.texture.image': pic,
					'back.m.visible': true,
					'back.m.texture.image': pic,
				});
				plant.setSelectable(false);
                plant.setEditable(false);
				plant.setParent(vase);
				plant.setPositionY(cylinderVase.getHeight()/2+plant.getHeight()/2-20);
				plant.setRotationY(Math.PI * i/count);
				objects.push(plant);
			}

			demo.Default._plantInstance=new mono.ComboNode(objects);				
			demo.Default._plantInstance.setClient('plant.original.y', cylinderVase.getHeight()/2 +  cylinderVase.getHeight()/4 * Math.min(scaleX, scaleZ));			
			plant = demo.Default._plantInstance;
			//console.log('create plant from brand new');
		}else{
			plant = demo.Default._plantInstance.clone();
			//console.log('create plant from instance');
		}

		plant.setPosition(x,plant.getClient('plant.original.y')+y,z);
		plant.setScale(scaleX, scaleY, scaleZ);
		return plant;
	},

	createPathNode: function(path, radius, image, repeat, translate, scale){
		var translate = translate || [0, 0, 0];
		var scale = scale || [1, 1, 1];
		var repeat = repeat || new mono.Vec2(1,1);
		var pathNode = new mono.PathNode(path);	
		pathNode.s({
			// 'm.type': 'phong',
			// 'm.color': '#2D2F31',
			// 'm.ambient': '#2D2F31',
			// 'm.specular': '#e5e5e5',
			// 'm.specularStrength': 3,
			'm.texture.image': image,
			'm.texture.repeat': repeat,
		});
		pathNode.setRadius(radius);
		pathNode.setScale(scale[0], scale[1], scale[2]);
		pathNode.setPosition(translate[0], translate[1], translate[2]);
		return pathNode;
	},

	createShapeNode: function(path, amount, x, y, z){
		var shapenode = new mono.ShapeNode(path);	
		shapenode.s({
			'm.type': 'phong',
			'm.color': '#2D2F31',
			'm.ambient': '#2D2F31',
			'm.specular': '#e5e5e5',
			'm.normalmap.image':'./js/plugins/eim/room/images/metal_normalmap.jpg',
			'm.texture.repeat': new mono.Vec2(10,6),
			'm.specularStrength': 3,
		});
		shapenode.setVertical(true);
		shapenode.setAmount(amount);
		shapenode.setPosition(x,y,z);
		return shapenode;
	},

	createPathCube: function(path, width, height, x, y, z){
		var pathcube = new mono.PathCube(path,width,height);	
		pathcube.s({
			'm.type': 'phong',
			'm.color': '#2D2F31',
			'm.ambient': '#2D2F31',
			'm.specular': '#e5e5e5',
			'm.normalmap.image':'./js/plugins/eim/room/images/metal_normalmap.jpg',
			'm.texture.repeat': new mono.Vec2(10,6),
			'm.specularStrength': 3,
		});
		pathcube.setPosition(x,y,z);
		return pathcube;
	},
	
	findFirstObjectByMouse: function(network, e){
		var objects = network.getElementsByMouseEvent(e);
		if (objects.length) {
			for(var i=0;i<objects.length;i++){			
				var first = objects[i];
				var object3d = first.element;
				if(! (object3d instanceof mono.Billboard)){
					return first;
				}
			}
		}
		return null;
	},

	animateCamera: function(camera, interaction, oldPoint, newPoint, onDone){
		twaver.Util.stopAllAnimates(true);
		
		var offset=camera.getPosition().sub(camera.getTarget());
		var animation=new twaver.Animate({
			from: 0,
			to: 1,
			dur: 500,
			easing: 'easeBoth',
			onUpdate: function (value) {
				var x=oldPoint.x+(newPoint.x-oldPoint.x)*value;
				var y=oldPoint.y+(newPoint.y-oldPoint.y)*value;
				var z=oldPoint.z+(newPoint.z-oldPoint.z)*value;
				var target=new mono.Vec3(x,y,z);				
				camera.lookAt(target);
				interaction.target=target;
				var position=new mono.Vec3().addVectors(offset, target);
				camera.setPosition(position);
			},
		});
		animation.onDone=onDone;
		animation.play();
	},
	
	playAnimation: function(element, animation){
		var params=animation.split('.');
		if(params[0]==='pullOut'){
			var direction=params[1];
			demo.Default.animatePullOut(element, direction);
		}
		if(params[0]==='rotate'){
			var anchor=params[1];
			var angle=params[2];
			demo.Default.animateRotate(element, anchor, angle);
		}
	},

	animatePullOut: function(object, direction){
		twaver.Util.stopAllAnimates(true);

		var size=object.getBoundingBox().size().multiply(object.getScale());

		var movement=0.8;
		
		var directionVec=new mono.Vec3(0, 0, 1);
		var distance=0;
		if(direction==='x'){
			directionVec=new mono.Vec3(1, 0, 0);
			distance=size.x;
		}
		if(direction==='-x'){
			directionVec=new mono.Vec3(-1, 0, 0);
			distance=size.x;
		}
		if(direction==='y'){
			directionVec=new mono.Vec3(0, 1, 0);
			distance=size.y;
		}
		if(direction==='-y'){
			directionVec=new mono.Vec3(0, -1, 0);
			distance=size.y;
		}
		if(direction==='z'){
			directionVec=new mono.Vec3(0, 0, 1);
			distance=size.z;
		}
		if(direction==='-z'){
			directionVec=new mono.Vec3(0, 0, -1);
			distance=size.z;
		}

		distance=distance*movement;
		if(object.getClient('animated')){
			directionVec=directionVec.negate();
		}

		var fromPosition=object.getPosition().clone();		
		object.setClient('animated', !object.getClient('animated'));

		new twaver.Animate({
			from: 0,
			to: 1,
			dur: 2000,
			easing: 'bounceOut',
			onUpdate: function (value) {
				//don't forget to clone new instance before use them!
				object.setPosition(fromPosition.clone().add(directionVec.clone().multiplyScalar(distance * value)));
			},
		}).play();
	},

	animateRotate: function(object, anchor, angle){
		twaver.Util.stopAllAnimates(true);

		var size=object.getBoundingBox().size().multiply(object.getScale());
		
		var from=0;
		var to=1;
		if(object.getClient('animated')){
			to=-1;
		}
		object.setClient('animated', !object.getClient('animated'));
		
		var position;
		var axis;
		if(anchor==='left'){
			position=new mono.Vec3(-size.x/2, 0, 0);
			var axis=new mono.Vec3(0,1,0);
		}
		if(anchor==='right'){
			position=new mono.Vec3(size.x/2, 0, 0);
			var axis=new mono.Vec3(0,1,0);
		}

		var animation=new twaver.Animate({
			from: from,
			to: to,
			dur: 1800,
			easing: 'bounceOut',
			onUpdate: function (value) {					
				if(this.lastValue===undefined){
					this.lastValue=0;
				}
				object.rotateFromAxis(axis.clone(), position.clone(), Math.PI/180*angle*(value-this.lastValue));
				this.lastValue=value;
			},
			onDone: function(){
				delete this.lastValue;
			},
		});
		animation.play();
	},

	getRandomInt: function(max){
		return parseInt(Math.random()*max);
	},
	
	getRandomLazyTime: function(){
		var time=demo.Default.LAZY_MAX-demo.Default.LAZY_MIN;
		return demo.Default.getRandomInt(time)+demo.Default.LAZY_MIN;
	},
	parseSVG: function (svg) {
        return svg.loadXml(svg);
    },
    loadImages: function(arr) {
	    demo.Default.images = {};
	    var loadedImageCount = 0;

	    // Make sure arr is actually an array and any other error checking
	    for (var i = 0; i < arr.length; i++){
	        var img = new Image();
	        img.onload = imageLoaded;
	        img.src = arr[i];
	        demo.Default.images[arr[i]] = img;
	    }

	    function imageLoaded(e) {
	        loadedImageCount++;
	        if (loadedImageCount >= arr.length) {
	            demo.Default.loaded = true;
	        }
	    }
	}
};