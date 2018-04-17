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
    'rgba(10, 50, 50, 0.5)'
];

$(function() {
    var campaign_code = $("#campaign_code").val();
    var group_code = $("#group_code").val();
    var quest_num = $("#quest_num").val();
    $(".chartList").each(function() {
        var id = $(this).attr("id");
        var q_code = id;
        var question_type = $(this).attr("question_type");

        var json = {
            campaign_code : campaign_code
            ,group_code : group_code
            ,q_code : id
            ,quest_num : quest_num

        };
        console.log(json);


        common.ajax.send("/statistics/groupData", json);
        common.ajax.return = function(returnData) {
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
                    table += "<div style='width:50px;background-color:#3272f4;color:#fff;float:right;margin-left:5px;'>7점</div>";
                    table += "<div style='width:50px;background-color:#4c9ba5;color:#fff;float:right;margin-left:5px;'>6점</div>";
                    table += "<div style='width:50px;background-color:#a2b9bf;color:#fff;float:right;margin-left:5px;'>5점</div>";
                    table += "<div style='width:50px;background-color:#bfa6bc;color:#fff;float:right;margin-left:5px;'>4점</div>";
                    table += "<div style='width:50px;background-color:#c69671;color:#fff;float:right;margin-left:5px;'>3점</div>";
                    table += "<div style='width:50px;background-color:#f7b885;color:#fff;float:right;margin-left:5px;'>2점</div>";
                    table += "<div style='width:50px;background-color:#f19253;color:#fff;float:right;'>1점</div>";
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

                        table += "<td style='border:1px solid #f1f1f1;' class='text-center'>";
                        table += "<table width='"+returnData[i].TOTAL_PER2*1.5+"%'>";
                        table += "<tr>";
                        table += "<td width='"+Math.round(returnData[i].QA1_DATA_PER*1.5)+"%' class='text-center' style='background-color:#f19253;color:#fff;font-size:3px;padding:5px 0px;'>"+returnData[i].QA1_DATA_PER+"%</td>";
                        table += "<td width='"+Math.round(returnData[i].QA2_DATA_PER*1.5)+"%' class='text-center' style='background-color:#f7b885;color:#fff;font-size:3px;padding:5px 0px;'>"+returnData[i].QA2_DATA_PER+"%</td>";
                        table += "<td width='"+Math.round(returnData[i].QA3_DATA_PER*1.5)+"%' class='text-center' style='background-color:#c69671;color:#fff;font-size:3px;padding:5px 0px;'>"+returnData[i].QA3_DATA_PER+"%</td>";
                        table += "<td width='"+Math.round(returnData[i].QA4_DATA_PER*1.5)+"%' class='text-center' style='background-color:#bfa6bc;color:#fff;font-size:3px;padding:5px 0px;'>"+returnData[i].QA4_DATA_PER+"%</td>";
                        table += "<td width='"+Math.round(returnData[i].QA5_DATA_PER*1.5)+"%' class='text-center' style='background-color:#a2b9bf;color:#fff;font-size:3px;padding:5px 0px;'>"+returnData[i].QA5_DATA_PER+"%</td>";
                        table += "<td width='"+Math.round(returnData[i].QA6_DATA_PER*1.5)+"%' class='text-center' style='background-color:#4c9ba5;color:#fff;font-size:3px;padding:5px 0px;'>"+returnData[i].QA6_DATA_PER+"%</td>";
                        table += "<td width='"+Math.round(returnData[i].QA7_DATA_PER*1.5)+"%' class='text-center' style='background-color:#3272f4;color:#fff;font-size:3px;padding:5px 0px;'>"+returnData[i].QA7_DATA_PER+"%</td>";
                        table += "</tr>";
                        table += "</table>";
                        table += "</td>";
                        table += "<td class='text-center' width='5%' style='font-size:11px;'>"+returnData[i].TOTAL_AVG+"</td>"
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
                    var dataChart = [];
                    var labels = [];
                    var filed_labels = [];
                    var dataSet = [];

                    var qaTitle = [];
                    var dataTotal = [];
                    var background = [];




                    for(var i = 0; i<returnData.length; i++) {
                        var temp = returnData[i].QA_TITLE_KO.split(",");
                        if(i == 0) {
                            for(var j = 0; j<temp.length; j++) {
                                filed_labels.push(temp[j]);
                                dataSet.push({labels:temp[j]});
                            }
                        }

                        var dataValue = "";
                        for(var k = 0; k<temp.length; k++) {
                            var num = 1 + k;
                            var data = [];
                            var per = Math.round(((eval("returnData[i].QA_"+num)) / returnData[i].TOTAL_CNT) * 100,0);
                            //console.log(eval("returnData[i].QA_"+num) +  "///" + num +  "///" + returnData[i].TOTAL_CNT + "///" + per + "///" + dataValue);
                            num++;


                            if(dataValue == "") {
                                dataValue = String(per);
                            } else {
                                dataValue += ","+String(per);
                            }

                        }

                        dataTotal.push(dataValue);
                    }


                    var colorNames = Object.keys(chartColors);
                    var dataSetG = [];
                    filed_labels.forEach(function(v, i) {
                        background.push("color(window.chartColors.red).alpha(0.5).rgbString()");
                        if(dataTotal[i] == undefined) {
                            dataSetG.push({
                                label: v
                                ,borderWidth : 1
                                ,data: []
                                ,backgroundColor: chartColors[i]
                            });
                        } else {
                            var dataObject = dataTotal[i].split(",");
                            var dataValue = [];

                            dataObject.forEach(function(value, k) {
                                dataValue.push(parseInt(value));
                            });

                            dataSetG.push(
                                {
                                    label: v
                                    ,borderWidth: 1
                                    ,data: dataObject
                                    ,backgroundColor: chartColors[i]
                                }
                            )

                        }
                    });







                    for(var i = 0; i<returnData.length; i++) {
                        labels.push(returnData[i].BRAND_NAME_KO);



                        dataBackground.push("rgba(218, 66, 17, 1)");



                        if(i == returnData.length -1) {
                            var dataSet = [];

                            new Chart(document.getElementById("chart_"+returnData[i].Q_CODE).getContext('2d'), {
                                type: 'horizontalBar',
                                data: {
                                    labels: labels
                                    ,datasets: dataSetG
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
                    };
                    break;
                /************ 양자택일형 *************/
                case "4":



                    var labels = [];
                    var dataValue1 = [];
                    var dataValue2 = [];
                    var dataBackground1 = [];
                    var dataBackground2 = [];
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
                                labels.push(qa_title_temp[j]);

                            }

                        }
                        label.push(returnData[i].BRAND_NAME_KO);
                        dataValue1.push(Math.round(returnData[i].QA1_PER));
                        dataValue2.push(Math.round(returnData[i].QA2_PER));
                        dataBackground1.push("#FF6384");
                        dataBackground2.push("#36A2EB");

                        var table = "";

                        table += "<tr>";
                        table += "<td width='60%' style='font-size:14px;font-weight: bold;'>총참여자수 : ("+returnData[0].TOTAL_CNT+"명)</td>";
                        table += "<td>";
                        if(parseInt(returnData[i].QA1_DATA) >= parseInt(returnData[i].QA2_DATA)) {
                            table += "<span style='font-size:15px; color:red;'>★</span>";
                        }
                        table += "<span style='font-size:12px;font-weight: bold;'>"+labels[0]+":</span>";
                        table += "<span style='padding-left: 3px; padding-right: 10px;'>"+returnData[i].QA1_DATA+"명</span>";
                        if(parseInt(returnData[i].QA1_DATA) < parseInt(returnData[i].QA2_DATA)) {
                            table += "<span style='font-size:15px; color:red;'>★</span>";
                        }
                        table += "<span style='font-size:12px;font-weight: bold;'> "+labels[1]+":</span>";
                        table += "<span style='padding-left: 3px;'>"+returnData[i].QA2_DATA+"명</span></td>";


                        if(i == returnData.length -1) {

                                new Chart(document.getElementById("chart_"+returnData[i].Q_CODE).getContext('2d'), {
                                type: 'doughnut',

                                data:{
                                    datasets:[{
                                        data:[dataValue1,dataValue2],

                                        backgroundColor: [dataBackground1, dataBackground2],
                                        hoverBackgroundColor: [
                                            "#e14969",
                                            "#2687c8"
                                        ],
                                    }],
                                    labels:[labels[0],labels[1]]
                                },
                                options: {
                                    responsive: true,
                                    title:{
                                        display: true
                                    }
                                }

                            });


                                $("#data_"+returnData[i].Q_CODE).html(table);



                        }
                    }
                    break;

                /************* 복수선택형 ************/
                case "5":
                    var dataChart = [];
                    var labels = [];
                    var filed_labels = [];
                    var dataSet = [];
                    /*
                    var temp = {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Dataset 1',
                                borderWidth: 1,
                                data: [
                                    10,
                                    20,
                                    30,
                                    40,
                                    50,
                                    60,
                                    70
                                ]
                            }, {
                                label: 'Dataset 2',
                                data: [
                                    80,
                                    70,
                                    60,
                                    50,
                                    40,
                                    30,
                                    20
                                ]
                            }
                            ]
                    };
                    console.log(temp);
                    */
                    var qaTitle = [];
                    var dataTotal = [];
                    var background = [];




                    for(var i = 0; i<returnData.length; i++) {
                        var temp = returnData[i].QA_TITLE_KO.split(",");
                        if(i == 0) {
                            for(var j = 0; j<temp.length; j++) {
                                filed_labels.push(temp[j]);
                                dataSet.push({labels:temp[j]});
                            }
                        }

                        var dataValue = "";
                        for(var k = 0; k<temp.length; k++) {
                            var num = 1 + k;
                            var data = [];
                            var per = Math.round(((eval("returnData[i].QA_"+num)) / returnData[i].TOTAL_CNT) * 100,0);
                            //console.log(eval("returnData[i].QA_"+num) +  "///" + num +  "///" + returnData[i].TOTAL_CNT + "///" + per + "///" + dataValue);
                            num++;


                            if(dataValue == "") {
                                dataValue = String(per);
                            } else {
                                dataValue += ","+String(per);
                            }

                        }

                        dataTotal.push(dataValue);
                    }


                    var colorNames = Object.keys(chartColors);
                    var dataSetG = [];
                    filed_labels.forEach(function(v, i) {
                        background.push("color(window.chartColors.red).alpha(0.5).rgbString()");
                        if(dataTotal[i] == undefined) {
                            dataSetG.push({
                                label: v
                                ,borderWidth : 1
                                ,data: []
                                ,backgroundColor: chartColors[i]
                            });
                        } else {
                            var dataObject = dataTotal[i].split(",");
                            var dataValue = [];

                            dataObject.forEach(function(value, k) {
                                dataValue.push(parseInt(value));
                            });

                            dataSetG.push(
                                {
                                    label: v
                                    ,borderWidth: 1
                                    ,data: dataObject
                                    ,backgroundColor: chartColors[i]
                                }
                            )

                        }
                    });







                    for(var i = 0; i<returnData.length; i++) {
                        labels.push(returnData[i].BRAND_NAME_KO);



                        dataBackground.push("rgba(218, 66, 17, 1)");



                        if(i == returnData.length -1) {
                            var dataSet = [];
                            var height = returnData.length * 25;
                            console.log(height);

                            $("#chart_"+returnData[i].Q_CODE).css({height:height});
                            new Chart(document.getElementById("chart_"+returnData[i].Q_CODE).getContext('2d'), {
                                type: 'horizontalBar',
                                data: {
                                    labels: labels
                                    ,datasets: dataSetG
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

                /************* 단일선택형 ************/

                case "6":


                    var dataChart = [];
                    var labels = [];
                    var filed_labels = [];
                    var dataSet = [];

                    var qaTitle = [];
                    var dataTotal = [];
                    var background = [];




                    for(var i = 0; i<returnData.length; i++) {
                        var temp = returnData[i].QA_TITLE_KO.split(",");
                        if(i == 0) {
                            for(var j = 0; j<temp.length; j++) {
                                filed_labels.push(temp[j]);
                                dataSet.push({labels:temp[j]});
                            }
                        }

                        var dataValue = "";
                        for(var k = 0; k<temp.length; k++) {
                            var num = 1 + k;
                            var data = [];
                            var per = Math.round(((eval("returnData[i].QA_"+num)) / returnData[i].TOTAL_CNT) * 100,0);
                                //console.log(eval("returnData[i].QA_"+num) +  "///" + num +  "///" + returnData[i].TOTAL_CNT + "///" + per + "///" + dataValue);
                            num++;


                            if(dataValue == "") {
                                dataValue = String(per);
                            } else {
                                dataValue += ","+String(per);
                            }

                        }

                        dataTotal.push(dataValue);
                    }


                    var colorNames = Object.keys(chartColors);
                    var dataSetG = [];
                    filed_labels.forEach(function(v, i) {
                        background.push("color(window.chartColors.red).alpha(0.5).rgbString()");
                        if(dataTotal[i] == undefined) {
                            dataSetG.push({
                                label: v
                                ,borderWidth : 1
                                ,data: []
                                ,backgroundColor: chartColors[i]
                            });
                        } else {
                            var dataObject = dataTotal[i].split(",");
                            var dataValue = [];

                            dataObject.forEach(function(value, k) {
                                dataValue.push(parseInt(value));
                            });

                            dataSetG.push(
                                {
                                    label: v
                                    ,borderWidth: 1
                                    ,data: dataObject
                                    ,backgroundColor: chartColors[i]
                                }
                            )

                        }
                    });







                    for(var i = 0; i<returnData.length; i++) {
                        labels.push(returnData[i].BRAND_NAME_KO);



                        dataBackground.push("rgba(218, 66, 17, 1)");



                        if(i == returnData.length -1) {
                            var dataSet = [];

                            new Chart(document.getElementById("chart_"+returnData[i].Q_CODE).getContext('2d'), {
                                type: 'horizontalBar',
                                data: {
                                    labels: labels
                                    ,datasets: dataSetG
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


            }




        }

    });
});