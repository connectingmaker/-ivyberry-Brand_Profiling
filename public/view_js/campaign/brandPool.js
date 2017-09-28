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


        var json = {
            campaign_code : campaign_code
            ,brandList : brandDetail
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
});