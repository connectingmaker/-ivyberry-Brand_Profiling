$(function() {
  var menu = "";
   $(".top_gnb_menu_sub").show();
   menu = "<ul><li>완료 설문</li>";
   menu += "<li>카테고리별 통계</li>";
    menu += "<li>질문그룹별 통계</li></ul>";

   $(".top_gnb_menu_sub .menu .menu_btn").append(menu);

    $("#searchBtn").click(function() {
        $("#searchForm").submit();
    });

    $(".data").click(function() {
        var campaign_code = $(this).attr("campaign_code");
        var json = {
            campaign_code : campaign_code
        };
        common.ajax.send("/statistics/campaignData", json);
        common.ajax.return = function(returnData) {
            $(".dataViewtd").css({"background-color":"#fff", "color": "#646464"});
            $("."+campaign_code).css({
                "background-color":"#DA420B"
                , "color":"#fff"
            })
            $(".dataView").hide();
            $("#"+campaign_code).show(500);

            var template = "";
            var total = 0;
            var total_point = 0;
            for(var i = 0; i<returnData.length; i++) {
                template += "<tr>";
                template += "<td class='text-center'>"+returnData[i].QUEST_NUM+"차</td>";
                template += "<td class='text-center'>"+returnData[i].TOTAL+"</td>";
                template += "<td class='text-center'>"+returnData[i].SUM_POINT+"</td>";
                template += "<td class='text-center'><a href='/campaign/campaignRawData/"+returnData[i].CAMPAIGN_CODE+"/"+returnData[i].QUEST_NUM+"' class=\"btn btn-xs btn-danger\">다운로드</a>&nbsp;<a href='/statistics/group/"+returnData[i].CAMPAIGN_CODE+"/"+returnData[i].QUEST_NUM+"' class=\"btn btn-xs btn-danger\">통계</a></td>";
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


            $("#"+campaign_code).find("table").find("tbody").html(template);


        }


    });
});