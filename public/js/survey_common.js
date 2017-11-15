$(function() {
    var size = {
        width : window.innerWidth || document.body.clientWidth,
        height : window.innerHeight || document.body.clientHeight
    }

    $("#main-container").css("height", size.height-40);
})