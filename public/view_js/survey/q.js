var brandCnt = $("#brandCnt").val();
var nextBrand = 0;
var subTextBrand = false;
var imgSelect = 0;
var qaData=[];

var lang = $("#lang").val();

function submit() {
    var q_min = $("#q_min").val();
    var q_max = $("#q_max").val();
    switch($("#q_type").val()) {
        case "1":
            var checked = 0;
            qaData = [];
            $(".imgBox_on").each(function() {
                var category_code = $(this).attr("category_code");
                var qa_code = $(this).attr("qa_code");
                var code_gubun = $(this).attr("code_gubun");
                var json = {
                    category_code : category_code
                    ,code_gubun : code_gubun
                    ,qa_code : qa_code
                    ,qa_text : ""
                }


                qaData.push(json);

            });

            if($("#NotQuestion").is(":checked") == true) {
                var json = {
                    category_code : ""
                    ,code_gubun : ""
                    ,qa_code : "99"
                    ,qa_text : ""
                }

                qaData.push(json);
            } else {
                if(q_min > qaData.length) {
                    // alert("최소 "+q_min+"개를 선택해주세요.");
                    if(lang =='ko'){
                        bootbox.alert("최소 "+q_min+"개를 선택해주세요.");
                    }
                    if(lang =='en'){
                        bootbox.alert("Please choose at least  "+q_min+".");
                    }
                    if(lang =='zh'){
                        bootbox.alert("請至少選擇 "+q_min+"個.");
                    }

                    return;
                }

                if(q_max < qaData.length) {
                    // alert("최대 "+q_max+"개를 선택해주세요.");
                    if(lang =='ko'){
                        bootbox.alert("최대 "+q_max+"개를 선택해주세요.");
                    }
                    if(lang =='en'){
                        bootbox.alert("Please choose up to  "+q_max+".");
                    }
                    if(lang =='zh'){
                        bootbox.alert("請選擇最多 "+q_max+"個.");
                    }
                    return;
                }

            }

            break;


        case "2":
            var checked = 0;
            qaData = [];
            $(".rating_value").each(function() {
                var category_code = $(this).attr("category_code");
                var code_gubun = $(this).attr("code_gubun");
                if($(this).val() != false) {
                    checked++;

                    var json = {
                        category_code : category_code
                        ,code_gubun : code_gubun
                        ,qa_code : $(this).val()
                        ,qa_text : ""
                    }

                    qaData.push(json);
                }
            });


            if(checked != $(".rating_value").length) {
                if(lang =='ko'){
                    bootbox.alert("선택해주세요.");
                }
                if(lang =='en'){
                    bootbox.alert("please select");
                }
                if(lang =='zh'){
                    bootbox.alert("請選擇");
                }

                return;
            }
            break;

        case "3":
            var checked = 0;
            qaData = [];
            $(".qaData").each(function() {
                if($(this).is(":checked") == true) {
                    checked++;

                    var json = {
                        category_code : ""
                        ,code_gubun : ""
                        ,qa_code : $(this).val()
                        ,qa_text : ""
                    }

                    qaData.push(json);
                }
            });

            if(q_min > checked) {
                // alert("최소 "+q_min+"개를 선택해주세요.");
                if(lang =='ko'){
                    bootbox.alert("최소 "+q_min+"개를 선택해주세요.");
                }
                if(lang =='en'){
                    bootbox.alert("Please choose at least  "+q_min+".");
                }
                if(lang =='zh'){
                    bootbox.alert("請至少選擇 "+q_min+"個.");
                }

                return;
            }

            if(q_max < checked) {
                // alert("최대 "+q_max+"개를 선택해주세요.");
                if(lang =='ko'){
                    bootbox.alert("최대 "+q_max+"개를 선택해주세요.");
                }
                if(lang =='en'){
                    bootbox.alert("Please choose up to  "+q_max+".");
                }
                if(lang =='zh'){
                    bootbox.alert("請選擇最多 "+q_max+"個.");
                }

                return;
            }

            break;

        case "4":
            var checked = 0;
            qaData = [];
            $(".qaData").each(function() {
                if($(this).is(":checked") == true) {
                    checked++;

                    var json = {
                        category_code : ""
                        ,code_gubun : ""
                        ,qa_code : $(this).val()
                        ,qa_text : ""
                    }

                    qaData.push(json);
                }
            });

            if(q_min > checked) {
                // alert("최소 "+q_min+"개를 선택해주세요.");
                if(lang =='ko'){
                    bootbox.alert("최소 "+q_min+"개를 선택해주세요.");
                }
                if(lang =='en'){
                    bootbox.alert("Please choose at least  "+q_min+".");
                }
                if(lang =='zh'){
                    bootbox.alert("請至少選擇 "+q_min+"個.");
                }

                return;
            }

            if(q_max < checked) {
                // alert("최대 "+q_max+"개를 선택해주세요.");
                if(lang =='ko'){
                    bootbox.alert("최대 "+q_max+"개를 선택해주세요.");
                }
                if(lang =='en'){
                    bootbox.alert("Please choose up to  "+q_max+".");
                }
                if(lang =='zh'){
                    bootbox.alert("請選擇最多 "+q_max+"個.");
                }

                return;
            }
            break;

        case "5":
            var checked = 0;
            qaData = [];
            $(".imgBox_on").each(function() {
                var category_code = $(this).attr("category_code");
                var qa_code = $(this).attr("qa_code");
                var code_gubun = $(this).attr("code_gubun");

                var json = {
                    category_code : category_code
                    ,code_gubun : code_gubun
                    ,qa_code : qa_code
                    ,qa_text : ""
                }

                qaData.push(json);

                checked++;
            });

            if(q_min > checked) {
                // alert("최소 "+q_min+"개를 선택해주세요.");
                if(lang =='ko'){
                    bootbox.alert("최소 "+q_min+"개를 선택해주세요.");
                }
                if(lang =='en'){
                    bootbox.alert("Please choose at least  "+q_min+".");
                }
                if(lang =='zh'){
                    bootbox.alert("請至少選擇 "+q_min+"個.");
                }

                return;
            }

            if(q_max < checked) {
                // alert("최대 "+q_max+"개를 선택해주세요.");
                if(lang =='ko'){
                    bootbox.alert("최대 "+q_max+"개를 선택해주세요.");
                }
                if(lang =='en'){
                    bootbox.alert("Please choose up to  "+q_max+".");
                }
                if(lang =='zh'){
                    bootbox.alert("請選擇最多 "+q_max+"個.");
                }
                return;
            }
            break;

        case "6":
            var checked = 0;
            qaData = [];
            $(".imgBox_on").each(function() {
                var category_code = $(this).attr("category_code");
                var qa_code = $(this).attr("qa_code");
                var code_gubun = $(this).attr("code_gubun");

                var json = {
                    category_code : category_code
                    ,code_gubun : code_gubun
                    ,qa_code : qa_code
                    ,qa_text : $("#text_"+qa_code+"_"+category_code).val()
                }

                checked++;

                qaData.push(json);

            });

            var checked_false = false;

            $(".textarea").each(function() {
                if($(this).attr("disabled") != "disabled") {
                    if($(this).val() == false) {
                        checked_false = true;
                        $(this).focus();
                        return false;
                    }
                }
            });



            if($("#NotQuestion").is(":checked") == true) {
                var json = {
                    category_code : ""
                    ,code_gubun : ""
                    ,qa_code : "99"
                    ,qa_text : ""
                }

                qaData.push(json);
            } else {

                if(q_min > checked) {
                    // alert("최소 "+q_min+"개를 선택해주세요.");
                    if(lang =='ko'){
                        bootbox.alert("최소 "+q_min+"개를 선택해주세요.");
                    }
                    if(lang =='en'){
                        bootbox.alert("Please choose at least  "+q_min+".");
                    }
                    if(lang =='zh'){
                        bootbox.alert("請至少選擇 "+q_min+"個.");
                    }

                    return;
                }

                if(q_max < checked) {
                    // alert("최대 "+q_max+"개를 선택해주세요.");
                    if(lang =='ko'){
                        bootbox.alert("최대 "+q_max+"개를 선택해주세요.");
                    }
                    if(lang =='en'){
                        bootbox.alert("Please choose up to  "+q_max+".");
                    }
                    if(lang =='zh'){
                        bootbox.alert("請選擇最多 "+q_max+"個.");
                    }

                    return;
                }


                if(checked_false == true) {
                    // alert("내용을 입력해주세요.");
                   // bootbox.alert("내용을 입력해주세요.");
                    if(lang =='ko'){
                        bootbox.alert("내용을 입력해주세요.");
                    }
                    if(lang =='en'){
                        bootbox.alert("Please enter your details.");
                    }
                    if(lang =='zh'){
                        bootbox.alert("請輸入您的詳細信息。");
                    }

                    return;
                }
            }
            break;

        case "9":
            qaData = [];
            break;
    }

    var json = {
        campaign_code : $("#campaign_code").val()
        ,uid : $("#uid").val()
        ,q_code : $("#q_code").val()
        ,qaData : JSON.stringify(qaData)
    }



    common.ajax.type = "POST";
    common.ajax.send('/survey/qProcess', json);
    common.ajax.return = function(data) {
        switch(data.ERR_CODE) {
            case "F":
                location.replace("/survey/surveyEnd?campaign_code="+$("#campaign_code").val()+"&uid="+$("#uid").val()+"&quest_num=1&lang="+$("#lang").val()+"&debug="+$("#debug").val());

                break;
            case "N":
                location.replace("/survey/q?campaign_code="+$("#campaign_code").val() + "&uid="+$("#uid").val() + "&q_code="+data.Q_CODE+"&lang="+$("#lang").val()+"&debug="+$("#debug").val());
                break;
        }
    }


}

$(function() {
    var width = Math.round(document.body.offsetWidth / 2);
    $(".imageView").css({"height":width});
    $( window ).resize(function() {
        var width = Math.round(document.body.offsetWidth / 2);
        $(".imageView").css({"height":width});
    });

    $(".nextStep").click(function() {
        submit();
    });

    $(".qaList").click(function() {
        // $(".qaList").each(function() {
        //     var id = $(this).attr("id");
        //     $(this).removeClass("btn-select");
        //     $(this).addClass("btn-white");
        //
        //     var src = $(this).find(".pull-left").find("img").attr("src");
        //     src = src.replace("_on","_off");
        //     $(this).find(".pull-left").find("img").attr("src", src);
        //
        //     $("#qaData_"+id).attr("checked", false);
        // });


        var id = $(this).attr("id");

        if($("#qaData_"+id).is(":checked") == true) {
            $("#qaData_"+id).attr("checked", false);

            var src = $(this).find(".pull-left").find("img").attr("src");
            src = src.replace("_on","_off");
            $(this).find(".pull-left").find("img").attr("src", src);

            $(this).removeClass("btn-select");
            $(this).addClass("btn-white");

        } else {
            $("#qaData_"+id).attr("checked", true);

            var src = $(this).find(".pull-left").find("img").attr("src");
            src = src.replace("_off","_on");
            $(this).find(".pull-left").find("img").attr("src", src);

            $(this).removeClass("btn-white");
            $(this).addClass("btn-select");


        }




    });


    $(".imgBox").click(function() {
        imgSelect = 0;

        var check = $(this).find(".imgBox_check img").attr("src");
        var temp = check.replace("/img/survey/checkBox_icon_", "");
        temp = temp.replace(".png", "");



        if(temp == "off") {
            var qa_code = $(this).attr("qa_code");
            $(this).removeClass("imgBox_on");
            $(this).addClass("imgBox_off");

            $(this).addClass("imgBox_on");

            check = check.replace("_off", "_on");
            $(this).find(".imgBox_check img").attr("src", check);



        } else {
            var qa_code = $(this).attr("qa_code");
            $(this).removeClass("imgBox_on");
            $(this).addClass("imgBox_off");

            $(this).addClass("imgBox_off");

            check = check.replace("_on", "_off");
            $(this).find(".imgBox_check img").attr("src", check);
        }

        $("body").focus();


        if($("#NotQuestion").html() != undefined) {
            $("#NotQuestion").prop("checked", "");


            $("#NotQuestionBtn").removeClass("btn-danger");
            $("#NotQuestionBtn").addClass("btn-white");

        }

    });


    $(".imgBox2").click(function() {
        imgSelect = 0;

        var check = $(this).find(".imgBox_check img").attr("src");
        var temp = check.replace("/img/survey/checkBox_icon_", "");
        temp = temp.replace(".png", "");



        if(temp == "off") {
            var qa_code = $(this).attr("qa_code");
            var category_code = $(this).attr("category_code");
            $(this).removeClass("imgBox_on");
            $(this).addClass("imgBox_off");

            $(this).addClass("imgBox_on");

            check = check.replace("_off", "_on");
            $(this).find(".imgBox_check img").attr("src", check);

            $("#text_"+qa_code+"_"+category_code).attr("disabled", false);


        } else {
            var qa_code = $(this).attr("qa_code");
            var category_code = $(this).attr("category_code");
            $(this).removeClass("imgBox_on");
            $(this).addClass("imgBox_off");

            $(this).addClass("imgBox_off");

            check = check.replace("_on", "_off");
            $(this).find(".imgBox_check img").attr("src", check);

            $("#text_"+qa_code+"_"+category_code).attr("disabled", true);
        }

        $("body").focus();

        if($("#NotQuestion").html() != undefined) {
            $("#NotQuestion").prop("checked", "");


            $("#NotQuestionBtn").removeClass("btn-danger");
            $("#NotQuestionBtn").addClass("btn-white");

        }
        if($("#NotQuestion").html() != undefined) {
            $("#NotQuestion").prop("checked", "");


            $("#NotQuestionBtn").removeClass("btn-danger");
            $("#NotQuestionBtn").addClass("btn-white");

        }


    });


    $(".NotQuestion").click(function() {


        if($("#NotQuestion").is(":checked") == true) {
            console.log("OK");
            $("#NotQuestion").prop("checked", "");

            $(this).removeClass("btn-danger");
            $(this).addClass("btn-white");

        } else {

            $(".imgBox").each(function() {
                var check = $(this).find(".imgBox_check img").attr("src");
                var temp = check.replace("/img/survey/checkBox_icon_", "");
                temp = temp.replace(".png", "");

                var qa_code = $(this).attr("qa_code");
                $(this).removeClass("imgBox_on");
                $(this).addClass("imgBox_off");

                $(this).addClass("imgBox_off");

                check = check.replace("_on", "_off");
                $(this).find(".imgBox_check img").attr("src", check);
            });

            $(".imgBox2").each(function() {
                var check = $(this).find(".imgBox_check img").attr("src");
                var temp = check.replace("/img/survey/checkBox_icon_", "");
                temp = temp.replace(".png", "");



                var qa_code = $(this).attr("qa_code");
                var category_code = $(this).attr("category_code");
                $(this).removeClass("imgBox_on");
                $(this).addClass("imgBox_off");

                $(this).addClass("imgBox_off");

                check = check.replace("_on", "_off");
                $(this).find(".imgBox_check img").attr("src", check);

                $("#text_"+qa_code+"_"+category_code).attr("disabled", true);

            });


            if($("#NotQuestion").html() != undefined) {
                $("#NotQuestion").prop("checked", true);

                $("#NotQuestionBtn").removeClass("btn-default");
                $("#NotQuestionBtn").addClass("btn-danger");

            }


        }
    });


});


function surveyNext() {
    $(".nextStep").trigger("click");
}