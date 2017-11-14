$(function() {
    var brandCnt = $("#brandCnt").val();
    $(".qaData").click(function() {
        var checkedCnt = 0;
        for(var i = 0; i<brandCnt; i++) {
            if($(".qaData_"+i).is(":checked") == true) {
                checkedCnt++;
            }
        }


        $("#selectCnt").html(checkedCnt);
        $("#textselectCnt").html(checkedCnt + "개가 선택되었습니다.");


    });

    $(".qaList").click(function() {
        var qa_code = $(this).attr("qa_code");

        if($("#"+qa_code).is(":checked") == false) {
            $("#"+qa_code).prop("checked", true);
            $(this).removeClass("btn-default");
            $(this).addClass("btn-danger");
        } else {
            $("#"+qa_code).prop("checked", false);
            $(this).removeClass("btn-danger");
            $(this).addClass("btn-default");
        }

        var checkCnt = 0;
        $(".chk_qa_code").each(function() {
            if($(this).is(":checked") == true) {
                checkCnt++;
            }
            $("#selectCnt").html(checkCnt);
        });
    });


    $(".nextStep").click(function() {

        var checkBool = true;
        var brandCnt = $("#brandCnt").val();
        var qaData = [];
        for(var i = 0; i<brandCnt; i++){

            if($(".qaData_"+i).is(":checked") == false) {
                alert("선택해주세요.");
                return;
            } else {
                $(".qaData_"+i).each(function() {
                    if($(this).is(":checked") == true) {
                        var data = {
                            "brandCode": $(this).attr("brand_code")
                            , "qaCode": $(this).val()
                        }
                        qaData.push(data);
                    }
                });
            }
        }


        var json = {
            campaign_code : $("#campaign_code").val()
            ,uid : $("#uid").val()
            ,seq : $("#seq").val()
            ,quest_num : $("#quest_num").val()
            ,page : $("#page").val()
            ,q_code : $("#q_code").val()
            ,qaData : JSON.stringify(qaData)
        };

        common.ajax.send('/survey/multiProcess', json);
        common.ajax.return = function(data) {

            if(data.PAGE == 0) {
                location.replace("/survey/surveyEnd?campaign_code="+$("#campaign_code").val()+"&uid="+$("#uid").val()+"&seq="+$("#seq").val()+"&quest_num="+$("#quest_num").val());
            } else {
                location.replace("/survey/page?campaign_code="+$("#campaign_code").val()+"&uid="+$("#uid").val()+"&seq="+$("#seq").val()+"&quest_num="+$("#quest_num").val()+"&page="+data.PAGE);
            }


            console.log(data);
            //
        }

    });
});