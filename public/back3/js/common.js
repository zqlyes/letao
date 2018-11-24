$(document).ajaxStart(function(){
    NProgress.start();
})
$(document).ajaxStop(function(){
    setTimeout(function(){
        NProgress.done();
    },500)
})

// 进度条
$(function(){
   // 公用的功能

$(".category").click(function(){
    $(this).next().stop().slideToggle();
})

// 左侧菜单栏切换

$(".top .left").click(function(){
    $('.lt_aside').toggleClass("hidemenu");
    $('.top').toggleClass("hidemenu");
    $('.main').toggleClass("hidemenu");  
})


//点击退出

$(".top .right").click(function(){
    $("#myModal").modal("show");
})


$(".loginout").click(function(){
    $.ajax({
        type:'get',
        url:'/employee/employeeLogout',
        dataType:"json",
        success:function(info){
            // console.log(info);
            if(info.success){
                location.href = "login.html";
            }
        }
    })
})
})


