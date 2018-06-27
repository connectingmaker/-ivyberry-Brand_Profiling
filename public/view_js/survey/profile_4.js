$(function() {
    $(".qaList").click(function() {
        $(".qaList").each(function() {
            $(this).removeClass("btn-select");
            $(this).addClass("btn-white");

            var src = $(this).find(".pull-left").find("img").attr("src");
            src = src.replace("_on","_off");
            $(this).find(".pull-left").find("img").attr("src", src);
        });

        $(this).removeClass("btn-white");
        $(this).addClass("btn-select");

        var src = $(this).find(".pull-left").find("img").attr("src");
        src = src.replace("_off","_on");
        $(this).find(".pull-left").find("img").attr("src", src);

        var addr = $(this).attr("addr");

        $("#data").val(addr);
    });

    $(".nextStep").click(function() {
        if($("#data").val() == false) {
            //alert("지역을 선택해주세요.");
            // bootbox.alert("지역을 선택해주세요.");
            if($("#lang").val() == "en") {
                bootbox.alert("Please select a residential area.");
            } else if($("#lang").val() == "cn") {
                bootbox.alert("Please select a residential area.");
            } else {
                bootbox.alert("지역을 선택해주세요.");
            }

            $("#data").focus();
            return;
        }

        var json = {
            campaign_code : $("#campaign_code").val()
            ,uid : $("#uid").val()
            ,quest_num : $("#quest_num").val()
            ,step : $("#step").val()
            ,data : $("#data").val()
            ,seq : $("#seq").val()
        };


        common.ajax.send('/survey/profileProcess', json);
        common.ajax.return = function(data) {

            if(data.STEP == 0) {
                location.replace("/survey/surveyEnd?campaign_code="+$("#campaign_code").val()+"&uid="+$("#uid").val()+"&seq="+$("#seq").val()+"&quest_num="+$("#quest_num").val()+"&step="+data.STEP+"&lang="+$("#lang").val());
            } else {
                location.replace("/survey/profile?campaign_code="+$("#campaign_code").val()+"&uid="+$("#uid").val()+"&seq="+$("#seq").val()+"&quest_num="+$("#quest_num").val()+"&step="+data.STEP+"&lang="+$("#lang").val());
            }



            console.log(data);
            //
        }
    });
});