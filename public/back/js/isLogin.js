$(function(){
  //登录拦截
  $.ajax({
    type: 'get',
    url: '/employee/checkRootLogin',
    dataType: 'json',
    success: function(info){
      if(info.success){
        console.log("给用户已登录");
      }
      if(info.error === 400){
        location.href = "login.html";
      }
    }
  })
})