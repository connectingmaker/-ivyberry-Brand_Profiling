/**
 * Created by jccho on 2017. 12. 11..
 */
$(function() {

    $(document).on('click', '.deleteBtn', function() {
        if(confirm("해당 전문패널을 정말로 삭제하시겠습니까?") == true) {
            var uid = $(this).parents("tr").attr("id");
            var params = {
                uid: uid
            };


            common.ajax.send("/users/panelDelete", params);
            common.ajax.return = function (data) {
                console.log(data);
                switch(data.ERR_CODE) {
                    case "000":
                        alert("삭제되었습니다.");
                        location.reload();
                        break;
                    default:
                        alert("ERR_CODE: " + data.ERR_CODE +"\n"+data.ERR_MSG);
                        break;
                }

            }
        }

    });

    $(".level").change(function() {
        var value = $(this).val();
        var uid = $(this).parents("tr").attr("id");

        var json = {
            uid : uid
            ,grade : value
        }


        common.ajax.send("/users/levelUpdate", json);
        common.ajax.return = function (data) {
            console.log(data);
            switch(data.ERR_CODE) {
                case "000":
                    alert("저장되었습니다.");
                    location.reload();
                    break;
                default:
                    alert("ERR_CODE: " + data.ERR_CODE +"\n"+data.ERR_MSG);
                    break;
            }

        }

    });


});