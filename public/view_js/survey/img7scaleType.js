$(window).resize(function() {
    if ($(window).width() <= 600) {
        $('#prop-type-group').removeClass('btn-group');
        $('#prop-type-group').addClass('btn-group-vertical');
    } else {
        $('#prop-type-group').addClass('btn-group');
        $('#prop-type-group').removeClass('btn-group-vertical');
    }
});

/*
$( document ).ready( function() {
    var topBar = $( '#topBar' ).offset();
    $( window ).scroll( function() {

        var barThis = $("#topBar")
        var fixNext = $("#fixNextTag")

        if ( $( document ).scrollTop() > topBar.top ) {
            barThis.addClass('top_bar_fix');
            fixNext.addClass('pd_top_80');
        }
        else {
            barThis.removeClass( 'top_bar_fix' );
            fixNext.removeClass('pd_top_80');
        }
    });
} );
*/