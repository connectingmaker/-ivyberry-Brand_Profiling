/**
 * Created by jccho on 2017. 12. 5..
 */
$(function() {
    $("#noticeSave").click(function() {
        var use_yn = "N";
        var notice_type = "BP2";
        if($(".notice_type").is(":checked") == false) {
            alert("BP2 & BP3을 선택해주세요..");
            return;
        }

        if(inputTextCheck('notice_subject', '공지사항 제목을 입력해주세요.') == false) {
            return;
        }

        if($(".notice_yn").is(":checked") == false) {
            alert("노출여부를 선택해주세요.");
            return;
        }

        if(inputTextCheck('notice_contents', '공지사항 내용을 입력해주세요.') == false) {
            return;
        }

        $(".notice_yn").each(function() {
           if($(this).is(":checked") == true) {
               use_yn = $(this).val();
           }
        });


        $(".notice_type").each(function() {
            if($(this).is(":checked") == true) {
                notice_type = $(this).val();
            }
        });






        var params = {
            seq : $("#seq").val()
            ,subject : $("#notice_subject").val()
            ,contents : $("#notice_contents").val()
            ,use_yn : use_yn
            ,notice_type : notice_type

        };


        common.ajax.send("/notice/writeProcess", params);
        common.ajax.return = function() {

            location.href = "/notice/list";

        };


    });


});