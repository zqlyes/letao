$(function(){
  var currentPage = 1;
  var pageSize = 5;

  render();
  
  //渲染用户信息
  function render(){
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function(info){
  
        var htmlstr = template('userTemplate',info);
        $('tbody').html(htmlstr);
  
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:info.page,//当前页
          totalPages:Math.ceil(info.total / info.size),//总页数
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
  
  //启用禁用用户功能
  $('tbody').on('click','.btn',function(){
    var userId = $(this).parent().data('id');
    var isDelete = $(this).hasClass('btn-danger') ? 0 : 1;

    $.ajax({
      type:'post',
      url: '/user/updateUser',
      data: {
        id: userId,
        isDelete: isDelete,
      },
      dataType: 'json',
      success: function(info){
        render();
      }
    })
  })
  
})