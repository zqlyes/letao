$(function(){
  var currentPage = 1;
  var pageSize = 5;
 
  render();

  function render(){
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function(info){
        console.log(info);
  
        var htmlstr = template('secondTemplate',info);
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
  

  //展示添加模态框
  $('.show_secondModal').click(function(){
    $('#secondModal').modal('show');
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: 1,
        pageSize: 100,
      },
      dataType: 'json',
      success: function(info){
        console.log(info);
        var htmlstr = template('firstTemplate',info);
        $('.dropdown-menu').html(htmlstr);
      }
    })
  })

  //表单提交验证
  $('#form').bootstrapValidator({

    excluded:[],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: '请选择一级分类'
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message:'请输入二级分类'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请上传图片'
          }
        }
      }
    }
  })

  //选择一级分类
  $('.dropdown-menu').on('click','a',function(){
    var txt = $(this).text();
    $('#cateName').text(txt);

    $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID');
  })

  //上传图片
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      var url = data.result.picAddr;
      $('#imgbox').attr('src',url);

      $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID');
    }
  });

  $('#form').on('success.form.bv',function(e){
    e.preventDefault();
  })
})