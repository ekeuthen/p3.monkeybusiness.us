$(document).ready(function() {

	// display word tiles in accordion
    $( '#accordion' ).accordion({
    	collapsible: true,
    	active: false
    });

    // allow items to be cloned and dropped
    $(".droppable").droppable({
        accept: '.draggable', //only objects tagged as draggable will be accepted
        drop: function(event, ui) {
            var clone = ui.helper.clone(); 
            if (!clone.is('.inside-droppable')) { //when word is initially dropped in verse
                $(this).append(clone.addClass('inside-droppable').draggable({
					revert:"invalid", //clone reverts to original position if not dropped approprately
                    snap: ".droppable,.draggable"
                }));
                clone.addClass("droppable2");
            }
            else { //when word is subsequently moved between verses, update DOM
                $(this).append(ui.draggable);
            }
            updateCounters();
        }
    });

    // iterate through each verse's words to determine count
    function updateCounters() {
        var poem = $('#haiku');
        var verses = poem.children('div').find('.droppable');
        verses.each(function(i) {

            //determine how much to increment counter by looping through line's children words
            var children = $(this).children();
            var totalIncrement = 0;
            children.each(function(i) { 
            var increment = 0;
                if ($(this).hasClass('one')) {
                    increment = 1;
                }
                else if ($(this).hasClass('two')) {
                    increment = 2;
                }
                else if ($(this).hasClass('three')) {
                    increment = 3;
                }
                else if ($(this).hasClass('four')) {
                    increment = 4;
                }
                else if ($(this).hasClass('five')) {
                    increment = 5;
                }
                else if ($(this).hasClass('six')) {
                    increment = 6;
                }
                else if ($(this).hasClass('seven')) {
                    increment = 7;
                }
                totalIncrement += increment;
            });

            // increment counter based on totalIncrement
            var dropspot = $(this).parent().next('span'); 
            var value = totalIncrement;
            $(dropspot).text(value);

            // hide / display checkmark indicating complete verse
            var verse = dropspot.prev('div');
            if ((parseInt($(dropspot).text()) == 7) && (verse.is("#line2"))) { 
                dropspot.next('img').show();
            }
            else if ((parseInt($(dropspot).text()) == 5) && ((verse.is("#line1"))||(verse.is("#line3")))) {
                dropspot.next('img').show();
            }
            else {
                dropspot.next('img').hide();
            }
        });
    }

    // allow items to be dragged and cloned
    $(".draggable").draggable({
        cursor: 'pointer',
        snap: ".droppable,.draggable",
        helper: 'clone', //create a clone to drag
		revert:"invalid" //if object is not dropped appropriately, revert to original position
    });

	// clear screen 
	$('#clear').click(function() {
		location.reload();
	});

	// delete individual word tiles
	$('#trash').droppable({
        accept: '.droppable2',
        drop: function(event, ui) {
            $(ui.draggable).remove();
            updateCounters();
        }
    });

});