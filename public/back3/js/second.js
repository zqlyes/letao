

$(function(){
    var currentPage = 1;
    var pageSize = 5;

    render();
    function render(){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            dataType:'json',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(info){
                // console.log(info);
                var str = template("secondTmp",info);
                $("tbody").html(str);

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:info.page,
                    totalPages:Math.ceil(info.total/info.size),
                    onPageClicked:function(a,b,c,page){
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }



//点击添加按钮弹出模态框，发送ajax渲染下拉菜单
    $(".addcate").click(function(){
        $("#secondModal").modal("show");

        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:1,
                pageSize:100,
            },
            dataType:'json',
            success:function(info){
                console.log(info);
                var htmlStr = template("cateTmp",info);
                $('.dropdown-menu').html(htmlStr);
            }
        })
    })

//给下拉菜单添加选中功能
$(".dropdown-menu").on("click",'a',function(){
    var txt = $(this).text();
    $('.cate-text').text(txt);

    // 获取a中的自定义属性存储的id赋值给隐藏域，用于提交
    var id = $(this).data("id");
    $('[name="categoryId"]').val(id);

    //手动将隐藏域的校验状态改为成功
    $('#form').data("bootstrapValidator").updateStatus('categoryId','VALID');

    
})
    // 调用fileUpload方法，发送文件上传请求
   $("#fileupload").fileupload({
       dataType:"json",
       done:function(e,data){
        //    console.log(data);

        var result = data.result;
        var picUrl = result.picAddr;

        $("#imgBox img").attr("src",picUrl);
        $('[name="brandLogo"]').val(picUrl);

        $('#form').data("bootstrapValidator").updateStatus("brandLogo","VALID");
        
       }
   })


    // 添加表单校验
    $("#form").bootstrapValidator({
        //设置排除项
        excluded:[],
        // 配置小图标
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',   // 校验成功
        invalid: 'glyphicon glyphicon-remove',   // 校验失败
        validating: 'glyphicon glyphicon-refresh'  // 校验中
      },

    //   配置校验字段

    fields:{
        categoryId:{
            validators:{
                notEmpty:{
                    message:'请选择一级分类'
                }
            }
        },
        brandName:{
            validators:{
                notEmpty:{
                    message:'请输入二级分类'
                }
            }
        },
        brandLogo:{
            validators:{
                notEmpty:{
                    message:"请上传图片"
                }
            }
        }
    }
    })



    $('#form').on("success.form.bv",function(e){
        e.preventDefault();

        $.ajax({
            type:'post',
            url:'/category/addSecondCategory',
            data:$('#form').serialize(),
            dataType:'json',
            success:function(info){
                // console.log(info);
                if(info.success){
                    currentPage = 1;
                    render();
                }

                $('#form').data("bootstrapValidator").resetForm(true);
                $('.cate-text').text('请选择一级分类');
                $('#imgBox img').attr("src","./images/none.png");
            }
      
    })
       
    })
}) 