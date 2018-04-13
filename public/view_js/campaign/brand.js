$(function() {
    var campaign_code = $("#campaign_code").val();
    var visual_yn = "";
    var brandList = "";
    var brand_total = 0;
    var brand_fix = 5;



    $(".visual_yn").click(function() {
        brand_total = 0;
        if($(this).val() == "Y") {
            brand_fix = 4;
            $(".brandlist").eq(0).prop("checked", true);

            brand_total++;

            $(".brandlist").each(function() {
                if($(this).is(":checked") == true) {
                    brand_total++;
                }
            });

            if(brand_total > 30) {
                alert("가상브랜드와 고정브랜드의 총 개수가 30개를 넘어 선택할 수 없습니다. 다시 브랜드를 선택하여 주시기 바랍니다.");

                $(".visual_yn").attr("checked", false);

                $(".brandlist").each(function() {
                    $(this).attr("checked", false);
                });
            }
        } else {
            brand_fix = 5;
            $(".brandlist").eq(0).prop("checked", false);

            $(".brandlist").each(function() {
                if($(this).is(":checked") == true) {
                    brand_total++;
                }
            });

            if(brand_total > 30) {
                alert("고정브랜드 30개가 초과되었습니다.");

                $(".brandlist").each(function() {
                    $(this).attr("checked", false);
                });
            }
        }
        $("#brandTotal").html(brand_fix);
    });

    $(".brandlist").click(function() {
        brand_total = 0;
        $(".brandlist").each(function() {
            if($(this).is(":checked") == true) {
                brand_total++;
            }

        });

        if(brand_total > 30){
            $(this).attr("checked",false);
            alert("고정브랜드 최대 개수를 확인하여 선택해주세요.");
        }


    });

    $("#brandBtn").click(function() {
        if($(".visual_yn").is(":checked") == false) {ㅇ
            alert("가상브랜드를 선택해주세요");
            return;
        }

        visual_yn = inputRadioCheckReturn("visual_yn");
        brandList = [];

        $(".brandlist").each(function() {
            if($(this).is(":checked") == true) {
                if (brandList == "") {
                    brandList = $(this).val();
                } else {
                    brandList += "," + $(this).val();
                }

            }
        });


        var json = {
            campaign_code : campaign_code
            ,visual_yn : visual_yn
            ,brandList : brandList
        };


        common.ajax.send("/campaign/brandProcess", json);
        common.ajax.return = function(data) {
            switch(data.err) {
                case "000":
                    location.href = "/campaign/brandPool/"+campaign_code;
                    break;
                default:
                    alert("DB 오류 발생");
                    break;
            }
            //console.log(data);
        };


    });
});