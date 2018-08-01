/**
 * Created by jccho on 2018. 7. 31..
 */
$(function() {
    $(document).on('click', '.deleteBtn', function() {
        if(confirm("해당 컨텐츠를 정말로 삭제하시겠습니까?") == true) {
            var id = $(this).parents("tr").attr("id");
            var params = {
                seq: id
            };


            common.ajax.send("/content/contentDelete", params);

            common.ajax.return = function(data) {
                var dataJson = data;

                switch(dataJson.ERR_CODE) {
                    case "000":
                        $("#"+dataJson.seq).remove();
                        break;
                    default:
                        alert("ERR : "+dataJson.ERR_CODE+"\n\n"+dataJson.ERR_MSG);
                        break;
                }

            };

        }
    });


});

