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

        $('#userProf').on('click', function(){

            window.location = 'main.html';
            //$('.main-buttons li a').addClass('animated zoomIn');
        });



})


$('ul.answers li input').addClass('checkAnswer');