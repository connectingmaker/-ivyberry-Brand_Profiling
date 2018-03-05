
var multi_template = "";
multi_template = "<tr id='[_ID_]'>";
multi_template += '<td style="padding:5px;"><input type="text" class="form-control qa_code" value="[_QA_CODE_]" readonly></td>';
multi_template += "<td><input type=\"text\" class=\"form-control qa_title_ko\" value='[_QA_TITLE_KO_]' placeholder=\"설문참여시 사용자에게 보여질 보기 내용을 입력해주세요.(필수)\"></td>";
multi_template += "<td><input type=\"text\" class=\"form-control qa_title_en\" value='[_QA_TITLE_EN_]' placeholder=\"설문참여시 사용자에게 보여질 보기 내용을 입력해주세요.\"></td>";
multi_template += "<td><input type=\"text\" class=\"form-control qa_title_cn\" value='[_QA_TITLE_CN_]' placeholder=\"설문참여시 사용자에게 보여질 보기 내용을 입력해주세요.\"></td>";
multi_template += "<td align='center'><div class='btnDeleteDiv'><button class='btn btn-danger btn-sm qaDelBtn'>삭제</button></div></td>";
multi_template += "</tr>";


var img_template = "<tr class='[_ID_]' id='[_ID_]'>";
img_template += "<input type='hidden' id='imgValue' value='[_IMG_VALUE_]'>";
img_template += "<th rowspan='2' id='imgText'>[_IMG_]</th>";
img_template += '<th class="text-center">이미지 이름<span class="check">*</span></th>';
img_template += '<td><input type="text" id="img_qa_title_ko" class="form-control img_qa_title_ko" placeholder="이미지 이름을 입력해주세요.(필수)" value="[_QA_TITLE_KO_]"></td>';
img_template += '<th class="text-center">이미지 영문</th>';
img_template += '<td><input type="text" id="img_qa_title_en" class="form-control" placeholder="이미지의 영문 이름을 입력해주세요." value="[_QA_TITLE_EN_]"></td>';
img_template += '</tr>';
img_template += '<tr class="[_ID_]">';
img_template += '<th class="text-center">파일이름</th>';
img_template += '<td>권장사이즈(350*350px 이상)</td>';
img_template += '<th class="text-center">이미지 중문</th>';
img_template += '<td><input type="text" id="img_qa_title_cn" class="form-control" placeholder="이미지의 중문 이름을 입력해주세요." value="[_QA_TITLE_CN_]"></td>';
img_template += '</tr>';
img_template += '<tr class="[_ID_]">';
img_template += '<td class="text-center"><span class="btn btn-default btn-sm fileinput-button"><span>업로드하기 <span class="check">*</span></span><input id="IMG_[_ID_]" class="fileupload" type="file" name="qa_title_img"></span></td>';
img_template += '<td colspan="4" class="text-right"><button id="qaDel_[_QA_CODE_]" class="btn btn-sm btn-default scaleQaDelete">삭제</button></td>';
img_template += '</tr>';


/*
<tr>
<th rowspan="2"></th>
    <th class="text-center">이미지 이름<span class="check">*</span></th>
    <td>
    <input type="text" id="question_name_1_ko" class="form-control" placeholder="이미지 이름을 입력해주세요.(필수)">
    </td>
    <th class="text-center">이미지 영문</th>
<td>
<input type="text" id="question_name_1_en" class="form-control" placeholder="이미지의 영문 이름을 입력해주세요.">
    </td>
    </tr>
    <tr>
    <th class="text-center">파일이름</th>
    <td>권장사이즈(350*350px 이상)</td>
<th class="text-center">이미지 중문</th>
<td>
<input type="text" id="question_name_1_cn" class="form-control" placeholder="이미지의 중문 이름을 입력해주세요.">
    </td>
    </tr>
    <tr>
    <td class="text-center">
    <span class="btn btn-default btn-sm fileinput-button">
    <span>업로드하기 <span class="check">*</span></span>
    <!-- The file input field used as target for the file upload widget -->
<input class="fileupload" type="file" name="qa_title_img">
    </span>
    </td>
    <td colspan="4" class="text-right"><button class="btn btn-sm btn-default">삭제</button></td>
    </tr>
    */

var survey_template = "";

survey_template += "<div class=\"col-xs-12 bg-white box round_box push-10-t\" id='[_Q_CODE_ID_]'>";
survey_template += "<div class='row'>";
survey_template += "<div class='col-xs-8 title'>[_Q_TYPE_]</div>";
survey_template += "<div class=\"col-xs-4 text-right\">";
survey_template += "<button class=\"btn btn-default btn-sm delQBtn\">삭제</button>";
survey_template += "<button class=\"btn btn-success btn-sm useQBtn\">[_USE_YN_TEXT_]</button>";
survey_template += "<button class=\"btn btn-info btn-sm modifyQBtn\">수정</button>";
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

    $(document).on("change", ".use_yn", function() {
        var id = $(this).parents("tr").attr("id");
        var use_yn = $(this).val()
        var params = {
            group_code: id
            ,use_yn : use_yn
        };


        common.ajax.send("/question/groupUseYnUpdate", params);
        common.ajax.return = function(data) {

        }


    });

    /*********** 파일 업로드 *****************/

    $(document).on('click', '.fileupload', function() {
        var id = $(this).attr("id");
        id = id.replace("IMG_", "");

        $(this).fileupload({
            url: "/question/imageUpdate",
            dataType: 'json',
            done: function (e, data) {
                console.log(data.result.img);
                $("#"+id+" #imgText").html("<img src='/uploads/"+data.result.img+"' width='100%'>");
                $("#"+id+" #imgValue").val("/uploads/"+data.result.img);
                //$("#img1").html("<img src='/uploads/"+data.result.img+"' width='100%'>");

            }
        }).prop('disabled', !$.support.fileInput)
            .parent().addClass($.support.fileInput ? undefined : 'disabled');
    });

    $('#fileupload').fileupload({
        url: "/question/imageUpdate",
        dataType: 'json',
        done: function (e, data) {
            console.log(data.result.img);

            $("#img1").html("<img src='/uploads/"+data.result.img+"' width='100%'>")
            $("#scaleImg1").val("/uploads/"+data.result.img);

        }
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');

    $('#fileupload2').fileupload({
        url: "/question/imageUpdate",
        dataType: 'json',
        done: function (e, data) {
            console.log(data.result.img);
            $("#scaleImg2").val("/uploads/"+data.result.img);
            $("#img2").html("<img src='/uploads/"+data.result.img+"' width='100%'>")
        }
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');



    /*
    $('.fileupload').fileupload({
        url: "/question/imageUpdate",
        dataType: 'json',
        done: function (e, data) {
            alert("OK");

        }
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');
        */



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

        $("#q_code").val("");
        $("#scale_q_name").val("");
        $("#scale_memo").val("");
        $("#scale_q_title_ko").val("");
        $("#scale_q_title_en").val("");
        $("#scale_q_title_cn").val("");
        $("#scale_etc").val("");
        $("#scale_qa_title_ko1").attr("qa_code", "");
        $("#scale_qa_title_ko1").val("");
        $("#scale_qa_title_ko2").attr("qa_code", "");
        $("#scale_qa_title_ko2").val("");
        $("#scale_qa_title_ko3").attr("qa_code", "");
        $("#scale_qa_title_ko3").val("");

        $("#scale_qa_title_en1").attr("qa_code", "");
        $("#scale_qa_title_en1").val("");
        $("#scale_qa_title_en2").val("");
        $("#scale_qa_title_en3").val("");

        $("#scale_qa_title_cn1").attr("qa_code", "");
        $("#scale_qa_title_cn1").val("");
        $("#scale_qa_title_cn2").val("");
        $("#scale_qa_title_cn3").val("");


        $('#7scaleModal').modal('show');
    });

    <!--이미지 선택 / 주관식 질문 추가하기 -->
    $("#imgTextCreate").click(function() {
        var code = Math.floor(Math.random() * 99999999999999) + 1;
        var img_template_temp = replaceAll(img_template, "[_ID_]", code);


        img_template_temp = img_template_temp.replace("[_IMG_ID_]", "");
        img_template_temp = img_template_temp.replace("[_IMG_]", "");
        img_template_temp = img_template_temp.replace("[_IMG_VALUE_]", "");
        //img_template_temp = img_template_temp.replace("[_QA_CODE_]", code);
        img_template_temp = replaceAll(img_template_temp, "[_QA_CODE_]", code);
        img_template_temp = img_template_temp.replace("[_QA_TITLE_KO_]", "");
        img_template_temp = img_template_temp.replace("[_QA_TITLE_EN_]", "");
        img_template_temp = img_template_temp.replace("[_QA_TITLE_CN_]", "");
        $("#imgTemplate").html(img_template_temp);
        $('#imgTextModal').modal('show');
    });

    <!--양자택일형 질문 추가하기 -->
    $("#singleCreate").click(function() {
        var code = Math.floor(Math.random() * 99999999999999) + 1;

        $("#single_q_name").val("");
        $("#single_q_title_ko").val("");
        $("#single_q_title_en").val("");
        $("#single_q_title_cn").val("");
        $("#single_etc").val("");
        $("#single_memo").val("");

        var multi_template_temp = multi_template.replace("[_ID_]", code);
        multi_template_temp = multi_template_temp.replace("[_QA_CODE_]", "");
        multi_template_temp = multi_template_temp.replace("[_QA_TITLE_KO_]", "");
        multi_template_temp = multi_template_temp.replace("[_QA_TITLE_EN_]", "");
        multi_template_temp = multi_template_temp.replace("[_QA_TITLE_CN_]", "");
        $("#radioTable #template").html(multi_template_temp);
        $("#q_code").val("");
        $('#singleModal').modal('show');
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


    <!--단일선택형 질문 추가하기 -->
    $("#radioCreate").click(function() {
        var code = Math.floor(Math.random() * 99999999999999) + 1;


        $("#radio_q_name").val("");
        $("#radio_q_title_ko").val("");
        $("#radio_q_title_en").val("");
        $("#radio_q_title_cn").val("");
        $("#radio_etc").val("");
        $("#radio_memo").val("");


        var multi_template_temp = multi_template.replace("[_ID_]", code);
        multi_template_temp = multi_template_temp.replace("[_QA_CODE_]", "");
        multi_template_temp = multi_template_temp.replace("[_QA_TITLE_KO_]", "");
        multi_template_temp = multi_template_temp.replace("[_QA_TITLE_EN_]", "");
        multi_template_temp = multi_template_temp.replace("[_QA_TITLE_CN_]", "");
        $("#multiTable #template").html(multi_template_temp);
        $("#q_code").val("");

        $('#radioModal').modal('show');
    });


    <!--단일선택형 질문 추가하기 -->
    $("#textCreate").click(function() {
        var code = Math.floor(Math.random() * 99999999999999) + 1;


        $("#text_q_name").val("");
        $("#text_q_title_ko").val("");
        $("#text_q_title_en").val("");
        $("#text_q_title_cn").val("");
        $("#text_etc").val("");
        $("#text_memo").val("");
        $("#q_code").val("");

        $('#textModal').modal('show');
    });


    /************ 양자택일 저장 클릭 *******************************/
    $("#singleSave").click(function() {
        if(inputTextCheck("single_q_name", "질문이름을 입력해주세요.") == false) {
            return;
        }

        if(inputTextCheck("single_q_title_ko", "질문 내용을 입력해주세요.") == false) {
            return;
        }


        var q_code = $("#q_code").val();
        var qaJson = [];
        var qaStringData = {};
        qaStringData = {
            qa_code : $("#single_qa_title_ko1").attr("qa_code")
            ,qa_title_ko : $("#single_qa_title_ko1").val()
            ,qa_title_en : $("#single_qa_title_en1").val()
            ,qa_title_cn : $("#single_qa_title_cn1").val()
            ,img: ""
        }
        qaJson.push(qaStringData);


        qaStringData = {
            qa_code : $("#single_qa_title_ko2").attr("qa_code")
            ,qa_title_ko : $("#single_qa_title_ko2").val()
            ,qa_title_en : $("#single_qa_title_en2").val()
            ,qa_title_cn : $("#single_qa_title_cn2").val()
            ,img: ""
        }
        qaJson.push(qaStringData);

        var jsonData = {
            q_code : q_code
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
            if($("#"+dataJson.Q_CODE).html() == undefined) {
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
                    survey_template_temp = survey_template_temp.replace("[_USE_YN_TEXT_]", "활성화중");
                    survey_template_temp = survey_template_temp.replace("[_USE_YN_]", "사용함");
                } else {
                    survey_template_temp = survey_template_temp.replace("[_USE_YN_TEXT_]", "비활성화");
                    survey_template_temp = survey_template_temp.replace("[_USE_YN_]", "사용안함");
                }


                $("#questionList").append(survey_template_temp);
            } else {
                var htmlObj = $("#"+dataJson.Q_CODE+" .contents_list tbody");
                htmlObj.find("tr").eq(0).find("td").eq(1).html(dataJson.Q_NAME);
                htmlObj.find("tr").eq(0).find("td").eq(2).html(dataJson.MEMO);
                htmlObj.find("tr").eq(0).find("td").eq(3).html(dataJson.ETC);
                htmlObj.find("tr").eq(1).find("td").eq(0).html(dataJson.Q_TITLE_KO);



            }

            $('#radioModal').modal('hide');
        };
        //$('#multiModal').modal('hide');

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

    $("#textSave").click(function() {
        if(inputTextCheck("text_q_name", "질문이름을 입력해주세요.") == false) {
            return;
        }

        if(inputTextCheck("textg_q_title_ko", "질문 내용을 입력해주세요.") == false) {
            return;
        }

        var jsonData = {
            q_code : $("#q_code").val()
            ,group_code : $("#group_code").val()
            ,q_name : $("#text_q_name").val()
            ,q_title_ko : $("#text_q_title_ko").val()
            ,q_title_en : $("#text_q_title_en").val()
            ,q_title_cn : $("#text_q_title_cn").val()
            ,etc : $("#text_etc").val()
            ,memo : $("#text_memo").val()
        };

        common.ajax.send('/question/textProcess', jsonData);
        common.ajax.return = function(data) {
            var dataJson = eval("("+data+")");
            dataJson = dataJson[0];

            if($("#"+dataJson.Q_CODE).html() == undefined) {
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
                    survey_template_temp = survey_template_temp.replace("[_USE_YN_TEXT_]", "비활성");
                    survey_template_temp = survey_template_temp.replace("[_USE_YN_]", "사용안함");
                }
                $('#textModal').modal('hide');

                $("#questionList").append(survey_template_temp);
            } else {
                var htmlObj = $("#"+dataJson.Q_CODE+" .contents_list tbody");
                htmlObj.find("tr").eq(0).find("td").eq(1).html(dataJson.Q_NAME);
                htmlObj.find("tr").eq(0).find("td").eq(2).html(dataJson.MEMO);
                htmlObj.find("tr").eq(0).find("td").eq(3).html(dataJson.ETC);
                htmlObj.find("tr").eq(1).find("td").eq(0).html(dataJson.Q_TITLE_KO);

                $('#textModal').modal('hide');

            }
        };


        console.log(jsonData);
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
                    qa_code : $("#multiTable #template #"+id+" .qa_code").val()
                    ,qa_title_ko : $("#multiTable #template #"+id+" .qa_title_ko").val()
                    ,qa_title_en : $("#multiTable #template #"+id+" .qa_title_en").val()
                    ,qa_title_cn : $("#multiTable #template #"+id+" .qa_title_cn").val()
                    ,img: ""
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

            if($("#"+dataJson.Q_CODE).html() == undefined) {
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
                    survey_template_temp = survey_template_temp.replace("[_USE_YN_TEXT_]", "비활성");
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


    $("#radioSave").click(function() {
        if(inputTextCheck("radio_q_name", "질문이름을 입력해주세요.") == false) {
            return;
        }

        if(inputTextCheck("radio_q_title_ko", "질문 내용을 입력해주세요.") == false) {
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
                    qa_code : $("#radioTable #template #"+id+" .qa_code").val()
                    ,qa_title_ko : $("#radioTable #template #"+id+" .qa_title_ko").val()
                    ,qa_title_en : $("#radioTable #template #"+id+" .qa_title_en").val()
                    ,qa_title_cn : $("#radioTable #template #"+id+" .qa_title_cn").val()
                    ,img: ""
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
            ,q_name : $("#radio_q_name").val()
            ,q_title_ko : $("#radio_q_title_ko").val()
            ,q_title_en : $("#radio_q_title_en").val()
            ,q_title_cn : $("#radio_q_title_cn").val()
            ,etc : $("#radio_etc").val()
            ,memo : $("#radio_memo").val()
            ,qaJson : JSON.stringify(qaJson)
        };


        common.ajax.send('/question/multiProcess', jsonData);
        common.ajax.return = function(data) {
            var dataJson = eval("("+data+")");
            dataJson = dataJson[0];

            if($("#"+dataJson.Q_CODE).html() == undefined) {
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
                    survey_template_temp = survey_template_temp.replace("[_USE_YN_TEXT_]", "비활성");
                    survey_template_temp = survey_template_temp.replace("[_USE_YN_]", "사용안함");
                }
                $('#radioModal').modal('hide');

                $("#questionList").append(survey_template_temp);
            } else {
                var htmlObj = $("#"+dataJson.Q_CODE+" .contents_list tbody");
                htmlObj.find("tr").eq(0).find("td").eq(1).html(dataJson.Q_NAME);
                htmlObj.find("tr").eq(0).find("td").eq(2).html(dataJson.MEMO);
                htmlObj.find("tr").eq(0).find("td").eq(3).html(dataJson.ETC);
                htmlObj.find("tr").eq(1).find("td").eq(0).html(dataJson.Q_TITLE_KO);

                $('#radioModal').modal('hide');

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

        if(inputTextCheck("scale_qa_title_ko1", "좌측내용을 입력해주세요.") == false) {
            return;
        }
        if(inputTextCheck("scale_qa_title_ko3", "우측내용을 입력해주세요.") == false) {
            return;
        }




        var qaJson = [];
        var qaStringData = {};

        qaStringData = {
            qa_code : $("#scale_qa_title_ko1").attr("qa_code")
            ,qa_title_ko : $("#scale_qa_title_ko1").val()
            ,qa_title_en : $("#scale_qa_title_en1").val()
            ,qa_title_cn : $("#scale_qa_title_cn1").val()
            ,img: ""
        }
        qaJson.push(qaStringData);

        qaStringData = {
            qa_code : $("#scale_qa_title_ko2").attr("qa_code")
            ,qa_title_ko : $("#scale_qa_title_ko2").val()
            ,qa_title_en : $("#scale_qa_title_en2").val()
            ,qa_title_cn : $("#scale_qa_title_cn2").val()
            ,img: ""
        }
        qaJson.push(qaStringData);

        qaStringData = {
            qa_code : $("#scale_qa_title_ko3").attr("qa_code")
            ,qa_title_ko : $("#scale_qa_title_ko3").val()
            ,qa_title_en : $("#scale_qa_title_en3").val()
            ,qa_title_cn : $("#scale_qa_title_cn3").val()
            ,img: ""
        }
        qaJson.push(qaStringData);


        var jsonData = {
            q_code : $("#q_code").val()
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

            if($("#"+dataJson.Q_CODE).html() == undefined) {
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
                    survey_template_temp = survey_template_temp.replace("[_USE_YN_TEXT_]", "비활성");
                    survey_template_temp = survey_template_temp.replace("[_USE_YN_]", "사용안함");
                }

                $('#7scaleModal').modal('hide');

                $("#questionList").append(survey_template_temp);
            } else {
                var htmlObj = $("#"+dataJson.Q_CODE+" .contents_list tbody");
                htmlObj.find("tr").eq(0).find("td").eq(1).html(dataJson.Q_NAME);
                htmlObj.find("tr").eq(0).find("td").eq(2).html(dataJson.MEMO);
                htmlObj.find("tr").eq(0).find("td").eq(3).html(dataJson.ETC);
                htmlObj.find("tr").eq(1).find("td").eq(0).html(dataJson.Q_TITLE_KO);

                $('#7scaleModal').modal('hide');
            }
        };
    });


    /************ 척도형 이미지 저장 클릭 ******************************/
    $("#scaleImgSave").click(function() {
        if(inputTextCheck("scaleImg_q_name", "질문 이름을 입력해주세요.") == false) {
            return;
        }

        if(inputTextCheck("scaleImg_qa_title_ko1", "이미지 이름1을 입력해주세요.") == false) {
            return;
        }

        if(inputTextCheck("scaleImg_qa_title_ko2", "이미지 이름2을 입력해주세요.") == false) {
            return;
        }


        if(inputTextCheck("scaleImg_memo", "질문 메모를 입력해주세요.") == false) {
            return;
        }

        if(inputTextCheck("scaleImg_q_title_ko", "질문 내용을 입력해주세요.") == false) {
            return;
        }

        var qaJson = [];
        var qaStringData = {};
        qaStringData = {
            qa_code : $("#scaleImg_qa_title_ko1").attr("qa_code")
            ,qa_title_ko : $("#scaleImg_qa_title_ko1").val()
            ,qa_title_en : $("#scaleImg_qa_title_en1").val()
            ,qa_title_cn : $("#scaleImg_qa_title_cn1").val()
            ,img : $("#scaleImg1").val()
        }
        qaJson.push(qaStringData);

        qaStringData = {
            qa_code : $("#scaleImg_qa_title_ko2").attr("qa_code")
            ,qa_title_ko : $("#scaleImg_qa_title_ko2").val()
            ,qa_title_en : $("#scaleImg_qa_title_en2").val()
            ,qa_title_cn : $("#scaleImg_qa_title_cn2").val()
            ,img : $("#scaleImg2").val()
        }
        qaJson.push(qaStringData);


        var jsonData = {
            q_code : $("#q_code").val()
            ,group_code : $("#group_code").val()
            ,q_name : $("#scaleImg_q_name").val()
            ,q_title_ko : $("#scaleImg_q_title_ko").val()
            ,q_title_en : $("#scaleImg_q_title_en").val()
            ,q_title_cn : $("#scaleImg_q_title_cn").val()
            ,etc : $("#scaleImg_etc").val()
            ,memo : $("#scaleImg_memo").val()
            ,qaJson : JSON.stringify(qaJson)
        };



        common.ajax.send('/question/scaleProcess', jsonData);
        common.ajax.return = function(data) {
            var dataJson = eval("("+data+")");
            dataJson = dataJson[0];


            if($("#"+dataJson.Q_CODE).html() == undefined) {
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
                    survey_template_temp = survey_template_temp.replace("[_USE_YN_TEXT_]", "비활성");
                    survey_template_temp = survey_template_temp.replace("[_USE_YN_]", "사용안함");
                }

                $('#img_7scaleModal').modal('hide');

                $("#questionList").append(survey_template_temp);
            } else {
                var htmlObj = $("#"+dataJson.Q_CODE+" .contents_list tbody");
                htmlObj.find("tr").eq(0).find("td").eq(1).html(dataJson.Q_NAME);
                htmlObj.find("tr").eq(0).find("td").eq(2).html(dataJson.MEMO);
                htmlObj.find("tr").eq(0).find("td").eq(3).html(dataJson.ETC);
                htmlObj.find("tr").eq(1).find("td").eq(0).html(dataJson.Q_TITLE_KO);

                $('#img_7scaleModal').modal('hide');

            }


        };




    });

    /***************** 이미지/주관식 저장 ********************/
    $("#imgTextSave").click(function() {
        if(inputTextCheck("img_q_name", "질문이름을 입력해주세요.") == false) {
            return;
        }

        if(inputTextCheck("img_q_memo", "질문메모를 입력해주세요.") == false) {
            return;
        }

        if($("#img_q_min").val() == "") {
            alert("이미지 최소 선택갯수를 입력해주세요.");
            return;
        }
        if($("#img_q_max").val() == "") {
            alert("이미지 최대 선택갯수를 입력해주세요.");
            return;
        }

        if($("#text_q_min").val() == "") {
            alert("주관식 최소 선택갯수를 입력해주세요.");
            return;
        }

        if($("#text_q_max").val() == "") {
            alert("주관식 최대 선택갯수를 입력해주세요.");
            return;
        }

        if(inputTextCheck("img_q_title_ko", "질문 내용입력해주세요.") == false) {
            return;
        }



        var qaJson = [];
        var qaStringData = {};

        var checkBool = false;

        $(".img_qa_title_ko").each(function() {
            var id = $(this).parents("tr").attr("id");
            if($(this).val() == false) {
                alert("보기 국문을 입력해주세요.");
                checkBool = true;
                $(this).focus();
                return false;
            } else {

                qaStringData = {
                    qa_code : id
                    ,qa_title_ko : $("#imgTemplate #"+id+" #img_qa_title_ko").val()
                    ,qa_title_en : $("#imgTemplate #"+id+" #img_qa_title_en").val()
                    ,qa_title_cn : $("#imgTemplate #"+id+" #img_qa_title_en").val()
                    ,img: $("#"+id+" #imgValue").val()
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
            ,q_name : $("#img_q_name").val()
            ,q_title_ko : $("#img_q_title_ko").val()
            ,q_title_en : $("#img_q_title_en").val()
            ,q_title_cn : $("#img_q_title_cn").val()
            ,q_img_min : $("#img_q_min").val()
            ,q_img_max : $("#img_q_max").val()
            ,q_text_min : $("#text_q_min").val()
            ,q_text_max : $("#text_q_max").val()
            ,etc : $("#img_etc").val()
            ,memo : $("#img_q_memo").val()
            ,qaJson : JSON.stringify(qaJson)
        };




        common.ajax.send('/question/scaleProcess', jsonData);
        common.ajax.return = function(data) {
            var dataJson = eval("(" + data + ")");
            dataJson = dataJson[0];
            if($("#"+dataJson.Q_CODE).html() == undefined) {
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
                    survey_template_temp = survey_template_temp.replace("[_USE_YN_TEXT_]", "비활성");
                    survey_template_temp = survey_template_temp.replace("[_USE_YN_]", "사용안함");
                }

                $('#imgTextModal').modal('hide');

                $("#questionList").append(survey_template_temp);
            } else {
                var htmlObj = $("#"+dataJson.Q_CODE+" .contents_list tbody");
                htmlObj.find("tr").eq(0).find("td").eq(1).html(dataJson.Q_NAME);
                htmlObj.find("tr").eq(0).find("td").eq(2).html(dataJson.MEMO);
                htmlObj.find("tr").eq(0).find("td").eq(3).html(dataJson.ETC);
                htmlObj.find("tr").eq(1).find("td").eq(0).html(dataJson.Q_TITLE_KO);

                $('#imgTextModal').modal('hide');

            }
        }



    });




    /************* 선택형 보기 추가 *************************/
    $("#qaBtn_multi").click(function() {
        var code = Math.floor(Math.random() * 99999999999999) + 1;
        var multi_template_temp = multi_template.replace("[_ID_]", code);
        multi_template_temp = multi_template_temp.replace("[_QA_CODE_]", "");
        multi_template_temp = multi_template_temp.replace("[_QA_TITLE_KO_]", "");
        multi_template_temp = multi_template_temp.replace("[_QA_TITLE_EN_]", "");
        multi_template_temp = multi_template_temp.replace("[_QA_TITLE_CN_]", "");
        $("#multiTable #template").append(multi_template_temp);
    });



    $("#qaBtn_radio").click(function() {
        var code = Math.floor(Math.random() * 99999999999999) + 1;
        var multi_template_temp = multi_template.replace("[_ID_]", code);
        multi_template_temp = multi_template_temp.replace("[_QA_CODE_]", "");
        multi_template_temp = multi_template_temp.replace("[_QA_TITLE_KO_]", "");
        multi_template_temp = multi_template_temp.replace("[_QA_TITLE_EN_]", "");
        multi_template_temp = multi_template_temp.replace("[_QA_TITLE_CN_]", "");
        $("#radioTable #template").append(multi_template_temp);
    });



    $("#qaBtn_imgText").click(function() {
        var code = Math.floor(Math.random() * 99999999999999) + 1;
        var img_template_temp = replaceAll(img_template, "[_ID_]", code);
        img_template_temp = img_template_temp.replace("[_IMG_]", "");
        img_template_temp = img_template_temp.replace("[_IMG_ID_]", "");
        img_template_temp = img_template_temp.replace("[_IMG_VALUE_]", "");


        img_template_temp = replaceAll(img_template_temp, "[_QA_CODE_]", code);
        img_template_temp = img_template_temp.replace("[_QA_TITLE_KO_]", "");
        img_template_temp = img_template_temp.replace("[_QA_TITLE_EN_]", "");
        img_template_temp = img_template_temp.replace("[_QA_TITLE_CN_]", "");
        $("#imgTemplate").append(img_template_temp);
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
                switch(data.ERR_CODE) {
                    case "000":
                        $("#"+data.q_code).remove();
                        break;
                    default:
                        alert("ERR_CODE: " + data.ERR_CODE + "\n"+data.ERR_MSG);
                        break;
                }

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
                $("#"+data.q_code+" .contents_list tbody").find("tr").eq(0).find("td").eq(5).html("사용안함");
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
            case "1":
                var json = {
                    q_code: id
                }
                common.ajax.send("/question/qSelectMulti", json);
                common.ajax.return = function (data) {
                    var jsonData = eval("("+data+")");


                    $("#scale_q_name").val(jsonData.q[0].Q_NAME);
                    $("#scale_q_title_ko").val(jsonData.q[0].Q_TITLE_KO);
                    $("#scale_q_title_en").val(jsonData.q[0].Q_TITLE_EN);
                    $("#scale_q_title_cn").val(jsonData.q[0].Q_TITLE_CN);
                    $("#scale_etc").val(jsonData.q[0].ETC);


                    $("#scale_qa_title_ko1").attr("qa_code", jsonData.qa[0].QA_CODE);
                    $("#scale_qa_title_ko2").attr("qa_code", jsonData.qa[1].QA_CODE);
                    $("#scale_qa_title_ko3").attr("qa_code", jsonData.qa[2].QA_CODE);

                    $("#scale_qa_title_ko1").val(jsonData.qa[0].QA_TITLE_KO);
                    $("#scale_qa_title_ko2").val(jsonData.qa[1].QA_TITLE_KO);
                    $("#scale_qa_title_ko3").val(jsonData.qa[2].QA_TITLE_KO);

                    $("#scale_qa_title_en1").val(jsonData.qa[0].QA_TITLE_EN);
                    $("#scale_qa_title_en2").val(jsonData.qa[1].QA_TITLE_EN);
                    $("#scale_qa_title_en3").val(jsonData.qa[2].QA_TITLE_EN);

                    $("#scale_qa_title_cn1").val(jsonData.qa[0].QA_TITLE_CN);
                    $("#scale_qa_title_cn2").val(jsonData.qa[1].QA_TITLE_CN);
                    $("#scale_qa_title_cn3").val(jsonData.qa[2].QA_TITLE_CN);



                    $('#7scaleModal').modal('show');
                }
                break;
            case "2":
                var json = {
                    q_code: id
                }
                common.ajax.send("/question/qSelectMulti", json);
                common.ajax.return = function (data) {
                    var jsonData = eval("("+data+")");
                    $("#scaleImg1").val(jsonData.qa[0].IMG);
                    $("#scaleImg2").val(jsonData.qa[1].IMG);

                    $("#scaleImg_q_name").val(jsonData.q[0].Q_NAME);


                    $("#scaleImg_qa_title_ko1").attr("qa_code", jsonData.qa[0].QA_CODE);
                    $("#scaleImg_qa_title_ko1").val(jsonData.qa[0].QA_TITLE_KO);
                    $("#scaleImg_qa_title_ko2").attr("qa_code", jsonData.qa[1].QA_CODE);
                    $("#scaleImg_qa_title_ko2").val(jsonData.qa[1].QA_TITLE_KO);

                    $("#scaleImg_qa_title_en1").val(jsonData.qa[0].QA_TITLE_EN);
                    $("#scaleImg_qa_title_en2").val(jsonData.qa[1].QA_TITLE_EN);

                    $("#scaleImg_qa_title_cn1").val(jsonData.qa[0].QA_TITLE_CN);
                    $("#scaleImg_qa_title_cn2").val(jsonData.qa[1].QA_TITLE_CN);

                    $("#scaleImg_memo").val(jsonData.q[0].MEMO);

                    $("#scaleImg_q_title_ko").val(jsonData.q[0].Q_TITLE_KO);
                    $("#scaleImg_q_title_en").val(jsonData.q[0].Q_TITLE_EN);
                    $("#scaleImg_q_title_cn").val(jsonData.q[0].Q_TITLE_CH);

                    $("#scaleImg_etc").val(jsonData.q[0].ETC);

                    $("#img1").html("<img src='"+jsonData.qa[0].IMG+"' width='100%'>");
                    $("#img2").html("<img src='"+jsonData.qa[1].IMG+"' width='100%'>");

                    $('#img_7scaleModal').modal('show');
                }
                break;
            case "3":
                //$("#imgTextModal").modal("show");
                var json = {
                    q_code: id
                }
                common.ajax.send("/question/qSelectMulti", json);
                common.ajax.return = function (data) {
                    var jsonData = eval("("+data+")");
                    console.log(jsonData);

                    $("#img_q_name").val(jsonData.q[0].Q_NAME);
                    $("#img_q_title_ko").val(jsonData.q[0].Q_TITLE_KO);
                    $("#img_q_title_en").val(jsonData.q[0].Q_TITLE_EN);
                    $("#img_q_title_cn").val(jsonData.q[0].Q_TITLE_CN);

                    $("#img_q_memo").val(jsonData.q[0].MEMO);
                    $("#img_etc").val(jsonData.q[0].ETC);

                    $("#img_q_min").val(jsonData.q[0].Q_IMG_MIN);
                    $("#img_q_max").val(jsonData.q[0].Q_IMG_MAX);
                    $("#text_q_min").val(jsonData.q[0].Q_TEXT_MIN);
                    $("#text_q_max").val(jsonData.q[0].Q_TEXT_MAX);

                    var qaTemplate = img_template;
                    var realTemplate = "";



                    for(var i = 0; i<jsonData.qa.length; i++) {

                        qaTemplate = replaceAll(img_template, "[_ID_]", jsonData.qa[i].QA_CODE);
                        qaTemplate = qaTemplate.replace("[_QA_CODE_]", jsonData.qa[i].QA_CODE);


                        qaTemplate = qaTemplate.replace("[_IMG_VALUE_]", jsonData.qa[i].IMG);
                        qaTemplate = qaTemplate.replace("[_IMG_]", "<img src='"+jsonData.qa[i].IMG+"' width='100%'>");
                        qaTemplate = qaTemplate.replace("[_QA_TITLE_KO_]", jsonData.qa[i].QA_TITLE_KO);
                        qaTemplate = qaTemplate.replace("[_QA_TITLE_EN_]", jsonData.qa[i].QA_TITLE_EN);
                        qaTemplate = qaTemplate.replace("[_QA_TITLE_CN_]", jsonData.qa[i].QA_TITLE_CN);
                        realTemplate += qaTemplate;

                    }
                    $("#imgTemplate").html("");
                    $("#imgTemplate").append(realTemplate);



                    $('#imgTextModal').modal('show');


                }

                break;
            case "4":
                var json = {
                    q_code: id
                }

                console.log(json);
                common.ajax.send("/question/qSelectMulti", json);
                common.ajax.return = function (data) {
                    var jsonData = eval("("+data+")");
                    console.log(jsonData);

                    $("#single_q_name").val(jsonData.q[0].Q_NAME);
                    $("#single_q_title_ko").val(jsonData.q[0].Q_TITLE_KO);
                    $("#single_q_title_en").val(jsonData.q[0].Q_TITLE_EN);
                    $("#single_q_title_cn").val(jsonData.q[0].Q_TITLE_CN);


                    $("#single_qa_title_ko1").attr("qa_code", jsonData.qa[0].QA_CODE);
                    $("#single_qa_title_ko1").val(jsonData.qa[0].QA_TITLE_KO);
                    $("#single_qa_title_ko2").attr("qa_code", jsonData.qa[1].QA_CODE);
                    $("#single_qa_title_ko2").val(jsonData.qa[1].QA_TITLE_KO);


                    $("#single_qa_title_en1").attr("qa_code", jsonData.qa[0].QA_CODE);
                    $("#single_qa_title_en1").val(jsonData.qa[0].QA_TITLE_EN);
                    $("#single_qa_title_en2").attr("qa_code", jsonData.qa[1].QA_CODE);
                    $("#single_qa_title_en2").val(jsonData.qa[1].QA_TITLE_EN);

                    $("#single_qa_title_cn1").attr("qa_code", jsonData.qa[0].QA_CODE);
                    $("#single_qa_title_cn1").val(jsonData.qa[0].QA_TITLE_CN);
                    $("#single_qa_title_cn2").attr("qa_code", jsonData.qa[1].QA_CODE);
                    $("#single_qa_title_cn2").val(jsonData.qa[1].QA_TITLE_CN);

                    $("#single_etc").val(jsonData.q[0].ETC);






                    $('#singleModal').modal('show');


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


                    $("#multiTable #template").html("");
                    $("#multiTable #template").append(realTemplate);

                    $('#multiModal').modal('show');

                }



            break;


            case "6":

                var json = {
                    q_code: id
                }
                common.ajax.send("/question/qSelectMulti", json);
                common.ajax.return = function (data) {
                    var jsonData = eval("("+data+")");
                    console.log(jsonData);

                    $("#radio_q_name").val(jsonData.q[0].Q_NAME);
                    $("#radio_q_title_ko").val(jsonData.q[0].Q_TITLE_KO);
                    $("#radio_q_title_en").val(jsonData.q[0].Q_TITLE_EN);
                    $("#radio_q_title_cn").val(jsonData.q[0].Q_TITLE_CN);
                    $("#radio_etc").val(jsonData.q[0].ETC);
                    $("#radio_memo").val(jsonData.q[0].MEMO);




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


                    $("#radioTable #template").html("");
                    $("#radioTable #template").append(realTemplate);

                    $('#radioModal').modal('show');

                }



                break;

            case "7":

                var json = {
                    q_code: id
                }
                common.ajax.send("/question/qSelectMulti", json);
                common.ajax.return = function (data) {
                    var jsonData = eval("("+data+")");
                    console.log(jsonData);

                    $("#text_q_name").val(jsonData.q[0].Q_NAME);
                    $("#text_q_title_ko").val(jsonData.q[0].Q_TITLE_KO);
                    $("#text_q_title_en").val(jsonData.q[0].Q_TITLE_EN);
                    $("#text_q_title_cn").val(jsonData.q[0].Q_TITLE_CN);
                    $("#text_etc").val(jsonData.q[0].ETC);
                    $("#text_memo").val(jsonData.q[0].MEMO);




                    $('#textModal').modal('show');

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

    $(document).on('click', '.scaleQaDelete', function() {
        var q_code = $("#q_code").val();
        var qa_code = $(this).attr("id").replace("qaDel_", "");
        if(confirm("보기코드("+qa_code+")를 정말로 삭제하시겠습니까?") == true) {
            var json = {
                q_code : q_code
                ,qa_code : qa_code
            }

            common.ajax.send("/question/qaDelete", json);
            common.ajax.return = function (data) {
                $("."+data.qa_code).remove();
                //$("#imgTemplate ."+data.qa_code).remove();
            }

        }
    });



});


function appSurvey()
{
}