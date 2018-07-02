$(function() {
    var brandCnt = $("#brandCnt").val();
    $(".NotQuestion").click(function() {
        var brandNum = $(this).attr("brandNum");

        $("#NotQuestion_"+brandNum).prop("checked", "checked");

        $(this).removeClass("btn-white");
        $(this).addClass("btn-danger");
    });


    $(".qaList").click(function() {
        if($("#module_type").val() == "M") {
            var brandNum = $(this).attr("brandNum");
            var qaCode = $(this).attr("qaCode");



            if($("#qaData_"+brandNum+qaCode).is(":checked") == false) {
                $(this).removeClass("btn-white");
                $(this).addClass("btn-select");
                var src = $(this).find(".pull-left").find("img").attr("src");
                src = src.replace("_off", "_on");
                $(this).find(".pull-left").find("img").attr("src", src);
                $("#qaData_"+brandNum+qaCode).prop("checked", "checked");

            } else {
                $(this).removeClass("btn-select");
                $(this).addClass("btn-white");
                var src = $(this).find(".pull-left").find("img").attr("src");
                src = src.replace("_on", "_off");
                $(this).find(".pull-left").find("img").attr("src", src);
                $("#qaData_"+brandNum+qaCode).prop("checked", false);
            }

            var checkedCnt = 0;
            $(".qaData_"+brandNum).each(function() {

                if($(this).is(":checked") == true) {
                    checkedCnt++;
                }
            });

            $("#textselectCnt_"+brandNum).html(checkedCnt+"개가 선택되었습니다.");
        }

        if($("#module_type").val() == "S") {
            var brandNum = $(this).attr("brandNum");
            var qaCode = $(this).attr("qaCode");

            $("#qaData_"+brandNum+qaCode).prop("checked", "checked");
            $(".qaList").each(function() {
                var tempbrandNum = $(this).attr("brandNum");
                var tempqaCode = $(this).attr("qaCode");

                if($("#qaData_"+tempbrandNum+tempqaCode).is(":checked") == true) {
                    $(this).removeClass("btn-white");
                    $(this).addClass("btn-select");
                    var src = $(this).find(".pull-left").find("img").attr("src");
                    src = src.replace("_off", "_on");
                    $(this).find(".pull-left").find("img").attr("src", src);
                    $("#qaData_"+tempbrandNum+tempqaCode).prop("checked", "checked");

                } else {
                    $(this).removeClass("btn-select");
                    $(this).addClass("btn-white");
                    var src = $(this).find(".pull-left").find("img").attr("src");
                    src = src.replace("_on", "_off");
                    $(this).find(".pull-left").find("img").attr("src", src);
                    $("#qaData_"+tempbrandNum+tempqaCode).prop("checked", false);
                }
            });


            var checkedCnt = 0;
            $(".qaData_"+brandNum).each(function() {

                if($(this).is(":checked") == true) {
                    checkedCnt++;
                }
            });

            $("#textselectCnt_"+brandNum).html(checkedCnt+"개가 선택되었습니다.");
        }



    });

    $(".nextStep").click(function() {
        if($("#module_type").val() == "S" || $("#module_type").val() == "M") {
            var brandSelect = $("#brandSelect").val();
            var brandCnt = $("#brandCnt").val();

            if(parseInt(brandCnt) > parseInt(brandSelect)) {
                var tempbrandSelect = brandSelect;
                brandSelect = parseInt(brandSelect) + 1;

                $("#brandSelect").val(brandSelect);
                $("#brand"+tempbrandSelect).hide();
                $("#brand"+brandSelect).show();
            } else {

                var debugUrl = "";

                if ($("#debug").val() == "true") {
                    debugUrl = "&debug=true";
                }
                var checkBool = true;
                var brandCnt = $("#brandCnt").val();
                var qaData = [];
                for (var i = 0; i < brandCnt; i++) {
                    $(".qaData_" + i).each(function () {
                        $(this).each(function () {
                            if ($(this).is(":checked") == true) {
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
        } else {
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
        }

        var json = {
            campaign_code : $("#campaign_code").val()
            ,uid : $("#uid").val()
            ,seq : $("#seq").val()
            ,quest_num : $("#quest_num").val()
            ,page : $("#page").val()
            ,q_code : $("#q_code").val()
            ,qaData : JSON.stringify(qaData)
            ,module_type : $("#module_type").val()
        };



        common.ajax.send('/survey/multiProcess', json);
        common.ajax.return = function(data) {



            if(data.PAGE == 0) {
                location.replace("/survey/surveyEnd?campaign_code="+$("#campaign_code").val()+"&uid="+$("#uid").val()+"&seq="+$("#seq").val()+"&quest_num="+$("#quest_num").val()+debugUrl+"&lang="+$("#lang").val());
            } else {
                location.replace("/survey/page?campaign_code="+$("#campaign_code").val()+"&uid="+$("#uid").val()+"&seq="+$("#seq").val()+"&quest_num="+$("#quest_num").val()+"&page="+data.PAGE+debugUrl+"&lang="+$("#lang").val());
            }


        }
    });


});