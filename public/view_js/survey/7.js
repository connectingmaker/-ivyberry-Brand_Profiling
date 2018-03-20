$(function() {
    $(".NotQuestion").click(function() {
        var brandNum = $(this).attr("brandNum");

        $("#NotQuestion_"+brandNum).prop("checked", "checked");

        $(this).removeClass("btn-white");
        $(this).addClass("btn-danger");
    });


    $(".nextStep").click(function() {
        var debugUrl = "";

        if ($("#debug").val() == "true") {
            debugUrl = "&debug=true";
        }
        var checkBool = true;
        var brandCnt = $("#brandCnt").val();
        var qaData = [];
        $(".qaData").each(function() {
            var brandNum = $(this).attr("brandNum");
            if($("#NotQuestion_"+brandNum).is(":checked") == false) {
                if($(this).val() == false) {
                    bootbox.alert("응답하지 않은 설문이 있습니다.");
                    return false;
                } else {
                    var data = {
                        "brandCode": $(this).attr("brand_code")
                        , "qaCode": "1"
                        , "qaText": $(this).val()
                    }
                    qaData.push(data);
                }
            } else {
                var data = {
                    "brandCode": $(this).attr("brand_code")
                    , "qaCode": "1"
                    , "qaText": "99"
                }
                qaData.push(data);
            }

        });

        /*
        for (var i = 0; i < brandCnt; i++) {


            if($(".qaData_"+i).is(":checked") == false) {
                //alert("응답하지 않은 설문이 있습니다.");
                bootbox.alert("응답하지 않은 설문이 있습니다.");
                return;
            } else {
                $(".qaData_"+i).each(function() {
                    $(this).each(function() {
                        if($(this).is(":checked") == true) {
                            var data = {
                                "brandCode": $(this).attr("brand_code")
                                , "qaCode": $(this).val()
                            }
                            qaData.push(data);
                        }
                    });

                });
            }

        }
        */


        var json = {
            campaign_code: $("#campaign_code").val()
            , uid: $("#uid").val()
            , seq: $("#seq").val()
            , quest_num: $("#quest_num").val()
            , page: $("#page").val()
            , q_code: $("#q_code").val()
            , qaData: JSON.stringify(qaData)
        };



        common.ajax.send('/survey/multiProcess', json);
        common.ajax.return = function (data) {


            if (data.PAGE == 0) {
                location.replace("/survey/surveyEnd?campaign_code=" + $("#campaign_code").val() + "&uid=" + $("#uid").val() + "&seq=" + $("#seq").val() + "&quest_num=" + $("#quest_num").val() + debugUrl);
            } else {
                location.replace("/survey/page?campaign_code=" + $("#campaign_code").val() + "&uid=" + $("#uid").val() + "&seq=" + $("#seq").val() + "&quest_num=" + $("#quest_num").val() + "&page=" + data.PAGE + debugUrl);
            }


        }



    });
});