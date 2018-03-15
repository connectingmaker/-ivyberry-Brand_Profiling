var uid = "";
var campaign_code = $("#campaign_code").val();
var quest_num = $("#quest_num").val();


$(function() {
    $(".blackClick").click(function() {
        uid = $(this).parents("tr").attr("id");
        if( $("#"+uid+" #blackBtn").html() == "블랙리스트 등록") {
            $("#blacklistModal").modal("show");
        } else {
            var json = {
                uid : uid
                ,black_code : "N"
                ,black_etc : ""
                ,campaign_code : campaign_code
                ,quest_num : quest_num
            };
            common.ajax.send("/users/blackProcess", json);
            common.ajax.return = function(data) {
                switch(data.ERR_CODE) {
                    case "000":

                        if(data.DB_TYPE == "BLACK") {
                            $("#"+uid+" #blackBtn").html("블랙리스트 해제");
                            $("#"+uid+" #blackBtn").removeClass("btn-danger");
                            $("#"+uid+" #blackBtn").addClass("btn-primary");
                        } else {
                            $("#"+uid+" #blackBtn").html("블랙리스트 등록");
                            $("#"+uid+" #blackBtn").removeClass("btn-primary");
                            $("#"+uid+" #blackBtn").addClass("btn-danger");
                        }
                        $("#blacklistModal").modal("hide");
                        break;
                }
            }
        }

    });

    $("#blackSave").click(function() {
        if($("#black_code").val() == false) {
            alert("사유를 선택해주세요.");
            return;
        }

        if($("#black_etc").val() == false) {
            alert("참조내용을 입력해주세요.");
            $("#black_etc").focus();
            return;
        }

        var json = {
            uid : uid
            ,black_code : $("#black_code").val()
            ,black_etc : $("#black_etc").val()
            ,campaign_code : campaign_code
            ,quest_num : quest_num
        };
        common.ajax.send("/users/blackProcess", json);
        common.ajax.return = function(data) {
            switch(data.ERR_CODE) {
                case "000":

                    if(data.DB_TYPE == "BLACK") {
                        $("#"+uid+" #blackBtn").html("블랙리스트 해제");
                        $("#"+uid+" #blackBtn").removeClass("btn-danger");
                        $("#"+uid+" #blackBtn").addClass("btn-primary");
                    } else {
                        $("#"+uid+" #blackBtn").html("블랙리스트 등록");
                        $("#"+uid+" #blackBtn").removeClass("btn-primary");
                        $("#"+uid+" #blackBtn").addClass("btn-danger");
                    }
                    $("#blacklistModal").modal("hide");
                    break;
            }
        }
    });
});