var brandCnt = $("#brandCnt").val();
var nextBrand = 0;
var subTextBrand = false;
var imgSelect = 0;
var qaData=[];

$(function() {
    $(".nextStep").click(function() {
        $(".brandImg").hide();
        $(".brandText").hide();

        if(subTextBrand == false) {
            var src = $(".brandImg_"+nextBrand+ " .imgBox_on").find("img").eq(1).attr("src");
            console.log($(".brandImg_"+nextBrand+ " .imgBox_on").find("img"));
            if(src == undefined) {
                alert("이미지를 선택해주세요.");
                $(".brandImg_" + nextBrand).show();
                return false;

            } else {
                subTextBrand = true;

                $(".brandText_"+nextBrand+" .imgBox_sub").html("<img src='"+src+"' width='100%'>");
                $(".brandText_"+nextBrand).show();
            }


        } else {
            var src = $(".brandImg_"+nextBrand+ " .imgBox_on").find("img").attr("src");
            var brand_code = $(".brandImg_"+nextBrand+ " .imgBox_on").attr("brand_code");
            var qa_code = $(".brandImg_"+nextBrand+ " .imgBox_on").attr("qa_code");
            var min_text = $("#q_text_min").val();
            var max_text = $("#q_text_max").val();
            var checkText = 0;
            $(".brandText_"+nextBrand+" .imgText").each(function() {
                if($(this).val() != false) {
                    checkText++;
                }
            });


            if(parseInt(min_text) > checkText) {
                alert("최소 "+min_text+"를 입력해주세요.");
                $(".brandText_"+nextBrand).show();
                return;

            } else {
                $(".brandText_"+nextBrand+" .imgText").each(function() {
                    var json = {
                        brandCode: brand_code
                        , qaCode: qa_code
                        , qaText: $(this).val()
                    };
                    
                    qaData.push(json);
                });



                if(nextBrand == brandCnt-1) {


                    var json = {
                        campaign_code : $("#campaign_code").val()
                        ,uid : $("#uid").val()
                        ,seq : $("#seq").val()
                        ,quest_num : $("#quest_num").val()
                        ,page : $("#page").val()
                        ,q_code : $("#q_code").val()
                        ,qaData : JSON.stringify(qaData)
                    };

                    var debugUrl = "";

                    if($("#debug").val() == "true") {
                        debugUrl = "&debug=true";
                    }



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
                } else {
                    subTextBrand = false;
                    $("#brandView_" + nextBrand).hide();
                    nextBrand++;
                    $("#brandView_" + nextBrand).show();
                    $(".brandImg_"+nextBrand).show();
                }
            }

        }

        $("body").focus();
    });


    $(".imgBox").click(function() {
        imgSelect = 0;
        $(".imgBox").removeClass("imgBox_on");
        $(".imgBox").addClass("imgBox_off");
        $(this).addClass("imgBox_on");

        /*
        $(this).find(".imgBox_check").each(function() {
            console.log("OK");
        });
        */

        $("#brandView_"+nextBrand+ " .imgBox .imgBox_check img").each(function() {
            var check_off = $(this).attr("src");
            check_off = check_off.replace("_on", "_off");
            $(this).attr("src", check_off);
        });


        var check = $(this).find(".imgBox_check img").attr("src");
        check = check.replace("_off", "_on");

        $(this).find(".imgBox_check img").attr("src", check);

        imgSelect++;

        $("body").focus();


        $(".brandImg_"+nextBrand+" #selectCnt").html(imgSelect);

    });

    $(".brandText_"+nextBrand+" .imgText").keyup(function() {

        var checkCount = 0;
        $(".brandText_"+nextBrand+" .imgText").each(function() {
            if($(this).val() != false) {
                checkCount++;
            }
        });

        $(".brandText_"+nextBrand+" #selectCnt").html(checkCount);


    });

});

