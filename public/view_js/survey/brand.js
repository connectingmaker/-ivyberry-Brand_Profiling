$(function() {

    $(".brandList").click(function() {
        var brand_code = $(this).attr("brand_code");

        if($("#"+brand_code).is(":checked") == false) {
            $("#"+brand_code).prop("checked", true);
            $(this).removeClass("btn-default");
            $(this).addClass("btn-danger");
        } else {
            $("#"+brand_code).prop("checked", false);
            $(this).removeClass("btn-danger");
            $(this).addClass("btn-default");
        }

        var checkCnt = 0;
        $(".chk_brand").each(function() {
            if($(this).is(":checked") == true) {
                checkCnt++;
            }
            $("#selectCnt").html(checkCnt);
        });
    });


    $(".nextStep").click(function() {
        if($(".chk_brand").is(":checked") == false) {
            alert("브랜드를 선택해주세요.");
        } else {
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
                ,brandData : JSON.stringify(brandData)
            }
            console.log(json);

            common.ajax.send('/survey/brandProcess', json);
            common.ajax.return = function(data) {
                location.replace("/survey/page?campaign_code="+$("#campaign_code").val()+"&uid="+$("#uid").val()+"&seq="+$("#seq").val()+"&quest_num="+$("#quest_num").val()+"&page=1");
            }
            //$("#brandForm").submit();
        }
    });
});