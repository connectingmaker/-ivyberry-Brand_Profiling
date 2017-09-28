
$(function() {
    <!--이미지 7점 척도형 질문 추가하기 -->
    $("#img_7scaleCreate").click(function() {
        $('#img_7scaleModal').modal('show');
    });

    <!--7점 척도형 질문 추가하기 -->
    $("#7scaleCreate").click(function() {
        $('#7scaleModal').modal('show');
    });

    <!--이미지 선택 / 주관식 질문 추가하기 -->
    $("#imgTextCreate").click(function() {
        $('#imgTextModal').modal('show');
    });

    <!--양자택일형 질문 추가하기 -->
    $("#radioCreate").click(function() {
        $('#radioModal').modal('show');
    });
    <!--선택형 질문 추가하기 -->
    $("#multiCreate").click(function() {
        $('#multiModal').modal('show');
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