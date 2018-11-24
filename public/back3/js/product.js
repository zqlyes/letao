$(function () {
    var currentPage = 1;
    var pageSize = 5;

    render();

    function render() {
        $.ajax({
            type: 'get',
            url: '/product/queryProductDetailList',
            data: {
                page: currentPage,
                pageSize: pageSize,
            },
            dataType: 'json',
            success: function (info) {
                // console.log(info);
                var str = template('tmp', info);
                $('tbody').html(str);

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }


    $('.add').click(function () {
        $("#addModal").modal("show");

        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: 1,
                pageSize: 100,
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                var htmlStr = template('addTmp', info);
                $('.dropdown-menu').html(htmlStr);
            }
        })
    })


    $('.dropdown-menu').on('click', 'a', function () {
        var txt = $(this).text();
        $('.changeCate').text(txt);
        var id = $(this).data("id");
        $('[name="brandId"]').val(id);

        // $('#form').data("bootstrapValidator").updateStatus('brandId', 'VALID');
    })



    var arr = [];
    $('#fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            console.log(data);
            var picObj = data.result;

            arr.unshift(picObj);
            var picUrl = picObj.picAddr;
            $(".imgBox").prepend('<img src="' + picUrl + '" style="width:100px" >')

            if (arr.length > 3) {
                //    console.log(arr.length);
                arr.pop();
                $('.imgBox img:last-of-type').remove();

            }

            // if (arr.length === 3) {
            //     $('#form').data("bootstrapValidator").updateStatus('picStatus', 'VALID');
            // }
        }
    })


    //配置表单校验
    $('#form').bootstrapValidator({

        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            brandId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请选择二级分类'
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: '请输入商品名称'
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: '请输入商品描述'
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: '请输入商品库存'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '商品库存必须是非零开头的数字'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: '请输入尺码',
                    },
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: "必须是xx-xx的格式，xx是两位数字，例如36-44"
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: "请输入商品原价"
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: "请输入商品现价"
                    }
                }
            },
            picStatus: {
                validators: {
                    notEmpty: {
                        message: "请上传3张图片"
                    }
                }
            }
        }
        

    });



    $("#form").on("success.form.bv", function (e) {
        e.preventDefault();

        var pstr = $('#form').serialize();
        pstr += "&picName1=" + arr[0].picName + " +&picAddr1=" + arr[0].picAddr;
        pstr += "&picName1=" + arr[1].picName + " +&picAddr1=" + arr[1].picAddr;
        pstr += "&picName1=" + arr[2].picName + " +&picAddr1=" + arr[2].picAddr;
    })


})