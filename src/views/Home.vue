<template>
    <div class="pt-10">
      <div class="grid-4_xs-1_sm-2_md-2">
        <div
            :key="index"
            v-for="(labelCard, index) in labelCardList"
            class="col w-full"
        >
          <ExchangeLink
              :title="labelCard.title"
              :icon="labelCard.icon"
              :detail="labelCard.detail"
              :url="labelCard.url"
              class="text-align-center"
          />
        </div>
      </div>

      <div class="w-full" style="min-height: 30vh;" ref="tripBar1"></div>

      <div class="grid-3_xs-1_sm-2_md-2 mt-10">
        <div class="col" ref="earnExpensePie" style="min-height: 30vh;"></div>
        <div class="col" ref="tripBar" style="min-height: 30vh"></div>
        <div class="col" ref="tripBar2" style="min-height: 30vh;"></div>
      </div>

      <div class="grid-2_xs-1_sm-2_md-2 mt-10">
        <div class="col" style="min-height: 30vh; background-color: pink;"></div>
        <div class="col" style="min-height: 30vh; background-color: green;"></div>
      </div>
    </div>
</template>
<script>
import ExchangeLink from "../components/ExchangeLink.vue";
export default {
    name: 'Home',
    components: {
      ExchangeLink
    },
    data() {
      return {
        labelCardList: [
          {
            id: 1,
            title: "累计出项",
            detail: "<span style='color: red;'>¥ 128</span>",
            icon: "bx bxs-angry",
            url: "/expense"
          },
          {
            id: 2,
            title: "累计进项",
            detail: "<span style='color: green;'>¥ 128</span>",
            icon: "bx bx-dollar",
            url: "/earn"
          },
          {
            id: 3,
            title: "本月出差",
            detail: "<span style='color: dodgerblue;'>20 Days</span>",
            icon: "bx bxs-calendar",
            url: "/trip"
          },
          {
            id: 4,
            title: "心愿单",
            detail: "<span style='color: green;'>1</span>/10",
            icon: "bx bxs-cart-alt",
            url: "/wish"
          }
        ]
      }
    },
    methods: {
      initTripBar2() {
        var chartDom = this.$refs.tripBar2;
        var myChart = this.echarts.init(chartDom);
        var option;

        option = {
          title: {
            text: 'Basic Radar Chart'
          },
          legend: {
            data: ['Allocated Budget', 'Actual Spending']
          },
          radar: {
            // shape: 'circle',
            indicator: [
              { name: 'Sales', max: 6500 },
              { name: 'Administration', max: 16000 },
              { name: 'Information Technology', max: 30000 },
              { name: 'Customer Support', max: 38000 },
              { name: 'Development', max: 52000 },
              { name: 'Marketing', max: 25000 }
            ]
          },
          series: [
            {
              name: 'Budget vs spending',
              type: 'radar',
              data: [
                {
                  value: [4200, 3000, 20000, 35000, 50000, 18000],
                  name: 'Allocated Budget'
                },
                {
                  value: [5000, 14000, 28000, 26000, 42000, 21000],
                  name: 'Actual Spending'
                }
              ]
            }
          ]
        };

        option && myChart.setOption(option);

      },
      initTripBar1() {
        var chartDom = this.$refs.tripBar1;
        var myChart = this.echarts.init(chartDom);
        var option;

        option = {
          title: {
            text: 'Stacked Area Chart'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: 'Email',
              type: 'line',
              stack: 'Total',
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: 'Union Ads',
              type: 'line',
              stack: 'Total',
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: 'Video Ads',
              type: 'line',
              stack: 'Total',
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: 'Direct',
              type: 'line',
              stack: 'Total',
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: 'Search Engine',
              type: 'line',
              stack: 'Total',
              label: {
                show: true,
                position: 'top'
              },
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        };

        option && myChart.setOption(option);

      },
      initTripBar() {
        var chartDom = this.$refs.tripBar;
        var myChart = this.echarts.init(chartDom);
        var option;

        // prettier-ignore
        let dataAxis = ['点', '击', '柱', '子', '或', '者', '两', '指', '在', '触', '屏', '上', '滑', '动', '能', '够', '自', '动', '缩', '放'];
// prettier-ignore
        let data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
        let yMax = 500;
        let dataShadow = [];
        for (let i = 0; i < data.length; i++) {
          dataShadow.push(yMax);
        }
        option = {
          title: {
            text: '特性示例：渐变色 阴影 点击缩放',
            subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
          },
          xAxis: {
            data: dataAxis,
            axisLabel: {
              inside: true,
              color: '#fff'
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            z: 10
          },
          yAxis: {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#999'
            }
          },
          dataZoom: [
            {
              type: 'inside'
            }
          ],
          series: [
            {
              type: 'bar',
              showBackground: true,
              itemStyle: {
                color: new this.echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#83bff6' },
                  { offset: 0.5, color: '#188df0' },
                  { offset: 1, color: '#188df0' }
                ])
              },
              emphasis: {
                itemStyle: {
                  color: new this.echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#2378f7' },
                    { offset: 0.7, color: '#2378f7' },
                    { offset: 1, color: '#83bff6' }
                  ])
                }
              },
              data: data
            }
          ]
        };
// Enable data zoom when user click bar.
        const zoomSize = 6;
        myChart.on('click', function (params) {
          console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
          myChart.dispatchAction({
            type: 'dataZoom',
            startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
            endValue:
                dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
          });
        });

        option && myChart.setOption(option);

      },
      initEarnExpensePie() {
        var chartDom = this.$refs.earnExpensePie
        var myChart = this.echarts.init(chartDom);
        var option;

        option = {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '5%',
            left: 'center'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              padAngle: 5,
              itemStyle: {
                borderRadius: 10
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 40,
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' }
              ]
            }
          ]
        };

        option && myChart.setOption(option);

      }
    },
    mounted() {
      this.initEarnExpensePie();
      this.initTripBar();
      this.initTripBar1();
      this.initTripBar2();
    }
}
</script>
<style>
</style>
