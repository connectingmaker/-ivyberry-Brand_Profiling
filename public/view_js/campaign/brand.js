$(function() {
    var campaign_code = $("#campaign_code").val();
    var visual_yn = "";
    var brandList = "";
    $("#brandBtn").click(function() {
        if($(".visual_yn").is(":checked") == false) {
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