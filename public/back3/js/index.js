$(function(){
    var left = echarts.init(document.getElementById('chart_left'));

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '2018年注册人数'
            },
            tooltip: {
                show:true,
                trigger:"人数",
                trigger:"销量"
            },
            legend: {
                show:true,
                data:['人数',"销量"],
               
            },
           
            xAxis: {
                data: ["1月","2月","3月","4月","5月","6月"]
            },
            yAxis: {},
            series: [{
                name: '人数',
                type: 'bar',
                data: [300, 500, 1200, 800, 400, 400]
            },
            {
                name: '销量',
                type: 'bar',
                data: [1254, 768, 980, 1009, 1123, 890]
            }],
        
            
        };

        // 使用刚指定的配置项和数据显示图表。
        left.setOption(option);



        var right = echarts.init(document.getElementById('chart_right'));

        // 指定图表的配置项和数据
        var option = {
            title : {
                text: '热门品牌销售',
                subtext: '2018年11月',
                x:'center',
                textStyle:{
                    color:"red",
                    fontSize:20
                }
            },
          
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['耐克','阿迪','百伦','特步','安踏']
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
                        {value:234, name:'百伦'},
                        {value:135, name:'特步'},
                        {value:1548, name:'安踏'}
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
        right.setOption(option);


})