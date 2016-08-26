$(document).ready(function () {
	
	//Show and Hide Table Rows
	    $('input[type = checkbox].show').change(function () {
    var valu = $(this).val();
    var ischecked = $(this).is(":checked");
    
    if( ischecked ){
        $('.' + valu).fadeIn('10000');
    }else{
        $('.' + valu).fadeOut('10000');
    }
});

	//Indeterminante Checkboxes for Democrats
	
  	var checkboxes = document.querySelectorAll('input.div1');
    var checkdiv1 = document.getElementById('checkdiv1');

    for(var i=0; i<checkboxes.length; i++) {
        checkboxes[i].onclick = function() {
            var checkedCount = document.querySelectorAll('input.div1:checked').length;

            checkdiv1.checked = checkedCount > 0;
            checkdiv1.indeterminate = checkedCount > 0 && checkedCount < checkboxes.length;
        }
    }

    checkdiv1.onclick = function() {
        var checkboxes = document.querySelectorAll('input.div1');
        for(var i=0; i<checkboxes.length; i++) {
            checkboxes[i].checked = this.checked;        
            $(checkboxes[i]).trigger('change');
        }
    }

    
    $('.hideRow').click(function () {
        $('input[value="' + $(this).attr('checkBoxValue') + '"]').trigger('click');
    });
	
	
});