<<<<<<< HEAD
/**
 * Created by kwangheejung on 2017. 10. 6..
 */
=======
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

>>>>>>> 3e86d56bab5854b7c3cc3a88785edabd61ed2ee4
