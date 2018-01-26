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

    $(".data").click(function() {
        var campaign_code = $(this).parents("tr").attr("id");
        var json = {
            campaign_code : campaign_code
        };
        common.ajax.send("/statistics/campaignData", json);
        common.ajax.return = function(returnData) {
            console.log(returnData);
            $(".dataViewtd").css({"background-color":"#fff", "color": "#646464"});
            $("#"+campaign_code).css({
                "background-color":"#DA420B"
                , "color":"#fff"
            })
            $(".dataView").hide();
            $("#dataView_"+campaign_code).show(500);

            var template = "";
            var total = 0;
            var total_point = 0;
            for(var i = 0; i<returnData.length; i++) {
                template += "<tr>";
                template += "<td class='text-center'>"+returnData[i].QUEST_NUM+"차</td>";
                template += "<td class='text-center'>"+returnData[i].TOTAL+"</td>";
                template += "<td class='text-center'>"+returnData[i].SUM_POINT+"</td>";
                template += "<td class='text-center'><a href='/survey/start?campaign_code="+returnData[i].CAMPAIGN_CODE+"&uid=99999999999999999001&quest_num="+returnData[i].QUEST_NUM+"&debug=true' target='_blank' class='btn btn-xs btn-success'>테스트</a>&nbsp;<a href='/campaign/campaignRawData/"+returnData[i].CAMPAIGN_CODE+"/"+returnData[i].QUEST_NUM+"' class=\"btn btn-xs btn-danger\">다운로드</a>&nbsp;<a href='/statistics/group/"+returnData[i].CAMPAIGN_CODE+"/"+returnData[i].QUEST_NUM+"' class=\"btn btn-xs btn-danger\">통계</a></td>";
                template += "</tr>";

                total = total + returnData[i].TOTAL;
                total_point = total_point + returnData[i].SUM_POINT;
            }
            template += "<tr>";
            template += "<td class='text-center bg-city-dark text-white'>합계</td>";
            template += "<td class='text-center bg-city-dark text-white'>"+total+"</td>";
            template += "<td class='text-center bg-city-dark text-white'>"+total_point+"</td>";
            template += "<td class='text-center bg-city-dark text-white'></td>"
            template += "</tr>";


            $("#dataView_"+campaign_code).find("table").find("tbody").html(template);


        }


    });




});