  // 进度条
  $(document).ajaxStart(function(){
    NProgress.start();
  })

  $(document).ajaxStop(function(){
    setTimeout(function(){
      NProgress.done();
    },500)
  });


$(function(){

  //点击切换导航
  $('#category').click(function(){
    $(this).next().stop().slideToggle();
  })


  $(".main_top .icon_left").click(function(){
    $('.letao_aside').toggleClass('hidemenu');
    $(".letao_main").toggleClass('hidemenu');
    $('.main_top').toggleClass('hidemenu');
  })

  //模态框退出按钮
  $(".exit").click(function(){
    $.ajax({
      type: 'get',
      url: '/employee/employeeLogout',
      dataType: 'json',
      success: function(info){
        if(info.success){
          location.href = "login.html";
        }
      }
    })
  })
})