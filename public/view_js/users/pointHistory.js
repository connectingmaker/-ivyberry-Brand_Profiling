$(function() {
    $(".pointBtn").click(function() {
        $('#pointModal').modal('show');
    });

    $("#pointSave").click(function() {


        if(inputTextCheck("code_point", "포인트 옵션을 선택해주세요") == false) {
            return;
        }

        if(inputTextCheck("point", "포인트를 입력해주세요.") == false) {
            return;
        }

        var json = {
            uid : $("#uid").val()
            ,code_point : $("#code_point").val()
            ,point: $("#point").val()
            ,point_msg: $("#point_msg").val()

        }
        common.ajax.send('/users/pointProcess', json);
        common.ajax.return = function(data) {
            console.log(data);

            if(data.err == "000") {
                location.reload();
            } else {
                alert("DB 오류 발생");
            }
        }
    });

});
