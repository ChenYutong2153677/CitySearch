<template>
    <div v-if="!foreign">
        <div class="title" style="padding-bottom: 10px">所属省/直辖市：</div>
        <div class="province_box">
            <span class="province">{{ province }}</span>
        </div>
        <div class="title">行政区：</div>
        <div class="district-list">
            <div v-for="district in districts" :key="district.id" class="district-item">
                {{ district }}
            </div>
        </div>
    </div>
    <div v-if="foreign" class="foreign">
        此城市为国外城市，该api无国外城市行政区相关数据呀，抱歉！
    </div>
</template>

<script>
export default {
    name: 'DistrictName',
    props: {
        districts: Array,
        province: String,
        foreign: Boolean,//true:国外，false:国内
    },
    data() {
        return {}
    },
    methods: {},
}
</script>

<style scoped>
.foreign{
    font-size: 16px;
    font-weight: bold;
    color:black;
}
.province {
    padding: 10px; /* 设置上下间距 */
    background-color: #ffffff; /* 可选：设置背景颜色或其他样式 */
    border-radius: 5px;
}

.province_box {
    height: 40px;
}

.title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
}

.district-list {
    display: flex; /* 使用 Flex 布局，横向排列 */
    flex-wrap: wrap; /* 允许换行 */
    gap: 10px; /* 设置水平间距 */
}

.district-item {
    padding: 10px; /* 设置上下间距 */
    background-color: #ffffff; /* 可选：设置背景颜色或其他样式 */
    border-radius: 5px;
}
</style>