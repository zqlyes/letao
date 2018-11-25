$(function(){

  //一级分类数据渲染
  $.ajax({
    type: 'get',
    url: '/category/queryTopCategory',
    dataType: 'json',
    success: function(info){
      console.log(info);

      var htmlstr = template('fisrtTemp',info);
      $('.cate_left ul').html(htmlstr);

      var id = info.rows[0].id;
      render(id);
    }
  })
  
  //二级分类渲染
  function render(id){
    $.ajax({
      type: 'get',
      url:'/category/querySecondCategory',
      data: {
        id: id,
      },
      dataType: 'json',
      success: function(info){
        console.log(info);

        var htmlstr = template('secondTemp',info);
        $('.cate_right ul').html(htmlstr);
      }
    })
  }

  $('.cate_left ul').on('click','a',function(){
    $('.cate_left li').removeClass('current');
    $(this).parent().addClass('current');

    var fCateId = $(this).data('id');
    render(fCateId);
  })
})