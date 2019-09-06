<template>
    <canvas id="canvas" :width="cadWidth" :height="cadHeight"></canvas>
</template>

<script>
import { SGraphyView, SGraphyScene, SGraphyClockItem } from '@sybotan-web/graphy/lib'
import axios from 'axios'
import { SPoint } from '@sybotan-web/base/lib'
import { SPen, SPainter, SColor } from '@sybotan-web/draw'
import { mainScene, SGraphyRectItem } from 'graphy-mainscene'
export default {
    props: {
        cadWidth: {
            // 画布的宽
            type: Number,
            default: 1000,
            required: false
        },
        cadHeight: {
            //画布的高
            type: Number,
            default: 800,
            required: false
        },
        dataUrl: {
            //url路径
            type: String,
            default: '',
            required: true
        },
        point: {
            //坐标点
            type: Array,
            default: [0, 0],
            required: false
        },
        pointWidth: {
            //坐标块的宽
            type: Number,
            default: 2000,
            required: false
        }
    },
    data() {
        return {
            drawMainScene: null,
            view: {}
        }
    },
    mounted() {
        let view = new SGraphyView('canvas')
        this.drawMainScene = new mainScene(null)
        this.drawMainScene.urlGetData(this.dataUrl).then(() => {
            view.scene = this.drawMainScene
            view.scene.root.children.forEach(item => {
                item.width = 100
            })
            if (this.point.length == 2) {
                if (this.point[0] !== 0 || this.point[1] !== 0) {
                    let posPoint = new SGraphyRectItem(
                        null,
                        this.point[0],
                        this.point[1],
                        this.pointWidth,
                        this.pointWidth,
                        new SColor('#F56C6C'),
                        new SColor('#F56C6C')
                    )
                    view.scene.addItem(posPoint)
                }
            }
            view.fitSceneToView()
        })
        // let view = new SGraphyView('canvas')
        // view.scene = new FloorScene()
        // view.scene.getFloorData('http://192.168.20.225:8082/base-graph/query', { ModelId: '3af6d175c34e11e993ac85337be80696' }).then(res => {
        //     view.fitSceneToView()
        // })
    }
}
</script>
