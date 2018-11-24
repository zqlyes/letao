


$(function(){

    var currentPage =1;
    var pageSize = 5;
    var currentId;
    var isDelete;
    render();
   function render(){
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );

        var str = template("tmp",info);
        $('tbody').html(str);


      $("#paginator").bootstrapPaginator({
        bootstrapMajorVersion:3,
        currentPage:info.page,
        totalPages:Math.ceil(info.total/info.size),
        onPageClicked:function(a,b,c,page){
          // console.log(page);
          currentPage = page;
          render();
        }
      })
      }
  })
   }

//点击切换状态

$('tbody').on("click",'.btn',function(){
  $('#changeModal').modal("show");
  currentId= $(this).parent().data("id");
  isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
  
})


$(".change").click(function(){
  $.ajax({
    type:'post',
    url:'/user/updateUser',
    dataType:'json',
    data:{
      id:currentId,
      isDelete:isDelete,
    },
    success:function(info){
      // console.log(info);
      $("#changeModal").modal("hide");
      render();
    }
  })
})
})