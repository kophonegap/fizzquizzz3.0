function log_out(){
    localStorage.removeItem('userlogin');
    window.location.replace("index.html");
}


$(function() {
    var user = localStorage.getItem('userlogin');

    $.getJSON("http://104.238.96.209/~project/db/get_user_details/"+user,function(result){
        $.each(result, function(i, field){
            $("#output").append("<tr><td>Username:  "+ field.username + " </td></tr><tr><td>Password: "+ field.password + "</td></tr>");
            $('#user_username').val(field.username);
            $('#user_password').val(field.password);
            $('#fname').val(field.fname);
            $('#user_firstname').text(field.fname);
        });
    });
});


function update_user(){
    var username = $('#user_username').val();
    var fname = $('#fname').val();

    $.post( "http://104.238.96.209/~project/db/update/user", { username: username, fname: fname })
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

 