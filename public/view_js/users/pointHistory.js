$(function() {
    $(".pointBtn").click(function() {
        $('#pointModal').modal('show');
    });

    $("#pointSave").click(function() {


        if(inputTextCheck("point", "포인트를 입력해주세요.") == false) {
            return;
        }

        var json = {
            uid : $("#uid").val()
            ,point: $("#point").val()
        }
        common.ajax.send('/users/pointProcess', json);
        common.ajax.return = function(data) {
            var dataJson = eval("("+data+")");
            location.replace("/users/pointHistory");
        }
    });

});

