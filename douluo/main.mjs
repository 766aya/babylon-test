import axios from "axios"
import itemsObject from "./itemsObject.mjs"


const demandList = [
  { id: "4000001", name: '发晶', num: 999900 },
]

demandList.map(item => {
  axios({
    url: `http://150.138.83.33:81/gm/user/query.php`,
    method: "post",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [
      function (data) {
         let ret = ''
         for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
         }
         ret = ret.substring(0, ret.lastIndexOf('&'));
         return ret
      }
    ],
    data: {
      "type": "daoju",
      "uid": "15395801721",
      "item": item.id || itemsObject[item.name],
      "num": item.num,
      "qu": 1,
      "pwd": 15395801721,
      "title": item.name,
      "content": "亲爱的玩家，请查收您的邮件!"
    }
  })
})