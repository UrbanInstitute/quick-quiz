$(document).ready(function () {
	

  	var checkboxes = document.querySelectorAll('input.div3');
    var checkdiv2 = document.getElementById('checkdiv3');

    for(var i=0; i<checkboxes.length; i++) {
        checkboxes[i].onclick = function() {
            var checkedCount = document.querySelectorAll('input.div3:checked').length;

            checkdiv3.checked = checkedCount > 0;
            checkdiv3.indeterminate = checkedCount > 0 && checkedCount < checkboxes.length;
        }
    }

    checkdiv3.onclick = function() {
        var checkboxes = document.querySelectorAll('input.div3');
        for(var i=0; i<checkboxes.length; i++) {
            checkboxes[i].checked = this.checked;
            $(checkboxes[i]).trigger('change');
        }
    }
	
	
});