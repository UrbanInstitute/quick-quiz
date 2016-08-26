// generic tools to help with the custom checkbox
function UTIL() { }
UTIL.prototype.bind_onclick = function(o, f) { // chain object onclick event to preserve prior statements (like jquery bind)
	var prev = o.onclick;
	if (typeof o.onclick != 'function') o.onclick = f;
	else o.onclick = function() { if (prev) { prev(); } f(); };
};
UTIL.prototype.bind_onload = function(f) { // chain window onload event to preserve prior statements (like jquery bind)
	var prev = window.onload;
	if (typeof window.onload != 'function') window.onload = f;
	else window.onload = function() { if (prev) { prev(); } f(); };
};
// generic css class style match functions similar to jquery
UTIL.prototype.trim = function(h) {
	return h.replace(/^\s+|\s+$/g,'');
};
UTIL.prototype.sregex = function(n) {
	return new RegExp('(?:^|\\s+)' + n + '(?:\\s+|$)');
};
UTIL.prototype.hasClass = function(o, n) {
	var r = this.sregex(n);
	return r.test(o.className);
};
UTIL.prototype.addClass = function(o, n) {
	if (!this.hasClass(o, n))
		o.className = this.trim(o.className + ' ' + n);
};
UTIL.prototype.removeClass = function(o, n) {
	var r = this.sregex(n);
	o.className = o.className.replace(r, '');
	o.className = this.trim(o.className);
};
var U = new UTIL();

function getElementsByClassSpecial(node, classname) {
    var a = [];
    var re = new RegExp('(^| )'+classname+'( |$)');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}


// specific to customized checkbox

function chk_labels(obj, init) {
	var objs = document.getElementsByTagName('LABEL');
	for (var i = 0; i < objs.length; i++) {
		if (objs[i].htmlFor == obj.id) {
			if (!init) { // cycle through each label belonging to checkbox
				if (!U.hasClass(objs[i], 'chk')) { // adjust class of label to checked style, set checked
				
					if (obj.type.toLowerCase() == 'radio') {
						var radGroup = objs[i].className;
						var res = radGroup.split(" ");
						var newRes = res[0] + " " + res[1];
						var relLabels = getElementsByClassSpecial(document.body,newRes);
						for (var r = 0; r < relLabels.length; r++) {
							U.removeClass(relLabels[r], 'chk');
							U.addClass(relLabels[r], 'clr');
						}
						
						U.removeClass(objs[i], 'clr');
						U.addClass(objs[i], 'chk');
						obj.checked = true;
						
					}
					else {
						U.removeClass(objs[i], 'clr');
						U.addClass(objs[i], 'chk');
						obj.checked = true;
					}
				} else { // adjust class of label to unchecked style, clear checked
					U.removeClass(objs[i], 'chk');
					U.addClass(objs[i], 'clr');
					obj.checked = false;
				}
				return true;
			} else { // initialize on page load
				if (obj.checked) { // adjust class of label to checked style
					U.removeClass(objs[i], 'clr');
					U.addClass(objs[i], 'chk');
				} else { // adjust class of label to unchecked style
					U.removeClass(objs[i], 'chk');
					U.addClass(objs[i], 'clr')
				}
			}
		}
	}
}

function chk_events(init) {
	var objs = document.getElementsByTagName('INPUT');
	if (typeof init == 'undefined') init = false;
	else init = init ? true : false;
	for(var i = 0; i < objs.length; i++) {
		if (objs[i].type.toLowerCase() == 'checkbox' || objs[i].type.toLowerCase() == 'radio' ) {
			if (!init) {
				U.bind_onclick(objs[i], function() {
					chk_labels(this, init); // bind checkbox click event handler
				});
			}
			else chk_labels(objs[i], init); // initialize state of checkbox onload
		}
	}
}

U.bind_onload(function() { // bind window onload event
	chk_events(false); // bind click event handler to all checkboxes
	chk_events(true); // initialize
});