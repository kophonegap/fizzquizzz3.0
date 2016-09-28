$(document).ready(function(){
var base_url2 = 'http://ec2-54-191-6-205.us-west-2.compute.amazonaws.com/fizzquizzserver/admins';
  // On page load: datatable
  var table_users = $('#table_users').dataTable({
    "ajax": base_url2 + "/services/users.php?job=get_users",
    "columns": [
      { "data": "id" },
      /* { "data": "username",   "sClass": "username" },*/
      { "data": "fname",   "sClass": "fname" },
      /*  { "data": "lname",   "sClass": "lname" },
     { "data": "email",   "sClass": "email" },
  { "data": "privilege",   "sClass": "privilege" },*/

     /* { "data": "division",   "sClass": "division" },*/
      { "data": "aunit",   "sClass": "aunit" },
     { "data": "area",   "sClass": "area" }
      //  { "data": "lang",   "sClass": "lang" },
      /*   { "data": "remember_token",   "sClass": "remember_token" },
          { "data": "created_at",   "sClass": "created_at" },
            { "data": "updated_at",   "sClass": "updated_at" },*/

    /*  { "data": "fname" },
      { "data": "lname",        "sClass": "integer" },
      { "data": "email",    "sClass": "integer" },
      { "data": "division",      "sClass": "integer" },
      { "data": "aunit",     "sClass": "integer" },
      { "data": "area" },*/
    /*  { "data": "functions",      "sClass": "functions" }*/
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
      email: {
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
  var form_user = $('#form_user');
  form_user.validate();

  // Show message
  function show_message(message_text, message_type){
    $('#message').html('<p>' + message_text + '</p>').attr('class', message_type);
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

  // Add user button
  $(document).on('click', '#add_user', function(e){
    e.preventDefault();
    $('.lightbox_content h2').text('Add user');
    $('#form_user button').text('Add user');
    $('#form_user').attr('class', 'form add');
    $('#form_user').attr('data-id', '');
    $('#form_user .field_container label.error').hide();
    $('#form_user .field_container').removeClass('valid').removeClass('error');
    $('#form_user #id').val('');
    $('#form_user #username').val('');
      $('#form_user #fname').val('');
        $('#form_user #lname').val('');
          $('#form_user #email').val('');

              $('#form_user #privilege').val('');
            $('#form_user #division').val('');
              $('#form_user #aunit').val('');
              /*  $('#form_user #area').val('');
              //    $('#form_user #lang').val('');
                  $('#form_user #remember_token').val('');
                    $('#form_user #created_at').val('');
                      $('#form_user #updated_at').val('');*/
    /*$('#form_user #fname').val('');
    $('#form_user #lname').val('');
    $('#form_user #email').val('');
    $('#form_user #division').val('');
    $('#form_user #aunit').val('');
    $('#form_user #area').val('');*/
    show_lightbox();
  });

  // Add user submit form
  $(document).on('submit', '#form_user.add', function(e){
    e.preventDefault();
    // Validate form
    if (form_user.valid() == true){
      // Send user information to database
      hide_ipad_keyboard();
      hide_lightbox();
      show_loading_message();
      var form_data = $('#form_user').serialize();
      var request   = $.ajax({
        url:          base_url2 + '/services/users.php?job=add_user',
        cache:        false,
        data:         form_data,
        dataType:     'json',
        contentType:  'application/json; charset=utf-8',
        type:         'get'
      });
      request.done(function(output){
        if (output.result == 'success'){
          // Reload datable
          table_users.api().ajax.reload(function(){
            hide_loading_message();
            var username = $('#username').val();
            show_message("user '" + username + "' added successfully.", 'success');
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

  // Edit user button
  $(document).on('click', '.function_edit a', function(e){
    e.preventDefault();
    // Get user information from database
    show_loading_message();
    var id      = $(this).data('id');
    var request = $.ajax({
      url:          base_url2 + '/services/users.php?job=get_user',
      cache:        false,
      data:         'id=' + id,
      dataType:     'json',
      contentType:  'application/json; charset=utf-8',
      type:         'get'
    });
    request.done(function(output){
      if (output.result == 'success'){
        $('.lightbox_content h2').text('Edit user');
        $('#form_user button').text('Edit user');
        $('#form_user').attr('class', 'form edit');
        $('#form_user').attr('data-id', id);
        $('#form_user .field_container label.error').hide();
        $('#form_user .field_container').removeClass('valid').removeClass('error');
        $('#form_user #id').val(output.data[0].id);
        $('#form_user #username').val(output.data[0].username);
        $('#form_user #fname').val(output.data[0].fname);
        $('#form_user #lname').val(output.data[0].lname);
        $('#form_user #email').val(output.data[0].email);
          $('#form_user #privilege').val(output.data[0].privilege);
        $('#form_user #division').val(output.data[0].division);
        $('#form_user #aunit').val(output.data[0].aunit);
      /*  $('#form_user #area').val(output.data[0].area);
        //  $('#form_user #lang').val(output.data[0].lang);
        $('#form_user #remember_token').val(output.data[0].remember_token);
        $('#form_user #created_at').val(output.data[0].created_at);
        $('#form_user #updated_at').val(output.data[0].updated_at);*/
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

  // Edit user submit form
  $(document).on('submit', '#form_user.edit', function(e){
    e.preventDefault();
    // Validate form
    if (form_user.valid() == true){
      // Send user information to database
      hide_ipad_keyboard();
      hide_lightbox();
      show_loading_message();
      var id        = $('#form_user').attr('data-id');
      var form_data = $('#form_user').serialize();
      var request   = $.ajax({
        url:          base_url2 + '/services/users.php?job=edit_user&id=' + id,
        cache:        false,
        data:         form_data,
        dataType:     'json',
        contentType:  'application/json; charset=utf-8',
        type:         'get'
      });
      request.done(function(output){
        if (output.result == 'success'){
          // Reload datable
          table_users.api().ajax.reload(function(){
            hide_loading_message();
            var username = $('#username').val();
            show_message("user '" + username + "' edited successfully.", 'success');
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

  // Delete user
  $(document).on('click', '.function_delete a', function(e){
    e.preventDefault();
    var username = $(this).data('name');
    if (confirm("Are you sure you want to delete '" + username + "'?")){
      show_loading_message();
      var id      = $(this).data('id');
      var request = $.ajax({
        url:          base_url2 + '/services/users.php?job=delete_user&id=' + id,
        cache:        false,
        dataType:     'json',
        contentType:  'application/json; charset=utf-8',
        type:         'get'
      });
      request.done(function(output){
        if (output.result == 'success'){
          // Reload datable
          table_users.api().ajax.reload(function(){
            hide_loading_message();
            show_message("user '" + username + "' deleted successfully.", 'success');
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
