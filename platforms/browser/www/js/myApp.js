$(document).ready(function () {
    $('#loader').show();
    setTimeout(myLoading, 3000);

    function myLoading() {

        $('#loader').hide();

    }

});

function loaderSpin() {

    $('#loader').show();
    setTimeout(myLoading, 3000);

    function myLoading() {

        $('#loader').hide();

    }

}


$(document).ready(function () {

    setTimeout(buttonAnimate, 3000);
        function buttonAnimate() {

            $('.main-buttons li').addClass('animated bounceInDown');

        }

        $('#userProf', '#left_btn').on('click', function(){

            window.location = 'main.html';
            //$('.main-buttons li a').addClass('animated zoomIn');
        });



})


$('ul.answers li input').addClass('checkAnswer');



function loadQuestions(){

    $.ajax({
        type: 'GET',
        url: 'http://104.238.96.209/~project/db/jsoncode',
        data: { get_param: 'value' },
        success: function (data) {
            // quizJSON = data;
            //var quizJSON = data;
            //alert(data);
            // localStorage.quizdata = data;

            // THIS IS ALREADY STRINGIFIED
            var string = data;

// DO NOT STRINGIFY AGAIN WHEN WRITING TO LOCAL STORAGE
            localStorage.setItem('quizdata', string);

            // READ STRING FROM LOCAL STORAGE
            // var retrievedObject = localStorage.getItem('quizJSON');
            var quizJSON = localStorage.getItem('quizdata');

// CONVERT STRING TO REGULAR JS OBJECT
            //var parsedObject = JSON.parse(retrievedObject);
           // var parsedObject = JSON.parse(quizJSON);
           // var parsedObject = JSON.stringify(quizJSON);
            console.log(quizJSON);
            $('#cand').val(quizJSON);



            document.write(quizJSON);
        }



    })
}


$('#left_buton').on('click', function () {
    window.location = 'main.html';

})
//loadQuestions();

