// A $( document ).ready() block.





$( document ).ready(function() {
    console.log( "ready!" );
   // $('#startQuiz').addClass('dl-layout__tab mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored"');

  //  if($('input[name=answer]:checked').length){
        //a radio button was checked
    //    $(dialog).show();
    //}else{
        //there was no radio button checked
     //   $(dialog).hide();
    //}



    $('.startQuiz').on('click', function ( ) {
        $('#meSsage').hide();
    })

    $('ul.answers > li, .responses').addClass('animated fadeInLeftBig options fast');

    $('.button').addClass('animated fadeInUpBig options fast');


});




/* $('a.zoomer').on('click', 'a', function ( e ) {

        var ref = window.open('video.html', '_blank', 'location=yes', 'EnableViewPortScale=yes');
        //e.preventDefault();


});
*/


//var ref = cordova.InAppBrowser.open('video.html', '_system', 'location=no');

function overlayVideo() {
   // var ref = window.open('video.html', '_blank', 'location=yes', 'EnableViewPortScale=yes');
   // e.preventDefault();
  // window.open = cordova.InAppBrowser.open;
   // ref.open();
    //var ref = cordova.InAppBrowser.open('http://apache.org', '_blank', 'location=yes');
    //ref.addEventListener('loadstart', function(event) { alert(event.url); });
}

