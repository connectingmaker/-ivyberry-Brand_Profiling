/**
 * Created by kwangheejung on 2017. 9. 18..
 */
/*
 * DEV COMPANY : CM
 * DEV NAME : KWANG HEE JUNG
 * DEV EMAIL : KHJUNG@C-MAKER.CO.KR
 * DEV VER : 1.0
 * DEV MODULE NAME : AJAX MODULE
 * DEV HOMEPAGE : www.c-maker.co.kr
 */
/****** ajax module **********/
var common = {};
common.ajax = {};
common.ajax.type = "post";
common.ajax.dataType = "json";

common.ajax.send = function (url, data) {
    //console.log(data);
    $.ajax({
        type:common.ajax.type,
        url:url,
        data:data,
        success:function(data){
            common.ajax.returnGubun(url, data);
        },
        error:function(e){
            alert(e.responseText);
        }
    });
}

common.ajax.returnGubun = function(url, data) {
    if(typeof eval(common.ajax.return) == "function") {
        common.ajax.return(data);
    } else {
        alert("실행된 함수가 지정되지 않았습니다");
    }
}
/****** ajax module end *********/

var string = {};
string.dateTime = function(date) {
    var dateReturn = new Date(date);
    var stringYear = dateReturn.getFullYear();
    var stringMonth = dateReturn.getMonth() + 1;
    var stringDay = dateReturn.getDate();
    var stringHour = dateReturn.getHours();
    var stringSecond = dateReturn.getSeconds();
    var stringMinute = dateReturn.getMinutes();

    if(stringMonth < 10) {
        stringMonth = "0" + stringMonth;
    }

    if(stringDay < 10) {
        stringDay = "0" + stringDay;
    }

    if(stringHour < 10) {
        stringHour = "0" + stringHour;
    }

    if(stringSecond < 10) {
        stringSecond = "0" + stringSecond;
    }

    if(stringMinute < 10) {
        stringMinute = "0" + stringMinute;
    }

    return stringYear + "-" + stringMonth + "-" + stringDay+" "+stringHour+":"+stringSecond+":"+stringMinute;
    //return dateReturn.getTime();
}


function inputTextCheck(id, msg) {
    if($("#"+id).val() == false) {
        alert(msg);
        $("#"+id).focus();
        return false;
    }
}

function inputEmailCheck(id, msg)
{
    var regExp = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;
    if($("#"+id).val().length == 0) {
        alert(msg);
        $("#"+id).focus();
        return false;
    }

    if(!$("#"+id).val().match(regExp)) {
        alert("이메일 형식이 올바르지 않습니다.");
        $("#"+id).focus();
        return false;
    }
}

function inputRadioCheck(className, msg) {
    if($("."+className).is(":checked") == false) {
        alert(msg);
        return false;
    }
}

function inputRadioCheckReturn(className) {
    var checkVal = "";
    $("."+className).each(function() {
        if($(this).is(":checked") == true) {
            checkVal = $(this).val();
        }
    });

    return checkVal;
}

$(function() {
    $(".backBtn").click(function() {
        history.back(-1);
    });
})