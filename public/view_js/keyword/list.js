var app = new Vue({
    el: '#app'
    , data: {
        ajax: {
            error: 0
            , loading: false
        }
        ,modal: {
            keyword_category: ""
            ,keyword_seq : ""
            ,keyword_title : ""
            ,keyword_command : ""
            ,keyword_contents: ""
        }
        ,category_name:""
        ,category:[]
        ,list:[]
        ,selectedIndex:-1

    }
    ,methods:{
        keywordModal: function() {
            this.selectedIndex = -1;
            this.modal.keyword_category = this.modal.keyword_category;
            this.modal.keyword_seq = "";
            this.modal.keyword_title = "";
            this.modal.keyword_command = "";
            this.modal.keyword_contents = "";


            $("#keywordModal").modal("show");
        }
        ,keywordCategorySelect:function(index) {
            var _this = this;
            this.modal.keyword_category = this.category[index].CODE_keyword_CATEGORY;
            this.category_name = this.category[index].CODE_keyword_CATEGORY_NAME;

            var json = {
                keyword_category : this.modal.keyword_category
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
        ,keywordModify: function(index) {
            this.selectedIndex = index;
            this.modal.keyword_category = this.list[index].CODE_keyword_CATEGORY;
            this.modal.keyword_seq = this.list[index].keyword_SEQ;
            this.modal.keyword_title = this.list[index].keyword_TITLE;
            this.modal.keyword_command = this.list[index].keyword_COMMAND;
            this.modal.keyword_contents = this.list[index].keyword_CONTENTS;
            $("#keywordModal").modal("show");

        }
        ,keywordWrite: function() {
            if($("#keyword_title").val() == false) {
                alert("카드 타이틀명을 입력해주세요.");
                $("#keyword_title").focus();
                return;
            }

            if($("#keyword_command").val() == false) {
                alert("카드 명령문을 입력해주세요.");
                $("#keyword_command").focus();
                return;
            }

            if($("#keyword_contents").val() == false) {
                alert("설명 내용을 입력해주세요.");
                $("#keyword_contents").focus();
                return;
            }

            var json = {
                keyword_seq : $("#keyword_seq").val()
                ,keyword_category : this.modal.keyword_category
                ,keyword_title : $("#keyword_title").val()
                ,keyword_command : $("#keyword_command").val()
                ,keyword_contents : $("#keyword_contents").val()
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
                    $("#keywordModal").modal("hide");
                },
                error:function(e){
                    alert(e.responseText);
                }
            });
        }
        ,keywordDelete: function(index) {
            if(confirm("삭제하시겠습니까?") == true) {
                var _this = this;
                var json = {
                    keyword_seq : this.list[index].CODE_keyword_CATEGORY
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
        ,keywordCategory: function() {
            var _this = this;
            $.ajax({
                url:"/code/keywordCategory",
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
        this.keywordCategory();
        //this.step1_list();
    }
});