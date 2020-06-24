(function() {
	eulerface.mode = 'slide';
	
	function lookupProblemInfo(id, fallback) {
		var div = document.createElement('div');
		for (var i = 0; i < problemsOld.length; i++) {
			if (problemsOld[i].id === id) {			
				div.innerHTML = problemsOld[i].info;
				return div;
			}
		}
		div.innerHTML = fallback.innerHTML;
		return div;
	}
	
	function dynamicDisplayFactory(control, container) {
		return function() {
			var ch = container.children;
			for (var i = 0; i < ch.length; i++) {
				ch[i].style.display = 'none';
				console.log(ch[i], ch[i].style.display);
			}
			document.getElementById('solution-' + control.getAttribute('value')).style.display = 'block';
		};
	}
	
	
	var selects = document.getElementsByTagName('select');
	for (var i = selects.length - 1; i >= 0; i--) {
		var slave = selects[i].parentNode.parentNode.children[1],
			master = new eulerface.Select(selects[i], lookupProblemInfo),  // factory
			div = master.container,
			listen = dynamicDisplayFactory(div, slave);
		listen();
		div.addEventListener('change', listen);
	}
	
	eulerface.prepare();
}());