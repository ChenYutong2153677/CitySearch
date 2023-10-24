<template>
    <div>
        <BMap
                ak="ojjuMMN8M12f95S5Cp4Uc1x1TSQPlOZE"
                :plugins="['TrackAnimation']"

                :center="{
                    lng: this.lng,
                    lat: this.lat
                  }"
                :zoom="12"
                :minZoom="0"
                :mapType="BMAP_NORMAL_MAP"
                :enableDragging=true
                :enableInertialDragging=true
                :enableScrollWheelZoom=true
                :enableContinuousZoom=true
        />
    </div>
</template>

<script>
import {BMap} from 'vue3-baidu-map-gl'

export default {
    name: 'BaiduMap',
    components: {
        BMap
    },
    props: {
        city_latitude: String,
        city_longitude: String,
    },
    data() {
        return {
            lat: 0,
            lng: 0,
        }
    },
    methods: {
        trans(){
            //把经纬度转换成数字
            console.log(this.city_latitude)
            console.log(this.city_longitude)
            var lat = parseFloat(this.city_latitude);
            var lng = parseFloat(this.city_longitude);
            this.lat = lat;
            this.lng = lng;
            console.log(this.lat);
            console.log(this.lng);
        }
    },
    created() {
        this.trans();
    },
}
</script>

<style scoped>

</style>