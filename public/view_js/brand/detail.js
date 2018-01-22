    /**
 * Created by kwangheejung on 2017. 9. 21..
 */
$(function() {
   $("#brandCategorySubBtn").click(function() {
       $('#brandModal').modal('show');
   });

   $("#brandSave").click(function() {
       if(inputTextCheck("brand_name_ko", "브랜드 이름을 입력해주세요.") == false) {
           return;
       }

       if(inputTextCheck("memo", "브랜드 메모를 입력해주세요.") == false) {
           return;
       }

       var params = {
           detail_category_code : $("#detail_category_code").val()
           ,category_code : $("#category_code").val()
           ,brand_name_ko : $("#brand_name_ko").val()
           ,brand_name_en : $("#brand_name_en").val()
           ,brand_name_cn : $("#brand_name_cn").val()
           ,memo : $("#memo").val()
           ,etc : $("#etc").val()
       }

       common.ajax.send("/brand/categorySubWriteSave", params);
       common.ajax.return = function(data) {
           var data = eval(data);
           console.log(data);
           var dataReturn = data[0];

           if(dataReturn.DB_TYPE == "INSERT") {

               var template = "<tr id=\"" + dataReturn.DETAIL_CATEGORY_CODE + "\">";
               template += "<td class=\"text-center\">" + dataReturn.DETAIL_CATEGORY_CODE + "</td>";
               template += "<td>" + dataReturn.BRAND_NAME_KO + "</td>";
               template += "<td class=\"text-center\">" + dataReturn.MEMO + "</td>";
               template += "<td>" + dataReturn.BRAND_NAME_EN + "</td>";
               template += "<td>" + dataReturn.BRAND_NAME_CN + "</td>";
               template += "<td>" + dataReturn.ETC + "</td>";
               template += "<td class=\"text-center\">" + string.dateTime(dataReturn.MODIFY_DATETIME) + "</td>";
               template += "<td class='text-center'><button class=\"btn btn-xs btn-warning deleteBtn\">삭제</button>&nbsp;<button class=\"btn btn-xs btn-primary modifyBtn\">수정</button></td>";
               template += "</tr>";

               $("#list tbody").append(template);

           } else {
               $("#"+dataReturn.DETAIL_CATEGORY_CODE+" td:eq(0)").text(dataReturn.DETAIL_CATEGORY_CODE);
               $("#"+dataReturn.DETAIL_CATEGORY_CODE+" td:eq(1)").text(dataReturn.BRAND_NAME_KO);
               $("#"+dataReturn.DETAIL_CATEGORY_CODE+" td:eq(2)").text(dataReturn.MEMO);
               $("#"+dataReturn.DETAIL_CATEGORY_CODE+" td:eq(3)").text(dataReturn.BRAND_NAME_EN);
               $("#"+dataReturn.DETAIL_CATEGORY_CODE+" td:eq(4)").text(dataReturn.BRAND_NAME_CN);
               $("#"+dataReturn.DETAIL_CATEGORY_CODE+" td:eq(5)").text(dataReturn.ETC);
               $("#"+dataReturn.DETAIL_CATEGORY_CODE+" td:eq(6)").text(string.dateTime(dataReturn.MODIFY_DATETIME));
           }

           $('#brandModal').modal('hide');

           /***** 모달 데이터 초기화 ******/
           $("#brand_name_ko").val("");
           $("#memo").val("");
           $("#brand_name_en").val("");
           $("#brand_name_cn").val("");
           $("#etc").val("");
           $("#detail_category_code").val("");


       };
   });

    $(document).on('click', '.deleteBtn', function() {
        if(confirm("해당 브랜드를 정말로 삭제하시겠습니까?") == true){
            var id = $(this).parents("tr").attr("id");
            var params = {
                detail_category_code : id
            };

            common.ajax.send("/brand/categorySubDelete", params);
            common.ajax.return = function(data) {
                //console.log(data);
                $("#"+data.detail_category_code).remove();
            }
        }

    });

    $(document).on('click', '.modifyBtn', function() {
        var id = $(this).parents("tr").attr("id");
        var params = {
            detail_category_code : id
        };
        common.ajax.send("/brand/categorySubSelect", params);
        common.ajax.return = function(data) {
            var jsonData = eval("("+data+")");

            console.log(jsonData);

            $("#brand_name_ko").val(jsonData.BRAND_NAME_KO);
            $("#memo").val(jsonData.MEMO);
            $("#brand_name_en").val(jsonData.BRAND_NAME_EN);
            $("#brand_name_cn").val(jsonData.BRAND_NAME_CN);
            $("#etc").val(jsonData.ETC);
            $("#detail_category_code").val(jsonData.DETAIL_CATEGORY_CODE);

            $('#brandModal').modal('show');
            //console.log(eval("("+data+")"));
        }
    });

});