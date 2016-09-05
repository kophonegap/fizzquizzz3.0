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

        $('#userProf').on('click', function(){

            window.location = 'main.html';
            //$('.main-buttons li a').addClass('animated zoomIn');
        });

})


