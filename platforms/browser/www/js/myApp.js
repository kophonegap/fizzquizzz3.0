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


function profileSection(){
    alert('profile');
    $('#fixed-tab-profile').show();
}

function boardSection(){
    $('#fixed-tab-board').show();
}


function showProf(){
    $('#fixed-tab-profile').show();
}
