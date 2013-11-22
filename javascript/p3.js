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
            determineSyllables();
        }
    });

    // iterate through each verse's words to determine count
    function determineSyllables() {
        var poem = $('#haiku');
        var verses = poem.children('div').find('.droppable');
        verses.each(function(i) {
            //determine how much to increment counter by looping through line's children words
            var children = $(this).children();
            var totalIncrement = 0;
            children.each(function(i) { 
                var increment = 0;
                var classNameList = $(this).attr('class');
                //turn classNameList string into an array of classes
                var className = classNameList.split(" ");
                for(i = 0; i < className.length; i++) {
                    switch (className[i]) {
                        case 'one': increment = 1; break;
                        case 'two': increment = 2; break;
                        case 'three': increment = 3; break;
                        case 'four': increment = 4; break;
                        case 'five': increment = 5; break;
                        case 'six': increment = 6; break;
                        case 'seven': increment = 7; break;
                        default: increment = 0;
                    }
                    totalIncrement += increment;
                }
            });
            var dropspot = $(this).parent().next('span'); 
            updateCounter(dropspot, totalIncrement);
        });
    }

    // increment counter based on totalIncrement and
    // determine if success checkmark should be displayed based on haiku syllable rules
    function updateCounter(dropspot, totalIncrement) {
        $(dropspot).text(totalIncrement);
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