var maxCnt = 2;

$(function() {
    var campaign_code = $("#campaign_code").val();
    $("#brandBtn").click(function() {
        var brandDetail = "";
        var checkCnt = 0 ;
        if($(".brandpool").is(":checked") == false) {
            alert("브랜드 풀을 선택해주세요");
            return;
        }


        checkCnt = 0;
        $(".brandpool").each(function() {
            if($(this).is(":checked") == true) {
                if(brandDetail == "") {
                    brandDetail = $(this).val();
                } else {
                    brandDetail += "," + $(this).val();
                }
                checkCnt++;
            }
        });

        if(maxCnt > checkCnt) {
            alert("최소("+maxCnt+")개를 선택해주세요");
            return;
        }

        var brandSkip = "N";

        if($("#brandskip").is(":checked") == true) {
            brandSkip = "Y";
        }

        if($("#q_title").val() == false) {
            alert("질문내용을 입력해주세요.");
            $("#q_title").focus();
            return;
        }

        if($("#selected_min").val() == false) {

            alert("최소갯수를 선택해주세요.");
            return;
        }

        if($("#selected_max").val() == false) {
            alert("최대갯수를 선택해주세요.");
            return;
        }


        var json = {
            campaign_code : campaign_code
            ,brandList : brandDetail
            ,brandSkip : brandSkip
            ,q_title : $("#q_title").val()
            ,q_title_en : $("#q_title_en").val()
            ,q_title_cn : $("#q_title_cn").val()
            ,selected_min : $("#selected_min").val()
            ,selected_max : $("#selected_max").val()

        };
        console.log(json);

        common.ajax.send("/campaign/brandPoolProcess", json);
        common.ajax.return = function(data) {
            switch(data.err) {
                case "000":
                    location.href = "/campaign/question/"+campaign_code;
                    break;
                default:
                    alert("DB 오류 발생");
                    break;
            }
            //console.log(data);
        };

    });

    $("#allchk").click(function() {
        if($(this).is(":checked") == true) {
            $(".brandpool").each(function() {

                if($(this).attr("disabled") != "disabled") {
                    $(this).prop("checked", true);
                }
            });

        } else {
            $(".brandpool").each(function() {
                if($(this).attr("disabled") != "disabled") {
                    $(this).prop("checked", false);
                }
            });
            //$(".brandpool").prop("checked", false);
        }
    });


    $("#brandskip").click(function() {
        if($(this).is(":checked") == true) {
            $(".brandpool").each(function() {
                if($(this).attr("fix") != "true") {
                    $(this).attr("disabled", true);
                    $(this).prop("checked", false);
                }


            });
        } else {
            $(".brandpool").each(function() {
                if($(this).attr("fix") != "true") {
                    $(this).attr("disabled", false);
                    $(this).prop("checked", false);
                }
               // $(this).prop("checked", false);

            });
        }

    });
});