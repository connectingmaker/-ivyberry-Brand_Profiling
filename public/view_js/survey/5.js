$(function() {
    $(".qaList").click(function() {
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



    });

    $(".nextStep").click(function() {
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

            if($("#debug").val() == "true") {
                debugUrl = "&debug=true";
            }
            var checkBool = true;
            var brandCnt = $("#brandCnt").val();
            var qaData = [];
            for(var i = 0; i<brandCnt; i++){
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
                    location.replace("/survey/surveyEnd?campaign_code="+$("#campaign_code").val()+"&uid="+$("#uid").val()+"&seq="+$("#seq").val()+"&quest_num="+$("#quest_num").val()+debugUrl+"&lang="+$("#lang").val());
                } else {
                    location.replace("/survey/page?campaign_code="+$("#campaign_code").val()+"&uid="+$("#uid").val()+"&seq="+$("#seq").val()+"&quest_num="+$("#quest_num").val()+"&page="+data.PAGE+debugUrl+"&lang="+$("#lang").val());
                }


            }
        }
    });

    /*
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

        $(".qaData").each(function() {
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


        }

    });
    */
});