$(document).ready(function() {

	// accordion functionality
    $( '#accordion' ).accordion({
    	collapsible: true,
    	active: false
    });

    // droppable functionality
    $(".droppable").droppable({
        accept: '.draggable', //only objects tagged as draggable will be accepted
        drop: function(event, ui) {
            var $clone = ui.helper.clone(); //upon drop, create a clone
            if (!$clone.is('.inside-droppable')) {
                $(this).append($clone.addClass('inside-droppable').draggable({
					tolerance: 'fit',
					position: 'relaitve',
					revert:"invalid" //clone reverts to original position if not dropped approprately
                }));

                // check how much counter should be incremented
                var $increment = 0;
                if ($clone.hasClass('one')) {
                	$increment = 1;
                }
                if ($clone.hasClass('two')) {
                	$increment = 2;
                }
                if ($clone.hasClass('three')) {
                	$increment = 3;
                }
                if ($clone.hasClass('four')) {
                	$increment = 4;
                }
                if ($clone.hasClass('five')) {
                	$increment = 5;
                }
                if ($clone.hasClass('six')) {
                	$increment = 6;
                }
                if ($clone.hasClass('seven')) {
                	$increment = 7;
                }

                // increment counter
                var $dropspot = $(this).next('span');
	            var value = parseInt($($dropspot).text(), 10) + $increment;
				$($dropspot).text(value);
				//check if verse has enough syllables for given line; if so, display checkmark
				$verse = $dropspot.prev('div');
				if ((parseInt($($dropspot).text()) == 7) && ($verse.is("#second"))) {
					$dropspot.next('img').show();
				}
				else if ((parseInt($($dropspot).text()) == 5) && (($verse.is("#first"))||($verse.is("#third")))) {
					$dropspot.next('img').show();
				}

            }
        }
    });

    // draggable functionality
    $(".draggable").draggable({
        helper: 'clone', //create a clone to drag
		revert:"invalid" //if object is not dropped appropriately, revert to original position
    });

	// clear screen functionality
	$('#clear').click(function() {
		location.reload();
	});

	// delete words functionality
	$('#trash').droppable({
        drop: function(event, ui) {
            $(ui.draggable).remove();
        }
    });

});


