$(function() {
    $(".qaList").click(function() {
        $(".qaList").each(function() {
            var id = $(this).attr("id");
            $(this).removeClass("btn-select");
            $(this).addClass("btn-white");

            var src = $(this).find(".pull-left").find("img").attr("src");
            src = src.replace("_on","_off");
            $(this).find(".pull-left").find("img").attr("src", src);

            $("#qaData_"+id).attr("checked", false);
        });

        $(this).removeClass("btn-white");
        $(this).addClass("btn-select");

        var id = $(this).attr("id");
        $("#qaData_"+id).attr("checked", true);

        var src = $(this).find(".pull-left").find("img").attr("src");
        src = src.replace("_off","_on");
        $(this).find(".pull-left").find("img").attr("src", src);

    });

    $(".nextStep").click(function() {
        var qaData = [];
        $(".qaData").each(function () {
            if ($(this).attr("checked") == "checked") {
                var data = {
                     "qaCode": $(this).val()
                }
                qaData.push(data);
            }

        });

        var json = {
            campaign_code : $("#campaign_code").val()
            ,uid : $("#uid").val()
            ,sq_code : $("#sq_code").val()
            ,qaData : JSON.stringify(qaData)
        };




        common.ajax.type = "POST";
        common.ajax.send('/survey/sqProcess', json);
        common.ajax.return = function(data) {
            switch(data.ERR_CODE) {
                case "SC":
                    location.replace("/survey/img_surveyEnd?campaign_code="+$("#campaign_code").val()+"&uid="+$("#uid").val()+"&lang="+$("#lang").val());
                    alert("죄송합니다. 이 설문에 맞는 대상이 아닙니다.\n다른 설문에 참여해주세요.");
                    break;
                case "QN":
                    location.replace("/survey/q?campaign_code="+$("#campaign_code").val() + "&uid="+$("#uid").val()+"&q_code="+data.Q_CODE);
                    break;
                case "SQN":
                    location.replace("/survey/sq?campaign_code="+$("#campaign_code").val() + "&uid="+$("#uid").val()+"&sq_code="+data.SC_CODE);
                    break;
                default:

                    break;
            }


        }

    });
});