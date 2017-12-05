/**
 * Created by jccho on 2017. 12. 5..
 */
$(function() {
    $("#noticeSave").click(function() {
        var use_yn = "N";
        if(inputTextCheck('notice_subject', '공지사항 제목을 입력해주세요.') == false) {
            return;
        }

        if($(".notice_yn").is(":checked") == false) {
            alert("노출여부를 선택해주세요.");
        }

        if(inputTextCheck('notice_contents', '공지사항 내용을 입력해주세요.') == false) {
            return;
        }

        $(".notice_yn").each(function() {
           if($(this).is(":checked") == true) {
               use_yn = $(this).val();
           }
        });






        var params = {
            seq : $("#seq").val()
            ,subject : $("#notice_subject").val()
            ,contents : $("#notice_contents").val()
            ,use_yn : use_yn

        };


        common.ajax.send("/notice/writeProcess", params);
        common.ajax.return = function() {

            location.href = "/notice/list";

        };


    });


});