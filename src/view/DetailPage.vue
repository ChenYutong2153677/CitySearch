<template>
    <meta name="referrer" content="no-referrer"/>
    <link href="https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.min.css" rel="stylesheet">
    <div class="detail_bg">
        <BackButton class="back_position"></BackButton>
        <div class="title animate__animated animate__rubberBand">
            Hi ! {{ city_name }}
        </div>
        <el-card class="content animate__animated animate__fadeInLeft">
            <div class="card_title">General Information</div>
            <div>
                <el-row>
                    <el-col :span="12">
                        <div class="city_general_info">
                            {{ city_general_info }}
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <img :src="this.city_img" class="city_img"/>
                    </el-col>
                </el-row>
            </div>
        </el-card>
        <el-card class="content animate__animated animate__fadeInRight">
            <div class="card_title">Economy</div>
        </el-card>
        <el-card class="content animate__animated animate__fadeInLeft">
            <div class="card_title">Society</div>
            <div class="news_list">
                <div v-for="news in city_society_news_list" :key="news.id">
                    <NewsCard :news="news"></NewsCard>
                </div>
            </div>
        </el-card>
        <el-card class="content  animate__animated animate__fadeInRight">
            <div class="card_title">Environment</div>
        </el-card>
        <el-card class="content animate__animated animate__fadeInLeft">
            <div class="card_title">Technology</div>
        </el-card>
        <el-card class="content  animate__animated animate__fadeInRight">
            <div class="card_title">City data</div>
        </el-card>
        <el-card class="content animate__animated animate__fadeInLeft">
            <div class="card_title">Online Map</div>
            <baidu-map class="map" style="display: flex; flex-direction: column" center="北京">
                <p style="padding: 0 10px;">以下是使用 `bm-view` 组件渲染的百度地图实例</p>
                <bm-view style="width: 100%; height:100px; flex: 1"></bm-view>
            </baidu-map>
        </el-card>
    </div>
</template>
<script>
import BackButton from '../components/BackButton.vue'
import axios from 'axios'
import NewsCard from "@/components/NewsCard.vue";

export default {
    name: 'DetailPage',
    components: {
        NewsCard,
        BackButton
    },
    data() {
        return {
            city_name: '',
            city_general_info: '',
            city_img: '',
            city_society_news_list: []
        }
    },
    created() {
        this.city_name = this.$route.query.input;
        console.log("new page:" + this.city_name);
        this.getCityGeneralInfo();
        this.getCitySocietyNews();
    },
    methods: {
        getCityGeneralInfo() {
            axios
                .get("https://api.wer.plus/api/dub", {
                    params: {
                        t: this.city_name
                    }
                })
                .then((res) => {
                    console.log("获取到城市信息了！")
                    console.log(res)
                    var response = res.data
                    if (res.status == 200) {
                        this.city_general_info = response.data.text;
                        this.city_img = response.data.img_url;
                        console.log(this.city_img)
                        this.handleCityGeneralInfo();
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        handleCityGeneralInfo() {
            //删除最后一个句号后面的内容
            var index = this.city_general_info.lastIndexOf("。");
            this.city_general_info = this.city_general_info.substring(0, index + 1);
        },
        handleCitySocietyNewsPic(){
            //把图片的url为空的url替换为本地null.jpg
            for (var i = 0; i < this.city_society_news_list.length; i++) {
                if (this.city_society_news_list[i].picUrl == "") {
                    this.city_society_news_list[i].picUrl = require("../assets/null.jpg");
                }
            }
        },
        getCitySocietyNews() {
            axios
                .get("https://apis.tianapi.com/social/index", {
                    params: {
                        key: "a8311c8595ba809f23bcb1a3b4c9eeaf",
                        num: 5,
                        word: this.city_name
                    }
                })
                .then((res) => {
                    console.log("获取到城市社会新闻了！")
                    console.log(res)
                    var response = res.data
                    if (response.code == 200) {
                        this.city_society_news_list = response.result.newslist;
                        this.handleCitySocietyNewsPic();
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    },
}
</script>


<style scoped>
.city_img {
    width: 90%;
    margin-left: 30px;
    height: 300px;
}

.city_general_info {
    /*width: 50%;*/
    font-size: 17px;
    margin-left: 10px;
}

.back_position {
    position: absolute;
    left: 3%;
    top: 1.3%;
    z-index: 999;
}

.title {
    font-family: Bahnschrift;
    margin-top: 4%;
    font-size: 50px;
    text-align: center;
    color: white;
    margin-bottom: 3%;
    text-shadow: 0px 5px 5px rgba(0, 0, 0, 0.35);
}

.content {
    margin-top: 2%;
    margin-bottom: 3%;
    margin-left: 10%;
    width: 80%;
    /*height: 400px;*/
    border-radius: 30px;
    opacity: 0.9;
}

.card_title {
    font-size: 25px;
    margin-bottom: 2%;
    font-weight: bold;
    font-family: Bahnschrift;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.23);
}

.detail_bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    background-image: url('../assets/bg2.jpg');
    /*background-image: url('../assets/bg.webp');*/
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
}
</style>