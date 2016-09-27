$(document).ready(function () {
    $('#download').click(function ( e ) {
        $.generateFile({
            filename: 'slickQuiz-json.js',
            content: $('textarea').val(),
            script: 'download.php'
        });
        e.preventDefault();
    });
    $('#downloadPage').click(function ( e ) {
        $.generateFile({
            filename: 'page.html',
            content: $('html').html(),
            script: 'download.php'
        });
        e.preventDefault();
    });
    $('#loadQuestions').click(function ( e ) {
        $("#quizContent").load('download.php');
        loadQuestions();
        e.preventDefault();
    });
    function spinnerLoad() {
        $(function () {
            onload();
            /* PROGGRESS COMPLETE */
            $.mpb("update", {
                value: 100, speed: 5, complete: function () {
                    $(".mpb").fadeOut(200, function () {
                        $(this).remove();
                    });
                }
            });
            /* END PROGGRESS COMPLETE */
        });
    }

    function loadQuestions() {
        spinnerLoad();
        $.ajax({
            type: 'GET',
            url: 'http://ec2-54-191-6-205.us-west-2.compute.amazonaws.com/fizzquizzserver/index.php/jsoncode',
            data: {get_param: 'value'},
            success: function ( data ) {
// THIS IS ALREADY STRINGIFIED
                var string = data;
//var d = $.parseJSON(data);
// DO NOT STRINGIFY AGAIN WHEN WRITING TO LOCAL STORAGE
//localStorage.setItem('quizdata', d);
                localStorage.setItem('quizdata', string);
//localStorage.setItem('quizdata', string);
// localStorage.setItem('quizdata');
// READ STRING FROM LOCAL STORAGE
// var retrievedObject = localStorage.getItem('quizJSON');
                var quizJSON = localStorage.getItem('quizdata');
// CONVERT STRING TO REGULAR JS OBJECT
                console.log(quizJSON);
                $('#quizContent').val(quizJSON);
//document.write(quizJSON);
            }
        })
    }
});