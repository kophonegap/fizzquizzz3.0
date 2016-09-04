function log_out(){
    localStorage.removeItem('userlogin');
    window.location.replace("index.html");
}

var base_url = "http://104.238.96.209/~project/db";

$(function() {
    var user = localStorage.getItem('userlogin');

    $.getJSON(base_url+'/get_user_details/'+user,function(result){
        $.each(result, function(i, field){
           // $("#output").append("<tr><td>Username:  "+ field.username + " </td></tr><tr><td>Password: "+ field.password + "</td></tr>");
            $('#user_name').val(field.username);
            $('#password').val(field.password);
            $('#first_name').val(field.fname);
            $('#last_name').val(field.lname);
            $('#email').val(field.user_email);
            $('#user_firstname').text(field.fname);


            $('#user_username').text(field.username);

            $('#user_password').text(field.password);
            console.log('ID:', field.id);
            console.log('User Name:', field.username);

            console.log ('Password:', field.password);
            console.log (field.fname);
            console.log (field.lname);
            console.log (field.user_email);

        });
    });
});


function update_user(){
    var username = $('#user_username').val();
    var fname = $('#first_name').val();
    var lname = $('#last_name').val();
    var user_email = $('#email').val();



  //  $.post( base_url+'/update/user', { username: username, fname: fname, lname: lname, fname: fname })
    $.post( 'http://104.238.96.209/~project/db/update/user', { fname: fname, lname: lname, user_email: user_email })
        .done(function( data ) {
            if(data == 0){
                $('#update_0').show();
            }else if(data == 1){
                $('#update_1').show();
                $('#user_name').val(field.username);

                $('#first_name').val(field.fname);
                $('#last_name').val(field.lname);
                $('#email').val(field.user_email);

                $('#user_firstname').text(fname);
                //window.location.href = "user.html";
            }
        });

} 

 