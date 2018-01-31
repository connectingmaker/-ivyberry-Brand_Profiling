$(function() {
    var brandCnt = $("#brandCnt").val();
    $(".qaData").click(function() {
        var brandNum = $(this).attr("brandNum");
        var checkedCnt = 0;
        for(var i = 0; i<brandCnt; i++) {
            if($(".qaData_"+i).is(":checked") == true) {
                checkedCnt++;
            }
        }


        $("#NotQuestionBtn_"+brandNum).removeClass("btn-danger");
        $("#NotQuestionBtn_"+brandNum).addClass("btn-white");

        $("#selectCnt").html(checkedCnt);
        $("#textselectCnt").html(checkedCnt + "개가 선택되었습니다.");
        $("body").focus();


    });

    $(".NotQuestion").click(function() {
        var brandNum = $(this).attr("brandNum");

        $("#NotQuestion_"+brandNum).prop("checked", "checked");

        $(this).removeClass("btn-white");
        $(this).addClass("btn-danger");
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

        $("body").focus();
    });


    $(".nextStep").click(function() {

        var debugUrl = "";

        if($("#debug").val() == "true") {
            debugUrl = "&debug=true";
        }

        var checkBool = true;
        var brandCnt = $("#brandCnt").val();
        var qaData = [];
        for(var i = 0; i<brandCnt; i++){

            if($(".qaData_"+i).is(":checked") == false) {
                //alert("응답하지 않은 설문이 있습니다.");
                bootbox.alert("응답하지 않은 설문이 있습니다.");
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
            console.log(data);
            if(data.PAGE == 0) {
                location.replace("/survey/surveyEnd?campaign_code="+$("#campaign_code").val()+"&uid="+$("#uid").val()+"&seq="+$("#seq").val()+"&quest_num="+$("#quest_num").val()+debugUrl);
            } else {
                location.replace("/survey/page?campaign_code="+$("#campaign_code").val()+"&uid="+$("#uid").val()+"&seq="+$("#seq").val()+"&quest_num="+$("#quest_num").val()+"&page="+data.PAGE);
            }


        }

    });
});