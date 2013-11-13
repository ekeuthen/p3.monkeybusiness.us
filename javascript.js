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
            var $clone = ui.helper.clone(); 
            if (!$clone.is('.inside-droppable')) { //when word is initially dropped in verse
                $(this).append($clone.addClass('inside-droppable').draggable({
					revert:"invalid" //clone reverts to original position if not dropped approprately
                }));
            }
            else { //when word is subsequently moved between verses, update DOM
                $(this).append(ui.draggable);
            }

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
            var $value = parseInt($($dropspot).text(), 10) + $increment;
			$($dropspot).text($value);

			//check if verse has enough syllables for given line; if so, display checkmark
			$verse = $dropspot.prev('div');
			if ((parseInt($($dropspot).text()) == 7) && ($verse.is("#second"))) { 
				$dropspot.next('img').show();
			}
			else if ((parseInt($($dropspot).text()) == 5) && (($verse.is("#first"))||($verse.is("#third")))) {
				$dropspot.next('img').show();
			}
            else {
                $dropspot.next('img').hide();
            }

        }
    });

	//decrement counter when an object is removed from a verse
	$(".droppable").mousedown(function(e) {
        var $target = e.target;
        var $decrement = 0;
        if ($($target).hasClass('one')) {
            $decrement = 1;
        }
        else if ($($target).hasClass('two')) {
            $decrement = 2;
        }
        else if ($($target).hasClass('three')) {
            $decrement = 3;
        }
        else if ($($target).hasClass('four')) {
            $decrement = 4;
        }
        else if ($($target).hasClass('five')) {
            $decrement = 5;
        }
        else if ($($target).hasClass('six')) {
            $decrement = 6;
        }
        else if ($($target).hasClass('seven')) {
            $decrement = 7;
        }
		var $dropspot = $(this).next('span');
	    var $value = parseInt($($dropspot).text(), 10) - $decrement;
		$($dropspot).text($value);

        //check if verse has enough syllables for given line; if so, display checkmark
        $verse = $dropspot.prev('div');
        if ((parseInt($($dropspot).text()) == 7) && ($verse.is("#second"))) { 
            $dropspot.next('img').show();
        }
        else if ((parseInt($($dropspot).text()) == 5) && (($verse.is("#first"))||($verse.is("#third")))) {
            $dropspot.next('img').show();
        }
        else {
            $dropspot.next('img').hide();
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


