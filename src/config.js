window.players = []
// 相机类型汇总
window.cameraType = [
  { id: 1, name: '球机' },
  { id: 2, name: '枪机' },
  { id: 3, name: '半球' },
  { id: 5, name: '红外热成像' }
]

window.UserStateWs = 'ws://192.168.0.188:8010/api/v1/websocket/connect'
// window.UserStateWs = 'ws://localhost:3000/ws/test'
// window.UserStateWs = 'ws://192.168.0.163:3000/socket'
