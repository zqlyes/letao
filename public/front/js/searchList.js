$(function(){
   var txt = getSearch('key');
   console.log(txt);

   $('.search_input input').val(txt);

  function render(){
    var obj = {};
    obj.proName = $('.search_input input').val();
    obj.page = 1;
    obj.pageSize = 100;

    var $current = $('.search_nav li.current');
    if($current.length === 1){
      var sortName = $current.data('type');
      var sortValue = $current.find('i').hasClass('fa-angle-down') ? 2 : 1;

      obj[sortName] = sortValue;
    }


    setTimeout(function(){
      $.ajax({
        type: 'get',
        url: '/product/queryProduct',
        data: obj,
        dataType: 'json',
        success: function(info){
          console.log(info);
  
          var htmlstr = template('prolistTemp',info);
          $('.front_product').html(htmlstr);
        }
      })
    },500)   
  }

  //一进入页面渲染
  render();

  //点击渲染
  $('.btn_search').click(function(){
     render();
  })

  //排序
  $('.search_nav li[data-type]').click(function(){
    $(this).addClass('current').siblings().removeClass('current');
    $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
    render();
  })
})