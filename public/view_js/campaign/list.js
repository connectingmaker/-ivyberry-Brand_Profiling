$(function() {
    $(document).on('click', '.deleteBtn', function() {
        if(confirm("해당 설문을 정말로 삭제하시겠습니까?") == true) {
            var id = $(this).parents("tr").attr("id");
            var params = {
                campaign_code: id
            };


            common.ajax.send("/campaign/campaignDelete", params);

            common.ajax.return = function(data) {
                var dataJson = data;
                $("#"+dataJson.campaign_code).remove();
                //console.log(dataJson.campaign_code);
            };

        }
    });



    $(".status").change(function() {
        var status = $(this).val();
        var campaign_code = $(this).parents("tr").attr("id");

        var json = {
            campaign_code : campaign_code
            ,status : status
        }

        common.ajax.send("/campaign/listStats", json);
        common.ajax.return = function(data){
            location.reload();
        }

    });

});