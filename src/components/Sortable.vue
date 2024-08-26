<template>
    <div>
        <vs-table>
            <template #thead>
                <vs-tr>
                    <vs-th>
                        name
                    </vs-th>
                </vs-tr>
            </template>
            <template #tbody >
                <div id="itxst">
                    <vs-tr
                        :key="index"
                        v-for="(item, index) in sortList"
                        :data-id="item.sort"
                    >
                        <vs-td>
                        {{ item.name }}
                        </vs-td>
                    </vs-tr>
                </div>
            </template>
        </vs-table>
    </div>
</template>
<script>
import Sortable from 'sortablejs'

export default {
    name: 'Sortable',
    props: ['sortList'],
    mounted() {
        //获取对象
        var el = document.getElementById('itxst');
        //设置配置
        var ops = {
            animation: 1000,
            //拖动结束
            onEnd: function (evt) {
                console.log(evt);
                //获取拖动后的排序
                var arr = sortable.toArray();
                alert(JSON.stringify(arr));
            }
        };
        //初始化
        var sortable = Sortable.create(el, ops);
    }
}
</script>