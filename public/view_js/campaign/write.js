/**
 * Created by kwangheejung on 2017. 9. 22..
 */

$(function() {
    $("#surveyCreate").click(function() {
        if(inputTextCheck('campaign_title', '설문제목을 입력해주세요.') == false) {
            return;
        }

        if(inputTextCheck('campaign_desc', '설문설명을 입력해주세요.') == false) {
            return;
        }

        if(inputRadioCheck("category_code", "브랜드 카테고리를 선택해주세요.") == false) {
            return;
        }

        if(inputTextCheck('campaign_startdate', '시작일시를 입력해주세요.') == false) {
            return;
        }

        if(inputTextCheck('campaign_enddate', '종료일시를 입력해주세요.') == false) {
            return;
        }


        var params = {
            campaign_code : ""
            ,campaign_title : $("#campaign_title").val()
            ,campaign_desc : $("#campaign_desc").val()
            ,category_code : inputRadioCheckReturn("category_code")
            ,campaign_startdate : $("#campaign_startdate").val()
            ,campaign_enddate : $("#campaign_enddate").val()
        };


        common.ajax.send("/campaign/writeProcess", params);
        common.ajax.return = function(data) {
            var dataJson = eval("("+data+")");
            location.href = "/campaign/brand/"+dataJson[0].CAMPAIGN_CODE;
            //dataJson[0].CAMPAIGN_CODE;
            //console.log(dataJson);
            //console.log(data);
        };


    });
});