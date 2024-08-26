<template>
    <div class="hidden">
        <vs-navbar shadow square center-collapsed>
            <template #left>
                <vs-button @click="activeSidebar = !activeSidebar" flat icon>
                    <i class='bx bx-menu'></i>
                </vs-button>
            </template>
            <template #right>
                <vs-button icon color="#DB4437" @click="common.goTo('/gitee')">
                    <i class='bx bxl-github'></i>
                </vs-button>
                <vs-button icon color="#000000" @click="common.goTo('/github')" style="margin-right: 30px;">
                    <i class='bx bxl-github'></i>
                </vs-button>
                <vs-avatar circle @click="common.goTo('/blog')">
                    <img src="https://cdn.jsdelivr.net/gh/RecklessZhang/vueblogger-plus-drawbed/vueblogger-plus/config/boy.png"
                        alt="">
                </vs-avatar>
            </template>

        </vs-navbar>
        <vs-sidebar absolute :open.sync="activeSidebar">
            <vs-sidebar-item>
                <vs-input type="date" label-placeholder="startTime" v-model="config.start_date">
                    <template #icon>
                        <i class='bx bx-time'></i>
                    </template>
                </vs-input>
            </vs-sidebar-item>
            <vs-sidebar-item>
                <vs-input type="number" label-placeholder="averageRemain" v-model="config.average_remain">
                    <template #icon>
                        <i class='bx bx-wallet'></i>
                    </template>
                </vs-input>
            </vs-sidebar-item>
            <vs-sidebar-item>
                <vs-button @click="() => { activeSortable = true; activeSidebar = false; }">Sort List</vs-button>
            </vs-sidebar-item>
            <template #footer>
                <vs-row justify="center">
                    <vs-col w="12" style="margin-bottom: 10px;">
                        <span style="color: green; font-size: large;">
                            <i class='bx bxs-chevrons-up'></i>
                            {{ config.totalEarn }}
                        </span>
                    </vs-col>
                    <vs-col w="12" style="margin-bottom: 10px;">
                        <span style="color: red; font-size: large;">
                            <i class='bx bxs-chevrons-down'></i>
                            {{ config.totalCost }}
                        </span>
                    </vs-col>
                    <vs-col w="12" style="margin-bottom: 10px;">
                        <span style="color: gold; font-size: large;">
                            <i class='bx bx-wallet'></i>
                            {{ config.totalRemain }}
                        </span>
                    </vs-col>
                    <vs-button @click="() => { activeDialog = true; activeSidebar = false; }">Add one</vs-button>
                </vs-row>
            </template>
        </vs-sidebar>

        <RainbowPig></RainbowPig>
        <TimeLine :dataList="dataList"></TimeLine>

        <vs-dialog v-model="activeDialog" prevent-close>
            <template #header>
                <h4 class="not-margin">
                    Add a <b>Target</b>
                </h4>
            </template>

            <div class="con-form">
                <vs-input success type="text" v-model="target.name" placeholder="name" />
                <vs-input success type="number" v-model="target.price" placeholder="price" />
                <vs-input success type="number" v-model="target.count" placeholder="count" />
            </div>

            <template #footer>
                <div class="footer-dialog">
                    <vs-button block style="margin-top: 10px;" @click="addTarget(false)">
                        Continue Add
                    </vs-button>
                    <vs-button success block style="margin-top: 10px;" @click="addTarget(true)">
                        Complete
                    </vs-button>
                </div>
            </template>
        </vs-dialog>

        <vs-dialog prevent-close v-model="activeSortable">
            <Sortable :sortList="sortList"></Sortable>
        </vs-dialog>
    </div>
</template>
<script>
import TimeLine from '../components/TimeLine.vue'
import axios from "axios"
import Sortable from '../components/Sortable.vue'
import RainbowPig from '../components/common/Loading.vue'

export default {
    name: 'Home',
    data: () => ({
        activeSidebar: false,
        activeDialog: false,
        activeSortable: false,

        target: {
            name: '',
            price: '',
            count: ''
        },

        config: {},
        dataList: [],
        sortList: [],

        list: [
            {
                name: 'Joao',
                id: '1'
            },
            {
                name: 'Jean',
                id: '2'
            },
            {
                name: 'Johanna',
                id: '3'
            },
            {
                name: 'Juan',
                id: '4'
            }
        ]

    }),
    components: {
        TimeLine,
        Sortable,
        RainbowPig
    },
    methods: {
        // 新增目标
        addTarget(flag) {
            axios
            .get('https://iperk-api.qnmdmyy.top/api/addTarget?name=' + this.target.name + "&count=" + this.target.count + "&price=" + this.target.price)
            .then(() => {
                this.activeDialog = false
                this.initTarget()
                this.getTargets()
            })

            if (!flag) {
                this.initTarget()
            }
        },

        // 获取数据列表
        getTargets() {
            axios
            .get('https://iperk-api.qnmdmyy.top/api/getConfig')
            .then(res => {
                let config = res.data[0]
                this.config = config

                axios
                .get('https://iperk-api.qnmdmyy.top/api/getTargets')
                .then(resp => {
                    var dataList = resp.data

                    // 截止到今天赚了多少
                    const days = Math.ceil((new Date().getTime() - new Date(this.config.start_date).getTime()) / (1000 * 3600 * 24))
                    const totalEarn = days * this.config.average_remain

                    // 截止到今天允许的花销
                    let totalCost = 0

                    // 当前商品之前的总计花销
                    let beforeCost = 0
                    // 当前商品+当前商品之前的总计花销
                    let nowCost = 0

                    // 需要发送邮件的信息
                    let sendDataList = []

                    for (let i = 0; i < dataList.length; i++) {
                        let data = dataList[i]

                        if ((data.price * data.count + totalCost) < totalEarn) {
                            data.status = 'done'
                            if (data.is_send_email === '0') {
                                sendDataList.push(data)
                            }
                            totalCost += data.price * data.count
                        }else {
                            data.status = 'working'
                        }

                        if (i !== 0) {
                            beforeCost = nowCost
                            nowCost += beforeCost + data.price * data.count
                        }else {
                            nowCost = data.price * data.count
                        }
                        let needDays = Math.ceil(nowCost / 100);
                        let targetDate = new Date(this.config.start_date);
                        targetDate.setDate(targetDate.getDate() + needDays);
                        const year = targetDate.getFullYear();
                        const month = String(targetDate.getMonth() + 1).padStart(2, '0');
                        const day = String(targetDate.getDate()).padStart(2, '0');
                        const target_date_str = `${year}-${month}-${day}`;
                        data.target_date_str = target_date_str

                        let sortItem = {}
                        sortItem.sort = data.sort
                        sortItem.name = data.name
                        this.sortList.push(sortItem)
                    }
                    this.dataList = dataList
                    this.config.totalEarn = totalEarn
                    this.config.totalCost = totalCost
                    this.config.totalRemain = totalEarn - totalCost
                })
            })
        },

        initTarget() {
            this.target.name = ''
            this.target.price = ''
            this.target.count = ''
        }
    },
    created() {
        this.getTargets()
    }
}
</script>
<style>
.not-margin {
    margin: 0px;
    font-weight: normal;
    padding: 10px;
}

.con-form {
    width: 100%;
}

.con-form .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.con-form .flex a {
    font-size: 0.8rem;
    opacity: 0.7;
}

.con-form .flex a:hover {
    opacity: 1;
}

.con-form .vs-checkbox-label {
    font-size: 0.8rem;
}

.con-form .vs-input-content {
    margin: 10px 0px;
    width: calc(100%);
}

.con-form .vs-input-content .vs-input {
    width: 100%;
}

.footer-dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: calc(100%);
}

.footer-dialog .new {
    margin: 0px;
    margin-top: 20px;
    padding: 0px;
    font-size: 0.7rem;
}

.footer-dialog .new a {
    margin-left: 6px;
}

.footer-dialog .new a:hover {
    text-decoration: underline;
}

.footer-dialog .vs-button {
    margin: 0px;
}
</style>
