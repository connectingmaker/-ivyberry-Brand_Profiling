$(function() {
    var campaign_code = $("#campaign_code").val();
    var group_code = $("#group_code").val();
    $(".chartList").each(function() {
        var id = $(this).attr("id");
        var question_type = $(this).attr("question_type");

        var json = {
            campaign_code : campaign_code
            ,group_code : group_code
            ,q_code : id
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
            console.log(question_type);
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
                    var template = "";
                    for(var i = 0; i<returnData.length; i++) {
                        if(i == 0) {
                            var qatitle = returnData[i].QA_TITLE_KO;
                            var qatitleTemp = qatitle.split(",");
                            template = "<tr>";
                            template += "<th>브랜드</th>";
                            for(var j = 0; j<qatitleTemp.length; j++) {
                                template += "<th>"+qatitleTemp[j]+"</th>";
                            }


                        }
                    }

                    $("#data_"+id).html(template);
                    break;


            }




        }

    });
});