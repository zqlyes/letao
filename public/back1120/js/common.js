$(function(){
     // 0、发送ajax请求，验证用户是否登录了(登录拦截)

     $.ajax({
      type:'get',
      url: '/employee/checkRootLogin',
      dataType: 'json',
      success: function(info){
        if(info.success){
          console.log("用户已登录");
        }
        if(info.error === 400){
          location.href = "login.html";
        }
      }
    })
 

  // 1、公共的二级菜单切换功能

    $('#category').click(function(){
      $(this).next().slideToggle();
    });


  // 2、公共的菜单栏切换功能

    $('.letao_top .pull-left').click(function(){
      $('.letao').toggleClass('hiddenmenu');
      $('.letao_aside').toggleClass('hiddenmenu');
      $('.letao_top').toggleClass('hiddenmenu');
    });

  // 3、添加退出模态框
    $('.letao_top .pull-right').click(function(){
      $('#exitModal').modal('show');
    });
   
  //4、退出登录功能
    $('.btn_exit').click(function(){
      $.ajax({
        type: 'get',
        url: '/employee/employeeLogout',
        dataType: 'json',
        success: function(info){
          if(info.success){
            $('#exitModal').modal('hide');
            location.href = "login.html";
          }
        }
      })
    });
})


