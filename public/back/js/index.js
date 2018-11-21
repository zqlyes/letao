$(function(){
    // 基于准备好的dom，初始化echarts实例
    var echarts_left = echarts.init(document.getElementsByClassName('echarts_left')[0]);

    // 指定图表的配置项和数据
    var option1 = {
        title: {
            text: '2018年注册人数'
        },
        tooltip: {},
        legend: {
            data:['销量']
        },
        xAxis: {
            data: ["1月","2月","3月","4月","5月","6月"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [37, 20, 46, 32, 10, 26]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    echarts_left.setOption(option1);


    // 基于准备好的dom，初始化echarts实例
    var echarts_right = echarts.init(document.querySelector('.echarts_right'));

    // 指定图表的配置项和数据
    var option2 = {
      title : {
          text: '热门品牌销售',
          subtext: '2018年11月',
          x:'center'
      },
      tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
          orient: 'vertical',
          left: 'left',
          data: ['耐克','阿迪','阿迪王','阿迪达斯','老北京']
      },
      series : [
          {
              name: '热门品牌',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                  {value:335, name:'耐克'},
                  {value:310, name:'阿迪'},
                  {value:234, name:'阿迪王'},
                  {value:135, name:'阿迪达斯'},
                  {value:1548, name:'老北京'}
              ],
              itemStyle: {
                  emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
          }
      ]
  };

    // 使用刚指定的配置项和数据显示图表。
    echarts_right.setOption(option2);


})