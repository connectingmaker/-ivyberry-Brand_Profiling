var questArr = [];
$(function() {
    var campaign_code = $("#campaign_code").val();
    var quest = [];


    $("#settingBtn").click(function() {
        var grade_code = "";
        questArr = [];

        $(".grade_code").each(function() {
            if($(this).is(":checked") == true) {
                if(grade_code == "") {
                    grade_code = $(this).val();
                } else {
                    grade_code += ","+$(this).val();
                }
            }
        });

        if(inputTextCheck("join_cnt", "최대인원을 입력해주세요") == false) {
            return;
        }

        $(".point").each(function() {
            var quest = $(this).attr("quest");

            var point = $(this).val();
            var survey_time = $("#survey_time_"+quest).val();
            var group_code = $(this).attr("group_code");

            var questJson = {
                quest : quest
                ,group_code : group_code
                ,point : point
                ,survey_time : survey_time
            };

            questArr.push(questJson);
        });

        console.log(questArr);


        var jsonData = {
            campaign_code : campaign_code
            ,grade_code : grade_code
            ,join_cnt : $("#join_cnt").val()
            ,questData : JSON.stringify(questArr)
        };


        common.ajax.send("/campaign/settingProcess", jsonData);
        common.ajax.return = function(data) {
            switch(data.err) {
                case "000":
                    alert("정상적으로 저장되었습니다.");
                    break;
                default:
                    alert("DB 오류 발생");
                    break;
            }
        }



    });


    $(".point").keyup(function() {
        var point = 0;

        $(".point").each(function() {
            if(isNaN($(this).val()) == false) {
                point += parseInt($(this).val());
            }
        });

        $("#total_point").val(point);
    });
});