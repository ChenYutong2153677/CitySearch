<template>
    <meta name="referrer" content="no-referrer"/>
    <link href="https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.min.css" rel="stylesheet">
    <div class="detail_bg">
        <BackButton class="back_position"></BackButton>
        <div class="title animate__animated animate__rubberBand">
            Hi ! {{ city_name }}
        </div>
        <el-card class="content animate__animated animate__fadeInLeft" style="background-color: rgb(238,241,250);">
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
        <el-card class="content animate__animated animate__fadeInRight district_bg">
            <div class="card_title" >District</div>
            <DistrictName :districts="this.city_district_list" :province="this.city_province" v-if="city_district_list!=null||city_district_list!==undefined"></DistrictName>
        </el-card>
        <el-card class="content animate__animated animate__fadeInLeft society_bg">
            <div class="card_title" style="color: white">Society</div>
            <div class="news_list">
                <div v-for="news in city_society_news_list" :key="news.id">
                    <NewsCard :news="news"></NewsCard>
                </div>
            </div>
        </el-card>
        <el-card class="content  animate__animated animate__fadeInRight env_bg">
            <div class="card_title">Environment</div>
            <div>
                <WeatherCard :city_weather_all="this.city_weather_all"></WeatherCard>
            </div>
        </el-card>
<!--        <el-card class="content animate__animated animate__fadeInLeft">-->
<!--            <div class="card_title">Technology</div>-->
<!--        </el-card>-->
<!--        <el-card class="content  animate__animated animate__fadeInRight">-->
<!--            <div class="card_title">City data</div>-->
<!--        </el-card>-->
        <el-card class="content animate__animated animate__fadeInLeft map_bg">
            <div class="card_title">Online Map</div>
            <div>
                <BaiduMap v-if="city_latitude!='' && city_longitude!=''"
                    :city_latitude="this.city_latitude" :city_longitude="this.city_longitude"></BaiduMap>
            </div>
        </el-card>
    </div>
</template>
<script>
import BackButton from '../components/BackButton.vue'
import axios from 'axios'
import NewsCard from "@/components/NewsCard.vue";
import WeatherCard from "@/components/WeatherCard.vue";
import BaiduMap  from "@/components/BaiduMap.vue";
import DistrictName from "@/components/DistrictName.vue";
export default {
    name: 'DetailPage',
    components: {
        WeatherCard,
        NewsCard,
        BackButton,
        BaiduMap,
        DistrictName,
    },
    data() {
        return {
            city_name: '',
            city_general_info: '',
            city_img: '',
            city_society_news_list: [],
            city_latitude: '',//纬度
            city_longitude: '',//经度
            city_weather_all: {
                city_weather: '',
                city_weather_description: '',
                city_wind_speed: '',
                city_wind_deg: '',
                city_wind_gust: '',
                city_visiability: '',
                city_clouds: '',

                city_temperature: '',
                city_feels_like: '',
                city_temp_min: '',
                city_temp_max: '',
                city_pressure: '',
                city_humidity: '',
                city_sea_level: '',
                city_grnd_level: '',
            },
            city_district_list: [],
            city_province: '',
        }
    },
    created() {
        this.city_name = this.$route.query.input;
        console.log("new page:" + this.city_name);
        this.getCityGeneralInfo();
        this.getCitySocietyNews();
        this.getCityCoordinate();
        this.getCityDistrict();
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
        handleCitySocietyNewsPic() {
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
        },
        getCityCoordinate() {//获取城市经纬度
            axios
                .get("http://api.openweathermap.org/geo/1.0/direct", {
                    params: {
                        //?q={city name},{state code},{country code}&limit={limit}&appid={API key}
                        q: this.city_name,
                        limit: 1,
                        appid: "f02e1a20513d8b58beb9fb4e51dc87cc"
                    }
                })
                .then((res) => {
                    console.log("获取到城市经纬度了！")
                    console.log(res);
                    if (res.status == 200) {
                        this.city_latitude = res.data[0].lat;
                        this.city_longitude = res.data[0].lon;
                        console.log("纬度：" + this.city_latitude);
                        console.log("经度：" + this.city_longitude);
                        this.getCityEnvironmentInfo();
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getCityEnvironmentInfo() {
            //https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=f02e1a20513d8b58beb9fb4e51dc87cc
            axios
                .get("https://api.openweathermap.org/data/2.5/weather", {
                    params: {
                        lat: this.city_latitude,
                        lon: this.city_longitude,
                        appid: "f02e1a20513d8b58beb9fb4e51dc87cc"
                    }
                })
                .then((res) => {
                    console.log("获取到城市天气了！")
                    console.log(res)
                    if (res.status == 200) {
                        this.city_weather_all.city_weather = res.data.weather[0].main;
                        this.city_weather_all.city_weather_description = res.data.weather[0].description;
                        this.city_weather_all.city_wind_speed = res.data.wind.speed;
                        this.city_weather_all.city_wind_deg = res.data.wind.deg;
                        this.city_weather_all.city_wind_gust = res.data.wind.gust;
                        this.city_weather_all.city_visiability = res.data.visibility;
                        this.city_weather_all.city_clouds = res.data.clouds.all;
                        this.city_weather_all.city_temperature = res.data.main.temp;
                        this.city_weather_all.city_feels_like = res.data.main.feels_like;
                        this.city_weather_all.city_temp_min = res.data.main.temp_min;
                        this.city_weather_all.city_temp_max = res.data.main.temp_max;
                        this.city_weather_all.city_pressure = res.data.main.pressure;
                        this.city_weather_all.city_humidity = res.data.main.humidity;
                        this.city_weather_all.city_sea_level = res.data.main.sea_level;
                        this.city_weather_all.city_grnd_level = res.data.main.grnd_level;
                        this.handleCityTemperature();
                        this.handleCityWeatherblank();
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        handleCityTemperature(){
            this.city_weather_all.city_temperature=parseInt(this.city_weather_all.city_temperature-273.15);
            this.city_weather_all.city_feels_like=parseInt(this.city_weather_all.city_feels_like-273.15);
            this.city_weather_all.city_temp_min=parseInt(this.city_weather_all.city_temp_min-273.15);
            this.city_weather_all.city_temp_max=parseInt(this.city_weather_all.city_temp_max-273.15);
        },
        handleCityWeatherblank(){
            //常见天气中英转换
            if(this.city_weather_all.city_weather=="Clear"){
                this.city_weather_all.city_weather="晴";
            }
            if(this.city_weather_all.city_weather=="Clouds"){
                this.city_weather_all.city_weather="多云";
            }
            if(this.city_weather_all.city_weather=="Rain"){
                this.city_weather_all.city_weather="雨";
            }
            if(this.city_weather_all.city_weather=="Snow"){
                this.city_weather_all.city_weather="雪";
            }
            if(this.city_weather_all.city_weather=="Mist"){
                this.city_weather_all.city_weather="雾";
            }
            if(this.city_weather_all.city_weather=="Haze"){
                this.city_weather_all.city_weather="霾";
            }
            if(this.city_weather_all.city_weather=="Thunderstorm"){
                this.city_weather_all.city_weather="雷暴";
            }
            if(this.city_weather_all.city_weather=="Drizzle"){
                this.city_weather_all.city_weather="毛毛雨";
            }
            if(this.city_weather_all.city_weather=="Fog"){
                this.city_weather_all.city_weather="雾";
            }
            if(this.city_weather_all.city_sea_level==null||this.city_weather_all.city_sea_level==undefined||this.city_weather_all.city_sea_level==""){
                this.city_weather_all.city_sea_level="暂无 ";
            }
            if(this.city_weather_all.city_grnd_level==null||this.city_weather_all.city_grnd_level==undefined||this.city_weather_all.city_grnd_level==""){
                this.city_weather_all.city_grnd_level="暂无 ";
            }
            if(this.city_weather_all.city_wind_gust==null||this.city_weather_all.city_wind_gust==undefined||this.city_weather_all.city_wind_gust==""){
                this.city_weather_all.city_wind_gust="暂无 ";
            }

        },
        getCityDistrict(){
            axios
                .get(" https://www.mxnzp.com/api/address/search", {
                    params: {
                        type:1,
                        value: this.city_name,
                        app_id:"nthbnoflobuxtgrc",
                        app_secret:"AmCSM8d56gnGKjL1xb7Rngk7O9Raldh7"
                    }
                })
                .then((res) => {
                    console.log("获取到城市行政区信息了！")
                    console.log(res)
                    if (res.status == 200) {
                        this.city_district_list = res.data.data[0].pchilds[0].cchilds;
                        console.log(this.city_district_list);
                        //将city_district_name里的name重新赋值给city_district_name
                        for(let i=0;i<this.city_district_list.length;i++){
                            this.city_district_list[i]=this.city_district_list[i].name;
                        }
                        console.log(this.city_district_list);
                        this.city_province=res.data.data[0].name;
                    }

                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getWorldCityDistrict(){

        },
    },
}
</script>


<style scoped>
.district_bg{
    /*background-color:rgb(249,246,226);*/
    background-image: url('../assets/dis_bg.jpeg');
    background-size: cover;
}
.env_bg{
    background-image: url('../assets/weather_bg1.jpeg');
    background-size: cover;
}
.society_bg{
    background-image: url('../assets/newspaper.jpg');
    background-size: cover;
}
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