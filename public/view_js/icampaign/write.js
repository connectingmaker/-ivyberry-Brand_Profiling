
$(function() {
    $('#startPage').summernote({
        height:350
    });

});

var app = new Vue({
    el: '#app'
    , data: {
        formData: {
            campaign_code: ''
            ,campaign_title:''
            ,campaign_title_en: ''
            ,campaign_title_cn: ''
            ,campaign_desc: ''
            ,campaign_desc_en: ''
            ,campaign_desc_cn: ''
            ,startdate: ''
            ,enddate: ''
            ,startPage: ''
            ,joinCnt: 0
            ,totalPoint: 0
            ,finishPoint: 0
            ,bpType: ""
        }
    }
    ,methods:{
        campaignSelect: function() {
            this.formData.campaign_code = $("#campaign_code").val();
            this.formData.bpType = $("#bpType").val();

            if(this.formData.campaign_code != "") {
                var json = {
                    campaign_code : $("#campaign_code").val()
                };
                $.ajax({
                    url:"/icampaign/write",
                    type:"PUT",
                    dataType:"json",
                    data:json,
                    success:function(data){

                    },
                    error:function(e){
                        alert(e.responseText);
                    }
                });
            }
        }
        ,campaignWrite: function() {
            //console.log($('#startPage').code());


            if(inputTextCheck('campaign_title', '설문제목을 입력해주세요.') == false) {
                return;
            }

            if(inputTextCheck('campaign_desc', '설문설명을 입력해주세요.') == false) {
                return;
            }

            if(inputTextCheck('campaign_startdate', '시작일시를 입력해주세요.') == false) {
                return;
            }

            if(inputTextCheck('campaign_enddate', '종료일시를 입력해주세요.') == false) {
                return;
            }

            if($("#joinCnt").val() == "") {
                alert("목표인원을 입력해주세요.");
                $("#joinCnt").focus();
                return;
            }

            if($("#totalPoint").val() == "") {
                alert("총포인트를 입력해주세요.");
                $("#totalPoint").focus();
                return;
            }

            if($("#finishPoint").val() == "") {
                alert("완료 포인트를 입력해주세요.");
                $("#finishPoint").focus();
                return;
            }

            var json = {
                campaign_code : $("#campaign_code").val()
                ,campaign_title : $("#campaign_title").val()
                ,campaign_title_en : $("#campaign_title_en").val()
                ,campaign_title_cn : $("#campaign_title_cn").val()
                ,campaign_desc : $("#campaign_desc").val()
                ,campaign_desc_en : $("#campaign_desc_en").val()
                ,campaign_desc_cn : $("#campaign_desc_cn").val()
                ,startdate : $("#campaign_startdate").val()
                ,enddate : $("#campaign_enddate").val()
                ,startPage : $('#startPage').code()
                ,joinCnt : $("#joinCnt").val()
                ,totalPoint : $("#totalPoint").val()
                ,finishPoint : $("#finishPoint").val()
                ,bpType : $("#bpType").val()
            };

            $.ajax({
                url:"/icampaign/write",
                type:"POST",
                dataType:"json",
                data:json,
                success:function(data){
                    var campaign_code = data[0].CAMPAIGN_CODE;

                    location.href = "/icampaign/sQuestion/"+$("#bpType").val()+"/"+campaign_code;

                    //console.log(campaign_code);
                    //location.replace("");
                    /*
                    if(_this.selectedIndex < 0) {
                        _this.list.push(data);
                    } else {
                        Vue.set(_this.list, _this.selectedIndex, data);

                    }
                    $("#keywordModal").modal("hide");
                    */
                },
                error:function(e){
                    alert(e.responseText);
                }
            });



        }
    }
    ,mounted: function() {

    }
});