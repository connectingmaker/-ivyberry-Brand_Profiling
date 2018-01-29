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
        var question_type = $(this).attr("question_type");

        var json = {
            campaign_code : campaign_code
            ,group_code : group_code
            ,q_code : id
            ,quest_num : quest_num

        };


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

                /************* 척도형 ************/
                case "1":
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
                        dataBackground1.push("rgba(218, 66, 17, 1)");
                        dataBackground2.push("rgba(218, 66, 17, 0.5)");

                        if(i == returnData.length -1) {
                            new Chart(document.getElementById("chart_"+returnData[i].Q_CODE).getContext('2d'), {
                                type: 'horizontalBar',
                                data: {
                                    labels: label,
                                    datasets: [
                                        {
                                            label: labels[0],
                                            data: dataValue1,
                                            backgroundColor: dataBackground1,
                                            borderColor: [
                                                'rgba(255,99,132,1)'
                                            ],
                                            borderWidth: 1
                                        }
                                        ,{
                                            label: labels[1],
                                            data: dataValue2,
                                            backgroundColor: dataBackground2,
                                            borderColor: [
                                                'rgba(255,99,132,0.5)'
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