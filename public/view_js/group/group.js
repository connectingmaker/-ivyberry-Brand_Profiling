$(function() {
    <!-- 질문 그룹  추가하기 -->
    $("#groupCreate").click(function() {
        $('#groupModal').modal('show');
    });


    $("#groupSave").click(function() {

        if(inputRadioCheck("question_type", "질문유형을 선택해주세요.") == false) {
            return;
        }

        if(inputTextCheck("group_name_ko", "질문그룹이름을 입력해주세요.") == false) {
            return;
        }
        if(inputTextCheck("memo", "질문그룹이름을 입력해주세요.") == false) {
            return;
        }

        var question_type = inputRadioCheckReturn("question_type");

        var jsonData = {
            group_code : $("#group_code").val()
            ,group_name_ko : $("#group_name_ko").val()
            ,group_name_en : $("#group_name_en").val()
            ,group_name_cn : $("#group_name_cn").val()
            ,memo : $("#memo").val()
            ,etc : $("#etc").val()
            ,question_type : question_type
        }


        common.ajax.send('/question/group', jsonData);
        common.ajax.return = function(data) {
            var dataReturn = eval("(" + data + ")");

            dataReturn = dataReturn[0];
            var template = "";
            var select = "<select class='form-control use_yn'>";
            select += "<option value='Y'>사용중</option>";
            select += "<option value='N' selected>사용안함</option>";
            select += "</select>";


            if(dataReturn.DB_TYPE == "INSERT") {
                template = "<tr id='"+dataReturn.GROUP_CODE+"'>";
                template += "<td class='text-center'><a href='/question/group/detail/"+dataReturn.GROUP_CODE+"' class='btn btn-rounded btn-info btn-xs'>"+dataReturn.GROUP_CODE+"</a></td>";
                template += "<td><a href='/question/group/detail/"+dataReturn.GROUP_CODE+"'>"+dataReturn.GROUP_NAME_KO+"</a></td>";
                template += "<td class='text-center'>"+dataReturn.MEMO+"</td>";
                template += "<td class='text-center'>0</td>";
                template += "<td class='text-center'>"+dataReturn.QUESTION_TYPE_NAME+"</td>";
                template += "<td class='text-center'>"+dataReturn.ETC+"</td>";
                template += "<td class='text-center'>"+moment(dataReturn.MODIFY_DATETIME).format("YYYY-MM-DD hh:mm")+"</td>";
                template += "<td>"+select+"</td>";
                template += "<td class='text-center'><button class=\"btn btn-xs btn-warning deleteBtn\">삭제</button>&nbsp;<button class=\"btn btn-xs btn-primary modifyBtn\">수정</button>&nbsp;<button class=\"btn btn-xs btn-info detailBtn\"><a href=\"/question/group/detail/"+ dataReturn.GROUP_CODE+"\">세부</a></button>";
                template += "</tr>";
                $("#list tbody").append(template);
            }else{
                //$("#"+dataReturn.GROUP_CODE+" td:eq(0)").text(dataReturn.GROUP_CODE);
                $("#"+dataReturn.GROUP_CODE+" td:eq(1)").find("a").text(dataReturn.CATEGORY_NAME_KO);
                $("#"+dataReturn.GROUP_CODE+" td:eq(2)").text(dataReturn.MEMO);
                $("#"+dataReturn.GROUP_CODE+" td:eq(3)").text(0);
                $("#"+dataReturn.GROUP_CODE+" td:eq(4)").text(dataReturn.QUESTION_TYPE_NAME);
                $("#"+dataReturn.GROUP_CODE+" td:eq(5)").text(dataReturn.ETC);
                $("#"+dataReturn.GROUP_CODE+" td:eq(6)").text(string.dateTime(dataReturn.MODIFY_DATETIME));
                $("#"+dataReturn.GROUP_CODE+" td:eq(7)").html(select);
            }



            console.log(dataReturn);
        };

        $('#groupModal').modal('hide');

    });

    $(document).on('click', '.deleteBtn', function() {
        if(confirm("해당 문항그룹을 정말로 삭제하시겠습니까?") == true) {
            var id = $(this).parents("tr").attr("id");
            var params = {
                group_code: id
            };

            common.ajax.send("/question/groupDelete", params);
            common.ajax.return = function (data) {
                switch(data.ERR_CODE) {
                    case "000":
                        $("#" + data.group_code).remove();
                        break;
                    default:
                        alert("ERR_CODE: " + data.ERR_CODE + "\n"+data.ERR_MSG);
                        break;
                }
                //$("#" + data.group_code).remove();
            }
        }

    });

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

    $(document).on('click', '.modifyBtn', function() {
        var id = $(this).parents("tr").attr("id");
        var params = {
            group_code : id
        };


        common.ajax.send("/question/questionSelect", params);
        common.ajax.return = function(data) {
            var jsonData = eval("("+data+")");
            console.log(jsonData);

            $("#group_code").val(jsonData.GROUP_CODE);
            $("#group_name_ko").val(jsonData.GROUP_NAME_KO);
            $("#memo").val(jsonData.MEMO);
            $("#group_name_en").val(jsonData.GROUP_NAME_EN);
            $("#group_name_cn").val(jsonData.GROUP_NAME_CN);
            $("#etc").val(jsonData.ETC);
            $("#"+jsonData.QUESTION_TYPE).prop("checked", true);




            $('#groupModal').modal('show');
        }

    });

});