console.log("OK");

var multi_template = "";
multi_template = "<tr id='[_ID_]'>";
multi_template += '<td style="padding:5px;"><input type="text" class="form-control qa_code" value="[_QA_CODE_]" readonly></td>';
multi_template += "<td><input type=\"text\" class=\"form-control qa_title_ko\" value='[_QA_TITLE_KO_]' placeholder=\"설문참여시 사용자에게 보여질 보기 내용을 입력해주세요.(필수)\"></td>";
multi_template += "<td><input type=\"text\" class=\"form-control qa_title_en\" value='[_QA_TITLE_EN_]' placeholder=\"설문참여시 사용자에게 보여질 보기 내용을 입력해주세요.\"></td>";
multi_template += "<td><input type=\"text\" class=\"form-control qa_title_cn\" value='[_QA_TITLE_CN_]' placeholder=\"설문참여시 사용자에게 보여질 보기 내용을 입력해주세요.\"></td>";
multi_template += "<td align='center'><div class='btnDeleteDiv'><button class='btn btn-danger btn-sm qaDelBtn'>삭제</button></div></td>";
multi_template += "</tr>";



var survey_template = "";

survey_template += "<div class=\"col-xs-12 bg-white box round_box push-30-t\" id='[_Q_CODE_ID_]'>";
survey_template += "<div class='row'>";
survey_template += "<div class='col-xs-8 title'>[_Q_TYPE_]</div>";
survey_template += "<div class=\"col-xs-4 text-right\">";
survey_template += "<button class=\"btn btn-danger btn-sm useQBtn\">[_USE_YN_TEXT_]</button>";
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

    /*************** 질문 그룹 리스트 ***********************/
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
                survey_template_temp = survey_template_temp.replace("[_USE_YN_TEXT_]", "활성화중");
                survey_template_temp = survey_template_temp.replace("[_USE_YN_]", "사용함");
            } else {
                survey_template_temp = survey_template_temp.replace("[_USE_YN_TEXT_]", "비활성");
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

        $("#multi_q_name").val("");
        $("#multi_q_title_ko").val("");
        $("#multi_q_title_en").val("");
        $("#multi_q_title_cn").val("");
        $("#multi_etc").val("");
        $("#multi_memo").val("");


        var multi_template_temp = multi_template.replace("[_ID_]", code);
        multi_template_temp = multi_template_temp.replace("[_QA_CODE_]", "");
        multi_template_temp = multi_template_temp.replace("[_QA_TITLE_KO_]", "");
        multi_template_temp = multi_template_temp.replace("[_QA_TITLE_EN_]", "");
        multi_template_temp = multi_template_temp.replace("[_QA_TITLE_CN_]", "");
        $("#multiTable #template").html(multi_template_temp);
        $("#q_code").val("");
        $('#multiModal').modal('show');
    });


    /************ 양자택일 저장 클릭 *******************************/
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
                survey_template_temp = survey_template_temp.replace("[_USE_YN_TEXT_]", "활성화중");
                survey_template_temp = survey_template_temp.replace("[_USE_YN_]", "사용함");
            } else {
                survey_template_temp = survey_template_temp.replace("[_USE_YN_TEXT_]", "비활성화");
                survey_template_temp = survey_template_temp.replace("[_USE_YN_]", "사용안함");
            }

            $('#multiModal').modal('hide');

            $("#questionList").append(survey_template_temp);
        };
        $('#multiModal').modal('hide');

    });



    /************** 7점척도 저장 클릭 ********************/
    $("#7scaleSave").click(function() {
        if(inputTextCheck("question_name_left_ko", "좌측 질문 이름을 입력해주세요.") == false) {
            return;
        }

        if(inputTextCheck("question_name_right_ko", "우측 질문 이름을 입력해주세요.") == false) {
            return;
        }

        $('#brandModal').modal('hide');

    });


    /************ 선택형 저장 클릭 ******************************/
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
                    qa_code : $("#template #"+id+" .qa_code").val()
                    ,qa_title_ko : $("#template #"+id+" .qa_title_ko").val()
                    ,qa_title_en : $("#template #"+id+" .qa_title_en").val()
                    ,qa_title_cn : $("#template #"+id+" .qa_title_cn").val()
                }

                qaJson.push(qaStringData);

            }
        });



        if(checkBool == true) {
            return;
        }




        var jsonData = {
            q_code : $("#q_code").val()
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

            if(dataJson.Q_CODE == undefined) {
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
                if (dataJson.USE_YN == "Y") {
                    survey_template_temp = survey_template_temp.replace("[_USE_YN_]", "사용함");
                } else {
                    survey_template_temp = survey_template_temp.replace("[_USE_YN_]", "사용안함");
                }

                $('#multiModal').modal('hide');

                $("#questionList").append(survey_template_temp);
            } else {
                var htmlObj = $("#"+dataJson.Q_CODE+" .contents_list tbody");
                htmlObj.find("tr").eq(0).find("td").eq(1).html(dataJson.Q_NAME);
                htmlObj.find("tr").eq(0).find("td").eq(2).html(dataJson.MEMO);
                htmlObj.find("tr").eq(0).find("td").eq(3).html(dataJson.ETC);
                htmlObj.find("tr").eq(1).find("td").eq(0).html(dataJson.Q_TITLE_KO);

                $('#multiModal').modal('hide');

            }
        };


    });

    /************ 척도형 저장 클릭 ******************************/
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


    /************ 척도형 이미지 저장 클릭 ******************************/
    $("#scaleImgSave").click(function() {
        var form = $('#scaleImg_Form')[0];
        var formData = new FormData(form);

        formData.append("file1",  $("#file1")[0].files[0]);
        formData.append("test",  "22222");

        console.log(formData);

        /*
         $.ajax({
         url:'/question/scaleImgProcess'
         ,proessData:false
         ,contentType:false
         ,data:formData
         ,type:'POST'
         ,success:function(data) {
         console.log(data);
         }
         });

         console.log(form);
         */
    });



    /************* 선택형 보기 추가 *************************/
    $("#qaBtn_multi").click(function() {
        var code = Math.floor(Math.random() * 99999999999999) + 1;
        var multi_template_temp = multi_template.replace("[_ID_]", code);
        $("#multiTable #template").append(multi_template_temp);
    });






    $("#scaleImg1Btn").click(function() {
        $("#file1").trigger("click");
    });

    $("#scaleImg2Btn").click(function() {
        $("#file2").trigger("click");
    });


    /************ 질문 삭제 클릭 ******************************/
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


    /******************* 활성화 비활성화 클릭 **************************/
    $(document).on('click', '.useQBtn', function() {

        var id = $(this).parents("div").parents("div").parents("div").attr("id");
        var use_yn = $("#"+id+" #use_yn").attr("use_yn");
        var btn = $(this);

        var json = {
            q_code: id
            ,use_yn : use_yn
        }
        common.ajax.send("/question/qUseUpdate", json);
        common.ajax.return = function (data) {
            $("#"+data.q_code+" #use_yn").attr("use_yn", data.use_yn);
            if(data.use_yn == "N") {
                btn.html("비활성화");
                $("#"+data.q_code+" .contents_list tbody").find("tr").eq(0).find("td").eq(5).html("사용안");
            } else {
                btn.html("활성화중");
                $("#"+data.q_code+" .contents_list tbody").find("tr").eq(0).find("td").eq(5).html("사용함");
            }

        }

    });


    /****************** 선택형 클릭 ************************************/
    $(document).on('click', '.modifyQBtn', function() {
        var id = $(this).parents("div").parents("div").parents("div").attr("id");
        $("#q_code").val(id);
        var question_type = $("#question_type").val();

        switch(question_type) {
            case "4":
                var json = {
                    q_code: id
                }
                common.ajax.send("/question/qSelectMulti", json);
                common.ajax.return = function (data) {
                    var jsonData = eval("("+data+")");
                    console.log(jsonData);

                    $("#single_q_name").val(jsonData.q[0].Q_NAME);
                    $("#single_q_title_ko").val(jsonData.q[0].Q_TITLE_KO);
                    $("#single_q_title_en").val(jsonData.q[0].Q_TITLE_EN);
                    $("#single_q_title_cn").val(jsonData.q[0].Q_TITLE_CN);


                    $("#single_qa_title_ko1").val(jsonData.qa[0].QA_TITLE_KO);
                    $("#single_qa_title_ko2").val(jsonData.qa[1].QA_TITLE_KO);

                    $("#single_qa_title_en1").val(jsonData.qa[0].QA_TITLE_EN);
                    $("#single_qa_title_en2").val(jsonData.qa[1].QA_TITLE_EN);

                    $("#single_qa_title_cn1").val(jsonData.qa[0].QA_TITLE_CN);
                    $("#single_qa_title_cn2").val(jsonData.qa[1].QA_TITLE_CN);

                    $("#single_etc").val(jsonData.q[0].ETC);


                    $('#radioModal').modal('show');


                }


                break;

            case "5":

                var json = {
                    q_code: id
                }
                common.ajax.send("/question/qSelectMulti", json);
                common.ajax.return = function (data) {
                    var jsonData = eval("("+data+")");
                    console.log(jsonData);

                    $("#multi_q_name").val(jsonData.q[0].Q_NAME);
                    $("#multi_q_title_ko").val(jsonData.q[0].Q_TITLE_KO);
                    $("#multi_q_title_en").val(jsonData.q[0].Q_TITLE_EN);
                    $("#multi_q_title_cn").val(jsonData.q[0].Q_TITLE_CN);
                    $("#multi_etc").val(jsonData.q[0].ETC);
                    $("#multi_memo").val(jsonData.q[0].MEMO);




                    var qaTemplate = multi_template;
                    var realTemplate = "";


                    for(var i = 0; i<jsonData.qa.length; i++) {
                        qaTemplate = multi_template;
                        qaTemplate = qaTemplate.replace("[_ID_]", jsonData.qa[i].QA_CODE);
                        qaTemplate = qaTemplate.replace("[_QA_CODE_]", jsonData.qa[i].QA_CODE);
                        qaTemplate = qaTemplate.replace("[_QA_TITLE_KO_]", jsonData.qa[i].QA_TITLE_KO);
                        qaTemplate = qaTemplate.replace("[_QA_TITLE_EN_]", jsonData.qa[i].QA_TITLE_EN);
                        qaTemplate = qaTemplate.replace("[_QA_TITLE_CN_]", jsonData.qa[i].QA_TITLE_CN);
                        realTemplate += qaTemplate;

                    }



                    $("#multiTable #template").append(realTemplate);

                    $('#multiModal').modal('show');

                }



            break;
        }
    });


    /*********** 보기 삭제 ***************************/
    $(document).on('click', '.qaDelBtn', function() {
        var q_code = $("#q_code").val();
        var qa_code = $(this).parents("tr").attr("id");
        if(confirm("보기코드("+qa_code+")를 정말로 삭제하시겠습니까?") == true) {
            var json = {
                q_code : q_code
                ,qa_code : qa_code
            }

            common.ajax.send("/question/qaDelete", json);
            common.ajax.return = function (data) {

                $("#template #"+data.qa_code).remove();
            }

        }
    });



});


function appSurvey()
{
}