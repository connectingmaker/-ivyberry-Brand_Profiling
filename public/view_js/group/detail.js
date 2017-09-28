var multi_template = "";
multi_template = "<tr id='[_ID_]'>";
multi_template += '<td style="padding:5px;"><input type="text" class="form-control qa_code"></td>';
multi_template += "<td><input type=\"text\" class=\"form-control qa_title_ko\" placeholder=\"설문참여시 사용자에게 보여질 보기 내용을 입력해주세요.(필수)\"></td>";
multi_template += "<td><input type=\"text\" class=\"form-control qa_title_en\" placeholder=\"설문참여시 사용자에게 보여질 보기 내용을 입력해주세요.\"></td>";
multi_template += "<td><input type=\"text\" class=\"form-control qa_title_cn\" placeholder=\"설문참여시 사용자에게 보여질 보기 내용을 입력해주세요.\"></td>";
multi_template += "<td></td>";
multi_template += "</tr>";


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
        var code = Math.floor(Math.random() * 99999999999999) + 1;
        var multi_template_temp = multi_template.replace("[_ID_]", code);
        $("#multiTable #template").append(multi_template_temp);
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



    $("#qaBtn_multi").click(function() {
        var code = Math.floor(Math.random() * 99999999999999) + 1;
        var multi_template_temp = multi_template.replace("[_ID_]", code);
        $("#multiTable #template").append(multi_template_temp);
    });



    $("#multiSave").click(function() {
        if(inputTextCheck("multi_q_name", "질문이름을 입력해주세요.") == false) {
            return;
        }

        if(inputTextCheck("multi_q_title_ko", "질문 내용을 입력해주세요.") == false) {
            return;
        }

        var qaJson = [];
        var qaStringData = {};

        var checkBool = false;

        $(".qa_title_ko").each(function() {

            if($(this).val() == false) {
                alert("보기 국문을 입력해주세요.");
                checkBool = true;
                $(this).focus();
                return false;
            } else {
                var id = $(this).parents("tr").attr("id");
                qaStringData = {
                    qa_code : $("#"+id+" .qa_code").val()
                    ,qa_title_ko : $("#"+id+" .qa_title_ko").val()
                    ,qa_title_en : $("#"+id+" .qa_title_en").val()
                    ,qa_title_cn : $("#"+id+" .qa_title_cn").val()
                }

                qaJson.push(qaStringData);

            }
        });

        if(checkBool == true) {
            return;
        }

        var jsonData = {
            q_code : ""
            ,group_code : $("#group_code").val()
            ,q_name : $("#multi_q_name").val()
            ,q_title_ko : $("#multi_q_title_ko").val()
            ,q_title_en : $("#multi_q_title_en").val()
            ,q_title_cn : $("#multi_q_title_cn").val()
            ,etc : $("#multi_etc").val()
            ,qaJson : JSON.stringify(qaJson)
        };

        common.ajax.send('/question/multiProcess', jsonData);
        common.ajax.return = function(data) {
            console.log(data);
        };

        console.log(jsonData);

    });

});