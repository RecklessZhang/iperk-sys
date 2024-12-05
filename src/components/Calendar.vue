<template>
    <div style="width: 100%;">
        <div style="height: 250px;" ref="tripContainer"></div>
    </div>
  </template>

<script>
export default {
  props: ['contributionData'],
  mounted () {
    this.initDate()
  },
  data () {
    return {
    }
  },
  created () {

  },
  methods: {
    initDate: function () {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.echarts.init(this.$refs.tripContainer)
      var option

      var data = this.contributionData
      option = {
        tooltip: {
          trigger: 'item'
        },
        calendar: [{
          left: 'center',
          range: '2016',
          splitLine: {
            show: true,
            lineStyle: {
              color: '#000',
              width: 0,
              type: 'solid'
            }
          },
          yearLabel: {
            show: false
          },
          monthLabel: {
            nameMap: 'en',
            textStyle: {
              color: '#000000'
            },
            fontWeight: 'bold'
          },
          dayLabel: {
            nameMap: 'en',
            textStyle: {
              color: '#000000'
            },
            fontWeight: 'bold'
          },
          itemStyle: {
            normal: {
              color: '#EEEEEE',
              borderWidth: 1,
              borderColor: '#fff'
            }
          }
        }],
        series: [
          {
            name: '出差',
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: data,
            itemStyle: {
              normal: {
                // color: '#DB4437'
                color: '#44A340'
              }
            }
          }
        ]
      }

      myChart.setOption(option)
    }
  }
}

</script>
