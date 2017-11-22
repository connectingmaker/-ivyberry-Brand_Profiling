var emailCheck = false;

$(function() {

    $("#emailSearch").click(function() {
        if(inputEmailCheck("useremail", "이메일을 입력해주세요") == false) {
            return;
        }

        var params = {
            useremail : $("#useremail").val()
        };
        common.ajax.send('/users/emailCheck', params);
        common.ajax.return = function(data) {
            //console.log(data);
            if(data.total > 0) {
                alert("등록된 이메일이 존재합니다.\n다시 조회해주세요.");
                $("#useremail").val("");
                emailCheck = false;
                return;
            } else {
                alert("등록가능한 이메일입니다.");
                emailCheck = true;
            }
        };
    });

    $("#memberSave").click(function() {
        if(inputEmailCheck("useremail", "이메일을 입력해주세요") == false) {
            return;
        }
        if($("#uid").val() == false) {
            if(emailCheck == false) {
                alert("이메일을 조회해주세요.");
                return;
            }

            if(inputTextCheck("passwd1", "패스워드를 입력해주세요.") == false) {
                return;
            }


            if(inputTextCheck("passwd2", "패스워드를 입력해주세요.") == false) {
                return;
            }

            if($("#passwd1").val() != $("#passwd2").val()) {
                alert("패스워드가 일치하지 않습니다");
                $("#passwd2").val("");
                return;
            }
        }



        if(inputTextCheck("username", "이름을 입력해주세요") == false) {
            return;
        }

        /*
        if(inputTextCheck("code_grade", "권한을 선택해주세요.") == false) {
            return;
        }
        */

        if($("#code_grade").val() == "") {
            alert("권한을 선택해주세요.");
            return;
        }

        if(inputTextCheck("sex", "성별을 선택해주세요.") == false) {
            return;
        }

        if(inputTextCheck("birthday", "생년월일을 입력해주세요.") == false) {
            return;
        }


        if(inputTextCheck("userphone", "핸드폰번호를 입력해주세요.") == false) {
            return;
        }



        var json = {
            uid : $("#uid").val()
            ,useremail: $("#useremail").val()
            ,username: $("#username").val()
            ,code_grade : $("#code_grade").val()
            ,userpasswd : $("#passwd1").val()
            ,sex : $("#sex").val()
            ,birthday : $("#birthday").val()
            ,userphone : $("#userphone").val()
        }
        common.ajax.send('/users/writeProcess', json);
        common.ajax.return = function(data) {
            var dataJson = eval("("+data+")");
            //console.log(dataJson[0]);

            //location.replace("/users/write/"+dataJson[0].UID);
            location.replace("/users/list");
        }
    });

    $("#useremail").keyup(function() {
        emailCheck = false;
    });
});