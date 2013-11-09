$(function() {
    $( "#accordion" ).accordion({
    	collapsible: true,
    	active: false
    });
});

$(function() {
    $( ".draggable" ).draggable({ 
    	containment: 'html',
    	helper: 'clone',
    	stop: function(event, ui) {
        	$(ui.helper).clone(true)
        	.removeClass('box ui-draggable ui-draggable-dragging').
        	addClass('box-clone').appendTo('body');
        }
    });
});
