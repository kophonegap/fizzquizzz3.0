$(document).ready(function () {
    $('#loader').show();
    setTimeout(myFunction, 3000);

    function myFunction() {

        $('#loader').hide();

    }

});

function loaderSpin() {

    $('#loader').show();
    setTimeout(myFunction, 3000);

    function myFunction() {

        $('#loader').hide();

    }

}


$(document).ready(function () {

    setTimeout(buttonAnimate, 3000);
        function buttonAnimate() {

            $('.main-buttons li').addClass('animated bounceInDown');

        }

       /* $('.main-buttons li a').on('click, function(){

            $('.main-buttons li a').addClass('animated zoomIn');
        }*/

});


