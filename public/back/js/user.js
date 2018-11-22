$(function(){

  var currentPage = 1;
  var pageSize = 5;
  var userId;
  var isDelete;

  render();

  function render(){
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: currentPage,
        pageSize: pageSize,
      },
      dataType: 'json',
      success: function(info){
        var htmlstr = template("userTemplate",info);
        $("tbody").html(htmlstr);
  
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:currentPage,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数
          // size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(event, originalEvent, type,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          }
        });
      }
    })  
  }
  

  $('tbody').on('click','.btn',function(){
    $('#userModal').modal('show');
    
    userId = $(this).parent().data('id');
    isDelete = $(this).hasClass('btn-danger') ? 0 : 1;

    $('.btn-update').click(function(){
      $.ajax({
        type: 'post',
        url: '/user/updateUser',
        data: {
          id: userId,
          isDelete: isDelete,
        },
        dataType: 'json',
        success: function(info){
          $('#userModal').modal('hide');
          render();
        }
      })
    })
  })
  
  
})