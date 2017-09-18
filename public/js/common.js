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
