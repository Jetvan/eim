
demo.Default.setupRoomFiled = function(htmlElementId,network){	
	var network = network || new mono.Network3D();

	var camera = new mono.PerspectiveCamera(30, 1.5, 30, 50000);
	camera.setPosition(850,520,800);
	network.setCamera(camera);
	camera.lookAt(new mono.Vec3(0,0,0));
	
	var interaction = network.getDefaultInteraction();
	interaction.yLowerLimitAngle=Math.PI/180*2;
	interaction.yUpLimitAngle=Math.PI/2;
	interaction.maxDistance=30000;
	interaction.minDistance=50;
	interaction.zoomSpeed=3;
	interaction.panSpeed=0.2;

	network.isSelectable = function(element){return false;};	
	var div = document.getElementById(htmlElementId);	
	div.appendChild(network.getRootView());
	mono.Utils.autoAdjustNetworkBounds(network,div,'clientWidth','clientHeight');
	network.getRootView().addEventListener('dblclick', function(e){
		handleDoubleClick(e, network);
	});	

	setupLights(network.getDataBox());

	var json= demo.Default.filterJson(network.getDataBox(), fieldJson.objects);
	demo.Default.loadJson(network, json, fieldJson.clearColor);
}

function setupLights(box){
	var pointLight = new mono.PointLight(0xFFFFFF,0.3);
	pointLight.setPosition(0,100,-500);
	box.add(pointLight);     
	
	var pointLight = new mono.PointLight(0xFFFFFF,0.3);
	pointLight.setPosition(0,100,1000);
	box.add(pointLight);        

	var pointLight = new mono.PointLight(0xFFFFFF,0.3);
	pointLight.setPosition(400,30,-100);
	box.add(pointLight);        

	box.add(new mono.AmbientLight('white'));	
}

function handleDoubleClick(e, network){
	var camera=network.getCamera();
	var interaction=network.getDefaultInteraction();
	var firstClickObject=demo.Default.findFirstObjectByMouse(network,e);
	if(firstClickObject){
		var element=firstClickObject.element;					
		var newTarget=firstClickObject.point;
		var oldTarget=camera.getTarget();
		if(element.getClient('lazy.function')){
			var loader=element.getClient('lazy.function');
			var time1=new Date().getTime();
			eval(loader+'()');
			var time2=new Date().getTime();
		}else{
			demo.Default.animateCamera(camera, interaction, oldTarget, newTarget);
		}
		
	}else{
		var oldTarget=camera.getTarget();
		var newTarget=new mono.Vec3(0,0,0);
		demo.Default.animateCamera(camera, interaction, oldTarget, newTarget);
	}
}

function loadBuilding1(){
	window.open('#lab/LAB02');
}

function loadBuilding2(){
	window.open('#lab/LAB03');
}
