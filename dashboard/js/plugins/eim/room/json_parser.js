initModelLib();

demo.Default.loadTempJson = function(jsonObjects){
	var nodes = mono.Toolkits.loadTemplate(null, conf_chair);
	demo.Default.registerTemplates('mono-conf-chair',nodes);

	var nodes = mono.Toolkits.loadTemplate(null, staff_chair);
	demo.Default.registerTemplates('mono-staff-chair',nodes);

}


