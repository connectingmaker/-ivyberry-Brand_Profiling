$(function() {
  var menu = "";
   $(".top_gnb_menu_sub").show();
   menu = "<ul><li>완료 설문</li>";
   menu += "<li>카테고리별 통계</li>";
    menu += "<li>질문그룹별 통계</li></ul>";

   $(".top_gnb_menu_sub .menu .menu_btn").append(menu);

    $("#searchBtn").click(function() {
        $("#searchForm").submit();
    });
});