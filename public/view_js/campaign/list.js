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

                switch(dataJson.ERR_CODE) {
                    case "000":
                        $("#"+dataJson.campaign_code).remove();
                        break;
                    default:
                        alert("ERR : "+dataJson.ERR_CODE+"\n\n"+dataJson.ERR_MSG);
                        break;
                }

            };

        }
    });

    $(document).on('click', '.hiddenBtn', function() {
        if(confirm("해당 설문을 정말로 숨기겠습니까?") == true) {
            var id = $(this).parents("tr").attr("id");
            var params = {
                campaign_code: id
            };



            common.ajax.send("/campaign/campaignHidden", params);

            common.ajax.return = function(data) {
                var dataJson = data;

                $("#"+dataJson.campaign_code).remove();

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

    $("#searchBtn").click(function() {
        $("#searchForm").submit();
    });




});