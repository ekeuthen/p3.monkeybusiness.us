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
					revert:"invalid", //clone reverts to original position if not dropped approprately
                    snap: ".droppable,.draggable"
                }));
                $clone.addClass("droppable2");
            }
            else { //when word is subsequently moved between verses, update DOM
                $(this).append(ui.draggable);
            }

            //for each verse, iterate through to update counter
            var $poem = $('#haiku');
            var $verses = $poem.children('div').find('.droppable');
            $verses.each(function(i) {

                //determine how much to increment counter by looping through line's children words
                console.log('going through verse loop!');
                console.log($(this));
                var $children = $(this).children();
                var $totalIncrement = 0;
                $children.each(function(i) { 
                var $increment = 0;
                    if ($(this).hasClass('one')) {
                        $increment = 1;
                    }
                    else if ($(this).hasClass('two')) {
                        $increment = 2;
                    }
                    else if ($(this).hasClass('three')) {
                        $increment = 3;
                    }
                    else if ($(this).hasClass('four')) {
                        $increment = 4;
                    }
                    else if ($(this).hasClass('five')) {
                        $increment = 5;
                    }
                    else if ($(this).hasClass('six')) {
                        $increment = 6;
                    }
                    else if ($(this).hasClass('seven')) {
                        $increment = 7;
                    }
                    $totalIncrement += $increment;
                });

                // increment counter based on totalIncrement
                var $dropspot = $(this).parent().next('span'); 
                var $value = $totalIncrement;
                $($dropspot).text($value);

                //check if verse has enough syllables for given line; if so, display checkmark
                $verse = $dropspot.prev('div');
                if ((parseInt($($dropspot).text()) == 7) && ($verse.is("#line2"))) { 
                    $dropspot.next('img').show();
                }
                else if ((parseInt($($dropspot).text()) == 5) && (($verse.is("#line1"))||($verse.is("#line3")))) {
                    $dropspot.next('img').show();
                }
                else {
                    $dropspot.next('img').hide();
                }

            });
        }
    });

    // draggable functionality
    $(".draggable").draggable({
        cursor: 'pointer',
        snap: ".droppable,.draggable",
        helper: 'clone', //create a clone to drag
		revert:"invalid" //if object is not dropped appropriately, revert to original position
    });

	// clear screen functionality
	$('#clear').click(function() {
		location.reload();
	});

	// delete words functionality
	$('#trash').droppable({
        accept: '.droppable2',
        drop: function(event, ui) {
            $(ui.draggable).remove();
        }
    });

});