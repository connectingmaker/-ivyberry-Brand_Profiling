var app = new Vue({
    el: '#app'
    , data: {
        ajax: {
            error: 0
            , loading: false
        }
        ,modal: {
            card_category: ""
            ,card_seq : ""
            ,card_title : ""
            ,card_command : ""
            ,card_contents: ""
        }
        ,category_name:""
        ,category:[]
        ,list:[]
        ,selectedIndex:-1

    }
    ,methods:{
        cardModal: function() {
            this.selectedIndex = -1;
            this.modal.card_category = this.modal.card_category;
            this.modal.card_seq = "";
            this.modal.card_title = "";
            this.modal.card_command = "";
            this.modal.card_contents = "";


            $("#cardModal").modal("show");
        }
        ,cardCategorySelect:function(index) {
            var _this = this;
            this.modal.card_category = this.category[index].CODE_CARD_CATEGORY;
            this.category_name = this.category[index].CODE_CARD_CATEGORY_NAME;

            var json = {
                card_category : this.modal.card_category
            }

            $.ajax({
                url:location.pathname,
                type:"PUT",
                dataType:"json",
                data:json,
                success:function(data){

                    _this.list = data;
                },
                error:function(e){
                    alert(e.responseText);
                }
            });
        }
        ,cardModify: function(index) {
            this.selectedIndex = index;
            this.modal.card_category = this.list[index].CODE_CARD_CATEGORY;
            this.modal.card_seq = this.list[index].CARD_SEQ;
            this.modal.card_title = this.list[index].CARD_TITLE;
            this.modal.card_command = this.list[index].CARD_COMMAND;
            this.modal.card_contents = this.list[index].CARD_CONTENTS;
            $("#cardModal").modal("show");

        }
        ,cardWrite: function() {
            if($("#card_title").val() == false) {
                alert("카드 타이틀명을 입력해주세요.");
                $("#card_title").focus();
                return;
            }

            if($("#card_command").val() == false) {
                alert("카드 명령문을 입력해주세요.");
                $("#card_command").focus();
                return;
            }

            if($("#card_contents").val() == false) {
                alert("설명 내용을 입력해주세요.");
                $("#card_contents").focus();
                return;
            }

            var json = {
                card_seq : $("#card_seq").val()
                ,card_category : this.modal.card_category
                ,card_title : $("#card_title").val()
                ,card_command : $("#card_command").val()
                ,card_contents : $("#card_contents").val()
            }

            var _this = this;
            $.ajax({
                url:location.pathname,
                type:"POST",
                dataType:"json",
                data:json,
                success:function(data){
                    if(_this.selectedIndex < 0) {
                        _this.list.push(data);
                    } else {
                        Vue.set(_this.list, _this.selectedIndex, data);

                    }
                    $("#cardModal").modal("hide");
                },
                error:function(e){
                    alert(e.responseText);
                }
            });
        }
        ,cardDelete: function(index) {
            if(confirm("삭제하시겠습니까?") == true) {
                var _this = this;
                var json = {
                    card_seq : this.list[index].CODE_CARD_CATEGORY
                }
                $.ajax({
                    url:location.pathname,
                    type:"DELETE",
                    dataType:"json",
                    data:json,
                    success:function(data){
                        _this.list.splice(_this.selectedIndex, 1);
                        _this.selectedIndex = -1;
                    },
                    error:function(e){
                        alert(e.responseText);
                    }
                });
            }
        }
        ,cardCategory: function() {
            var _this = this;
            $.ajax({
                url:"/code/cardCategory",
                type:"PUT",
                dataType:"json",
                // data:json,
                success:function(data){
                    _this.category = data;
                },
                error:function(e){
                    alert(e.responseText);
                }
            });
        }

    }
    ,mounted: function() {
        this.cardCategory();
        //this.step1_list();
    }
});