<template>
    <section class="container">
        <div style="text-align:center;">
            <div class="arrow"><span></span></div>
            <div v-for="(tokenId, index) in kitty_list.mintIds" v-bind:key='tokenId'>                
                <div class="kitty">
                    <div class="caption">
                        <p class="text"><a :href="'https://www.cryptokitties.co/kitty/' + tokenId" target="_blank">#{{tokenId}}</a></p>
                    </div>
                    <div :class="'capsul-' + getColor(index) + '-front buruburu'"></div>
                    <div class="kitty-image buruburu">
                        <img :src="'http://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/' + tokenId + '.svg'" :title="'#' + tokenId">
                    </div>
                    <div :class="'capsul-' + getColor(index) + '-back buruburu'"></div>
                    <div class="pipe"></div>
                </div>
            </div>
            <div class="pipe-relative">.<br>.<br>.<br></div>
        </div>
        <br>
    </section>
</template>
 
<script>
    import kittiesApi from '@/api/kitties'
    import { mapState } from 'vuex';
    import abi from '@/api/abi';
 
    export default {
        async fetch({store}) {
            const json = await kittiesApi.kitties();
            store.commit('kitty_list_update', json)
        },
        computed: mapState(['kitty_list']),
        methods: {
            getColor: function (index) {
                const num = index % 4;
                if (num  === 0) {
                    return 'blue';
                } else if (num === 1) {
                    return 'green';
                } else if (num === 2) {
                    return 'red';
                } else {
                    return 'yellow';
                }
            },
            showBalloon: function (id) {
                const wObjballoon	= document.getElementById(id);
                if (wObjballoon.className === 'balloon1') {
                    wObjballoon.className = 'balloon';
                } else {
                    wObjballoon.className = 'balloon1';
                }
            },
        },
    }
</script>

<style>
.arrow {
    padding-top: 90px;
}
.arrow span {
    position: absolute;
    top: 0;
    left: 50%;
    width: 24px;
    height: 24px;
    margin-left: -12px;
    border-left: 1px solid #8b8ae5;
    border-bottom: 1px solid #8b8ae5;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-animation: sdb 1.5s infinite;
    animation: sdb 1.5s infinite;
    box-sizing: border-box;
}
@-webkit-keyframes sdb {
    0% {
        -webkit-transform: rotate(-45deg) translate(0, 0);
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        -webkit-transform: rotate(-45deg) translate(-20px, 20px);
        opacity: 0;
    }
}
@keyframes sdb {
    0% {
        transform: rotate(-45deg) translate(0, 0);
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        transform: rotate(-45deg) translate(-20px, 20px);
        opacity: 0;
    }
}

.kitty{
    position: relative;
    width: 250px;
    height: 250px;
    display: inline-block;
    text-align: center;
}
.capsul-blue-front {
    position: absolute;
    z-index: 3;
    top: 0px;
    left: 0px;
    width: 250px;
    height: 250px;

    display: inline-block;
    text-align: center;
    border-radius: 50%;
    background-image: url(../assets/img/capsule-blue-front.png);
    background-size: 250px;
}
.capsul-green-front {
    position: absolute;
    z-index: 3;
    top: 0px;
    left: 0px;
    width: 250px;
    height: 250px;

    display: inline-block;
    text-align: center;
    border-radius: 50%;
    background-image: url(../assets/img/capsule-green-front.png);
    background-size: 250px;
}
.capsul-red-front {
    position: absolute;
    z-index: 3;
    top: 0px;
    left: 0px;
    width: 250px;
    height: 250px;

    display: inline-block;
    text-align: center;
    border-radius: 50%;
    background-image: url(../assets/img/capsule-red-front.png);
    background-size: 250px;
}
.capsul-yellow-front {
    position: absolute;
    z-index: 3;
    top: 0px;
    left: 0px;
    width: 250px;
    height: 250px;

    display: inline-block;
    text-align: center;
    border-radius: 50%;
    background-image: url(../assets/img/capsule-yellow-front.png);
    background-size: 250px;
}
.kitty-image {
    position: absolute;
    z-index: 2;
    top: 0px;
    left: 0px;
    width: 250px;
    height: 250px;

    transition-duration: 0.5s;
}
.capsul-blue-back {
    position: absolute;
    z-index: 1;
    top: 0px;
    left: 0px;
    width: 250px;
    height: 250px;

    display: inline-block;
    text-align: center;
    border-radius: 50%;
    background-image: url(../assets/img/capsule-blue-back.png);
    background-size: 250px;
}
.capsul-green-back {
    position: absolute;
    z-index: 1;
    top: 0px;
    left: 0px;
    width: 250px;
    height: 250px;

    display: inline-block;
    text-align: center;
    border-radius: 50%;
    background-image: url(../assets/img/capsule-green-back.png);
    background-size: 250px;
}
.capsul-red-back {
    position: absolute;
    z-index: 1;
    top: 0px;
    left: 0px;
    width: 250px;
    height: 250px;

    display: inline-block;
    text-align: center;
    border-radius: 50%;
    background-image: url(../assets/img/capsule-red-back.png);
    background-size: 250px;
}
.capsul-yellow-back {
    position: absolute;
    z-index: 1;
    top: 0px;
    left: 0px;
    width: 250px;
    height: 250px;

    display: inline-block;
    text-align: center;
    border-radius: 50%;
    background-image: url(../assets/img/capsule-yellow-back.png);
    background-size: 250px;
}
.pipe {
    position: absolute;
    z-index: 1;
    top: 0px;
    left: -25px;
    width: 300px;
    height: 300px;

    display: inline-block;
    text-align: center;
    padding: 0.5em 1em;
    margin: 0em;
    color: #474747;
    border-left: double 4px #4ec4d3;
    border-right: double 4px #4ec4d3;
}
.pipe p {
    margin: 0; 
    padding: 0;
}

.pipe-relative {
    display: inline-block;
    text-align: center;
    width: 300px;
    padding: 0.5em 1em;
    margin: 0em;
    color: #474747;
    border-left: double 4px #4ec4d3;
    border-right: double 4px #4ec4d3;
    position: relative;
}
.pipe-relative p {
    margin: 0; 
    padding: 0;
}

.capsul {
    display: inline-block;
    text-align: center;
    border-radius: 50%;
    background-image: url(../assets/img/capsule-blue-front.png);
    background-size: 250px;
    position: relative;
    z-index: 3;
}

.btn-circle-border {
    display: inline-block;
    text-decoration: none;
    color: #668ad8;
    width: 250px;
    height: 250px;
    line-height: 250px;
    border-radius: 50%;
    border: solid 1px #bbbbbb;
    text-align: center;
    overflow: hidden;
    font-weight: bold;
    transition: .4s;
    transform: translate3d(0px, 0px, 0px);
    
    background-image: url(../assets/img/capsule-blue-back.png);
    background-size: 100%;
    position: relative;
    z-index: 2;
}

.buruburu {
    display: inline-block;
    animation: hurueru 1.5s  infinite;
}
@keyframes hurueru {
    0% {transform: rotateZ(0deg)}
    25% {transform: rotateZ(0deg)}
    38% {transform: rotateZ(1deg)}
    50% {transform: rotateZ(0deg)}
    62% {transform: rotateZ(-1deg)}
    75% {transform: rotateZ(0deg)}
    100% {transform: rotateZ(0deg)}
}

.caption {
    position:absolute;
    width: 95px; /* 吹き出しの幅 */
    height: 40px; /* 吹き出しの高さ */
    top: 20px; /* 吹き出しと三角形の高さをプラスした値 */
    left: 170px;
    border-radius: 10px 10px 10px 10px;
    background-color: #dbe7e6;
    display: none;
}
.caption:after { /* 三角形を作成 */
    position: absolute;
    content: "";
    width: 0;
    height: 0;
    top: 40px; /* 吹き出しの高さと同じ値 */
    left: 16px;
    border: 16px solid transparent;
    border-top: 16px solid #dbe7e6;
}
.caption .text {
    font-size: 16px;
    position: absolute;
    top: 4px;
    left: 12px;
    color: #000;
}
.kitty:hover .caption {
    z-index: 4;
    display: block;
}

/* TODO: ズームインが反映されない */
.kitty:hover .kitty-image {
    transform: scale(1.2, 1.2);
    cursor: pointer;
}
</style>