$(function(){
  
  $.ajax({
    type: 'get',
    url: '/user/queryUserMessage',
    dataType: 'json',
    success: function(info){
      console.log(info);
      if(info.error === 400){
        location.href = "login.html";
        return;
      }

      var htmlstr = template('userTemp',info);
      $('.mui-media-body').html(htmlstr);
    }
  })

  
  $('#logout').click(function(){
    $.ajax({
      type: 'get',
      url: '/user/logout',
      dataType: 'json',
      success: function(info){
        console.log(info);
        location.href = "login.html";
      }
    })
  })

})