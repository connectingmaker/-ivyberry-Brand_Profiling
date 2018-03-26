var express = require('express');
var router = express.Router();
var moment = require('moment');


var mquestion = require("../model/mquestion");
var mstatistics = require("../model/mstatistics");
var mcampaign = require("../model/mcampaign");

var pagination = require('pagination');
var nodeExcel = require('excel-export');





var mysql_dbc = require('../module/db_con')();
var headerTitle = [];
var rawDataArray = [];
var excelData = [];
var excelRow = [];

// var conf = {}
// conf.name = rows[i].DETAIL_BRAND_CODE;
// conf.cols = [{
//     caption:'string',
//     type:'string'
// },{
//     caption:'date',
//     type:'date',
//     beforeCellWrite:function(){
//         var originDate = new Date(Date.UTC(1899,11,30));
//         return function(row, cellData, eOpt){
//             if (eOpt.rowNum%2){
//                 eOpt.styleIndex = 1;
//             }
//             else{
//                 eOpt.styleIndex = 2;
//             }
//             if (cellData === null){
//                 eOpt.cellType = 'string';
//                 return 'N/A';
//             } else
//                 return (cellData - originDate) / (24 * 60 * 60 * 1000);
//         }
//     }()
// },{
//     caption:'bool',
//     type:'bool'
// },{
//     caption:'number',
//     type:'number'
// }];
// conf.rows = [
//     ['pi', new Date(Date.UTC(2013, 4, 1)), true, 3.14],
//     ["e", new Date(2012, 4, 1), false, 2.7182],
//     ["M&M<>'", new Date(Date.UTC(2013, 6, 9)), false, 1.61803],
//     ["null date", null, true, 1.414]
// ];


function getValue(obj, key) {
    var objects = [];
    var string = "";
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getValue(obj[i], key));
        } else if (i == key) {
            //objects.push(obj[i]);
            string = obj[i];
        }
    }
    return string;
}


function getGroupRowData(campaign_code, quest_num, group_q, brand_code, i, ids, cb) {
    var connection = mysql_dbc.init();

    var query = " call sp_CAMPAIGN_RAWDATA_GROUP(?, ?, ?, ?)";
    var params = [];
    params.push(campaign_code);
    params.push(quest_num);
    params.push(group_q);
    params.push(brand_code);





        connection.query(query, params, function (err, results, fields) {
            console.log(results);
            headerTitle = [];
            try {
                for (var k = 0; k < fields[0].length; k++) {
                    var header = {caption: fields[0][k].name, type: 'string'};
                    //console.log(getValues(results[0],fields[0][k].name));
                    headerTitle.push(header);
                }


                excelData[i].cols = headerTitle;
                excelRow[i] = [];


                var dataList = [];
                for (var k = 0; k < results[0].length; k++) {
                    var dataRow = new Array;
                    for (var num = 0; num < fields[0].length; num++) {
                        if (getValue(results[0][k], fields[0][num].name) == "" || getValue(results[0][k], fields[0][num].name) == null) {
                            dataRow.push("");
                        } else {
                            //if(results[0][k].SUM
                            dataRow.push(getValue(results[0][k], fields[0][num].name).toString());
                        }


                    }
                    dataList.push(dataRow);
                }



                excelRow[i] = dataList;
                excelData[i].rows = excelRow[i];

                rawDataArray.push(results[0]);
                if (i == ids) {
                    connection.end();
                    cb(rawDataArray);
                }
            } catch (e) {
                if (i == ids) {
                    connection.end();
                    cb();
                }
                //cb();
            }
        });
}

function getGroupQuestionRowData(campaign_code, quest_num, group_q, q_code, i, ids, cb)
{
    var connection = mysql_dbc.init();

    var query = " call sp_CAMPAIGN_RAWDATA_GROUP_QUESTION(?, ?, ?, ?)";
    var params = [];
    params.push(campaign_code);
    params.push(quest_num);
    params.push(group_q);
    params.push(q_code);


    var totalRow = new Array;
    var totalRealData = new Array;

    connection.query(query, params, function (err, results, fields) {
        headerTitle = [];
        try {
            for (var k = 0; k < fields[0].length; k++) {
                var header = {caption: fields[0][k].name, type: 'string'};
                //console.log(getValues(results[0],fields[0][k].name));
                headerTitle.push(header);
                if(k == 0) {
                    totalRow.push("합계");
                } else {
                    totalRow.push("");
                }

                totalRealData.push(0);

            }


            excelData[i].cols = headerTitle;
            excelRow[i] = [];

            var dataList = [];

            for (var k = 0; k < results[0].length; k++) {
                var dataRow = new Array;
                for (var num = 0; num < fields[0].length; num++) {
                    if (getValue(results[0][k], fields[0][num].name) == "" || getValue(results[0][k], fields[0][num].name) == null) {
                        dataRow.push("");
                    } else {
                        if(num > 9) {
                            if(num == (fields[0].length-1)) {
                                if(getValue(results[0][k], fields[0][num].name).toString() == "") {
                                    dataRow.push("0");
                                } else {
                                    dataRow.push(getValue(results[0][k], fields[0][num].name).toString());
                                }


                            } else {
                                if (parseInt(results[0][k].SUM) > 3) {
                                    dataRow.push("");
                                } else {
                                    dataRow.push("1");

                                    totalRealData[num] = totalRealData[num] + 1;

                                }
                            }

                        } else {
                            if (getValue(results[0][k], fields[0][num].name) == "" || getValue(results[0][k], fields[0][num].name) == null) {
                                dataRow.push("");
                                totalRealData[num] = totalRealData[num] + 0;
                            } else {
                                //if(results[0][k].SUM
                                dataRow.push(getValue(results[0][k], fields[0][num].name).toString());


                                totalRealData[num] = totalRealData[num] + parseInt(getValue(results[0][k], fields[0][num].name).toString());
                            }


                        }

                    }


                }

                dataList.push(dataRow);

            }


            for(var k = 0; k<totalRow.length; k++) {
                if(k > 10) {
                    totalRow[k] = totalRealData[k].toString();
                }
            }


            dataList.push(totalRow);

            //dataList.push(totalRow);

            excelRow[i] = dataList;
            excelData[i].rows = excelRow[i];

            rawDataArray.push(results[0]);
            if (i == ids) {
                connection.end();
                cb(rawDataArray);
            }
        } catch (e) {
            if (i == ids) {
                connection.end();
                cb();
            }
            //cb();
        }
    });
}

function getGroupBrandRowData(campaign_code, quest_num, group_q, brand_code, i, ids, cb)
{
    var connection = mysql_dbc.init();

    var query = " call sp_CAMPAIGN_RAWDATA_GROUP_BRAND(?, ?, ?, ?)";
    var params = [];
    params.push(campaign_code);
    params.push(quest_num);
    params.push(group_q);
    params.push(brand_code);


    var totalRow = new Array;
    var totalRealData = new Array;

    connection.query(query, params, function (err, results, fields) {
        headerTitle = [];
        try {
            for (var k = 0; k < fields[0].length; k++) {
                var header = {caption: fields[0][k].name, type: 'string'};
                //console.log(getValues(results[0],fields[0][k].name));
                headerTitle.push(header);
                if(k == 0) {
                    totalRow.push("합계");
                } else {
                    totalRow.push("");
                }

                totalRealData.push(0);

            }


            excelData[i].cols = headerTitle;
            excelRow[i] = [];

            var dataList = [];

            for (var k = 0; k < results[0].length; k++) {
                var dataRow = new Array;
                for (var num = 0; num < fields[0].length; num++) {
                    if (getValue(results[0][k], fields[0][num].name) == "" || getValue(results[0][k], fields[0][num].name) == null) {
                        dataRow.push("");
                    } else {
                        if(num > 10) {
                            if(num == (fields[0].length-1)) {
                                if(getValue(results[0][k], fields[0][num].name).toString() == "") {
                                    dataRow.push("0");
                                } else {
                                    dataRow.push(getValue(results[0][k], fields[0][num].name).toString());
                                }


                            } else {
                                if (results[0][k].SUM > 3) {
                                    dataRow.push("");
                                } else {
                                    dataRow.push("1");

                                    totalRealData[num] = totalRealData[num] + 1;

                                }
                            }

                        } else {
                            if (getValue(results[0][k], fields[0][num].name) == "" || getValue(results[0][k], fields[0][num].name) == null) {
                                dataRow.push("");
                                totalRealData[num] = totalRealData[num] + 0;
                            } else {
                                //if(results[0][k].SUM
                                dataRow.push(getValue(results[0][k], fields[0][num].name).toString());


                                totalRealData[num] = totalRealData[num] + parseInt(getValue(results[0][k], fields[0][num].name).toString());
                            }


                        }

                    }


                }

                dataList.push(dataRow);

            }


            for(var k = 0; k<totalRow.length; k++) {
                if(k > 10) {
                    totalRow[k] = totalRealData[k].toString();
                }
            }


            dataList.push(totalRow);

            //dataList.push(totalRow);

            excelRow[i] = dataList;
            excelData[i].rows = excelRow[i];

            rawDataArray.push(results[0]);
            if (i == ids) {
                connection.end();
                cb(rawDataArray);
            }
        } catch (e) {
            if (i == ids) {
                connection.end();
                cb();
            }
            //cb();
        }
    });
}


router.get("/campaign", function(req, res) {

    var page = req.query.page;
    if(page == undefined) {
        page = 1;
    }

    var searchName = req.query.searchName;
    if(searchName == undefined) {
        searchName = "";
    }

    var total = 0;
    var start = 0;
    var viewCnt = 40;


    mcampaign.sp_CAMPAIGN_LIST_END_CNT(searchName,function(err,count_rows) {
        var total = count_rows[0][0].TOTAL;

        start = viewCnt * (page - 1);

        var boostrapPaginator = new pagination.TemplatePaginator({
            prelink:'/users/list', current: page, rowsPerPage: 40,
            totalResult: total, slashSeparator: true,
            template: function(result) {
                var i, len, prelink;
                var html = '<div><ul class="pagination">';
                if(result.pageCount < 2) {
                    html += '</ul></div>';
                    return html;
                }
                prelink = this.preparePreLink(result.prelink);
                if(result.previous) {
                    html += '<li><a href="./?page=' + result.previous + '&searchName='+searchName+'">' + this.options.translator('PREVIOUS') + '</a></li>';
                }
                if(result.range.length) {
                    for( i = 0, len = result.range.length; i < len; i++) {
                        if(result.range[i] === result.current) {
                            html += '<li class="active"><a href="?page=' + result.range[i] + '&searchName='+searchName+'">' + result.range[i] + '</a></li>';
                        } else {
                            html += '<li><a href="?page=' + result.range[i] + '&searchName='+searchName+'">' + result.range[i] + '</a></li>';
                        }
                    }
                }
                if(result.next) {
                    html += '<li><a href="?page=' + result.next + '&searchName='+searchName+'" class="paginator-next">' + this.options.translator('NEXT') + '</a></li>';
                }
                html += '</ul></div>';
                return html;
            }
        });


        mcampaign.sp_CAMPAIGN_LIST_END(start, searchName, function(err,rows) {
            if(err) {
                console.log(err);
                throw err;
            }
            var campaignList = rows[0];
            res.render('statistics/campaign', { moment: moment, campaignList: campaignList, pageHtml: boostrapPaginator });
        });
    });


});

router.post('/campaignData', function(req, res) {
    var campaign_code = req.body.campaign_code;
    console.log(campaign_code);

    mcampaign.sp_CAMPAIGN_LIST_END_DATA(campaign_code, function(err,rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        var data = rows[0];
        res.send(data);
    });
});

router.get('/group/:code/:quest_num', function(req, res, next) {
    var campaign_code = req.params.code;
    var quest_num = req.params.quest_num;
    mstatistics.sp_STATISTICS_QUESTION(campaign_code, quest_num, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        var groupList = rows[0];
        res.render('statistics/group', { campaign_code: campaign_code, groupList: groupList });
    })

});

router.get("/groupData/:campaign_code/:group_code/:quest_num", function(req, res) {
    var campaign_code = req.params.campaign_code;
    var group_code = req.params.group_code;
    var quest_num = req.params.quest_num;



    mstatistics.sp_STATISTICS_QUESTION_GROUP_LIST(campaign_code, group_code, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        var data = rows[0];




        res.render("statistics/groupData", {data : data, campaign_code:campaign_code, group_code:group_code, quest_num: quest_num });
    });

});

router.post("/groupData", function(req, res) {
    var campaign_code = req.body.campaign_code;
    var group_code = req.body.group_code;
    var q_code = req.body.q_code;
    var quest_num = req.body.quest_num;

    console.log(campaign_code + "///" + group_code + "///" + q_code + "///" + quest_num);

    mstatistics.sp_STATISTICS_QUESTION_GROUP_DATA_20180315(campaign_code, group_code, q_code, quest_num, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        var data = rows[0];
        console.log(JSON.stringify(data));

        res.send(data);
    });

});
/*
router.get("/group/:code", function(req, res) {
    var group_code = req.params.code;
    mstatistics.sp_STATISTICS_QUESTION(function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        var groupList = rows[0];
        mquestion.getQuestionList(group_code, function(err, rows) {
            if(err) {
                console.log(err);
                throw err;
            }
            var qList = rows;
            for(var i = 0; i<qList.length; i++) {
                qList[i].qaData = {
                    "1111" : "1111"
                }
            }

            console.log(qList);
            res.render('statistics/group', { groupList: groupList, qList : qList });

        });

    })
});
*/



router.get("/group/rawdata", function(req, res) {
    var campaign_code = req.query.campaign_code;
    var quest_num = req.query.quest_num;
    var group_q = req.query.group_q;
    var endType = "S";

    rawDataArray = [];
    excelData = [];
    mstatistics.getBrandList(campaign_code, function(err, rows) {
        if(err) {
            console.log(err);
        }

        var dataArray = [];
        var endtype = "S";

        for(var i = 0; i<rows.length; i++) {
            var conf = {}
            conf.name = rows[i].DETAIL_BRAND_CODE;
            //conf.name = "[한글]"+i.toString();
            conf.cols = {};
            excelData.push(conf);

            var connection = mysql_dbc.init();


            var query = " call sp_CAMPAIGN_RAWDATA_GROUP(?, ?, ?, ?)";
            var params = [];
            params.push(campaign_code);
            params.push(quest_num);
            params.push(group_q);
            params.push(rows[i].DETAIL_BRAND_CODE);




                getGroupRowData(campaign_code, quest_num, group_q, rows[i].DETAIL_BRAND_CODE, i, rows.length-1, function(data) {

                    setTimeout(function() {
                        if(excelRow.length == 0) {
                            res.send("관리자에게 문의해주세요.");
                        } else {
                            var result = nodeExcel.execute(excelData);
                            res.setHeader("Content-Type", "text/html;charset=UTF-8")
                            res.setHeader('Content-Type', 'application/vnd.openxmlformats');
                            res.setHeader("Content-Disposition", "attachment; filename=" + campaign_code + "_" + quest_num + "_RAWDATA.xlsx");
                            res.end(result, 'binary');
                        }

                    }, 1000);


                });
            connection.end();
        }

    });
});


router.get("/group/brandrawdata", function(req, res) {
    var campaign_code = req.query.campaign_code;
    var quest_num = req.query.quest_num;
    var group_q = req.query.group_q;
    var endType = "S";

    rawDataArray = [];
    excelData = [];
    mstatistics.getBrandList(campaign_code, function(err, rows) {
        if(err) {
            console.log(err);
        }

        var dataArray = [];
        var endtype = "S";

        for(var i = 0; i<rows.length; i++) {
            var conf = {}
            conf.name = rows[i].DETAIL_BRAND_CODE;
            //conf.name = "[한글]"+i.toString();
            conf.cols = {};
            excelData.push(conf);

            var connection = mysql_dbc.init();


            var query = " call sp_CAMPAIGN_RAWDATA_GROUP(?, ?, ?, ?)";
            var params = [];
            params.push(campaign_code);
            params.push(quest_num);
            params.push(group_q);
            params.push(rows[i].DETAIL_BRAND_CODE);




            getGroupBrandRowData(campaign_code, quest_num, group_q, rows[i].DETAIL_BRAND_CODE, i, rows.length-1, function(data) {

                setTimeout(function() {
                    if(excelRow.length == 0) {
                        res.send("관리자에게 문의해주세요.");
                    } else {

                        var result = nodeExcel.execute(excelData);
                        res.setHeader("Content-Type", "text/html;charset=UTF-8")
                        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
                        res.setHeader("Content-Disposition", "attachment; filename=" + campaign_code + "_" + quest_num + "_BRAND_RAWDATA.xlsx");
                        res.end(result, 'binary');

                    }

                }, 5000);


            });
            connection.end();
        }

    });
});

router.get("/group/questionrawdata", function(req, res) {
    var campaign_code = req.query.campaign_code;
    var quest_num = req.query.quest_num;
    var group_q = req.query.group_q;

    rawDataArray = [];
    excelData = [];
    mstatistics.getQuestionList(group_q, function(err, rows) {
        if(err) {
            console.log(err);
        }

        var dataArray = [];
        var endtype = "S";

        for(var i = 0; i<rows.length; i++) {
            var conf = {}
            conf.name = rows[i].Q_CODE.toString();
            //conf.name = "[한글]"+i.toString();
            conf.cols = {};
            excelData.push(conf);

            var connection = mysql_dbc.init();


            var query = " call sp_CAMPAIGN_RAWDATA_QUESTION(?, ?, ?, ?)";
            var params = [];
            params.push(campaign_code);
            params.push(quest_num);
            params.push(group_q);
            params.push(rows[i].Q_CODE);




            getGroupQuestionRowData(campaign_code, quest_num, group_q, rows[i].Q_CODE, i, rows.length-1, function(data) {

                setTimeout(function() {
                    if(excelRow.length == 0) {
                        res.send("관리자에게 문의해주세요.");
                    } else {

                        var result = nodeExcel.execute(excelData);
                        res.setHeader("Content-Type", "text/html;charset=UTF-8")
                        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
                        res.setHeader("Content-Disposition", "attachment; filename=" + campaign_code + "_" + quest_num + "_QUESTION_RAWDATA.xlsx");
                        res.end(result, 'binary');

                    }

                }, 5000);


            });
            connection.end();
        }
    });
});

router.get("/total/:code", function(req, res) {
    var campaign_code = req.params.code;

    res.render("statistics/total");
});



module.exports = router;
