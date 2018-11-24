

// 判断是否登录

$.ajax({
    type:'get',
    url:'/employee/checkRootLogin',
    dataType:'json',
    success:function(info){
        console.log(info);
        if(info.success){
            console.log("该用户已经登录");
        }
        if(info.error === 400){
            location.href = "login.html";
        }
    }
})