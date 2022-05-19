<template>
  <div id="mapContent" />
</template>

<script>
import 'maptalks/dist/maptalks.css';
import * as THREE from 'three'
import * as maptalks from 'maptalks'
import { ThreeLayer } from 'maptalks.three'
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'

export default {
  name: "Map",
  data() {
    return {
      map: null,
      threeLayer: null,
      currentModel: null,
      popCard: null,
      objs: [],
      alarmStartTime: null,
      oriModel: {
        box: null,
        line: null
      },
      myModels: [
        [
          {
            name: 'box1-g1',
            type: 'box',
            position: [117.871759 - 0.001, 38.342339],
            scale: -0.007,
            rotation: { x: -Math.PI / 2, y: Math.PI, z: 0 }
          },
          {
            name: 'line-g1',
            type: 'line',
            position: [117.871759, 38.342339],
            scale: -0.009,
            rotation: { x: -Math.PI / 2, y: Math.PI / 4, z: 0 }
          },
          {
            name: 'box2-g1',
            type: 'box1',
            position: [117.871759 + 0.001, 38.342339],
            scale: -0.007,
            rotation: { x: -Math.PI / 2, y: Math.PI, z: 0 }
          }
        ],
        [
          { name: 'box1-g2', type: 'box' },
          { name: 'line-g2', type: 'line' },
          { name: 'box2-g2', type: 'box1' }
        ],
        [
          { name: 'box1-g3', type: 'box' },
          { name: 'line-g3', type: 'line' },
          { name: 'box2-g3', type: 'box1' }
        ],
      ]
    }
  },
  mounted() {
    this.initMap()
    // this.setScene()
  },
  methods: {
    initMap() {
      this.map = new maptalks.Map('mapContent', {
        center: [117.871759, 38.342339],
        pitch: 45,
        zoom: 17,
        minZoom: 10,
        maxZoom: 18,
        spatialReference: {
          projection: 'EPSG:3857'
        },
        baseLayer: new maptalks.TileLayer('base', {
          urlTemplate: 'http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
        })
      })
      const that = this
      // this.map.on('click', function (e) {
      //   const raycaster = new THREE.Raycaster()
      //   const mouse = new THREE.Vector2()
      //   const camera = that.threeLayer.getCamera()
      //   const scene = that.threeLayer.getScene()
      //   if (!scene) return

      //   const size = that.map.getSize()
      //   const width = size.width;
      //   const height = size.height
      //   mouse.x = (e.containerPoint.x / width) * 2 - 1
      //   mouse.y = -((e.containerPoint.y) / height) * 2 + 1

      //   raycaster.setFromCamera(mouse, camera)
      //   raycaster.linePrecision = 3

      //   const intersects = raycaster.intersectObjects(scene.children, true)
      //   if (!intersects) return

      //   // 这里我们操作第一个相交的物体
      //   if (intersects.length > 0) {
      //     if (that.currentModel != intersects[0].object) {
      //       if (that.currentModel) {
      //         if (that.currentModel.material.length === undefined) {
      //           that.currentModel.material.color.setHex(that.currentModel.currentHex)
      //         } else {
      //           for (let i = 0; i < that.currentModel.material.length; i++) {
      //             that.currentModel.material[i].color.setHex(that.currentModel.currentHex)
      //           }
      //         }
      //       }
      //       that.currentModel = intersects[0].object

      //       // 设置相交的第一个物体的颜色
      //       that.currentModel.currentHex = 16777215
      //       if (that.currentModel.material.length === undefined) {
      //         that.currentModel.material.color.setHex(0x1E90FF)
      //       } else {
      //         for (let i = 0; i < that.currentModel.material.length; i++) {
      //           that.currentModel.material[i].color.setHex(0x1E90FF)
      //         }
      //       }
      //     }
      //     // //
      //     const lonlat = e.coordinate
      //     const options = {
      //       'autoOpenOn': 'null', // set to null if not to open window when clicking on map
      //       // 'single': true,
      //       // 'width': 410,
      //       // 'height': 190,
      //       'custom': true,
      //       'autoCloseOn': 'click',
      //       'dy': -70,
      //       'content': '<div class="popContent">hello</div>'
      //     }
      //     const infoWindow = new maptalks.ui.InfoWindow(options)
      //     that.popCard = infoWindow.addTo(that.map).show(lonlat)
      //   } else {
      //     // 当射线离开的时候变为原来的颜色
      //     if (that.currentModel) {
      //       // that.currentModel.material.color.set(that.currentModel.currentHex);
      //       if (that.currentModel.material.length === undefined) {
      //         that.currentModel.material.color.setHex(that.currentModel.currentHex)
      //       } else {
      //         for (let i = 0; i < that.currentModel.material.length; i++) {
      //           that.currentModel.material[i].color.setHex(that.currentModel.currentHex)
      //         }
      //       }
      //     }
      //     that.popCard?.remove()
      //     that.currentModel = null
      //   }
      //   that.threeLayer.renderScene()
      // })
    },
    setScene() {
      const that = this
      this.threeLayer = new ThreeLayer('buildings', {
        forceRenderOnMoving: true,
        forceRenderOnRotating: true,
        animation: true
      }).addTo(this.map)

      this.threeLayer.prepareToDraw = function (gl, scene, camera) {
        const light0 = new THREE.DirectionalLight('#ffffff', 1)
        light0.position.set(800, 1200, 800).normalize()
        light0.castShadow = true
        camera.add(light0)
        const light1 = new THREE.DirectionalLight('#ffffff', 1)
        light1.position.set(-800, -1200, -800).normalize()
        light1.castShadow = true
        scene.add(light1)
        const light2 = new THREE.DirectionalLight('#ffffff', 1)
        light2.position.set(0, 1300, 0).normalize()
        light2.castShadow = true
        scene.add(light2)
        // that.setModel(117.871759, 38.342339, '/model/管道.mtl', '/model/管道.obj')

        // 下载模型
        const boxModel = that.downloadModels('/model/煤罐1.mtl', '/model/煤罐1.obj', 0)
        const lineModel = that.downloadModels('/model/管道.mtl', '/model/管道.obj', 1)

        Promise.all([boxModel, lineModel]).then(() => {
          window.onerror = (err) => {
            console.log(err);
            return true
          }
          that.myModels.forEach(r => {
            that.setModels(r)
          })
          that.threeLayer.renderScene()
        })
      }
    },
    downloadModels(mtl, obj, saveObjType) {
      return new Promise((resolve) => {
        const mtlLoader = new MTLLoader()
        const objLoader = new OBJLoader()
        mtlLoader.load(mtl, materials => {
          materials.preload()
          objLoader.setMaterials(materials)
          objLoader.load(obj, object => {
            //saveObjType 为0 煤气罐， 为1 管子
            if (saveObjType) {
              this.oriModel.line = object
            } else {
              this.oriModel.box = object
            }
            resolve()
          })
        })
      })
    },
    setModels(modelList) {
      console.log('===');
      // box1 line 和 box
      modelList.forEach(r => {
        if (!r.position || !r.position.length) return
        const currentModel = (r.type === 'box' || r.type === 'box1') ? this.oriModel.box : this.oriModel.line
        currentModel.traverse(child => {
          if (child instanceof THREE.Mesh) {
            child.scale.set(r.scale, r.scale, r.scale)
            child.rotation.set(-Math.PI / 2, Math.PI / 4, 0)
          }
        })
        r.model = currentModel
        const model = this.threeLayer.toModel(currentModel, {
          coordinate: new maptalks.Coordinate(r.position[0], r.position[1])
        });

        this.threeLayer.addMesh(model);

        console.log('====');
      })
    },
    setModel(lon, lat, mtl, obj) {
      const that = this
      const mtlLoader = new MTLLoader()
      const objLoader = new OBJLoader()

      mtlLoader.load(mtl, function (materials) {
        materials.preload()
        const scale = -0.009

        objLoader.setMaterials(materials)
        objLoader.load(obj, function (obj) {

          obj.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
              child.scale.set(scale, scale, scale)
              child.rotation.set(-Math.PI / 2, Math.PI / 4, 0)
            }
          })

          that.objs.push({
            id: 1,
            obj
          })
          const model = that.threeLayer.toModel(obj, {
            coordinate: new maptalks.Coordinate(lon, lat)
          });
          // that.alarmAnimation(obj)

          that.threeLayer.addMesh(model);
          that.threeLayer.renderScene()
        })
      })
    },
    setSkin() {
      // 贴图
      const picLoader = new THREE.TextureLoader()
      const that = this
      picLoader.load('/images/test/img.png', function (pic) {

        that.objs[0].obj.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            child.material.color.set(0xff0000)
            child.material.needsUpdate = true
          }
        })
      })
    },
    setAlarmState(model) {
      const now = new Date().getTime()
      if (!this.alarmStartTime) {
        this.alarmStartTime = now
      }
      if (this.alarmStartTime && (now - this.alarmStartTime <= 80)) return
      this.alarmStartTime = now
      model.traverse(child => {
        if (child instanceof THREE.Mesh) {
          if (!model.alarm) {
            child.material.color.set(0xff0000)
            // child.material.opacity= 0.2
            // child.material.side= THREE.FrontSide
            // child.material.transparent= true
            // console.log(child.material.opacity);
            model.alarm = true
          } else {
            child.material.color.set(0xffffffff)
            model.alarm = false
          }

          child.material.needsUpdate = true
        }
      })
    },
    alarmAnimation(model) {
      // this.alarmStartTime = new Date().getTime()
      this.setAlarmState(model)
      requestAnimationFrame(() => this.alarmAnimation(model))
    }
  }
}
</script>

<style scoped lang="scss">
#mapContent {
  /deep/ .popContent {
    padding: 20px;
    border-radius: 8px;
    box-sizing: border-box;
    box-shadow: 0 0 10px rgba(0, 0, 0, .5);
    background: #ffffff;
    color: #333333;
  }
}
</style>
