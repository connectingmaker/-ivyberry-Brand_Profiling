$(function() {

    //alert("OK");
    $(".search").click(function() {

        //alert("ok");
        if(inputTextCheck("startDay", "검색할 시작일자를 선택해주세요") == false) {
            return;
        }

        if(inputTextCheck("endDay", "검색할 종료일자를 선택해주세요.") == false) {
            return;
        }

        $("#searchForm").submit();
        /*
        var json = {
            starDay : $("#startDay").val()
            ,endDay : $("#endDay").val()

        }
        common.ajax.send('/users/pointRequest', json);
        common.ajax.return = function(data) {
            console.log(data);

            if(data.err == "000") {
                location.reload();
            } else {
                alert("DB 오류 발생");
            }
        }
        */

    });

    $(document).on("change", ".request", function() {
        var id = $(this).parents("tr").attr("id");
        var value = $(this).val()
        var params = {
            seq: id
            ,request : value
        };


        common.ajax.send("/users/pointRequestUpdate", params);
        common.ajax.return = function(data) {
            switch(data.ERR_CODE) {
                case "000":
                    if(data.CODE_TYPE == "N") {
                        $("#"+id+" #requestTD").html("지급완료");
                    }

                    if(data.CODE_TYPE == "IN") {
                        $("#"+id+" #requestTD").html("취소");
                    }
                    break;
                default:
                    alert(data.ERR_MSG);
                    break;
            }
            //$("#"+id+" #requestTD").html("지급완료");
        }

    });

});
