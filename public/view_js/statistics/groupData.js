var chartColors = [
    'rgba(255, 99, 132, 0.5)',
    'rgba(255, 159, 64, 0.5)',
    'rgba(255, 205, 86, 0.5)',
    'rgba(75, 192, 192, 0.5)',
    'rgba(54, 162, 235, 0.5)',
    'rgba(153, 102, 255, 0.5)',
    'rgba(201, 203, 207, 0.5)',
    'rgba(255, 99, 1, 0.5)',
    'rgba(22, 99, 132, 0.5)',
    'rgba(1, 99, 2, 0.5)',
    'rgba(10, 50, 50, 0.5)',
    'rgba(20, 90, 102, 0.5)'
];

$(function() {
    var campaign_code = $("#campaign_code").val();
    var group_code = $("#group_code").val();
    var quest_num = $("#quest_num").val();
    $(".chartList").each(function() {
        var id = $(this).attr("id");
        var q_code = id;
        var question_type = $(this).attr("question_type");
        var module_type = $(this).attr("module_type");
        var json = {
            campaign_code : campaign_code
            ,group_code : group_code
            ,q_code : id
            ,quest_num : quest_num
        };
        //console.log(json);


        $.ajax({
            type:"post",
            url:"/statistics/groupData",
            data:json,
            success:function(returnData){
                console.log(module_type);
                var data = {};
                data.labels = [];
                data.datasets = [];
                data.datasets.data = [];
                var dataValue = [];
                var dataBackground = [];
                var label = [];
                switch(question_type) {

                    /************* 7점 척도형 ************/
                    case "1":
                        var table = "";

                        table += "<tr>";
                        table += "<td width='20%' class='text-center' style='font-size:14px;font-weight: bold;'>총참여자수 : ("+returnData[0].TOTAL_CNT+"명)</td>";
                        table += "<td class='text-center' style='padding:10px 5px;'>";

                        table += "<div style='width:50px;background-color:#b32400;color:#fff;float:right;margin-left:5px;'>7점</div>";
                        table += "<div style='width:50px;background-color:#e62e00;color:#fff;float:right;margin-left:5px;'>6점</div>";
                        table += "<div style='width:50px;background-color:#ff471a;color:#fff;float:right;margin-left:5px;'>5점</div>";
                        table += "<div style='width:50px;background-color:#ff704d;color:#fff;float:right;margin-left:5px;'>4점</div>";
                        table += "<div style='width:50px;background-color:#ff9980;color:#fff;float:right;margin-left:5px;'>3점</div>";
                        table += "<div style='width:50px;background-color:#ffc2b3;color:#fff;float:right;margin-left:5px;'>2점</div>";
                        table += "<div style='width:50px;background-color:#ffebe6;color:#fff;float:right;'>1점</div>";
                        table += "</td>";
                        table += "<td class='text-center' style='font-size:14px;font-weight: bold;'>평균</td>";
                        table += "<td class='text-center' style='font-size:14px;font-weight: bold;'>답변자수</td>";
                        table += "<td class='text-center' style='font-size:14px;font-weight: bold;'>추천지수</td>";
                        table += "</tr>";

                        table += "<tr>";
                        table += "<td style='background-color:#f1f1f1;' colspan='5' height='2'></td>";
                        table += "</tr>";

                        table += "<tr>";
                        table += "<td colspan='5' height='8'></td>";
                        table += "</tr>";

                        var total_per = 0;
                        var sum_total = 0;
                        var sum_total_index = "";
                        for(var i = 0; i<returnData.length; i++) {
                            if(sum_total < returnData[i].SUM_COUNT) {
                                sum_total_index = i;
                                sum_total = returnData[i].SUM_COUNT;
                            }

                        }
                        for(var i = 0; i<returnData.length; i++) {

                            table += "<tr>";
                            if(sum_total_index == i) {
                                table += "<td class='text-right' width='20%' style='font-size:11px; padding:5px 10px;'><span style='font-size:12px; color:red; padding-right:10px;'>★</span>"+returnData[i].BRAND_NAME_KO+"</td>";
                            } else {
                                table += "<td class='text-right' width='20%' style='font-size:11px; padding:5px 10px;'>"+returnData[i].BRAND_NAME_KO+"</td>";
                            }

                            // if(returnData[i].TOTAL_PER2 < 50){
                            //     var bar = 1.8;
                            // }else{
                            //     var bar = 1;
                            // }

                            var bar = 1;
                            table += "<td style='border:1px solid #f1f1f1;' class='text-center'>";
                            table += "<table width='"+returnData[i].TOTAL_PER2*bar+"%'>";
                            table += "<tr>";
                            if(returnData[i].QA1_DATA_PER != 0) {
                                table += "<td width='" + Math.round(returnData[i].QA1_DATA_PER) + "%' class='text-center' style='background-color:#ffebe6;color:#fff;font-size:3px;padding:5px 0px;'><a href='#' data-toggle='popover' title='1점' data-placement='top' data-content='" + returnData[i].QA1_DATA_PER + "%'>&nbsp</a></td>";
                            }
                            if(returnData[i].QA2_DATA_PER != 0) {
                                table += "<td width='" + Math.round(returnData[i].QA2_DATA_PER) + "%' class='text-center' style='background-color:#ffc2b3;color:#fff;font-size:3px;padding:5px 0px;'><a href='#' data-toggle='popover' title='2점' data-placement='top' data-content='" + returnData[i].QA2_DATA_PER + "%'>&nbsp</a></td>";
                            }
                            if(returnData[i].QA3_DATA_PER != 0) {
                                table += "<td width='" + Math.round(returnData[i].QA3_DATA_PER) + "%' class='text-center' style='background-color:#ff9980;color:#fff;font-size:3px;padding:5px 0px;'><a href='#' data-toggle='popover' title='3점' data-placement='top' data-content='" + returnData[i].QA3_DATA_PER + "%'>&nbsp</a></td>";
                            }
                            if(returnData[i].QA4_DATA_PER != 0) {
                                table += "<td width='" + Math.round(returnData[i].QA4_DATA_PER) + "%' class='text-center' style='background-color:#ff704d;color:#fff;font-size:3px;padding:5px 0px;'><a href='#' data-toggle='popover' title='4점' data-placement='top' data-content='" + returnData[i].QA4_DATA_PER + "%'>&nbsp</a></td>";
                            }
                            if(returnData[i].QA5_DATA_PER != 0) {
                                table += "<td width='" + Math.round(returnData[i].QA5_DATA_PER) + "%' class='text-center' style='background-color:#ff471a;color:#fff;font-size:3px;padding:5px 0px;'><a href='#' data-toggle='popover' title='5점' data-placement='top' data-content='" + returnData[i].QA5_DATA_PER + "%'>&nbsp</a></td>";

                            }
                            if(returnData[i].QA6_DATA_PER != 0) {
                                table += "<td width='"+Math.round(returnData[i].QA6_DATA_PER)+"%' class='text-center' style='background-color:#e62e00;color:#fff;font-size:3px;padding:5px 0px;'><a href='#' data-toggle='popover' title='6점' data-placement='top' data-content='"+returnData[i].QA6_DATA_PER+"%'>&nbsp</a></td>";
                            }
                            if(returnData[i].QA7_DATA_PER != 0) {
                                table += "<td width='" + Math.round(returnData[i].QA7_DATA_PER) + "%' class='text-center' style='background-color:#b32400;color:#fff;font-size:3px;padding:5px 0px;'><a href='#' data-toggle='popover' title='7점' data-placement='top' data-content='" + returnData[i].QA7_DATA_PER + "%'>&nbsp</a></td>";
                            }

                            table += "</tr>";
                            table += "</table>";
                            table += "</td>";

                            if(parseFloat(returnData[i].TOTAL_AVG) < 1.0){
                                var bgColor = '#ffebe6';

                            }else if(parseFloat(returnData[i].TOTAL_AVG) >= 1.0 && parseFloat(returnData[i].TOTAL_AVG) < 1.5){
                                var bgColor = '#ffc2b3';
                            }else if(parseFloat(returnData[i].TOTAL_AVG) >= 1.5 && parseFloat(returnData[i].TOTAL_AVG) < 2.0){
                                var bgColor = '#ffad99';
                            }else if(parseFloat(returnData[i].TOTAL_AVG) >= 2.0 && parseFloat(returnData[i].TOTAL_AVG) < 2.5){
                                var bgColor = '#ff9980';
                            }else if(parseFloat(returnData[i].TOTAL_AVG) >= 2.5 && parseFloat(returnData[i].TOTAL_AVG) < 3.0){
                                var bgColor = '#ff8566';
                            }else if(parseFloat(returnData[i].TOTAL_AVG) >= 3.0 && parseFloat(returnData[i].TOTAL_AVG) < 3.5){
                                var bgColor = '#ff704d';
                            }else if(parseFloat(returnData[i].TOTAL_AVG) >= 3.5 && parseFloat(returnData[i].TOTAL_AVG) < 4.0){
                                var bgColor = '#ff5c33';
                            }else if(parseFloat(returnData[i].TOTAL_AVG) >= 4.0 && parseFloat(returnData[i].TOTAL_AVG) < 4.5){
                                var bgColor = '#ff471a';
                            }else if(parseFloat(returnData[i].TOTAL_AVG) >= 4.5 && parseFloat(returnData[i].TOTAL_AVG) < 5.0){
                                var bgColor = '#ff3300';
                            }else if(parseFloat(returnData[i].TOTAL_AVG) >= 5.0 && parseFloat(returnData[i].TOTAL_AVG) < 5.5){
                                var bgColor = '#e62e00';
                            }else if(parseFloat(returnData[i].TOTAL_AVG) >= 5.5 && parseFloat(returnData[i].TOTAL_AVG) < 6.0){
                                var bgColor = '#cc2900';
                            }else {
                                var bgColor = '#b32400';
                            }
                            table += "<td class='text-center text-white' width='5%' style='font-size:11px; background-color:"+bgColor+"; opacity: 0.9;'>"+returnData[i].TOTAL_AVG+"</td>"
                            table += "<td class='text-center' width='8%' style='font-size:11px;'>"+(returnData[i].ANSWER_TOTAL - returnData[i].NOT_ANSWER)+"명</td>"
                            table += "<td class='text-center' width='8%' style='font-size:11px;'>"+returnData[i].SUM_COUNT+"</td>"
                            table += "</tr>";

                            if(i == returnData.length - 1) {
                                $("#data_"+returnData[i].Q_CODE).html(table);
                                $("#chart_"+returnData[i].Q_CODE).hide();
                            }
                        }


                        break;

                    /************* 이미지 7점 척도형 ************/
                    case "2":
                        for(var i = 0; i<returnData.length; i++) {
                            data.labels.push(returnData[i].BRAND_NAME_KO);
                            var brandName = "";
                            if(i == 0) {
                                brandName = returnData[i].BRAND_NAME_KO;
                                var qa_title = returnData[i].QA_TITLE_KO;
                                var qa_title_temp = qa_title.split(",");
                                data.labels = [];
                                for(var j = 0; j<qa_title_temp.length; j++)
                                {
                                    data.labels.push(qa_title_temp[j]);

                                }

                            }
                            label.push(returnData[i].BRAND_NAME_KO);
                            dataValue.push(Math.round(returnData[i].TOTAL_PER));
                            dataBackground.push("rgba(218, 66, 17, 1)");

                            if(i == returnData.length -1) {
                                var height = returnData.length * 50;
                                $("#chart_"+returnData[i].Q_CODE).height(height);
                                console.log(height);
                                new Chart(document.getElementById("chart_"+returnData[i].Q_CODE).getContext('2d'), {
                                    type: 'horizontalBar',
                                    data: {
                                        labels: label,
                                        datasets: [
                                            {
                                                label: '점수',
                                                data: dataValue,
                                                backgroundColor: dataBackground,
                                                borderColor: [
                                                    'rgba(255,99,132,1)'
                                                ],
                                                borderWidth: 1
                                            }

                                        ]
                                    },
                                    options: {
                                        scales: {
                                            xAxes: [{
                                                ticks: {
                                                    min: 0 // Edit the value according to what you need
                                                    ,max: 100
                                                }
                                            }],
                                        }

                                    }
                                });
                            }
                        }
                        break;

                    /************* 이미지 선택 주관식 입력 : textCloud ************/
                    case "3":
                        var table = "";
                        var brand_code = "";
                        var col = 1;

                        var maxArray = [];
                        var maxArrayCode = [];
                        for(var i = 0; i<returnData.length; i++) {

                            if(brand_code == "" || brand_code != returnData[i].DETAIL_BRAND_CODE) {


                                if(maxArray[returnData[i].DETAIL_BRAND_CODE] == undefined) {
                                    maxArray[returnData[i].DETAIL_BRAND_CODE] = 0;
                                    maxArrayCode[returnData[i].DETAIL_BRAND_CODE] = returnData[i].QA_CODE;
                                }


                                if(maxArray[returnData[i].DETAIL_BRAND_CODE] < returnData[i].QA_CNT) {
                                    maxArray[returnData[i].DETAIL_BRAND_CODE] = returnData[i].QA_CNT;
                                    maxArrayCode[returnData[i].DETAIL_BRAND_CODE] = returnData[i].QA_CODE;
                                }



                                table += "<div class='col-xs-12 bg-amethyst-dark text-white push-5-t text-center' style='padding:5px 0px;'>"+returnData[i].BRAND_NAME_KO+"</div>\n";
                                table += "<div id='rankCloudText_"+returnData[i].DETAIL_BRAND_CODE+"_"+returnData[i].QA_CODE+"' class='col-xs-12' style='font-size:11px; padding:5px 10px;'><span style='font-size:12px; color:red; padding-right:10px;display:none;'>★</span></div>";

                                table += "<div class='col-xs-3 push-5-t' style='height:150px;'><img src='http://bp2.brandprofiling.co.kr:3000"+returnData[i].IMG+"' width='100%' height='300'></div>\n";
                                table += "<div id='textcloud_data_"+returnData[i].DETAIL_BRAND_CODE+"_"+returnData[i].Q_CODE+"_"+returnData[i].QA_CODE+"' class='col-xs-9 push-5-t' style='height:300px;'></div>\n";

                                table += "<div class='col-xs-12 push-5-t' style='height:2px; background-color: #f1f1f1;'> &nbsp;</div>";

                                brand_code = returnData[i].DETAIL_BRAND_CODE;
                                col++;
                            } else {

                                if(maxArray[returnData[i].DETAIL_BRAND_CODE] == undefined) {
                                    maxArray[returnData[i].DETAIL_BRAND_CODE] = 0;
                                    maxArrayCode[returnData[i].DETAIL_BRAND_CODE] = returnData[i].QA_CODE;
                                }

                                if(maxArray[returnData[i].DETAIL_BRAND_CODE] < returnData[i].QA_CNT) {
                                    maxArray[returnData[i].DETAIL_BRAND_CODE] = returnData[i].QA_CNT;
                                    maxArrayCode[returnData[i].DETAIL_BRAND_CODE] = returnData[i].QA_CODE;
                                }

                                table += "<div id='rankCloudText_"+returnData[i].DETAIL_BRAND_CODE+"_"+returnData[i].QA_CODE+"' class='col-xs-12' style='font-size:11px; padding:5px 10px;'><span style='font-size:12px; color:red; padding-right:10px;display:none;'>★</span></div>";
                                table += "<div class='col-xs-3 push-5-t' style='height:150px;'><img src='http://bp2.brandprofiling.co.kr:3000"+returnData[i].IMG+"' width='100%' height='300'></div>\n";
                                table += "<div id='textcloud_data_"+returnData[i].DETAIL_BRAND_CODE+"_"+returnData[i].Q_CODE+"_"+returnData[i].QA_CODE+"' class='col-xs-9 push-5-t' style='height:300px;'></div>\n";

                                table += "<div class='col-xs-12 push-5-t' style='height:2px; background-color: #f1f1f1;'>&nbsp;</div>";

                            }
                            //console.log(table);

                            if(i == returnData.length - 1) {
                                $("#data_"+returnData[i].Q_CODE).hide();
                                $("#chart_"+returnData[i].Q_CODE).hide();
                                $("#cloudText_"+returnData[i].Q_CODE).html(table);
                            }

                        }


                        console.log(maxArray);
                        console.log(maxArrayCode);

                        for(var i = 0; i<returnData.length; i++) {
                            var textcloud = [];
                            console.log(returnData[i].DETAIL_BRAND_CODE+"///"+returnData[i].QA_CODE+"///"+maxArrayCode[returnData[i].DETAIL_BRAND_CODE]);


                            if(returnData[i].QA_CODE == maxArrayCode[returnData[i].DETAIL_BRAND_CODE]){
                                // console.log("CODE"+maxArrayCode[returnData[i].DETAIL_BRAND_CODE]);
                                document.getElementById("rankCloudText_"+returnData[i].DETAIL_BRAND_CODE+"_"+returnData[i].QA_CODE).style.display= "block";
                            }

                            var textTemp = returnData[i].QA_TEXT.split(",");
                            textTemp.forEach(function(value, key) {

                                var textData = {
                                    text: value, weight: key
                                };
                                textcloud.push(textData);


                            });

                            $("#textcloud_data_"+returnData[i].DETAIL_BRAND_CODE+"_"+returnData[i].Q_CODE+"_"+returnData[i].QA_CODE).jQCloud(textcloud, {
                                shape: 'rectangular'
                                ,autoResize: true
                                ,fontSize: {
                                    from: 0.01,
                                    to: 0.06
                                }
                            });
                        }


                        // for(var i = 0; i<returnData.length; i++) {
                        //     img.forEach(function(value, key) {
                        //
                        //         var imageNameTemp = value.split("///");
                        //         var imageCode = imageNameTemp[0];
                        //         var imageName = imageNameTemp[1];
                        //
                        //         var nextSend = {
                        //             campaign_code : campaign_code
                        //             ,quest_num : quest_num
                        //             ,brand_code : returnData[i].DETAIL_BRAND_CODE
                        //             ,q_code : q_code
                        //             ,qa_code : imageCode
                        //             ,num : i
                        //         }
                        //
                        //
                        //         var dataQa = [];
                        //         common.ajax.send("/statistics/textCloud", nextSend);
                        //         common.ajax.return = function(textData) {
                        //
                        //             var textCloudString = "";
                        //             cloud_step3 = [];
                        //
                        //             for(var k = 0; k<textData.textcloud.length; k++) {
                        //
                        //                 // textCloudString = {
                        //                 //     text: textData.textcloud[k].QA_TEXT, weight: textData.textcloud[k].CNT
                        //                 // };
                        //                 //
                        //                 // cloud_step3.push(textCloudString);
                        //
                        //                 if(textCloudString == "") {
                        //                     textCloudString = textData.textcloud[k].QA_TEXT + "///" + textData.textcloud[k].CNT;
                        //                 } else {
                        //                     textCloudString += "^^^" + textData.textcloud[k].QA_TEXT + "///" + textData.textcloud[k].CNT;
                        //                 }
                        //
                        //
                        //
                        //
                        //             }
                        //
                        //         }
                        //
                        //
                        //
                        //     });
                        // }




                        break;
                    /************ 양자택일형 *************/
                    case "4":

                        var table = "";

                        for(var i = 0; i<returnData.length; i++) {

                            var qa_title = returnData[i].QA_TITLE_KO.split(',');

                            if(i == 0) {
                                table += "<tr class='bg-amethyst-dark text-white'>";
                                table += "<td width='7%'  class='text-center font-s13 font-w700' >답변자수</td>";
                                table += "<td width='8%' class='text-center font-s13 font-w700' >%</td>";
                                table += "<td width='25%' class='text-center font-s13 font-w700'>"+qa_title[0]+"</td>";
                                table += "<td width='20%' class='text-center font-s13 font-w700' >BRAND";
                                table += "</td>";
                                table += "<td width='25%' class='text-center font-s13 font-w700'>"+qa_title[1]+"</td>";
                                table += "<td width='8%' class='text-center font-s13 font-w700' >%</td>";
                                table += "<td width='7%' class='text-center font-s13 font-w700' >답변자수</td>";
                                table += "</tr>";
                            }

                            table += "<tr>";
                            table += "<td class='text-center font-s12'>"+returnData[i].QA1_DATA+"</td>";
                            table += "<td class='text-center font-s12'>"+Math.round(returnData[i].QA1_PER)+" %</td>";
                            table += "<td>";
                            table += "<div style='width:"+Math.round(returnData[i].QA1_PER)+"%; background-color:#e14969;float:right;' class='text-center text-white'> &nbsp </div>";
                            table += "</td>";
                            table += "<td class='text-center font-w700'>"+returnData[i].BRAND_NAME_KO+"</td>";
                            table += "<td>";
                            table += "<div style='width:"+Math.round(returnData[i].QA2_PER)+"%; background-color:#2687c8;' class='text-center text-white'>&nbsp</div>";
                            table += "</td>";
                            table += "<td class='text-center font-s12'>"+Math.round(returnData[i].QA2_PER)+" %</td>";
                            table += "<td class='text-center font-s12'>"+returnData[i].QA2_DATA+"</td>";
                            table += "</tr>";

                            if(returnData.length >10) {
                                if (i == returnData.length - 1) {
                                    table += "<tr class='bg-amethyst-dark text-white'>";
                                    table += "<td width='7%'  class='text-center font-s13 font-w700' >답변자수</td>";
                                    table += "<td width='8%' class='text-center font-s13 font-w700' >%</td>";
                                    table += "<td width='25%' class='text-center font-s13 font-w700'>" + qa_title[0] + "</td>";
                                    table += "<td width='20%' class='text-center font-s13 font-w700' >BRAND";
                                    table += "</td>";
                                    table += "<td width='25%' class='text-center font-s13 font-w700'>" + qa_title[1] + "</td>";
                                    table += "<td width='8%' class='text-center font-s13 font-w700' >%</td>";
                                    table += "<td width='7%' class='text-center font-s13 font-w700' >답변자수</td>";
                                    table += "</tr>";
                                }
                            }

                            if(i == returnData.length - 1) {
                                $("#data_"+returnData[i].Q_CODE).html(table);
                                $("#chart_"+returnData[i].Q_CODE).hide();
                            }
                        }





                        break;

                    /************* 복수선택형 ************/
                    case "5":

                        // var table = "";
                        //
                        // var qa_code_array = [];
                        // var qa_title_array = [];
                        //
                        //
                        // var chart_dataset = [];
                        //
                        //
                        //
                        // for(var i = 0; i<returnData.length; i++) {
                        //     var temp = returnData[i].QA_TITLE_KO.split(',');
                        //
                        //     var table = "";
                        //
                        //     table += "<tr>";
                        //     table += "<td width='60%' style='font-size:14px;font-weight: bold;'>총참여자수 : ("+returnData[0].TOTAL_CNT+"명)</td>";
                        //     table += "<td>";
                        //     var datasetJsonPer = [];
                        //     temp.forEach(function(value,key) {
                        //         var gubun = value.split('///');
                        //
                        //         var qa_code = gubun[0];
                        //         var qa_title = gubun[1];
                        //         //console.log(qa_title);
                        //         var temp_qa = parseFloat(eval("returnData["+i+"].QA_"+qa_code));
                        //         var PER = parseFloat(eval("returnData["+i+"].QA_PER_"+qa_code));
                        //         //console.log(i+"//"+temp_qa);
                        //         var jsonData = [];
                        //         temp.forEach(function(value2,key2) {
                        //             if(key == key2) {
                        //                 var PER = parseFloat(eval("returnData["+i+"].QA_PER_"+qa_code));
                        //                 jsonData.push(PER);
                        //             }
                        //
                        //         });
                        //
                        //         var datasetJson = {
                        //             label : qa_title + " ("+ temp_qa + "명) "+ Math.round(PER) +" %",
                        //             backgroundColor: color[key],
                        //             data : jsonData
                        //         };
                        //
                        //
                        //         console.log(datasetJson);
                        //         //챠트라벨
                        //         qa_title_array.push(qa_title);
                        //
                        //         //챠트 데이터
                        //
                        //
                        //         //데이터 INSERT
                        //         chart_dataset.push(datasetJson);
                        //
                        //         //console.log(chart_dataset);
                        //
                        //        // console.log(qa_code + "="+qa_title);
                        //
                        //         $("#data_"+returnData[i].Q_CODE).html(table);
                        //
                        //     });
                        //     // console.log(i);
                        //     // console.log(chart_dataset);
                        //     //
                        //     // console.log(qa_title_array);
                        //
                        //     new Chart(document.getElementById("chart_"+returnData[i].Q_CODE).getContext('2d'), {
                        //         type: 'horizontalBar',
                        //         data:{
                        //             datasets:chart_dataset,
                        //             labels:[returnData[i].BRAND_NAME_KO]
                        //         },
                        //         options: {
                        //             scales: {
                        //
                        //                 yAxes: [{
                        //
                        //                     ticks: {
                        //                         beginAtZero: true,
                        //                         steps: 10,
                        //                         stepValue: 5,
                        //                         max: 100,
                        //                         min: 0
                        //                     }
                        //                 }]
                        //             }
                        //         }
                        //
                        //     });
                        //     // table +="</table>";
                        //     // table += "</td></tr>";
                        //
                        // }

                        var table = "";

                        table += "<tr>";
                        table += "<td width='20%' class='text-center' style='font-size:14px;font-weight: bold;'>총참여자수 : ("+returnData[0].TOTAL_CNT+"명)</td>";
                        table += "<td class='text-center' style='padding:10px 5px;'>";
                        table += "</td>";
                        table += "</tr>";
                        table += "<tr>";
                        table += "<td style='background-color:#f1f1f1;' colspan='4' height='2'></td>";
                        table += "</tr>";


                        for(var i = 0; i<returnData.length; i++) {

                            table += "<tr>";

                            table += "<td class='text-right' width='20%' style='font-size:11px; padding:5px 10px;'><b>"+returnData[i].BRAND_NAME_KO+"</b></td>";

                            table += "<td style='border:1px solid #f1f1f1;' class='text-center'>";

                            var temp = returnData[i].QA_TITLE_KO.split(',');
                            var color = [ "#ffcc2f", "#ef5734","#00acee","#2687c8","#543729","#88aca1","#788cb6","#335238","#f65a5b","#76daff"];

                            temp.forEach(function(value,key) {
                                var gubun = value.split('///');
                                var qa_code = gubun[0];
                                var qa_title = gubun[1];
                                var bgcolor =color[key];
                                var qa_data = parseFloat(eval("returnData["+i+"].QA_"+qa_code));
                                var per = Math.ceil((qa_data / returnData[0].TOTAL_CNT * 80),0);
                                // var qa_data_per = parseFloat(eval("returnData["+i+"].QA_PER"+qa_code));
                                console.log(per);
                                table += "<table class='table-bordered'>";
                                table += "<tr>";
                                if (per == 0) {
                                    table += "<td colspan='2' class='text-left' style='font-size:11px; border-color: #ffffff; border-left-color: "+ bgcolor +"' >" + qa_title + "(" + qa_data + "명)</td>";
                                } else {
                                    table += "<td class='text-left text-white' width='" + per + "%' style='font-size:11px; padding:5px 10px; background-color:" + bgcolor + ";'></td>";
                                    // table += "<div style='width:"+qa_data_per+"%;background-color:"+bgcolor+";'>&nbsp</div></td>";
                                    // table += "<td class='text-center' width='5%' style='font-size:11px; border-color: #ffffff'>"+ qa_data+"</td>";

                                    table += "<td class='text-left' style='font-size:11px; border-color: #ffffff'>" + qa_title + " (" + qa_data + "명)</td>";
                                }
                                table += "</tr>";
                                table += "</table>";

                            } );
                            table += "</td></tr>";

                            if(i == returnData.length - 1) {
                                $("#data_"+returnData[i].Q_CODE).html(table);
                                $("#chart_"+returnData[i].Q_CODE).hide();
                            }
                        }



                        break;

                    /************* 단일선택형 ************/

                    case "6":


                        //         var dataChart = [];
                        //         var labels = [];
                        //         var filed_labels = [];
                        //         var dataSet = [];
                        //
                        //         var qaTitle = [];
                        //         var dataTotal = [];
                        //         var background = [];
                        //
                        //         for(var i = 0; i<returnData.length; i++) {
                        //             var temp = returnData[i].QA_TITLE_KO.split(",");
                        //             if(i == 0) {
                        //                 for(var j = 0; j<temp.length; j++) {
                        //                     filed_labels.push(temp[j]);
                        //                     dataSet.push({labels:temp[j]});
                        //                 }
                        //             }
                        //
                        //             var dataValue = "";
                        //             for(var k = 0; k<temp.length; k++) {
                        //                 var num = 1 + k;
                        //                 var data = [];
                        //                 var per = Math.round(((eval("returnData[i].QA_"+num)) / returnData[i].TOTAL_CNT) * 100,0);
                        //                     console.log(eval("returnData[i].QA_"+num) +  "///" + num +  "///" + returnData[i].TOTAL_CNT + "///" + per + "///" + dataValue);
                        //                 num++;
                        //
                        //
                        //                 if(dataValue == "") {
                        //                     dataValue = String(per);
                        //                 } else {
                        //                     dataValue += ","+String(per);
                        //                 }
                        //
                        //             }
                        //
                        //
                        //             dataTotal.push(dataValue);
                        //         }
                        //
                        //
                        //         var colorNames = Object.keys(chartColors);
                        //         var dataSetG = [];
                        //         filed_labels.forEach(function(v, i) {
                        //             background.push("color(window.chartColors.red).alpha(0.5).rgbString()");
                        //             if(dataTotal[i] == undefined) {
                        //                 dataSetG.push({
                        //                     label: v
                        //                     ,borderWidth : 1
                        //                     ,data: []
                        //                     ,backgroundColor: chartColors[i]
                        //                 });
                        //             } else {
                        //                 var dataObject = dataTotal[i].split(",");
                        //                 var dataValue = [];
                        //
                        //
                        //
                        //                 dataObject.forEach(function(value, k) {
                        //                     dataValue.push(parseInt(value));
                        //                 });
                        //
                        //                 dataSetG.push(
                        //                     {
                        //                         label: v
                        //                         ,borderWidth: 1
                        //                         ,data: dataObject
                        //                         ,backgroundColor: chartColors[i]
                        //                     }
                        //                 )
                        //
                        //             }
                        //         });
                        //
                        //
                        //
                        //
                        //         for(var i = 0; i<returnData.length; i++) {
                        //             labels.push(returnData[i].BRAND_NAME_KO);
                        //
                        //             dataBackground.push("rgba(218, 66, 17, 1)");
                        //
                        //
                        //
                        //             if(i == returnData.length -1) {
                        //                 var dataSet = [];
                        //
                        //                 new Chart(document.getElementById("chart_"+returnData[i].Q_CODE).getContext('2d'), {
                        //                     type: 'horizontalBar',
                        //                     data: {
                        //                         labels: labels
                        //                         ,datasets: dataSetG
                        //                     },
                        //
                        //                     options: {
                        //                         scales: {
                        //                             xAxes: [{
                        //                                 ticks: {
                        //                                     min: 0 // Edit the value according to what you need
                        //                                     ,max: 100
                        //                                 }
                        //                             }],
                        //                         }
                        //
                        //                     }
                        //                 });
                        //             }
                        //         }
                        //         break;
                        //
                        //

                        var table = "";

                        table += "<tr>";
                        table += "<td width='20%' class='text-center' style='font-size:14px;font-weight: bold;'>총참여자수 : ("+returnData[0].TOTAL_CNT+"명)</td>";
                        table += "<td class='text-center' style='padding:10px 5px;'>";
                        table += "</td>";
                        table += "</tr>";
                        table += "<tr>";
                        table += "<td style='background-color:#f1f1f1;' colspan='4' height='2'></td>";
                        table += "</tr>";


                        for(var i = 0; i<returnData.length; i++) {

                            table += "<tr>";

                            table += "<td class='text-right' width='20%' style='font-size:11px; padding:5px 10px;'><b>"+returnData[i].BRAND_NAME_KO+"</b></td>";

                            table += "<td style='border:1px solid #f1f1f1;' class='text-center'>";

                            var temp = returnData[i].QA_TITLE_KO.split(',');

                            var color = [ "#ffcc2f", "#ef5734","#00acee","#2687c8","#543729","#88aca1","#788cb6","#335238","#f65a5b","#76daff","#92cc2f", "#e35734","#09acee"];

                            temp.forEach(function(value,key) {
                                var gubun = value.split('///');

                                var qa_code = gubun[0];
                                var qa_title = gubun[1];
                                var bgcolor = color[key];
                                var qa_data = parseFloat(eval("returnData[" + i + "].QA_" + qa_code));
                                var per = Math.ceil((qa_data / returnData[0].TOTAL_CNT * 80), 0);
                                // var qa_data_per = parseFloat(eval("returnData["+i+"].QA_PER"+qa_code));

                                table += "<table class='table-bordered'>";
                                table += "<tr>";
                                if (per == 0) {
                                    table += "<td colspan='2' class='text-left' style='font-size:11px; border-color: #ffffff; border-left-color: "+ bgcolor +"' >" + qa_title + "(" + qa_data + "명)</td>";
                                } else {

                                    table += "<td class='text-left text-white' width='" + per + "%' style='font-size:11px; padding:5px 10px; background-color:" + bgcolor + ";'></td>";
                                    // table += "<div style='width:"+qa_data_per+"%;background-color:"+bgcolor+";'>&nbsp</div></td>";
                                    // table += "<td class='text-center' width='5%' style='font-size:11px; border-color: #ffffff'>"+ qa_data+"</td>";
                                    table += "<td class='text-left' style='font-size:11px; border-color: #ffffff'>" + qa_title + "(" + qa_data + "명)</td>";
                                }
                                table += "</tr>";
                                table += "</table>";

                            } );
                            table += "</td></tr>";

                            if(i == returnData.length - 1) {
                                $("#data_"+returnData[i].Q_CODE).html(table);
                                $("#chart_"+returnData[i].Q_CODE).hide();
                            }
                        }



                        break;

                    /************* 주관식 입력 : textCloud ************/
                    case "7":
                        var table = "";
                        var brand_code = "";
                        var col = 1;

                        var maxArray = [];
                        var maxArrayCode = [];
                        for(var i = 0; i<returnData.length; i++) {

                            if(brand_code == "" || brand_code != returnData[i].DETAIL_BRAND_CODE) {


                                if(maxArray[returnData[i].DETAIL_BRAND_CODE] == undefined) {
                                    maxArray[returnData[i].DETAIL_BRAND_CODE] = 0;
                                    maxArrayCode[returnData[i].DETAIL_BRAND_CODE] = returnData[i].QA_CODE;
                                }


                                if(maxArray[returnData[i].DETAIL_BRAND_CODE] < returnData[i].QA_CNT) {
                                    maxArray[returnData[i].DETAIL_BRAND_CODE] = returnData[i].QA_CNT;
                                    maxArrayCode[returnData[i].DETAIL_BRAND_CODE] = returnData[i].QA_CODE;
                                }



                                table += "<div class='col-xs-12 bg-amethyst-dark text-white push-5-t text-center' style='padding:5px 0px;'>"+returnData[i].BRAND_NAME_KO+"</div>\n";
                                table += "<div id='rankCloudText_"+returnData[i].DETAIL_BRAND_CODE+"_"+returnData[i].QA_CODE+"' class='col-xs-12' style='font-size:11px; padding:5px 10px;'><span style='font-size:12px; color:red; padding-right:10px;display:none;'>★</span></div>";

                                table += "<div id='textcloud_data_"+returnData[i].DETAIL_BRAND_CODE+"_"+returnData[i].Q_CODE+"_"+returnData[i].QA_CODE+"' class='col-xs-9 push-5-t' style='height:300px;'></div>\n";

                                table += "<div class='col-xs-12 push-5-t' style='height:2px; background-color: #f1f1f1;'> &nbsp;</div>";

                                brand_code = returnData[i].DETAIL_BRAND_CODE;
                                col++;
                            } else {

                                if(maxArray[returnData[i].DETAIL_BRAND_CODE] == undefined) {
                                    maxArray[returnData[i].DETAIL_BRAND_CODE] = 0;
                                    maxArrayCode[returnData[i].DETAIL_BRAND_CODE] = returnData[i].QA_CODE;
                                }

                                if(maxArray[returnData[i].DETAIL_BRAND_CODE] < returnData[i].QA_CNT) {
                                    maxArray[returnData[i].DETAIL_BRAND_CODE] = returnData[i].QA_CNT;
                                    maxArrayCode[returnData[i].DETAIL_BRAND_CODE] = returnData[i].QA_CODE;
                                }

                                table += "<div id='rankCloudText_"+returnData[i].DETAIL_BRAND_CODE+"_"+returnData[i].QA_CODE+"' class='col-xs-12' style='font-size:11px; padding:5px 10px;'><span style='font-size:12px; color:red; padding-right:10px;display:none;'>★</span></div>";
                                table += "<div id='textcloud_data_"+returnData[i].DETAIL_BRAND_CODE+"_"+returnData[i].Q_CODE+"_"+returnData[i].QA_CODE+"' class='col-xs-9 push-5-t' style='height:300px;'></div>\n";

                                table += "<div class='col-xs-12 push-5-t' style='height:2px; background-color: #f1f1f1;'>&nbsp;</div>";

                            }
                            //console.log(table);

                            if(i == returnData.length - 1) {
                                $("#data_"+returnData[i].Q_CODE).hide();
                                $("#chart_"+returnData[i].Q_CODE).hide();
                                $("#cloudText_"+returnData[i].Q_CODE).html(table);
                            }

                        }


                        console.log(maxArray);
                        console.log(maxArrayCode);

                        for(var i = 0; i<returnData.length; i++) {
                            var textcloud = [];
                            console.log(returnData[i].DETAIL_BRAND_CODE+"///"+returnData[i].QA_CODE+"///"+maxArrayCode[returnData[i].DETAIL_BRAND_CODE]);


                            if(returnData[i].QA_CODE == maxArrayCode[returnData[i].DETAIL_BRAND_CODE]){
                                // console.log("CODE"+maxArrayCode[returnData[i].DETAIL_BRAND_CODE]);
                                document.getElementById("rankCloudText_"+returnData[i].DETAIL_BRAND_CODE+"_"+returnData[i].QA_CODE).style.display= "block";
                            }

                            var textTemp = returnData[i].QA_TEXT.split(",");
                            textTemp.forEach(function(value, key) {

                                var textData = {
                                    text: value, weight: key
                                };
                                textcloud.push(textData);


                            });

                            $("#textcloud_data_"+returnData[i].DETAIL_BRAND_CODE+"_"+returnData[i].Q_CODE+"_"+returnData[i].QA_CODE).jQCloud(textcloud, {
                                shape: 'rectangular'
                                ,autoResize: true
                                ,fontSize: {
                                    from: 0.01,
                                    to: 0.06
                                }
                            });
                        }

                        break;
                    /************* 일반설문형 ************/
                    case "8":
                        // var module_type = $(this).attr("module_type");
                        // var module_type = "M";
                        if(module_type == "S") {
                            var table = "단일선택형";

                            table += "<tr>";
                            table += "<td width='20%' class='text-center' style='font-size:14px;font-weight: bold;'>총참여자수 : (" + returnData[0].TOTAL_CNT + "명)</td>";
                            table += "<td class='text-center' style='padding:10px 5px;'>";
                            table += "</td>";
                            table += "</tr>";
                            table += "<tr>";
                            table += "<td style='background-color:#f1f1f1;' colspan='4' height='2'></td>";
                            table += "</tr>";


                            for (var i = 0; i < returnData.length; i++) {

                                table += "<tr>";

                                table += "<td class='text-right' width='20%' style='font-size:11px; padding:5px 10px;'><b>" + returnData[i].BRAND_NAME_KO + "</b></td>";

                                table += "<td style='border:1px solid #f1f1f1;' class='text-center'>";

                                var temp = returnData[i].QA_TITLE_KO.split(',');

                                var color = ["#ffcc2f", "#ef5734", "#00acee", "#2687c8", "#543729", "#88aca1", "#788cb6", "#335238", "#f65a5b", "#76daff", "#92cc2f", "#e35734", "#09acee"];

                                temp.forEach(function (value, key) {
                                    var gubun = value.split('///');

                                    var qa_code = gubun[0];
                                    var qa_title = gubun[1];
                                    var bgcolor = color[key];
                                    var qa_data = parseFloat(eval("returnData[" + i + "].QA_" + qa_code));
                                    var per = Math.ceil((qa_data / returnData[0].TOTAL_CNT * 80), 0);
                                    // var qa_data_per = parseFloat(eval("returnData["+i+"].QA_PER"+qa_code));

                                    table += "<table class='table-bordered'>";
                                    table += "<tr>";
                                    if (per == 0) {
                                        table += "<td colspan='2' class='text-left' style='font-size:11px; border-color: #ffffff; border-left-color: " + bgcolor + "' >" + qa_title + "(" + qa_data + "명)</td>";
                                    } else {

                                        table += "<td class='text-left text-white' width='" + per + "%' style='font-size:11px; padding:5px 10px; background-color:" + bgcolor + ";'></td>";
                                        // table += "<div style='width:"+qa_data_per+"%;background-color:"+bgcolor+";'>&nbsp</div></td>";
                                        // table += "<td class='text-center' width='5%' style='font-size:11px; border-color: #ffffff'>"+ qa_data+"</td>";
                                        table += "<td class='text-left' style='font-size:11px; border-color: #ffffff'>" + qa_title + "(" + qa_data + "명)</td>";
                                    }
                                    table += "</tr>";
                                    table += "</table>";

                                });
                                table += "</td></tr>";

                                if (i == returnData.length - 1) {
                                    $("#data_" + returnData[i].Q_CODE).html(table);
                                    $("#chart_" + returnData[i].Q_CODE).hide();
                                }
                            }
                        }

                        if(module_type == "M") {


                            var table = "중복선택형";

                            table += "<tr>";
                            table += "<td width='20%' class='text-center' style='font-size:14px;font-weight: bold;'>총참여자수 : (" + returnData[0].TOTAL_CNT + "명)</td>";
                            table += "<td class='text-center' style='padding:10px 5px;'>";
                            table += "</td>";
                            table += "</tr>";
                            table += "<tr>";
                            table += "<td style='background-color:#f1f1f1;' colspan='4' height='2'></td>";
                            table += "</tr>";


                            for (var i = 0; i < returnData.length; i++) {

                                table += "<tr>";

                                table += "<td class='text-right' width='20%' style='font-size:11px; padding:5px 10px;'><b>" + returnData[i].BRAND_NAME_KO + "</b></td>";

                                table += "<td style='border:1px solid #f1f1f1;' class='text-center'>";

                                var temp = returnData[i].QA_TITLE_KO.split(',');
                                var color = ["#ffcc2f", "#ef5734", "#00acee", "#2687c8", "#543729", "#88aca1", "#788cb6", "#335238", "#f65a5b", "#76daff"];

                                temp.forEach(function (value, key) {
                                    var gubun = value.split('///');
                                    var qa_code = gubun[0];
                                    var qa_title = gubun[1];
                                    var bgcolor = color[key];
                                    var qa_data = parseFloat(eval("returnData[" + i + "].QA_" + qa_code));
                                    var per = Math.ceil((qa_data / returnData[0].TOTAL_CNT * 80), 0);
                                    // var qa_data_per = parseFloat(eval("returnData["+i+"].QA_PER"+qa_code));
                                    console.log(per);
                                    table += "<table class='table-bordered'>";
                                    table += "<tr>";
                                    if (per == 0) {
                                        table += "<td colspan='2' class='text-left' style='font-size:11px; border-color: #ffffff; border-left-color: " + bgcolor + "' >" + qa_title + "(" + qa_data + "명)</td>";
                                    } else {
                                        //table += "<td class='text-left text-white' width='" + per + "%' style='font-size:11px; padding:5px 10px; background-color:" + bgcolor + ";'></td>";
                                        //table += "<td class='text-left' style='font-size:11px; border-color: #ffffff'>" + qa_title + " (" + qa_data + "명)</td>";
                                        table += "<td class='text-left text-white'><div style='width:" + per + "%; font-size:11px; padding:5px 10px; background-color:" + bgcolor + ";'></div><p>" + qa_title + " (" + qa_data + "명)</p></td>";
                                    }
                                    table += "</tr>";
                                    table += "</table>";

                                });
                                table += "</td></tr>";

                                if (i == returnData.length - 1) {
                                    $("#data_" + returnData[i].Q_CODE).html(table);
                                    $("#chart_" + returnData[i].Q_CODE).hide();
                                }
                            }


                        }

                        if(module_type == "T") {
                            var table = "";
                            var brand_code = "";
                            var col = 1;

                            var maxArray = [];
                            var maxArrayCode = [];
                            for (var i = 0; i < returnData.length; i++) {


                            table += "<div style='font-size:11px; padding:5px 10px;'><span style='font-size:12px; color:red; padding-right:10px;display:none;'>★</span></div>";
                            table += "<div class='col-xs-9 push-5-t' style='height:300px;'>서술형</div>\n";

                            table += "<div class='col-xs-12 push-5-t' style='height:2px; background-color: #f1f1f1;'>&nbsp;</div>";



                                if (i == returnData.length - 1) {
                                    $("#data_" + returnData[i].Q_CODE).hide();
                                    $("#chart_" + returnData[i].Q_CODE).hide();
                                    $("#cloudText_" + returnData[i].Q_CODE).html(table);
                                }

                            }


                            console.log(maxArray);
                            console.log(maxArrayCode);


                        }

                        break;

                }
            },
            error:function(e){
                alert(e.responseText);
            }
        });
        // common.ajax.send("/statistics/groupData", json);
        // common.ajax.return = function(returnData) {





       //}

    });
});