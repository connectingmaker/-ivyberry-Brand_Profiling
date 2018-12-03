$(function() {
    var campaign_code = $("#campaign_code").val();
    var lang = $("#lang").val();

    $(".q_code").each(function() {
        var temp = $(this).val().split("///");
        var q_code = temp[0];
        var q_type = temp[1];
        var json = {
            campaign_code : campaign_code
            ,q_code : temp[0]
            ,q_type : temp[1]
        }

        common.ajax.type = "put";
        common.ajax.dataType = "json";
        common.ajax.send('/survey/surveyResult', json);
        common.ajax.return = function(data) {
            var html = "";
            var total = parseInt($("#total").val());
            switch(data.q_type) {
                case "1":
                case "5":
                case "6":
                    html += "<div style='padding:0px 10px;'><table border='0' width='100%' cellpadding='0' cellspacing='0'>";
                    html += "<col width='15%'>";
                    html += "<col width='70%'>";
                    html += "<col width='15%'>";
                    html += "<thead>";
                    html += "<tr>";
                    html += "<th style='background-color:#fff;border-left:1px solid #ccc; border-bottom:1px solid #ccc;border-top:1px solid #ccc;padding:10px; color:#da4211; text-align:center;'>Rank</th>"
                    html += "<th style='background-color:#fff;border-left:1px solid #ccc; border-bottom:1px solid #ccc;border-top:1px solid #ccc;padding:10px; color:#da4211; text-align:center;'>Image</th>"
                    html += "<th style='background-color:#fff;border-left:1px solid #ccc; border-bottom:1px solid #ccc;border-top:1px solid #ccc;padding:10px; color:#da4211; text-align:center;border-right:1px solid #ccc;'>Data</th>"

                    html += "</tr>";
                    html += "</thead>";
                    html += "<tbody>";
                    for(var i = 0; i<data.sub.length; i++) {
                        var num = i + 1;
                        var value_total = (data.sub[i].TOTAL / total) * 100;
                        html += "<tr>";
                        html += "<td style='background-color:#fff;border-left:1px solid #ccc; border-bottom:1px solid #ccc;border-top:1px solid #ccc;padding:10px; font-size:18px; color:#da4211; text-align:center;font-style:italic;'>"+num+"</td>";
                        html += "<td style='background-color:#fff;border-left:1px solid #ccc; border-bottom:1px solid #ccc;border-top:1px solid #ccc;padding:10px; font-size:18px; color:#da4211; text-align:center;'>";
                        html += "<table>";
                        html += "<tr>";
                        html += "<td width='50'><img src='http://bp3.brandprofiling.co.kr"+data.sub[i].IMAGE_FILENAME+"' width='50'></td>";
                        html += "<td style='font-size:14px; padding:0px 5px;' valign='middle' align='left'>"+data.sub[i].IMAGE_TITLE+"</td>"
                        html += "</tr>";
                        html += "</table>";
                        html += "</td>";
                        html += "<td style='background-color:#fff;border-left:1px solid #ccc; border-bottom:1px solid #ccc;border-right:1px solid #ccc;border-top:1px solid #ccc;padding:10px; font-size:18px; color:#da4211; text-align:center;font-style:italic'>"+value_total+"%</td>";
                        html += "</tr>";
                    }
                    html += "</tbody>";

                    html += "</table></div>";

                    $("#result"+data.q_code).html(html);
                    /*
                    for(var i = 0; i<data.sub.length; i+=2) {
                        html += "<tr>";
                        html += "<td class='imgBox_off imgBox' align='center'>";
                        html += "<div id=\"chart_"+data.q_code+"_"+data.sub[i].IMG_SEQ+"_"+data.sub[i].CATEGORY_CODE+"\" class=\"imageView pie\" style=\"background: url('http://bp3.brandprofiling.co.kr"+data.sub[i].IMAGE_FILENAME+"') no-repeat center center; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover; height:200px;width:100%;\" total=\""+data.sub[i].TOTAL+"\"><div class='img_background'><div id=\"chart_data_"+data.q_code+"_"+data.sub[i].IMG_SEQ+"_"+data.sub[i].CATEGORY_CODE+"\" class='per_class'></div></div></div>";
                        html += "</td>";
                        if(data.sub[i+1] != undefined) {
                            html += "<td class='imgBox_off imgBox' align='center'>";
                            html += "<div id=\"chart_" + data.q_code + "_" + data.sub[i + 1].IMG_SEQ + "_" + data.sub[i + 1].CATEGORY_CODE + "\" class=\"imageView pie\" style=\"background: url('http://bp3.brandprofiling.co.kr" + data.sub[i + 1].IMAGE_FILENAME + "') no-repeat center center; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover; height:200px;\" total=\"" + data.sub[i + 1].TOTAL + "\"><div class='img_background'><div id=\"chart_data_" + data.q_code + "_" + data.sub[i + 1].IMG_SEQ + "_" + data.sub[i + 1].CATEGORY_CODE + "\" class='per_class'></div></div></div>";
                            html += "</td>";
                        }
                        html += "</tr>";
                    }
                    html += "</table>";


                    $("#result"+data.q_code).html(html);
                    $(".pie").each(function() {
                        var id = $(this).attr("id");

                        id = id.replace("chart", "chart_data");
                        var value_total = parseInt($(this).attr("total"));
                        var per = (value_total / total) * 100;



                        $("#"+id).html(per + "%");

                    });
                    */
                    break;
                case "2":
                    html += "<div class='js-rating col-xs-12 text-center' data-score='"+data.sub[0].SCORE+"' data-star-on='fa fa-fw fa-2x fa-star text-warning' data-star-off='fa fa-fw fa-2x fa-star text-gray'></div>";
                    html += "<div class='text-center' style='color:#da4211;font-size:18px;'>"+data.sub[0].SCORE+"</div>";

                    $("#result"+data.q_code).html(html);


                    jQuery(function(){ BaseCompRating.init(); });
                    // <label class="font-18"><b>{{q_item.QA[0].SCORE}}</b></label><div class="js-rating col-xs-6 text-center" :data-score="q_item.QA[0].SCORE" data-star-on="fa fa-fw fa-2x fa-star text-warning" data-star-off="fa fa-fw fa-2x fa-star text-gray"></div>
                    break;
                case "3":
                case "4":
                    html += "<table border='0' width='100%' cellpadding='0' cellspacing='0'>";
                    html += "<col width='80%'>";
                    html += "<col width='20%'>";

                    var lang_string = "";

                    for(var i = 0; i<data.sub.length; i++) {
                        var per = (parseInt(data.sub[i].TOTAL) / total) * 100;
                        if(lang == "ko") {
                            lang_string = data.sub[i].QA_TITLE;
                        }

                        if(lang == "en") {
                            lang_string = data.sub[i].QA_TITLE_EN;
                        }

                        if(lang == "zh") {
                            lang_string = data.sub[i].QA_TITLE_CN;
                        }
                        if(i == 0) {
                            html += "<tr>";

                            html += "<td style='background-color:#fff;border-left:1px solid #ccc; border-bottom:1px solid #ccc;border-top:1px solid #ccc;padding:10px;'>"+lang_string+"</td>";
                            html += "<td style='background-color:#fff;border-left:1px solid #ccc; border-bottom:1px solid #ccc; border-top:1px solid #ccc; border-right:1px solid #ccc; padding:10px; text-align:center;'>"+per+"%</td>";
                            html += "</tr>";
                        } else {
                            html += "<tr>";
                            html += "<td style='background-color:#fff;border-left:1px solid #ccc; border-bottom:1px solid #ccc;padding:10px;'>"+lang_string+"</td>";
                            html += "<td style='background-color:#fff;border-left:1px solid #ccc; border-bottom:1px solid #ccc;border-right:1px solid #ccc; padding:10px; text-align:center;'>"+per+"%</td>";
                            html += "</tr>";

                        }

                    }
                    html += "</table>";

                    $("#result"+data.q_code).html(html);
                    break;
            }
            // console.log(data);
        }
    });
});

function ResultClose() {
    if($("#debug").val() == "true") {
        location.replace("http://cn.brandprofiling.co.kr/survey");
    } else {
        var json = {
            ERR_CODE: "000"
            , ERR_MSG: "000"
            , SURVEY_TYPE: "END"
        }

        window.postMessage(JSON.stringify(json), '*');

    }

}
