$(function() {
    var questData = [];
    var questCheck = false;
    $("#questBtn").click(function() {
        questData = [];
        $(".questQ").each(function() {
            console.log($(this).val());
            var val = $(this).val();
            var splitTemp;
            if(val != false) {
                splitTemp = val.split(":::");
                var group_code = splitTemp[0];
                var quest_num = splitTemp[1];

                var data = {
                    campaign_code : $("#campaign_code").val()
                    ,group_code : group_code
                    ,quest_num : quest_num
                }

                questData.push(data);
                if(quest_num == "1") {
                    questCheck = true;
                }

            }
        });

        if(questCheck == false) {
            alert("퀘스트1을 선택해주세요");
            return;
        }




        var jsonData = {
            campaign_code : $("#campaign_code").val()
            ,quest: JSON.stringify(questData)
        }

        common.ajax.send("/campaign/questionProcess", jsonData);
        common.ajax.return = function(data)
        {
            switch(data.err) {
                case "000":
                    location.href = "/campaign/setting/" + $("#campaign_code").val();
                    break;
                default:
                    alert("오류가 발생되었습니다.");
                    break;
            }
            //console.log(data);
        }
    });


});