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
                <vs-input type="date" label-placeholder="startTime" v-model="$store.state.globalConfig.outStartDateStr">
                    <template #icon>
                        <i class='bx bx-time'></i>
                    </template>
                </vs-input>
            </vs-sidebar-item>
            <vs-sidebar-item>
                <vs-input type="number" label-placeholder="averageRemain"
                    v-model="$store.state.globalConfig.averageRemain">
                    <template #icon>
                        <i class='bx bx-wallet'></i>
                    </template>
                </vs-input>
            </vs-sidebar-item>
            <template #footer>
                <vs-row justify="center">
                    <vs-col w="12" style="margin-bottom: 10px;">
                        <span style="color: green; font-size: large;">
                            <i class='bx bxs-chevrons-up'></i>
                            {{ $store.state.globalConfig.totalEarn }}
                        </span>
                    </vs-col>
                    <vs-col w="12" style="margin-bottom: 10px;">
                        <span style="color: red; font-size: large;">
                            <i class='bx bxs-chevrons-down'></i>
                            {{ $store.state.globalConfig.totalCost }}
                        </span>
                    </vs-col>
                    <vs-col w="12" style="margin-bottom: 10px;">
                        <span style="color: gold; font-size: large;">
                            <i class='bx bx-wallet'></i>
                            {{ $store.state.globalConfig.totalRemain }}
                        </span>
                    </vs-col>

                    <vs-col w="12" style="margin-bottom: 10px;">
                        <span style="color: gold; font-size: large;">
                            <i class='bx bx-wallet'></i>
                            {{ testData }}
                        </span>
                    </vs-col>
                    <!-- <vs-button @click="() => { activeDialog = true; activeSidebar = false; }">Add one</vs-button> -->
                    <vs-button @click="() => { testData++; }">Add one</vs-button>
                </vs-row>
            </template>
        </vs-sidebar>

        <TimeLine></TimeLine>

        <vs-dialog v-model="activeDialog" prevent-close>
            <template #header>
                <h4 class="not-margin">
                    Add a <b>Target</b>
                </h4>
            </template>

            <div class="con-form">
                <vs-input success type="text" v-model="target.name" placeholder="name" />
                <vs-input success type="number" v-model="target.price" placeholder="price" />
            </div>

            <template #footer>
                <div class="footer-dialog">
                    <vs-button block style="margin-top: 10px;" @click="addNewTarget(false)">
                        Continue Add
                    </vs-button>
                    <vs-button success block style="margin-top: 10px;" @click="addNewTarget(true)">
                        Complete
                    </vs-button>
                </div>
            </template>
        </vs-dialog>
    </div>
</template>
<script>
import TimeLine from '../components/TimeLine.vue'

export default {
    name: 'Home',
    data: () => ({
        activeSidebar: false,
        activeDialog: false,

        target: {
            name: '',
            price: 0,
            isSendEmail: '0',
            status: 'working',
            targetDateStr: ''
        },

        testData: 0
    }),
    components: {
        TimeLine
    },
    methods: {
        addNewTarget(flag) {
            if (this.target.name != '' && this.target.price !== 0) {
                this.target.order = this.$store.state.dataList.length + 1
                this.$store.state.dataList.push(this.target)
                console.log(this.target)
                this.$store.commit('UPDATE_DATALIST')
                
                console.log(this.$store.state.dataList)

                // this.target.name = ''
                // this.target.price = 0
                if (flag) {
                    this.activeDialog = false
                }
            }
        }
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