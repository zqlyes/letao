$(function(){

  var currentPage = 1;
  var pageSize = 5;

  render();

  function render(){
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize,
      },
      dataType: 'json',
      success: function(info){
        var htmlstr = template('firstTemplate',info);
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

  //添加分类
  $('.show_firstModal').click(function(){
    $('#firstModal').modal('show');
    // $('#form').data('bootstrapValidator').resetForm(true);
  })

  //表单提交校验
  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields: {
      categoryName: {
        validators:{
          notEmpty: {
            message: '请输入一级分类名称'
          }
        }
      },
    }
  })

  //阻止表单默认提交，使用ajax提交
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑

    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function(info){
        console.log(info);
        $('#firstModal').modal('hide');
        currentPage = 1;
        render();
        $('#form').data('bootstrapValidator').resetForm(true);
        
      }
    })
  });
  
})