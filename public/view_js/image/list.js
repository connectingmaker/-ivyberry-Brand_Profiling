/**
 * Created by jccho on 2018. 7. 13..
 */
var app = new Vue({
    el: '#app'
    , data: {
        ajax: {
            error: 0
            , loading: false
        }
        ,modal: {
            image_category: ""
            ,image_seq : ""
            ,image_title : ""
            ,image_filename : ""
            ,image_filenameTemp: ""
            // ,image_hashtag :""

        }
        ,category_name:""
        ,category:[]
        ,list:[]
        ,selectedIndex:-1
        ,open:false

    }
    ,methods:{
        imageModal: function() {
            this.selectedIndex = -1;
            this.modal.image_category = this.modal.image_category;
            this.modal.image_seq = "";
            this.modal.image_title = "";
            this.modal.image_filename = "";
            this.modal.image_filenameTemp =  this.modal.image_filenameTemp;

            $("#imageModal").modal("show");
        }
        ,imageCategorySelect:function(index) {
            var _this = this;
            this.modal.image_category = this.category[index].CODE_IMAGE_CATEGORY;
            this.category_name = this.category[index].CODE_IMAGE_CATEGORY_NAME;

            var json = {
                image_category : this.modal.image_category
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

        ,imageModify: function(index) {
            this.selectedIndex = index;
            this.modal.image_category = this.list[index].CODE_IMAGE_CATEGORY;
            this.modal.image_seq = this.list[index].IMAGE_SEQ;
            this.modal.image_title = this.list[index].IMAGE_TITLE;
            this.modal.image_filename = this.list[index].IMAGE_FILENAME;
            this.modal.image_filenameTemp = this.list[index].IMAGE_FILENAME;
            $("#imageModal").modal("show");

        }
        ,imageWrite: function() {
            if($("#image_title").val() == false) {
                alert("이미지명을 입력해주세요.");
                $("#image_title").focus();
                return;
            }

            var json = {
                image_seq : $("#image_seq").val()
                ,image_category : this.modal.image_category
                ,image_title : $("#image_title").val()
                ,image_filename : $("#image_filename").val()
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
                    $("#imageModal").modal("hide");
                },
                error:function(e){
                    alert(e.responseText);
                }
            });
        }
        ,imageDelete: function(index) {
            if(confirm("삭제하시겠습니까?") == true) {
                var _this = this;
                var json = {
                    image_seq : this.list[index].CODE_IMAGE_CATEGORY
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
        ,imageCategory: function() {
            var _this = this;
            $.ajax({
                url:"/code/imageCategory",
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
                    console.log(data);
                },
                error:function(e){
                    alert(e.responseText);
                }
            });
        }

    }
    ,mounted: function() {
        this.imageCategory();
        //this.step1_list();
    }
});