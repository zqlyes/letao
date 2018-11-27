$(function(){


  $('#loginBtn').click(function(){
    var username = $('#username').val();
    var password = $('#password').val();
    
    if(username === ''){
      mui.toast('请输入用户名');
      return;
    }
  
    if(password === ''){
      mui.toast('请输入密码');
      return;
    }
  
    $.ajax({
      type: 'post',
      url: '/user/login',
      data: {
        username : username,
        password: password,
      },
      dataType: 'json',
      success: function(info){
        console.log(info);
        if(info.error === 403){
          mui.toast('用户名或密码错误');
          return;
        }
        
        if(info.success){
          var retUrl = location.search.slice(8);
          console.log(retUrl);
          if(location.search.indexOf('retUrl') != -1){
            location.href = retUrl;
          }else{
            location.href = "user.html";
          }
        }

      }
    })
  })

  
})