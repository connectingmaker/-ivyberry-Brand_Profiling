$(function() {

    $(document).on('click', '.deleteBtn', function() {
        if(confirm("해당 사용자를 정말로 삭제하시겠습니까?") == true) {
            var uid = $(this).parents("tr").attr("uid");
            var params = {
                uid: uid
            };

            common.ajax.send("/users/userDelete", params);
            common.ajax.return = function (data) {
                $("#" + data.uid).remove();
            }
        }

    });

    $(document).on('click', '.historyBtn', function() {

            var uid = $(this).parents("tr").attr("uid");
            var params = {
                uid: uid
            };

            common.ajax.send("/users/pointHistory", params);
            common.ajax.return = function (data) {
                $('#historyModal').modal('show');
            }


    });

});