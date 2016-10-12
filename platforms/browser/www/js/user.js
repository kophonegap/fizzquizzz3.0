function log_out() {
    localStorage.removeItem('userlogin');
    window.location.replace("index.html");
}

var base_url = "http://ec2-54-191-6-205.us-west-2.compute.amazonaws.com/fizzquizzserver";

$(function () {
    var user = localStorage.getItem('userlogin');

    /*if (userlogin != 'blank') {
        window.location.replace("main.html");
    }

*/


    $.getJSON(base_url + '/index.php/get_user_details/' + user, function ( result ) {
        $.each(result, function ( i, field ) {
            // $("#output").append("<tr><td>Username:  "+ field.username + " </td></tr><tr><td>Password: "+ field.password + "</td></tr>");
            //  $('#userid').val(field.id);
            $('#username').val(field.username);
            $('#password').val(field.password);
            $('#firstname').val(field.fname);
            $('#lastname').val(field.lname);
            $('#email').val(field.email);
            $('#division').val(field.division);
            $('#unit').val(field.aunit);
            $('#area').val(field.area);



            //$('#user_id').text(field.id);
            $('#user_name').text(field.username);
            $('#user_username').text(field.username);
            $('#user_password').text(field.password);
            $('#user_firstname').text(field.fname);
            $('#user_lastname').text(field.lname);
            $('#user_email').text(field.email);
            $('#user_privilege').text(field.privilege);


            console.log('ID:', field.id);
            console.log('User Name:', field.username);

            console.log('Password:', field.password);
            console.log(field.fname);
            console.log(field.lname);
            console.log(field.email);
            console.log(field.division);
            console.log(field.aunit);
            console.log(field.area);
           localStorage.setItem('user_id', field.id);
           // console.log(field.lang);

        });
    });
});

function update_user() {
    // var id = $('#user_id').val();
    var username = $('#username').val();
    var password = $('#password').val();
    var fname = $('#firstname').val();
    var lname = $('#lastname').val();
    var user_email = $('#email').val();
    var division = $('#division').val();
    var aunit = $('#unit').val();
    var area = $('#area').val();
    // var privilege = $('#user_privilege').val();

    $.post(base_url + '/index.php/update/user', {
        username: username,
        password: password,
        fname: fname,
        lname: lname,
        user_email: user_email
    })
    // $.post(base_url + '/update/user', {username: username, password: password})
        .done(function ( data ) {
            if (data == 0) {
                $('#update_0').show();
            } else if (data == 1) {
                $('#update_1').show();

                //$('#user_id').text(id);

                /*$('#user_name').text(username);*/
                $('#user_password').text(password);
                $('#user_firstname').text(fname);
                $('#user_lastname').text(lname);
                $('#user_email').text(user_email);
                /* $('#user_privilege').text(privilege);
                 $('#userid').val(field.id);
                 $('#username').val(field.username);
                 $('#password').val(field.password);
                 $('#firstname').val(field.fname);
                 $('#lastname').val(field.lname);
                 $('#email').val(field.email);
                 */

                /* $('#user_id').text(field.id);
                 $('#user_name').text(field.username);
                 $('#user_username').text(field.username);
                 $('#user_password').text(field.password);
                 $('#user_firstname').text(field.fname);
                 $('#user_lastname').text(field.lname);
                 $('#user_email').text(field.email);
                 $('#user_privilege').text(field.privilege);
                 */
                //window.location.href = "user.html";
            }
        });

}


/*
 function update_user() {
 var username = $('#username').val();
 var password = $('#password').val();
 var fname = $('#first_name').val();
 var lname = $('#last_name').val();
 var user_email = $('#email').val();

 //  $.post( base_url+'/update/user', { username: username, fname: fname, lname: lname, fname: fname })
 $.post('http://ec2-54-191-6-205.us-west-2.compute.amazonaws.com/fizzquizzserver/index.php/update/user', {username: username, password: password, fname: fname})
 .done(function ( data ) {
 if (data == 0) {
 $('#update_0').show();
 } else if (data == 1) {
 $('#update_1').show();
 $('#user_name').val(field.username);
 $('#first_name').val(field.fname);
 $('#last_name').val(field.lname);
 $('#email').val(field.email);

 $('#user_firstname').text(fname);
 //window.location.href = "user.html";
 }
 });

 }
 */
