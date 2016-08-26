$(document).ready(function () {
	

  	var checkboxes = document.querySelectorAll('input.div2');
    var checkdiv2 = document.getElementById('checkdiv2');

    for(var i=0; i<checkboxes.length; i++) {
        checkboxes[i].onclick = function() {
            var checkedCount = document.querySelectorAll('input.div2:checked').length;

            checkdiv2.checked = checkedCount > 0;
            checkdiv2.indeterminate = checkedCount > 0 && checkedCount < checkboxes.length;
        }
    }

    checkdiv2.onclick = function() {
        var checkboxes = document.querySelectorAll('input.div2');
        for(var i=0; i<checkboxes.length; i++) {
            checkboxes[i].checked = this.checked;
            $(checkboxes[i]).trigger('change');
        }
    }
	
	
});