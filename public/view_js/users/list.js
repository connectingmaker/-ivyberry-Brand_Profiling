$(function() {

    $(document).on('click', '.deleteBtn', function() {
        if(confirm("해당 사용자를 정말로 삭제하시겠습니까?") == true) {
            var uid = $(this).parents("tr").attr("uid");
            var params = {
                uid: uid
            };

            common.ajax.send("/users/userDelete", params);
            common.ajax.return = function (data) {
                console.log(data);
                switch(data.ERR_CODE) {
                    case "000":
                        $("#" + data.uid).remove();
                        break;
                    default:
                        alert("ERR_CODE: " + data.ERR_CODE +"\n"+data.ERR_MSG);
                        break;
                }

            }
        }

    });
    

});