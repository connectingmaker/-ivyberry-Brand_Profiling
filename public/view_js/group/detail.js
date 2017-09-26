
$(function() {
    $("#questionCreate").click(function() {
        $('#questionModal').modal('show');
    });

    $("#questionSave").click(function() {
        if(inputTextCheck("question_name_left_ko", "좌측 질문 이름을 입력해주세요.") == false) {
            return;
        }

        if(inputTextCheck("question_name_right_ko", "우측 질문 이름을 입력해주세요.") == false) {
            return;
        }

        $('#brandModal').modal('hide');

    });

});