$(function(){
  // console.log(localStorage.search_list);
  // console.log(localStorage.getItem('search_list'));

  var arr = [];
  
  //获取历史记录（查询所有记录）
  function getHistory(){
    var jsonstr = localStorage.getItem('search_list') || '[]';
    arr = JSON.parse(jsonstr);
    console.log(arr);
  
    var htmlstr = template('hisTemp',{list: arr});
    $('.history').html(htmlstr);
  }
  getHistory();


  //搜索(增加一条记录)
  $('.btn_search').click(function(){
    var txt = $('input').val();
    if(txt == ''){
      mui.toast('请输入搜索关键字',{ duration:'short', type:'div' }) 
      return;
    }

   
    var arrIndex = arr.indexOf(txt);
    if(arrIndex != -1){
      arr.splice(arrIndex,1);
    }

    if(arr.length >= 10){
      arr.pop();
    }

    arr.unshift(txt);

    var jsonstr = JSON.stringify(arr);
    localStorage.setItem('search_list',jsonstr);
    
    getHistory();
    $('input').val('');

    location.href = "search_list.html?key=" + txt;
  })
 

  //删除一条记录
  $('.history').on('click','.btn-del',function(){
    var arrIndex = $(this).data('id');

    arr.splice(arrIndex,1);

    var jsonstr = JSON.stringify(arr);
    localStorage.setItem('search_list',jsonstr);
    getHistory();

  })

  //清空所有记录
  $('.history').on('click','.btn_dels',function(){
    mui.confirm('你确定要清空历史记录吗？','温馨提示',['取消','确定'],getBtnId,'div')

    function getBtnId(e){
      if(e.index === 1){
        localStorage.removeItem('search_list');
        getHistory();
      }
    }
  })


})