var questArr = [];
$(function() {
    var campaign_code = $("#campaign_code").val();
    var quest = [];


    $("#settingBtn").click(function() {
        var grade_code = "";
        questArr = [];
        if($(".grade_code").is(":checked") == false) {
            alert("참여대상을 선택해주세요.");
            return;
        } else {
            $(".grade_code").each(function () {
                if ($(this).is(":checked") == true) {
                    if (grade_code == "") {
                        grade_code = $(this).val();
                    } else {
                        grade_code += "," + $(this).val();
                    }
                }
            });
        }

        if(inputTextCheck("join_cnt", "최대인원을 입력해주세요") == false) {
            return;
        }

        $(".point").each(function() {
            var quest = $(this).attr("quest");

            var point = $(this).val();
            var survey_time = $("#survey_time_"+quest).val();
            var quest_num = $(this).attr("quest_num");

            var questJson = {
                quest : quest
                ,quest_num : quest_num
                ,point : point
                ,survey_time : survey_time
            };

            questArr.push(questJson);
        });

        var sex = 0;
        var startAge = 0;
        var endAge = 0;
        var area = 0;



        if($(".sex").is(":checked") == false) {
            alert("성별을 선택해주세요.");
            return;
        } else {

            $(".sex").each(function() {
                if($(this).is(":checked") == true) {
                    sex += parseInt($(this).val());
                }


            });



        }

        if($("#startAge").val() == "") {
            $("#startAge").focus();
            alert("조사연령 범위를 입력해주세요.");
            return;
        }

        if($("#endAge").val() == "") {
            $("#endAge").focus();
            alert("조사연령 범위를 입력해주세요.");
            return;
        }

        if($(".area").is(":checked") == false) {
            alert("지역을 선택해주세요");
            return;
        } else {
            $(".area").each(function() {
                if($(this).is(":checked") == true) {
                    area += parseInt($(this).val());
                }
            });
        }
        if(parseInt($("#month_money_start").val()) > parseInt($("#month_money_end").val())){
            alert("월 평균 지출 설정이 잘못되었습니다. 다시 확인하고 선택해주세요.");
            $("#month_money_start").focus();
            return;
        }






        var jsonData = {
            campaign_code : campaign_code
            ,grade_code : grade_code
            ,join_cnt : $("#join_cnt").val()
            ,questData : JSON.stringify(questArr)
            ,sex : sex
            ,startAge : $("#startAge").val()
            ,endAge : $("#endAge").val()
            ,area : area
            ,money_start : $("#month_money_start").val()
            ,money_end : $("#month_money_end").val()
        };



        common.ajax.send("/campaign/settingProcess", jsonData);
        common.ajax.return = function(data) {
            switch(data.err) {
                case "000":
                    alert("정상적으로 저장되었습니다.");
                    location.replace("/campaign/list")
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

    $("#allSex").click(function() {
        if($(this).is(":checked") == true) {
            $(".sex").prop("checked", true);
        } else {
            $(".sex").prop("checked", false);
        }
    });

    $("#allAge").click(function() {
        if($(this).is(":checked") == true) {
            $("#startAge").val("1");
            $("#endAge").val("99");
        } else {
            $("#startAge").val("");
            $("#endAge").val("");

        }
    });

    $("#allArea").click(function() {
        if($(this).is(":checked") == true) {
            $(".area").prop("checked", true);
        } else {
            $(".area").prop("checked", false);
        }
    });
});

function multionoff(onoff) {
    if (onoff == "off") {
        $(".multioff").attr("checked", false);

    }
}