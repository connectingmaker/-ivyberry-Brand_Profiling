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
            group_code : ""
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
                template += "<td><a href='/question/group/detail/"+dataReturn.GROUP_CODE+"'>"+dataReturn.GROUP_CODE+"</a></td>";
                template += "<td><a href='/question/group/detail/"+dataReturn.GROUP_CODE+"'>"+dataReturn.GROUP_NAME_KO+"</a></td>";
                template += "<td>"+dataReturn.MEMO+"</td>";
                template += "<td>0</td>";
                template += "<td>"+dataReturn.QUESTION_TYPE_NAME+"</td>";
                template += "<td>"+dataReturn.ETC+"</td>";
                template += "<td>"+dataReturn.MODIFY_DATETIME+"</td>";
                template += "<td>"+select+"</td>";
                template += "</tr>";
                $("#list tbody").append(template);
            }



            console.log(dataReturn);
        };

        $('#groupModal').modal('hide');

    });

});