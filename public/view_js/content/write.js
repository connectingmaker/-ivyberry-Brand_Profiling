/**
 * Created by jccho on 2018. 7. 31..
 */
$(function() {

    $('#contents').summernote({
        height:350
    });

    $('#contents_en').summernote({
        height:350
    });

    $('#contents_cn').summernote({
        height:350
    });


    $("#contentSave").click(function() {
        var use_yn = "N";
        if(inputTextCheck('subject', '제목을 입력해주세요.') == false) {
            return;
        }

        if($(".content_yn").is(":checked") == false) {
            alert("노출여부를 선택해주세요.");
            return;
        }


        if($("#title_img").val() == false) {
            $("#contentsForm").attr("action", "/content/writeProcess_single");
        } else {
            $("#contentsForm").attr("action", "/content/writeProcess");
        }

        // if(inputTextCheck('contents', '내용을 입력해주세요.') == false) {
        //     return;
        // }

        $(".content_yn").each(function() {
            if($(this).is(":checked") == true) {
                use_yn = $(this).val();
            }
        });



        $("#contentsForm").submit();


       // console.log($('#contents').eq(1).summernote('code'));
       //
       //  var params = {
       //      seq : $("#seq").val()
       //      ,subject : $("#subject").val()
       //      // ,contents : $("#contents").val()
       //      , contents : $('#contents').code()
       //      ,use_yn : use_yn
       //
       //  };
       //
       //  console.log(params);
       //
       //  common.ajax.send("/content/writeProcess", params);
       //  common.ajax.return = function() {
       //
       //      location.href = "/content/list";
       //
       //  };


    });


    $('#fileupload_ko').fileupload({
        url: "/content/imageUpdate",
        type:"post",
        dataType: 'json',
        done: function (e, data) {


            var html = $("#contents").code();

            html += "<img src='"+data.result.img+"' width='100%'>";



            $("#contents").code(html);
        }
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');


    $('#fileupload_en').fileupload({
        url: "/content/imageUpdate",
        type:"post",
        dataType: 'json',
        done: function (e, data) {
            var html = $("#contents_en").code();

            html += "<img src='"+data.result.img+"' width='100%'>";



            $("#contents_en").code(html);


        }
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');


    $('#fileupload_cn').fileupload({
        url: "/content/imageUpdate",
        type:"post",
        dataType: 'json',
        done: function (e, data) {
            var html = $("#contents_cn").code();

            html += "<img src='"+data.result.img+"' width='100%'>";



            $("#contents_cn").code(html);


        }
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');



});

