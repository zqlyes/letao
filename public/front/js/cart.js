$(function(){
 

  function render(){
    $.ajax({
      type: 'get',
      url: '/cart/queryCart',
      dataType: 'json',
      success: function(info){
        console.log(info);

        if(info.error === 400){
          location.href = "login.html?retUrl=" + location.href;
          return;
        }
  
        var htmlstr = template('cartTemp',{list: info});
        $('.mui-table-view').html(htmlstr);
      }
    })
  }

  render();

  $('.mui-table-view').on('click','.btn_delete',function(){
    var id = $(this).data('id');
    $.ajax({
       type:'get',
       url: '/cart/deleteCart',
       data: {
         id: [id],
       },
       dataType: 'json',
       success: function(info){
         console.log(info);
         render();
       }
    })
  })
})