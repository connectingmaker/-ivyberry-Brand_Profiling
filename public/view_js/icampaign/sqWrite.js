var chars = "01234567890";


var app = new Vue({
    el: '#app'
    , data: {
        campaign_code: ""
        ,sqCode:""
        ,sqTitle:""
        ,sqLayout:""
        ,sqCheckMin:""
        ,sqCheckMax:""
        ,sqaTitle:""
        ,sqList:[]
        ,sqaList:[]
        ,selectedSQ:-1
    }
    ,methods:{
        getData: function() {
            this.campaign_code = $("#campaign_code").val();
            var _this = this;
            var json = {
                campaign_code : this.campaign_code
            };

            $.ajax({
                url:"/icampaign/sqWrite",
                type:"PUT",
                dataType:"json",
                data:json,
                success:function(data){
                    _this.sqList = data;
                    for(var i = 0; i<_this.sqList.length; i++) {
                        var SQA = _this.sqList[i].SQA.split('|');
                        var SQA_ARRAY = [];
                        for(var j = 0; j < SQA.length; j++) {
                            var SQA_TEMP = SQA[j].split('///');

                            var SQA_DATA = {
                                SQA_CODE : SQA_TEMP[0]
                                ,SQA_TITLE : SQA_TEMP[1]
                                ,SQA_ORDER : SQA_TEMP[2]
                                ,SCOUT : SQA_TEMP[3]
                            };
                            SQA_ARRAY.push(SQA_DATA);
                        }

                        _this.sqList[i] = {
                            SQ_CODE : _this.sqList[i].SQ_CODE
                            ,SQ_TITLE : _this.sqList[i].SQ_TITLE
                            ,SQ_LAYOUT : _this.sqList[i].SQ_LAYOUT
                            ,SQ_CHECKED_MIN : _this.sqList[i].SQ_CHECKED_MIN
                            ,SQ_CHECKED_MAX : _this.sqList[i].SQ_CHECKED_MAX
                            ,SQA : SQA_ARRAY
                        }


                    }

                    console.log(_this.sqList);
                },
                error:function(e){
                    alert(e.responseText);
                }
            });

        }
        ,sqModal: function() {
            $("#sqModal").modal("show");
            this.selectedSQ = -1;
        }
        ,sqModify:function(index) {
            var _this = this;
            _this.sqCode = this.sqList[index].SQ_CODE;
            _this.sqTitle = this.sqList[index].SQ_TITLE;
            _this.sqLayout = this.sqList[index].SQ_LAYOUT;
            _this.sqCheckMin = this.sqList[index].SQ_CHECKED_MIN;
            _this.sqCheckMax = this.sqList[index].SQ_CHECKED_MAX;
            _this.sqaList = this.sqList[index].SQA;

            this.selectedSQ = index;


            $("#sqModal").modal("show");

        }
        ,randomCodeCreate: function() {
            var randomstring = "";
            for (var i=0; i<10; i++) {
                var rnum = Math.floor(Math.random() * chars.length);
                randomstring += chars.substring(rnum,rnum+1);
            }
            return randomstring;
        }
        ,sqaCreate: function() {
            var randomCode = this.randomCodeCreate();


            var sqaCnt = this.sqaList.length + 1;
            var sqaData = {
                SQA_CODE : randomCode
                ,SQA_ORDER : sqaCnt
                ,SQA_TITLE : this.sqaTitle
                ,SCOUT: "N"
            };

            this.sqaTitle = "";

            this.sqaList.push(sqaData);
        }
        ,sqaTitleClick: function() {
            this.sqaCreate();
        }
        ,sqaTitleEnter: function(event) {
            var randomCode = "";
            switch(event.which) {
                case 13:
                    this.sqaCreate();
                break;
            }
        }
        ,scOutClick: function(index) {
            var SCOUT = this.sqaList[index].SCOUT;
            if(SCOUT == "N") {
                this.sqaList[index].SCOUT = "Y";
            } else {
                this.sqaList[index].SCOUT = "N";
            }


            if(this.sqaList[index].SQA_CODE != "") {
                var json = {
                    campaign_code : this.campaign_code
                    ,sqCode : this.sqCode
                    ,sqaCode : this.sqaList[index].SQA_CODE
                    ,sqaSCOUT : this.sqaList[index].SCOUT
                };
            }



            console.log(json);
        }

        ,sqaDelete: function(index) {
            if(confirm("삭제하시겠습니까?") == true) {
                var _this = this;
                var json = {
                    campaign_code: this.campaign_code
                    ,sqCode: this.sqCode
                    ,sqaCode: this.sqaList[index].SQA_CODE
                }

                $.ajax({
                    url:"/icampaign/sqDeleteQA",
                    type:"DELETE",
                    dataType:"json",
                    data:json,
                    success:function(data){
                        _this.sqList[_this.selectedSQ].SQA.splice(index, 1);

                    },
                    error:function(e){
                        alert(e.responseText);
                    }
                });

            }
        }

        ,sqDelete: function(index) {
            if(confirm("삭제하시겠습니까") == true) {
                var _this = this;
                var json = {
                    campaign_code : this.campaign_code
                    ,sqCode : this.sqList[index].SQ_CODE
                }

                $.ajax({
                    url:"/icampaign/sqDeleteQ",
                    type:"DELETE",
                    dataType:"json",
                    data:json,
                    success:function(data){
                        _this.sqList.splice(index, 1);
                    },
                    error:function(e){
                        alert(e.responseText);
                    }
                });
            }
        }
        ,sqSave: function() {
            var _this = this;
            var json = {
                campaign_code : this.campaign_code
                ,sqCode : this.sqCode
                ,sqTitle : this.sqTitle
                ,sqLayout : this.sqLayout
                ,sqCheckMin : this.sqCheckMin
                ,sqCheckMax : this.sqCheckMin
                ,sqaList : JSON.stringify(this.sqaList)
            };
            console.log(json);

            $.ajax({
                url:"/icampaign/sqWrite",
                type:"POST",
                dataType:"json",
                data:json,
                success:function(data){
                    console.log(data);
                    var SQA = data.SQA.split('|');
                    var SQA_ARRAY = [];
                    for(var j = 0; j < SQA.length; j++) {
                        var SQA_TEMP = SQA[j].split('///');

                        var SQA_DATA = {
                            SQA_CODE : SQA_TEMP[0]
                            ,SQA_TITLE : SQA_TEMP[1]
                            ,SQA_ORDER : SQA_TEMP[2]
                            ,SCOUT : SQA_TEMP[3]
                        };
                        SQA_ARRAY.push(SQA_DATA);
                    }

                    if(_this.selectedSQ == -1) {
                        _this.sqList.push({
                            SQ_CODE : data.SQ_CODE
                            ,SQ_TITLE : data.SQ_TITLE
                            ,SQ_LAYOUT : _this.sqList[_this.selectedSQ].SQ_LAYOUT
                            ,SQ_CHECKED_MIN : _this.sqList[_this.selectedSQ].SQ_CHECKED_MIN
                            ,SQ_CHECKED_MAX : _this.sqList[_this.selectedSQ].SQ_CHECKED_MAX
                            ,SQA : SQA_ARRAY
                        });
                    } else {
                        var sqData = {
                            SQ_CODE : data.SQ_CODE
                            ,SQ_TITLE : data.SQ_TITLE
                            ,SQ_LAYOUT : _this.sqList[_this.selectedSQ].SQ_LAYOUT
                            ,SQ_CHECKED_MIN : _this.sqList[_this.selectedSQ].SQ_CHECKED_MIN
                            ,SQ_CHECKED_MAX : _this.sqList[_this.selectedSQ].SQ_CHECKED_MAX
                            ,SQA : SQA_ARRAY
                        };
                        Vue.set(_this.sqList, _this.selectedSQ, sqData);
                    }


                    _this.selectedSQ = -1;

                    $("#sqModal").modal("hide");


                },
                error:function(e){
                    alert(e.responseText);
                }
            });
        }
    }
    ,mounted: function() {
        this.getData();
    }
});