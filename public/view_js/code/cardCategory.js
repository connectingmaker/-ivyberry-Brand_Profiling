var app = new Vue({
    el: '#app'
    , data: {
        ajax: {
            error: 0
            , loading: false
        }
        ,modal: {
            category_code: ""
            , category_name: ""
        }
        ,list:[]
        ,selectedIndex:-1

    }
    ,methods:{
        cardModal: function() {
            this.modal.category_code = "";
            this.modal.category_name = "";

            this.selectedIndex = -1;
            $("#cardModal").modal("show");
        }
        ,cardList: function() {
            var _this = this;
            $.ajax({
                url:location.pathname,
                type:"PUT",
                dataType:"json",
                // data:json,
                success:function(data){
                    _this.list = data;
                    //console.log(data);
                },
                error:function(e){
                    alert(e.responseText);
                }
            });
        }
        ,cardWrite: function() {
            var _this = this;

            var json = {
                category_code : this.modal.category_code
                ,category_name : this.modal.category_name
            }

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
                    _this.selectedIndex = -1;

                    $("#cardModal").modal("hide");
                },
                error:function(e){
                    alert(e.responseText);
                }
            });
        }
        ,cardDelete: function(index){
            if(confirm("삭제하시겠습니까?") == true) {
                var _this = this;
                var category_code = this.list[index].CODE_CARD_CATEGORY;
                var json = {
                    category_code : category_code
                };
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
        ,cardModify: function(index)
        {
            var category_code = this.list[index].CODE_CARD_CATEGORY;
            var category_name = this.list[index].CODE_CARD_CATEGORY_NAME;


            this.selectedIndex = index;
            this.modal.category_code = category_code;
            this.modal.category_name = category_name;

            $("#cardModal").modal("show");
        }
    }
    ,mounted: function() {
        this.cardList();
        //this.step1_list();
    }
});