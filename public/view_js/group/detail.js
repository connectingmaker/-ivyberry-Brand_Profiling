
$(function() {
    <!--7점 척도형 질문 추가하기 -->
    $("#7scaleCreate").click(function() {
        $('#7scaleModal').modal('show');
    });
    <!--이미지 선택 / 주관식 질문 추가하기 -->
    $("#imgTextCreate").click(function() {
        $('#imgTextModal').modal('show');
    });


    $("#7scaleSave").click(function() {
        if(inputTextCheck("question_name_left_ko", "좌측 질문 이름을 입력해주세요.") == false) {
            return;
        }

        if(inputTextCheck("question_name_right_ko", "우측 질문 이름을 입력해주세요.") == false) {
            return;
        }

        $('#brandModal').modal('hide');

    });

});