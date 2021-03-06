var questArr = [];
$(function() {
    var campaign_code = $("#campaign_code").val();
    var quest = [];
    $("#memberSelectBtn").click(function() {
        var json = {
            campaign_code: campaign_code
        }
        common.ajax.send("/campaign/member_certaign_list", json);
        common.ajax.return = function(data) {
            console.log(data);
            var dataString = "";
            for(var i = 0; i<data.length; i++) {
                dataString += data[i].UID + "\n";
            }

            console.log(dataString);

            $("#memberlist").val(dataString);
            $("#memberModal").modal("show");
        }

    });

    $("#memberSave").click(function() {
        if($("#memberlist").val() == false) {
            alert("대상자를 입력해주세요.");
            $("#memberlist").focus();
            return;
        } else {
            var temp = $("#memberlist").val().split("\n");
            var cnt = 0;
            var false_cnt = 0;
            for(var i = 0; i<temp.length; i++) {
                if(temp[i] != "") {
                    var json = {
                        campaign_code: campaign_code
                        , uid: temp[i]
                    }
                    common.ajax.send("/campaign/member_certaign_save", json);
                    common.ajax.return = function(data) {
                        if(data.ERR_CODE == "000") {
                            cnt++;
                        } else {
                            false_cnt = false_cnt + 1;
                        }

                        var title = "총 "+temp.length+"건중 (성공 : "+cnt+"건), (실패 : "+false_cnt+"건)";
                        $("#resultUID_cnt").html(title);

                    }


                }

            }
            $("#resultUID_cnt").append("<br>처리되었습니다.");


        }
    });

    $(".memberDownload").click(function() {
        location.href = "/users/excelDown?searchName=";
    });

    $("#point_default").keyup(function() {
        var point_default = $(this).val();
        var quest_num = "";
        var totalPoint = 0;
        $(".survey_time").each(function() {


            quest_num = $(this).attr("quest");

            var questTime = $(this).val();
            var questPoint = questTime * point_default;


            $("#point_"+quest_num).val(questPoint);

            totalPoint = totalPoint + questPoint;
        });



        $("#total_point").val(totalPoint);

    });


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
            if(quest != undefined) {
                questArr.push(questJson);
            }

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



        if($("#point_limit").val() == "") {
            alert("포인트제한을 입력해주세요.");
            return;
        }


        var jsonData = {
            campaign_code : campaign_code
            ,grade_code : grade_code
            ,join_cnt : $("#join_cnt").val()
            ,point_limit : $("#point_limit").val()
            ,questData : JSON.stringify(questArr)
            ,sex : sex
            ,startAge : $("#startAge").val()
            ,endAge : $("#endAge").val()
            ,area : area
            ,money_start : $("#month_money_start").val()
            ,money_end : $("#month_money_end").val()
        };

        console.log(jsonData);

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

    $(".survey_time").keyup(function() {
        var q_cnt = $(this).attr("q_cnt");
        var quest_num = $(this).attr("quest")
        var point_sum = Math.round($(this).val() * 50,0);

        $("#point_"+quest_num).val(point_sum);

    });



});

function multionoff(onoff) {
    if (onoff == "off") {
        $(".multioff").attr("checked", false);

    }
}