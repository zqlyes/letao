mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005 ,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  indicators: false,
});


//解析url地址栏数据
function getSearch(key){
  var url = decodeURI(location.search);

  url = url.slice(1);
  
  var arr = url.split('&');
  
  var obj = {};

  arr.forEach(function(v,i){
    var key = v.split('=')[0];
    var value = v.split('=')[1];
  
    obj[key] = value;
  })

  return obj[key];
}
