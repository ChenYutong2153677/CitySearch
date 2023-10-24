<template>
    <link href="https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.min.css" rel="stylesheet">
    <div class="bg">
        <div class="title animate__animated animate__fadeInTopRight">WUS City Online</div>
        <input v-model="this.input" class="input_position" placeholder="Please input the city name that you want to search!" @keyup.enter="submit">
        <svg t="1697976127601" class="icon_pos" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4015" width="40" height="40"><path d="M934.966272 879.950848 709.541888 654.526464c47.665152-59.81696 76.166144-135.581696 76.166144-218.012672 0-193.36704-156.752896-350.124032-350.12096-350.124032S85.464064 243.145728 85.464064 436.513792s156.756992 350.124032 350.124032 350.124032c79.875072 0 153.486336-26.766336 212.39808-71.79264l226.04288 226.04288c8.416256 8.416256 19.441664 12.62592 30.470144 12.62592 11.025408 0 22.050816-4.209664 30.466048-12.62592C951.798784 924.055552 951.798784 896.782336 934.966272 879.950848zM165.953536 436.513792c0-148.912128 120.722432-269.630464 269.63456-269.630464S705.21856 287.60064 705.21856 436.513792 584.500224 706.148352 435.588096 706.148352 165.953536 585.42592 165.953536 436.513792z" fill="#ffffff" p-id="4016"></path><path d="M291.135488 302.036992c-8.997888-4.864-20.23424-1.511424-25.097216 7.486464-20.256768 37.476352-32.600064 78.152704-36.688896 120.899584-0.973824 10.181632 6.491136 19.224576 16.672768 20.1984 0.59904 0.057344 1.195008 0.084992 1.784832 0.084992 9.433088 0 17.497088-7.175168 18.413568-16.75776 3.613696-37.7856 14.5152-73.72288 32.401408-106.814464C303.485952 318.138368 300.1344 306.900992 291.135488 302.036992z" fill="#ffffff" p-id="4017"></path></svg>
    </div>
</template>
<script>
export default {
    components: {
    },
    data() {
        return {
            input: '',
        }
    },
    methods:{
        submit(){
//跳转到查询结果页面，且将input传给查询结果页面
            this.$router.push({
                path: "/DetailPage",
                query: {
                    input: this.input,
                },
            },
            )
        }
    },
}
</script>
<style scoped>
.title{
    font-size: 60px;
    text-align: center;
    margin-top: 20%;
    color: white;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-family: Georgia;
    font-weight: bold;
}
.input_position{
    opacity: 0.7;
    margin-top: 3%;
    margin-left: 30%;
    width: 40%;
    height: 40px;
    border:none;
    border-radius: 20px;
    font-size: 20px;
    text-indent: 10px;
}
.input_position:focus{
    outline: none;
    opacity: 1;
}
.bg{
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-image: url('../assets/bg.webp');
    background-size: cover;
}
.icon_pos{
    position: relative;
    top: 15px;
    left:-44%;
}
</style>