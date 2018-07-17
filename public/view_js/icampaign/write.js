
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
        campaignWrite: function() {
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
                campaign_code : this.formData.campaign_code
                ,campaign_title : this.formData.campaign_title
                ,campaign_title_en : this.formData.campaign_title_en
                ,campaign_title_cn : this.formData.campaign_title_cn
                ,campaign_desc : this.formData.campaign_desc
                ,campaign_desc_en : this.formData.campaign_desc_en
                ,campaign_desc_cn : this.formData.campaign_desc_cn
                ,startdate : $("#campaign_startdate").val()
                ,enddate : $("#campaign_enddate").val()
                ,startPage : $('#startPage').code()
                ,joinCnt : this.formData.joinCnt
                ,totalPoint : this.formData.totalPoint
                ,finishPoint : this.formData.finishPoint
                ,bpType : $("#bpType").val()
            };

            $.ajax({
                url:"/icampaign/write",
                type:"POST",
                dataType:"json",
                data:json,
                success:function(data){
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