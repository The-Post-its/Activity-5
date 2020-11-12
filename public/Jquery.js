$(document).ready(function () {

    //TOGGLE COLLAPSE FUNCTION FOR INDEX.HTML LOGIN ACCORDIAN     
    // ******************************************************** //         
    $('[data-toggle="collapse"]').click(function () {
        $('.collapse.in').collapse('hide')
    });
    // ******************************************************** // 


    //CHANGE CLAIM TO CHECKBOX   
    // ******************************************************** //      
    $(document).on('click', ".btn", function () {
        // GET TEXT OF BUTTON
        var buttonText = $(this).text();
        // IF IT IS A CLAIM BUTTON CHANGE TO CHECKBOX
        if (buttonText == 'Claim') {
            // GET NODE TO MAKE CHECKBOX VISIBLE
            var checkboxNode = $(this).parent().prev().prev();
            // TOGGLE HIDDEN CLASS ON CHECKBOX
            checkboxNode.toggleClass("hidden");
            $(this).addClass("claim");
            // CHANGE TO ABANDON BUTTON
            $(this).text("Abandon");
        }
    });
    // ******************************************************** // 



    //CHANGE ABANDON TO CLAIM  
    // ******************************************************** //      
    $(document).on('click', ".claim", function () {
        // GET TEXT OF BUTTON
        var buttonText = $(this).text();
        // IF IT IS ABANDON BUTTON MAKE IT CLAIM
        if (buttonText == 'Abandon') {
            // GET NODE TO MAKE CHECKBOX HIDDEN
            var checkboxNode = $(this).parent().prev().prev();
            // TOGGLE HIDDEN CLASS ON CHECKBOX
            checkboxNode.toggleClass("hidden");
            $(this).removeClass("claim");
            // CHANGE TO CLAIM BUTTON
            $(this).text("Claim");
        }
    });
    // ******************************************************** // 


    //CHANGE CHECKBOX CLICK
    // ******************************************************** // 
    $(document).on('change', ".check", function (event) {
        event.stopImmediatePropagation();
        // GET TEXT OF TO DO LIST ITEM
        var checkText = $(this).parent().parent().next();
        // TOGGLE LINE THROUGH TEXT
        checkText.toggleClass("line-through no-line");
        // TOGGLE THE ABANDON BUTTON
        var hideButton = $(this).parent().parent().next().next().children();
        if (checkText.hasClass("line-through")) {
            hideButton.addClass("removed");
        } else hideButton.removeClass("removed");

    });
    // ******************************************************** // 


    //REMOVE COMPLETED TASKS
    // ******************************************************** // 
    $('#removeComplete').click(function (event) {
        //FIND ALL OBJECTS WITH 'REMOVED' CLASS
        var deleteMe = $(".removed").parent().prev().prev().parent();
        //DELETE TASKS WITH FADEOUT
        deleteMe.fadeOut(600, function(){ deleteMe.remove();});
    });
    // ******************************************************** //



    //ADD NEW TO DO LIST ITEM   
    // ******************************************************** //     
    $('#add').unbind('click').bind('click', function (e) {
        // GET TEXT TO ADD
        var addText = $('#add_text').val();
        // CREATE NEW TO DO LIST ITEM
        var addMe = '<div class="input-group">' +
            '   <div name ="checkboxNode" class="input-group-prepend hidden">' +
            '        <div class="input-group-text">' +
            '           <input type="checkbox" class = "check" data-toggle="toggle" aria-label="Checkbox for following text input">' +
            '       </div>' +
            '   </div>' +
            '<input class="form-control no-line" type="text" placeholder= ' + addText + ' readonly>' +
            '  <div class="input-group-append">' +
            '       <button type="button" class="btn btn-primary">Claim</button>' +
            '  </div>' +
            '</div>';
        // APPEND NEW TO DO LIST ITEM
        $('#to_do_list').append(addMe);
        // RESET PLACEHOLDER TEXT
        $('#add_text').val("Enter a new task here");
        // ANIMATED BLINKING AFTER ADDING TASK   
        var div = $('#to_do_list').children().last();
        div.animate({
            opacity: '0.2'
        }, "slow");
        div.animate({
            opacity: '1'
        }, "slow")
        div.animate({
            opacity: '0.2'
        }, "slow");
        div.animate({
            opacity: '1'
        }, "slow")
    });
    // ******************************************************** //    



});
