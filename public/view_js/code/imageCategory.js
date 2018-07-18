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
        ,selectedIndex:-1
        ,selectedIndex_title: ""
        ,selectedIndex2:-1
        ,mode:""
        ,step1:[]
        ,step2:[]
    }
    ,methods:{
        getData: function() {
            console.log("OK");
        }
        ,step1_modal: function() {
            this.modal.category_code = "";
            this.modal.category_name = "";
            this.selectedIndex = -1;

            this.mode = "step1";


            $("#categoryModal").modal("show");
        }
        ,step2_modal: function() {
            this.modal.category_code = this.step1[this.selectedIndex].CODE_IMAGE_CATEGORY.substring(0,3);
            this.modal.category_name = "";
            this.selectedIndex2 = -1;

            this.mode = "step2";

            $("#categoryModal").modal("show");
        }
        ,step1_write: function() {
            if(!this.modal.category_name) {
                alert("카테고리명을 입력해주세요.");
                $("#category_name").focus();
                return;
            }


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
                    switch(_this.mode){
                        case "step1":


                            if(_this.selectedIndex < 0) {
                                _this.step1.push(data);
                            } else {
                                Vue.set(_this.step1, _this.selectedIndex, data);

                            }
                            _this.selectedIndex = -1;

                            break;
                        case "step2":


                            if(_this.selectedIndex2 < 0) {
                                _this.step2.push(data);
                            } else {
                                Vue.set(_this.step2, _this.selectedIndex2, data);

                            }

                            _this.selectedIndex2 = -1;


                            break;
                    }


                    $("#categoryModal").modal("hide");



                },
                error:function(e){
                    alert(e.responseText);
                }
            });
        }
        ,step1_modify: function(index) {
            //console.log(this.step1[index]);
            this.mode = "step1";
            this.modal.category_code = this.step1[index].CODE_IMAGE_CATEGORY;
            this.modal.category_name = this.step1[index].CODE_IMAGE_CATEGORY_NAME;
            this.selectedIndex = index;
            $("#categoryModal").modal("show");
        }
        ,step2_modify: function(index) {
            //console.log(this.step1[index]);
            this.mode = "step2";
            this.modal.category_code = this.step2[index].CODE_IMAGE_CATEGORY;
            this.modal.category_name = this.step2[index].CODE_IMAGE_CATEGORY_NAME;
            this.selectedIndex2 = index;

            $("#categoryModal").modal("show");
        }
        ,step1_delete: function(index) {
            var _this = this;
            if(confirm("삭제하시겠습니까?") == true) {
                var category_code = this.step1[index].CODE_IMAGE_CATEGORY;
                var json = {
                    category_code : category_code
                }

                _this.selectedIndex = index;

                $.ajax({
                    url:location.pathname,
                    type:"delete",
                    dataType:"json",
                    data:json,
                    success:function(data) {

                        if(data.ERR_CODE == "000") {
                            _this.step1.splice(_this.selectedIndex, 1);
                            _this.selectedIndex = -1;
                        } else {
                            alert("세부 카테고리코드가 존재합니다.");
                            _this.selectedIndex = -1;
                        }

                        console.log(data);
                    },
                    error:function(e){
                        alert(e.responseText);
                    }
                });
            }
        }
        ,step2_delete: function(index) {
            var _this = this;
            if(confirm("삭제하시겠습니까?") == true) {
                var category_code = this.step2[index].CODE_IMAGE_CATEGORY;
                var json = {
                    category_code : category_code
                }

                _this.selectedIndex = index;

                $.ajax({
                    url:location.pathname,
                    type:"delete",
                    dataType:"json",
                    data:json,
                    success:function(data) {

                        if(data.ERR_CODE == "000") {
                            _this.step2.splice(_this.selectedIndex, 1);
                            _this.selectedIndex2 = -1;
                        } else {
                            alert("세부 카테고리코드가 존재합니다.");
                            _this.selectedIndex2 = -1;
                        }

                        console.log(data);
                    },
                    error:function(e){
                        alert(e.responseText);
                    }
                });
            }
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
                    console.log(_this.step1);
                },
                error:function(e){
                    alert(e.responseText);
                }
            });
        }
        ,step2_list: function(index, category_code) {
            var _this = this;
            this.selectedIndex = index;

            this.selectedIndex_title = this.step1[index].CODE_IMAGE_CATEGORY_NAME;

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
