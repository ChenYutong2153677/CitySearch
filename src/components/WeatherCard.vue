<template>
    <el-row>
        <el-col :span="12">
            <el-card class="weather  box1">
                <div class="weather_title">{{city_weather_all.city_weather}}</div>
                <div class="weather_description">({{city_weather_all.city_weather_description}})</div>
                <el-row>
                    <el-col :span="12">
                        <div class="data2">风速：{{city_weather_all.city_wind_speed}}m/s</div>
                        <div class="data2">阵风：{{city_weather_all.city_wind_gust}}m/s</div>
                        <div class="data2">混浊度：{{city_weather_all.city_clouds}}%</div>
                    </el-col>
                    <el-col :span="12">
                        <div class="data2">风向：{{city_weather_all.city_wind_deg}}度</div>
                        <div class="data2">可见度：{{city_weather_all.city_visiability}}千米</div>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
        <el-col :span="12">
            <el-card class="temperature  box1">
                <div class="temperature_title">{{city_weather_all.city_temperature}}°C</div>
                <el-row>
                    <el-col :span="13">
                        <div class="data">最高温：{{city_weather_all.city_temp_max}}°C</div>
                        <div class="data">体感：{{city_weather_all.city_feels_like}}°C</div>
                        <div class="data">海平面大气压力：{{city_weather_all.city_sea_level}}hPa</div>
                    </el-col>
                    <el-col :span="11">
                        <div class="data">最低温：{{city_weather_all.city_temp_min}}°C</div>
                        <div class="data">湿度：{{city_weather_all.city_humidity}}%</div>
                        <div class="data">地面大气压力：{{city_weather_all.city_grnd_level}}hPa</div>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
    </el-row>
</template>
<script>
export default {
    name: 'WeatherCard',
    props: ["city_weather_all"],
    components: {},
    data() {
        return {}
    },
    methods: {
    },
}
</script>

<style scoped>
.temperature_title{
    font-size: 35px;
    font-weight: bold;
    text-align: center;
    margin-top: 25px;
    margin-bottom: 30px;
}
.data{
    font-size: 17px;
    margin: 20px 0;
}
.data2{
    font-size: 17px;
    margin: 20px 0;
    margin-left: 30px;
}
.weather_title{
    font-size: 35px;
    font-weight: bold;
    text-align: center;
    margin-top: 20px;
}
.weather_description{
    font-size: 20px;
    text-align: center;
    margin-bottom: 10px;
}
.box1{
    width: 90%;
    height: 280px;
    margin: 20px auto;
    margin-bottom: 40px;
}
</style>