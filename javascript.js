$(document).ready(function() {
    $( '#accordion' ).accordion({
    	collapsible: true,
    	active: false
    });

    $(".droppable").droppable({
        accept: '.draggable',
        drop: function(event, ui) {
            var $clone = ui.helper.clone();
            if (!$clone.is('.inside-droppable')) {
                $(this).append($clone.addClass('inside-droppable').draggable({
                    //containment: '.droppable',
					tolerance: 'fit',
					position: 'relaitve',
					revert:"invalid"
                }));
            }
        }
    });

    $(".draggable").draggable({
        helper: 'clone',
		revert:"invalid"
    });

	$('#clear').click(function() {
		location.reload();
	});

	$('#trash').droppable({
        drop: function(event, ui) {
            $(ui.draggable).remove();
        }
    });

});


