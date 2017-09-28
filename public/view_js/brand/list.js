$(function() {
    $("#brandCategoryBtn").click(function() {
        $('#brandModal').modal('show');
    });

    $("#brandSave").click(function() {
        if(inputTextCheck("category_name_ko", "브랜드 이름을 입력해주세요.") == false) {
            return;
        }

        if(inputTextCheck("memo", "브랜드 메모를 입력해주세요.") == false) {
            return;
        }

        var params = {
            category_code : $("#category_code").val()
            ,category_name_ko : $("#category_name_ko").val()
            ,category_name_en : $("#category_name_en").val()
            ,category_name_cn : $("#category_name_cn").val()
            ,memo : $("#memo").val()
            ,etc : $("#etc").val()
        }


        common.ajax.send("/brand/categoryWriteSave", params);
        common.ajax.return = function(data) {
            var data = eval(data);
            var dataReturn = data[0];

            if(dataReturn.DB_TYPE == "INSERT") {
                var template = "<tr id=\"" + dataReturn.CATEGORY_CODE + "\">";
                template += "<td>" + dataReturn.CATEGORY_CODE + "</td>";
                template += "<td><a href=\"/brand/detail/" + dataReturn.CATEGORY_CODE+ "\">" + dataReturn.CATEGORY_NAME_KO + "</a></td>";
                template += "<td>" + dataReturn.MEMO + "</td>";
                template += "<td>" + dataReturn.CATEGORY_NAME_EN + "</td>";
                template += "<td>" + dataReturn.CATEGORY_NAME_CN + "</td>";
                template += "<td>" + dataReturn.ETC + "</td>";
                template += "<td>" + string.dateTime(dataReturn.MODIFY_DATETIME) + "</td>";
                template += "<td class='text-center'><button class=\"btn btn-xs btn-warning deleteBtn\">삭제</button>&nbsp;<button class=\"btn btn-xs btn-primary modifyBtn\">수정</button></td>";
                template += "</tr>";

                $("#list tbody").append(template);
            } else {
                $("#"+dataReturn.CATEGORY_CODE+" td:eq(0)").text(dataReturn.CATEGORY_CODE);
                $("#"+dataReturn.CATEGORY_CODE+" td:eq(1)").find("a").text(dataReturn.CATEGORY_NAME_KO);
                $("#"+dataReturn.CATEGORY_CODE+" td:eq(2)").text(dataReturn.MEMO);
                $("#"+dataReturn.CATEGORY_CODE+" td:eq(3)").text(dataReturn.CATEGORY_NAME_EN);

                $("#"+dataReturn.CATEGORY_CODE+" td:eq(4)").text(dataReturn.CATEGORY_NAME_CN);
                $("#"+dataReturn.CATEGORY_CODE+" td:eq(5)").text(dataReturn.ETC);
                $("#"+dataReturn.CATEGORY_CODE+" td:eq(6)").text(string.dateTime(dataReturn.MODIFY_DATETIME));
            }

            $("#category_code").val("");
            $("#category_name_ko").val("");
            $("#memo").val("");
            $("#category_name_en").val("");
            $("#category_name_cn").val("");
            $("#etc").val("");

            $('#brandModal').modal('hide');
        }
    });


    $(document).on('click', '.deleteBtn', function() {
        if(confirm("해당 브랜드 카테고리를 정말로 삭제하시겠습니까?") == true) {
            var id = $(this).parents("tr").attr("id");
            var params = {
                category_code: id
            };

            common.ajax.send("/brand/categoryDelete", params);
            common.ajax.return = function (data) {
                $("#" + data.category_code).remove();
            }
        }

    });

    $(document).on('click', '.modifyBtn', function() {
        var id = $(this).parents("tr").attr("id");
        var params = {
            category_code : id
        };

        common.ajax.send("/brand/categorySelect", params);
        common.ajax.return = function(data) {
            var jsonData = eval("("+data+")");
            console.log(jsonData);

            $("#category_code").val(jsonData.CATEGORY_CODE);
            $("#category_name_ko").val(jsonData.CATEGORY_NAME_KO);
            $("#memo").val(jsonData.MEMO);
            $("#category_name_en").val(jsonData.CATEGORY_NAME_EN);
            $("#category_name_cn").val(jsonData.CATEGORY_NAME_CN);
            $("#etc").val(jsonData.ETC);

            $('#brandModal').modal('show');
        }

    });
});

