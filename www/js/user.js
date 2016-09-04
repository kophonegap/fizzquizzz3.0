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


           console.log(field.username);
            console.log (field.password);
            console.log (field.fname);
            console.log (field.lname);
            console.log (field.user_email);

        });
    });
});


function update_user(){
    var username = $('#user_username').val();
    var fname = $('#fname').val();

    $.post( base_url+'/update/user', { username: username, fname: fname })
        .done(function( data ) {
            if(data == 0){
                $('#update_0').show();
            }else if(data == 1){
                $('#update_1').show();
                $('#user_firstname').text(fname);
                //window.location.href = "user.html";
            }
        });

} 

 