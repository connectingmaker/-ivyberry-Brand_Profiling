
$(function() {
    <!-- 질문 그룹  추가하기 -->
    $("#groupCreate").click(function() {
        $('#groupModal').modal('show');
    });


    $("#groupSave").click(function() {
        if(inputTextCheck("question_name", "질문 그룹 이름을 입력해주세요.") == false) {
            return;
        }

        if(inputTextCheck("memo", "버전관리를 위한 메모를 입력해주세요.") == false) {
            return;
        }

        $('#groupModal').modal('hide');

    });

});