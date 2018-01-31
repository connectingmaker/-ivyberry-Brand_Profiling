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

            if(data.PAGE == 0) {
                location.replace("/survey/surveyEnd?campaign_code="+$("#campaign_code").val()+"&uid="+$("#uid").val()+"&seq="+$("#seq").val()+"&quest_num="+$("#quest_num").val()+debugUrl);
            } else {
                location.replace("/survey/page?campaign_code="+$("#campaign_code").val()+"&uid="+$("#uid").val()+"&seq="+$("#seq").val()+"&quest_num="+$("#quest_num").val()+"&page="+data.PAGE+debugUrl);
            }


            console.log(data);
            //
        }




        /*
         if($(".chk_qa_code").is(":checked") == false) {
         alert("브랜드를 선택해주세요.");
         } else {
         var qaData = [];
         $(".chk_qa_code").each(function() {
         if($(this).is(":checked") == true) {
         var data = {
         "qaCode" : $(this).val()
         }

         qaData.push(data);
         }
         });
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
         //
         }

         }
         */

    });
});