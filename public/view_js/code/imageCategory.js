var app = new Vue({
    el : '#app'
    ,data:{
        ajax: {
            error: 0
            ,loading: false
        }
        ,modal: {
            category_code: ""
            , category_name: ""
        }
        ,step1:[]
        ,step2:[]
    }
    ,methods:{
        getData: function() {
            console.log("OK");
        }
        ,step1_modal: function() {
            $("#categoryModal").modal("show");
        }
        ,step1_write: function() {
            if(!this.modal.category_name) {
                alert("카테고리명을 입력해주세요.");
                $("#category_name").focus();
                return;
            }

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
                    console.log(data);
                },
                error:function(e){
                    alert(e.responseText);
                }
            });
        }
        ,step1_modify: function() {

        }
        ,step1_list: function() {
            var _this = this;
            $.ajax({
                url:location.pathname,
                type:"put",
                dataType:"json",
                // data:json,
                success:function(data){
                    _this.step1 = data;
                    //console.log(data);
                },
                error:function(e){
                    alert(e.responseText);
                }
            });
        }
        ,step2_list: function(category_code) {
            var _this = this;
            var json = {
                category_code : category_code
            };
            $.ajax({
                url:location.pathname,
                type:"put",
                dataType:"json",
                data:json,
                success:function(data){
                    _this.step2 = data;
                    //_this.step1 = data;
                    //console.log(data);
                },
                error:function(e){
                    alert(e.responseText);
                }
            });
        }
    }
    ,mounted: function() {
        this.step1_list();
    }
});
