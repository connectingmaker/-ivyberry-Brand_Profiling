var multi_template = "";
multi_template = "<tr id='[_ID_]'>";
multi_template += '<td style="padding:5px;"><input type="text" class="form-control qa_code" readonly></td>';
multi_template += "<td><input type=\"text\" class=\"form-control qa_title_ko\" placeholder=\"설문참여시 사용자에게 보여질 보기 내용을 입력해주세요.(필수)\"></td>";
multi_template += "<td><input type=\"text\" class=\"form-control qa_title_en\" placeholder=\"설문참여시 사용자에게 보여질 보기 내용을 입력해주세요.\"></td>";
multi_template += "<td><input type=\"text\" class=\"form-control qa_title_cn\" placeholder=\"설문참여시 사용자에게 보여질 보기 내용을 입력해주세요.\"></td>";
multi_template += "<td></td>";
multi_template += "</tr>";



var survey_template = "";

survey_template += "<div class=\"col-xs-12 bg-white box round_box push-30-t\" id='[_Q_CODE_ID_]'>";
survey_template += "<div class='row'>";
survey_template += "<div class='col-xs-8 title'>[_Q_TYPE_]</div>";
survey_template += "<div class=\"col-xs-4 text-right\">";
survey_template += "<button class=\"btn btn-danger btn-sm useQBtn\">활성화중</button>";
survey_template += "<button class=\"btn btn-danger btn-sm delQBtn\">삭제</button>";
survey_template += "<button class=\"btn btn-danger btn-sm modifyQBtn\">수정</button>";
survey_template += "</div>";
survey_template += "</div>";

survey_template += '<div class="contents_list">';
survey_template += "<table class=\"table table-bordered fontsize\">";
survey_template += "<col width=\"8%\">";
survey_template += "<col width=\"28%\">";
survey_template += "<col width=\"10%\">";
survey_template += "<col width=\"10%\">";
survey_template += "<col width=\"10%\">";
survey_template += "<col width=\"10%\">";
survey_template += "<col width=\"20%\">";
survey_template += "<col width=\"10%\">";
survey_template += "<thead>";
survey_template += "<th>질문ID</th>";
survey_template += "<th>질문이름</th>";
survey_template += "<th>메모</th>";
survey_template += "<th>참조</th>";
survey_template += "<th>최근수정일</th>";
survey_template += "<th>상태</th>";
survey_template += "</thead>";
survey_template += "<tbody>";
survey_template += "<tr>";
survey_template += "<td>[_Q_CODE_]</td>";
survey_template += "<td>[_Q_NAME_]</td>";
survey_template += "<td>[_MEMO_]</td>";
survey_template += "<td>[_ETC_]</td>";
survey_template += "<td>[_Q_INSERT_DATETIME_]</td>";
survey_template += "<td id='use_yn' use_yn='[_SET_USE_YN_]'>[_USE_YN_]</td>";
survey_template += "</tr>";
survey_template += "<tr>";
survey_template += "<th>질문내용<upper class='check'>*</upper></th>";
survey_template += "<td colspan='5'>[_Q_TITLE_KO_]</td>"
survey_template += "</tr>";
survey_template += "<tr>";
survey_template += "<th>질문영문</th>";
survey_template += "<td colspan='5'>[_Q_TITLE_EN_]</td>"
survey_template += "</tr>";
survey_template += "<tr>";
survey_template += "<th>질문중문</th>";
survey_template += "<td colspan='5'>[_Q_TITLE_CN_]</td>"
survey_template += "</tr>";
survey_template += "</tbody>";
survey_template += "</table>";
survey_template += "</div>";
survey_template += "</div>";



$(function() {
    var json = {
        group_code : $("#group_code").val()
    };
    common.ajax.send('/question/qlist', json);
    common.ajax.return = function(data) {
        var dataJson = eval("(" + data + ")");



        for(var i = 0; i<dataJson.length; i++) {
            var survey_template_temp = survey_template;
            survey_template_temp = survey_template_temp.replace("[_Q_TYPE_]", $("#question_type").html());
            survey_template_temp = survey_template_temp.replace("[_Q_CODE_ID_]", dataJson[i].Q_CODE);
            survey_template_temp = survey_template_temp.replace("[_Q_CODE_]", dataJson[i].Q_CODE);
            survey_template_temp = survey_template_temp.replace("[_Q_NAME_]", dataJson[i].Q_NAME);
            survey_template_temp = survey_template_temp.replace("[_MEMO_]", dataJson[i].MEMO);
            survey_template_temp = survey_template_temp.replace("[_ETC_]", dataJson[i].ETC);
            survey_template_temp = survey_template_temp.replace("[_Q_INSERT_DATETIME_]", string.dateTime(dataJson[i].INSERT_DATETIME));
            survey_template_temp = survey_template_temp.replace("[_Q_TITLE_KO_]", dataJson[i].Q_TITLE_KO);
            survey_template_temp = survey_template_temp.replace("[_Q_TITLE_EN_]", dataJson[i].Q_TITLE_EN);
            survey_template_temp = survey_template_temp.replace("[_Q_TITLE_CN_]", dataJson[i].Q_TITLE_CN);
            survey_template_temp = survey_template_temp.replace("[_SET_USE_YN_]", dataJson[i].USE_YN);
            if(dataJson[i].USE_YN == "Y") {
                survey_template_temp = survey_template_temp.replace("[_USE_YN_]", "사용함");
            } else {
                survey_template_temp = survey_template_temp.replace("[_USE_YN_]", "사용안함");
            }
            $("#questionList").append(survey_template_temp);
        }
    }


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


    $("#singleSave").click(function() {
        if(inputTextCheck("single_q_name", "질문이름을 입력해주세요.") == false) {
            return;
        }

        if(inputTextCheck("single_q_title_ko", "질문 내용을 입력해주세요.") == false) {
            return;
        }



        var qaJson = [];
        var qaStringData = {};
        qaStringData = {
            qa_code : ""
            ,qa_title_ko : $("#single_qa_title_ko1").val()
            ,qa_title_en : $("#single_qa_title_en1").val()
            ,qa_title_cn : $("#single_qa_title_cn1").val()
        }
        qaJson.push(qaStringData);


        qaStringData = {
            qa_code : ""
            ,qa_title_ko : $("#single_qa_title_ko2").val()
            ,qa_title_en : $("#single_qa_title_en2").val()
            ,qa_title_cn : $("#single_qa_title_cn2").val()
        }
        qaJson.push(qaStringData);

        var jsonData = {
            q_code : ""
            ,group_code : $("#group_code").val()
            ,q_name : $("#single_q_name").val()
            ,q_title_ko : $("#single_q_title_ko").val()
            ,q_title_en : $("#single_q_title_en").val()
            ,q_title_cn : $("#single_q_title_cn").val()
            ,etc : $("#single_etc").val()
            ,memo : ""
            ,qaJson : JSON.stringify(qaJson)
        };


        common.ajax.send('/question/singleProcess', jsonData);
        common.ajax.return = function(data) {
            var dataJson = eval("("+data+")");
            dataJson = dataJson[0];


            var survey_template_temp = survey_template;
            survey_template_temp = survey_template_temp.replace("[_Q_TYPE_]", $("#question_type").html());
            survey_template_temp = survey_template_temp.replace("[_Q_CODE_ID_]", dataJson.Q_CODE);
            survey_template_temp = survey_template_temp.replace("[_Q_CODE_]", dataJson.Q_CODE);
            survey_template_temp = survey_template_temp.replace("[_Q_NAME_]", dataJson.Q_NAME);
            survey_template_temp = survey_template_temp.replace("[_MEMO_]", dataJson.MEMO);
            survey_template_temp = survey_template_temp.replace("[_ETC_]", dataJson.ETC);
            survey_template_temp = survey_template_temp.replace("[_Q_INSERT_DATETIME_]", string.dateTime(dataJson.INSERT_DATETIME));
            survey_template_temp = survey_template_temp.replace("[_Q_TITLE_KO_]", dataJson.Q_TITLE_KO);
            survey_template_temp = survey_template_temp.replace("[_Q_TITLE_EN_]", dataJson.Q_TITLE_EN);
            survey_template_temp = survey_template_temp.replace("[_Q_TITLE_CN_]", dataJson.Q_TITLE_CN);
            survey_template_temp = survey_template_temp.replace("[_SET_USE_YN_]", dataJson.USE_YN);
            if(dataJson.USE_YN == "Y") {
                survey_template_temp = survey_template_temp.replace("[_USE_YN_]", "사용함");
            } else {
                survey_template_temp = survey_template_temp.replace("[_USE_YN_]", "사용안함");
            }

            $('#multiModal').modal('hide');

            $("#questionList").append(survey_template_temp);
        };
        $('#multiModal').modal('hide');

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
            ,memo : $("#multi_memo").val()
            ,qaJson : JSON.stringify(qaJson)
        };

        common.ajax.send('/question/multiProcess', jsonData);
        common.ajax.return = function(data) {
            var dataJson = eval("("+data+")");
            dataJson = dataJson[0];


            var survey_template_temp = survey_template;
            survey_template_temp = survey_template_temp.replace("[_Q_TYPE_]", $("#question_type").html());
            survey_template_temp = survey_template_temp.replace("[_Q_CODE_ID_]", dataJson.Q_CODE);
            survey_template_temp = survey_template_temp.replace("[_Q_CODE_]", dataJson.Q_CODE);
            survey_template_temp = survey_template_temp.replace("[_Q_NAME_]", dataJson.Q_NAME);
            survey_template_temp = survey_template_temp.replace("[_MEMO_]", dataJson.MEMO);
            survey_template_temp = survey_template_temp.replace("[_ETC_]", dataJson.ETC);
            survey_template_temp = survey_template_temp.replace("[_Q_INSERT_DATETIME_]", string.dateTime(dataJson.INSERT_DATETIME));
            survey_template_temp = survey_template_temp.replace("[_Q_TITLE_KO_]", dataJson.Q_TITLE_KO);
            survey_template_temp = survey_template_temp.replace("[_Q_TITLE_EN_]", dataJson.Q_TITLE_EN);
            survey_template_temp = survey_template_temp.replace("[_Q_TITLE_CN_]", dataJson.Q_TITLE_CN);
            survey_template_temp = survey_template_temp.replace("[_SET_USE_YN_]", dataJson.USE_YN);
            if(dataJson.USE_YN == "Y") {
                survey_template_temp = survey_template_temp.replace("[_USE_YN_]", "사용함");
            } else {
                survey_template_temp = survey_template_temp.replace("[_USE_YN_]", "사용안함");
            }

            $('#multiModal').modal('hide');

            $("#questionList").append(survey_template_temp);
        };


    });


    $("#scaleSave").click(function() {
        if(inputTextCheck("scale_q_name", "질문이름을 입력해주세요.") == false) {
            return;
        }

        if(inputTextCheck("scale_q_title_ko", "질문 내용을 입력해주세요.") == false) {
            return;
        }

        var qaJson = [];
        var qaStringData = {};

        qaStringData = {
            qa_code : ""
            ,qa_title_ko : $("#scale_qa_title_ko1").val()
            ,qa_title_en : $("#scale_qa_title_en1").val()
            ,qa_title_cn : $("#scale_qa_title_cn1").val()
        }
        qaJson.push(qaStringData);

        qaStringData = {
            qa_code : ""
            ,qa_title_ko : $("#scale_qa_title_ko2").val()
            ,qa_title_en : $("#scale_qa_title_en2").val()
            ,qa_title_cn : $("#scale_qa_title_cn2").val()
        }
        qaJson.push(qaStringData);

        qaStringData = {
            qa_code : ""
            ,qa_title_ko : $("#scale_qa_title_ko3").val()
            ,qa_title_en : $("#scale_qa_title_en3").val()
            ,qa_title_cn : $("#scale_qa_title_cn3").val()
        }
        qaJson.push(qaStringData);


        var jsonData = {
            q_code : ""
            ,group_code : $("#group_code").val()
            ,q_name : $("#scale_q_name").val()
            ,q_title_ko : $("#scale_q_title_ko").val()
            ,q_title_en : $("#scale_q_title_en").val()
            ,q_title_cn : $("#scale_q_title_cn").val()
            ,etc : $("#scale_etc").val()
            ,memo : $("#scale_memo").val()
            ,qaJson : JSON.stringify(qaJson)
        };


        common.ajax.send('/question/scaleProcess', jsonData);
        common.ajax.return = function(data) {
            var dataJson = eval("("+data+")");
            dataJson = dataJson[0];


            var survey_template_temp = survey_template;
            survey_template_temp = survey_template_temp.replace("[_Q_TYPE_]", $("#question_type").html());
            survey_template_temp = survey_template_temp.replace("[_Q_CODE_ID_]", dataJson.Q_CODE);
            survey_template_temp = survey_template_temp.replace("[_Q_CODE_]", dataJson.Q_CODE);
            survey_template_temp = survey_template_temp.replace("[_Q_NAME_]", dataJson.Q_NAME);
            survey_template_temp = survey_template_temp.replace("[_MEMO_]", dataJson.MEMO);
            survey_template_temp = survey_template_temp.replace("[_ETC_]", dataJson.ETC);
            survey_template_temp = survey_template_temp.replace("[_Q_INSERT_DATETIME_]", string.dateTime(dataJson.INSERT_DATETIME));
            survey_template_temp = survey_template_temp.replace("[_Q_TITLE_KO_]", dataJson.Q_TITLE_KO);
            survey_template_temp = survey_template_temp.replace("[_Q_TITLE_EN_]", dataJson.Q_TITLE_EN);
            survey_template_temp = survey_template_temp.replace("[_Q_TITLE_CN_]", dataJson.Q_TITLE_CN);
            survey_template_temp = survey_template_temp.replace("[_SET_USE_YN_]", dataJson.USE_YN);
            if(dataJson.USE_YN == "Y") {
                survey_template_temp = survey_template_temp.replace("[_USE_YN_]", "사용함");
            } else {
                survey_template_temp = survey_template_temp.replace("[_USE_YN_]", "사용안함");
            }

            $('#7scaleModal').modal('hide');

            $("#questionList").append(survey_template_temp);
        };
    });


    $(document).on('click', '.delQBtn', function() {
        if(confirm("선택한 질문지를 삭제하시겠습니까") == true) {

            var id = $(this).parents("div").parents("div").parents("div").attr("id");
            var json = {
                q_code : id
            }
            common.ajax.send("/question/qDelete", json);
            common.ajax.return = function(data) {
                /*
                console.log(data);
                */
                $("#"+data.q_code).remove();
            }
        }
    });

    $(document).on('click', '.useQBtn', function() {

        var id = $(this).parents("div").parents("div").parents("div").attr("id");
        var use_yn = $("#"+id+" #use_yn").attr("use_yn");
        var btn = $(this);
        console.log(btn);

        var json = {
            q_code: id
            ,use_yn : use_yn
        }
        common.ajax.send("/question/qUseUpdate", json);
        common.ajax.return = function (data) {
            $("#"+data.q_code+" #use_yn").attr("use_yn", data.use_yn);
            if(data.use_yn == "N") {
                btn.html("비활성화");
            } else {
                btn.html("활성화중");
            }

        }

    });

    $(document).on('click', '.modifyQBtn', function() {
        var id = $(this).parents("div").parents("div").parents("div").attr("id");
    });



});


function appSurvey()
{
}