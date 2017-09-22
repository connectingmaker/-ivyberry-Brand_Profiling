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


    });
});