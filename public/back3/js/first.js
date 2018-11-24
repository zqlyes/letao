

$(function(){
    var currentPage = 1;
    var pageSize = 5;
    render();
    function render(){
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            dataType:'json',
            data:{
                page:currentPage,
                pageSize:pageSize,
            },
            success:function(info){
                // console.log(info);
                var str = template('firstTmp',info);
                $('tbody').html(str);

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:info.page,
                    totalPages:Math.ceil(info.total/info.size),
                    onPageClicked:function(a,b,c,page){
                        // console.log(page);
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }

//点击添加按钮出现模态框
    $(".addbtn").click(function(){
        $("#addModal").modal("show");
    })


//表单验证
 $("#form").bootstrapValidator({
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      fields: {
        //校验用户名，对应name表单的name属性
        categoryName: {
          validators: {
            //不能为空
            notEmpty: {
              message: '请输入一级分类名称'
            },
        }
    }
}
 })


 $("#form").on("success.form.bv",function(e){
     e.preventDefault();

     $.ajax({
         type:'post',
         url:'/category/addTopCategory',
         dataType:'json',
         data:$("#form").serialize(),
         success:function(info){
            // console.log(info);
            if(info.success){
                $("#addModal").modal("hide");
                currentPage = 1;
                render();
                
                $("#form").data("bootstrapValidator").resetForm(true);
            }
         }
     })

 })
})


