$(function() {
    var selected_min = parseInt($("#selected_min").val());
    var selected_max = parseInt($("#selected_max").val());
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




        var sex = $(this).attr("sex");

        $("body").focus();

        $("#data").val(sex);
    });

    $(".brandList").click(function() {
        var brand_code = $(this).attr("brand_code");
        var chkTotal = 0;
        $(".chk_brand").each(function() {
            if($(this).is(":checked") == true) {
                chkTotal++;
            }
        });



        if($("#"+brand_code).is(":checked") == false) {

            if(chkTotal > selected_max) {
                //alert("10개 이상 선택할 수 없습니다.");
                bootbox.alert(selected_max + "개 이상 선택할 수 없습니다.");
                return;
            }



            $("#"+brand_code).prop("checked", true);
            $(this).removeClass("btn-white");
            $(this).addClass("btn-select");

            var src = $(this).find(".pull-left").find("img").attr("src");
            src = src.replace("_off","_on");
            $(this).find(".pull-left").find("img").attr("src", src);
        } else {
            $("#"+brand_code).prop("checked", false);
            $(this).removeClass("btn-select");
            $(this).addClass("btn-white");


            var src = $(this).find(".pull-left").find("img").attr("src");
            src = src.replace("_on","_off");
            $(this).find(".pull-left").find("img").attr("src", src);
        }

        var checkCnt = 0;
        $(".chk_brand").each(function() {
            if($(this).is(":checked") == true) {
                checkCnt++;
            }

        });


        $('body').focus();

        $("#selectCnt").html(checkCnt);
        $("#textselectCnt").html(checkCnt + "개가 선택되었습니다.");
    });


    $(".nextStep").click(function() {
        var debugUrl = "";

        if($("#debug").val() == "true") {
            debugUrl = "&debug=true";
        }
        if($(".chk_brand").is(":checked") == false) {
            //alert("브랜드를 선택해주세요.");
            bootbox.alert("브랜드를 선택해주세요.");
        } else {

            var totalCnt = 0;
            totalCnt = parseInt($("#selectCnt").html());
            if(totalCnt < selected_min) {
                //alert("10개 이상 선택할 수 없습니다.");
                bootbox.alert(selected_min + "개 이상 선택하셔야 됩니다.");
                return;
            }


            if(totalCnt > selected_max) {
                //alert("10개 이상 선택할 수 없습니다.");
                bootbox.alert(selected_max + "개 이상 선택할 수 없습니다.");
                return;
            }
            var brandData = [];
            $(".chk_brand").each(function() {
                if($(this).is(":checked") == true) {
                    var data = {
                        "brand_code" : $(this).val()
                    }

                    brandData.push(data);
                }
            });
            var json = {
                campaign_code : $("#campaign_code").val()
                ,uid : $("#uid").val()
                ,seq : $("#seq").val()
                ,quest_num : $("#quest_num").val()
                ,brandData : JSON.stringify(brandData)
            }

            common.ajax.send('/survey/brandProcess', json);
            common.ajax.return = function(data) {
                console.log(data);
                location.replace("/survey/page?campaign_code="+$("#campaign_code").val()+"&uid="+$("#uid").val()+"&seq="+$("#seq").val()+"&quest_num="+$("#quest_num").val()+"&page=1"+debugUrl+"&lang="+$("#lang").val());
            }
            //$("#brandForm").submit();
        }
    });
});