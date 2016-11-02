

$(document).ready(function(){
// On page load: datatable
    var table_companies = $('#table_questions').dataTable({
        "ajax": base_url + "/services/questions.php?job=get_questions",
        "columns": [
            { "data": "division" },
            { "data": "question_question",   "sClass": "question_question" },
            { "data": "datefrom" },
            { "data": "dateto" },
            { "data": "status",      "sClass": "integer" },
            { "data": "set",   "sClass": "set"  },
// { "data": "market_cap",     "sClass": "integer" },
            { "data": "headquarters"},
            { "data": "functions",      "sClass": "functions" }
        ],
        "aoColumnDefs": [
            { "bSortable": false, "aTargets": [-1] }
        ],
        "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
        "oLanguage": {
            "oPaginate": {
                "sFirst":       " ",
                "sPrevious":    " ",
                "sNext":        " ",
                "sLast":        " ",
            },
            "sLengthMenu":    "Records per page: _MENU_",
            "sInfo":          "Total of _TOTAL_ records (showing _START_ to _END_)",
            "sInfoFiltered":  "(filtered from _MAX_ total records)"
        }
    });
// On page load: form validation
    jQuery.validator.setDefaults({
        success: 'valid',
        rules: {
            fiscal_year: {
                required: true,
                min:      2000,
                max:      2025
            }
        },
        errorPlacement: function(error, element){
            error.insertBefore(element);
        },
        highlight: function(element){
            $(element).parent('.field_container').removeClass('valid').addClass('error');
        },
        unhighlight: function(element){
            $(element).parent('.field_container').addClass('valid').removeClass('error');
        }
    });
    var form_question = $('#form_question');
    form_question.validate();
// Show message
    function show_message(message_text, message_type){
        $('#message').html('
            <p>' + message_text + '</p>
            ').attr("class', message_type);
        $('#message_container').show();
        if (typeof timeout_message !== 'undefined'){
            window.clearTimeout(timeout_message);
        }
        timeout_message = setTimeout(function(){
            hide_message();
        }, 8000);
    }
// Hide message
    function hide_message(){
        $('#message').html('').attr('class', '');
        $('#message_container').hide();
    }
// Show loading message
    function show_loading_message(){
        $('#loading_container').show();
    }
// Hide loading message
    function hide_loading_message(){
        $('#loading_container').hide();
    }
// Show lightbox
    function show_lightbox(){
        $('.lightbox_bg').show();
        $('.lightbox_container').show();
    }
// Hide lightbox
    function hide_lightbox(){
        $('.lightbox_bg').hide();
        $('.lightbox_container').hide();
    }
// Lightbox background
    $(document).on('click', '.lightbox_bg', function(){
        hide_lightbox();
    });
// Lightbox close button
    $(document).on('click', '.lightbox_close', function(){
        hide_lightbox();
    });
// Escape keyboard key
    $(document).keyup(function(e){
        if (e.keyCode == 27){
            hide_lightbox();
        }
    });
// Hide iPad keyboard
    function hide_ipad_keyboard(){
        document.activeElement.blur();
        $('input').blur();
    }
// Add question button
    $(document).on('click', '#add_question', function(e){
        e.preventDefault();
        $('.lightbox_content h2').text('Add question');
        $('#form_question button').text('Add question');
        $('#form_question').attr('class', 'form add');
        $('#form_question').attr('data-id', '');
        $('#form_question .field_container label.error').hide();
        $('#form_question .field_container').removeClass('valid').removeClass('error');
        $('#form_question #division').val('');
        $('#form_question #question_question').val('');
        $('#form_question #datefrom').val('');
        $('#form_question #dateto').val('');
        $('#form_question #status').val('');
        $('#form_answer #question_id').val('');
        $('#form_question #set').val('');
// $('#form_question #market_cap').val('');
        $('#form_question #headquarters').val('');
        show_lightbox();
    });
// Add question submit form
    $(document).on('submit', '#form_question.add', function(e){
        e.preventDefault();
// Validate form
        if (form_question.valid() == true){
// Send question information to database
            hide_ipad_keyboard();
            hide_lightbox();
            show_loading_message();
            var form_data = $('#form_question').serialize();
            var request   = $.ajax({
                url:          base_url + '/services/questions.php?job=add_answer',
                cache:        false,
                data:         form_data,
                dataType:     'json',
                contentType:  'application/json; charset=utf-8',
                type:         'get'
            });
            request.done(function(output){
                if (output.result == 'success'){
// Reload datable
                    table_companies.api().ajax.reload(function(){
                        hide_loading_message();
                        var answer_answer = $('#answer_answer').val();
                        show_message("answer '" + answer_answer + "' added successfully.", 'success');
                    }, true);
                } else {
                    hide_loading_message();
                    show_message('Add request failed', 'error');
                }
            });
            request.fail(function(jqXHR, textStatus){
                hide_loading_message();
                show_message('Add request failed: ' + textStatus, 'error');
            });
        }
    });
// Edit question button
    $(document).on('click', '.function_edit a', function(e){
        e.preventDefault();
// Get question information from database
        show_loading_message();
        var id      = $(this).data('id');
        var request = $.ajax({
//  url:          base_url + '/services/questions.php?job=get_question?qid=$id',
            url:          base_url + '/services/questions.php?job=get_question',
            cache:        false,
            data:         'id=' + id,
            dataType:     'json',
            contentType:  'application/json; charset=utf-8',
            type:         'get'
        });
        request.done(function(output){
            if (output.result == 'success'){
                $('.lightbox_content h2').text('Edit question');
                $('#form_question button').text('Edit question');
                $('#form_question').attr('class', 'form edit');
                $('#loadOptions').attr('data-id', id);
                $('#loadOptions').val(id);
                $('#question_id').val(id);
                $('#form_question').attr('data-id', id);
                $('#form_question .field_container label.error').hide();
                $('#form_question .field_container').removeClass('valid').removeClass('error');
                $('#form_question #division').val(output.data[0].division);
                $('#form_question #question_question').val(output.data[0].question_question);
                $('#form_question #datefrom').val(output.data[0].datefrom);
                $('#form_question #dateto').val(output.data[0].dateto);
                $('#form_question #status').val(output.data[0].status);
                $('#form_question #set').val(output.data[0].set);
//$('#form_question #market_cap').val(output.data[0].market_cap);
                $('#form_question #headquarters').val(output.data[0].headquarters);
                hide_loading_message();
                show_lightbox();
            } else {
                hide_loading_message();
                show_message('Information request failed', 'error');
            }
        });
        request.fail(function(jqXHR, textStatus){
            hide_loading_message();
            show_message('Information request failed: ' + textStatus, 'error');
        });
    });
// Edit question submit form
    $(document).on('submit', '#form_question.edit', function(e){
        e.preventDefault();
// Validate form
        if (form_question.valid() == true){
// Send question information to database
            hide_ipad_keyboard();
            hide_lightbox();
            show_loading_message();
            var id        = $('#form_question').attr('data-id');
            var form_data = $('#form_question').serialize();
            var request   = $.ajax({
                url:          base_url + '/services/questions.php?job=edit_question&id=' + id,
                cache:        false,
                data:         form_data,
                dataType:     'json',
                contentType:  'application/json; charset=utf-8',
                type:         'get'
            });
            request.done(function(output){
                if (output.result == 'success'){
// Reload datable
                    table_companies.api().ajax.reload(function(){
                        hide_loading_message();
                        var question_question = $('#question_question').val();
                        show_message("question '" + question_question + "' edited successfully.", 'success');
                    }, true);
                } else {
                    hide_loading_message();
                    show_message('Edit request failed', 'error');
                }
            });
            request.fail(function(jqXHR, textStatus){
                hide_loading_message();
                show_message('Edit request failed: ' + textStatus, 'error');
            });
        }
    });
// Delete question
    $(document).on('click', '.function_delete a', function(e){
        e.preventDefault();
        var question_question = $(this).data('name');
        if (confirm("Are you sure you want to delete '" + question_question + "'?")){
            show_loading_message();
            var id      = $(this).data('id');
            var request = $.ajax({
                url:          base_url + '/services/questions.php?job=delete_question&id=' + id,
                cache:        false,
                dataType:     'json',
                contentType:  'application/json; charset=utf-8',
                type:         'get'
            });
            request.done(function(output){
                if (output.result == 'success'){
// Reload datable
                    table_companies.api().ajax.reload(function(){
                        hide_loading_message();
                        show_message("question '" + question_question + "' deleted successfully.", 'success');
                    }, true);
                } else {
                    hide_loading_message();
                    show_message('Delete request failed', 'error');
                }
            });
            request.fail(function(jqXHR, textStatus){
                hide_loading_message();
                show_message('Delete request failed: ' + textStatus, 'error');
            });
        }
    });
});

