$(function(){

  var currentPage = 1;
  var pageSize = 3;

  var arr = [];

  render();
  
  //商品页面渲染
  function render(){
    $.ajax({
      type: 'get',
      url: '/product/queryProductDetailList',
      data: {
        page: currentPage,
        pageSize: pageSize,
      },
      dataType: 'json',
      success: function(info){
        console.log(info);
        var htmlstr = template('proTemp',info);
        $('tbody').html(htmlstr);

        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function(a,b,c,page){
            currentPage = page;
            render();
          }
        })
      }
    })
  }

  //展示添加商品模态框
  $('.show_proModal').click(function(){
    $('#proModal').modal('show');
    $('#form').data('bootstrapValidator').resetForm(true);
    $('#dropdownText').text('请选择二级分类');
    $('.imgbox').html('');

    //二级分类数据渲染
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data:{
        page: 1,
        pageSize: 100,
      },
      dataType: 'json',
      success: function(info){
        var htmlstr = template('sdCateTemp',info);
        $('.dropdown-menu').html(htmlstr);
      }
    })
  })

  
  //表单校验
  $('#form').bootstrapValidator({
    excluded: [],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: '请选择二级分类'
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: '请输入商品名称'
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: '请输入商品描述'
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: '请输入商品库存'
          },
           //正则校验, 非零(1-9)
          // \d  0-9
          // *    表示0次或多次
          // +    表示1次或多次
          // ?    表示0次或一次
          // {m,n}
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存必须是非零开头的数字'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: '请输入商品尺码'
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '必须是xx-xx的格式, xx是两位数字, 例如: 36-44'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: '请输入商品原价'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: '请输入商品现价'
          }
        }
      },
      pic: {
        validators: {
          notEmpty: {
            message: '请上传3张图片'
          }
        }
      }
    }
  })

  //事件委托
  $('.dropdown-menu').on('click','a',function(){
    var txt = $(this).text();
    $('#dropdownText').text(txt);

    var brandId = $(this).data('id');
    $('[name="brandId"]').val(brandId);

    $('#form').data('bootstrapValidator').updateStatus('brandId','VALID');
  })

  //上传图片本地展示
  $('#fileupload').fileupload({
    dataType: 'json',
    done: function(e,data){
      var url = data.result.picAddr;

      arr.unshift(data.result);
      $('.imgbox').prepend('<img src="'+url+'" alt="" width="100px" height="100px">');

      if($('.imgbox img').length > 3){
        arr.pop();
        $('.imgbox img:last-of-type').remove();
      }

      if($('.imgbox img').length === 3){
        $('#form').data('bootstrapValidator').updateStatus('pic','VALID');
      }

    }
  })
  

  $('#form').on('success.form.bv',function(e){
    e.preventDefault();
    var data = $('#form').serialize();
    data += '&picName1='+ arr[0].picName +'&picAddr1='+ arr[0].picAddr;
    data += '&picName2='+ arr[1].picName +'&picAddr2='+ arr[1].picAddr;
    data += '&picName3='+ arr[2].picName +'&picAddr3='+ arr[2].picAddr;
    
    $.ajax({
      type: 'post',
      url: '/product/addProduct',
      data: data,
      dataType: 'json',
      success: function(info){

        $('#proModal').modal('hide');

        currentPage = 1;
        render();
        arr = [];
      }
    })
  })
})