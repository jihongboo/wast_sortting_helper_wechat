//index.js
//获取应用实例
Page({
  data: {
    collections: [],
    keywords: [],
    search: "",
    selectedSort: null
  },
  //事件处理函数
  bindViewTap(e) {
    wx.navigateTo({
      url: '../wastList/wastList?index=' + e.currentTarget.dataset.index
    })
  },
  clear() {
    this.setData({
      keywords: [],
      search: ""
    })
  },
  seach(e) {
    var myThis = this
    var str = e.detail.value
    this.setData({
      search: str
    })
    wx.request({
      url: 'https://sffc.sh-service.com/wx_miniprogram/sites/feiguan/trashTypes_2/Handler/Handler.ashx?a=GET_KEYWORDS&kw=' + str,
      success(res) {
        myThis.setData({
          keywords: res.data.kw_list
        })
      }
    })
  },
  searchSort(e) {
    var myThis = this
    var keyword = e.currentTarget.dataset.keyword
    wx.request({
      url: 'https://sffc.sh-service.com/wx_miniprogram/sites/feiguan/trashTypes_2/Handler/Handler.ashx?a=EXC_QUERY&kw=' + keyword,
      success(res) {
        var type = res.data.query_result_type_1.trashType
        myThis.setData({
          selectedSort: myThis.getSort(type - 1)
        })
      }
    })
  },
  onLoad() {
    var myThis = this
    wx.request({
      url: 'https://api.chanjianinc.com/mn/cat_list?ts=1560685658&vv=f33a7c14f66d8972eba982ca82602d16',
      success(res) {
        var result = []
        for (var i = 0; i < 4; i++) {
          var data = res.data.data[(i + 1).toString()]
          var model = myThis.getSort(i)
          model["wasts"] = data
          result.push(model)
        }
        getApp().globalData.collections = result
        myThis.setData({
          collections: result
        })
      }
    })
  },
  dismiss() {
    this.setData({
      selectedSort: null
    })
  },
  getSort(i) {
    if (i == -4) {
      i = 4
    }
    var names = ["有害垃圾", "可回收垃圾", "湿垃圾", "干垃圾", "建筑垃圾"]
    var colors = ["#FF0000", "#7CFC00", "#48D1CC", "#8B4513", "#8B4513"]
    var des = ["对人体健康或者自然环境造成直接或潜在危害的废弃物",
      "适宜回收利用和资源化利 用的，如：玻、金、塑、 纸、衣",
      "日常生活垃圾产生的容易腐烂的生物质废弃物",
      "除有害垃圾、可回收物、 湿垃圾以外的其他生活废弃物",
      "建筑装修产生的垃圾, 不能直接丢入垃圾桶，需要投入专门的建筑垃圾桶或联系物业处理"
    ]
    var inc = ["废电池、油漆桶、荧光灯管、废药品及其包装物等",
      "酱油瓶、玻璃杯、平板玻璃、易拉罐、饮料瓶、 洗发水瓶、塑料玩具、书本、报纸、广告单、 纸板箱、衣服、床上用品等",
      "剩菜剩饭、瓜皮果核、花卉绿植、过期食品等",
      "餐盒、餐巾纸、湿纸巾、卫生间用纸、塑料袋、 食品包装袋、污染严重的纸、烟蒂、纸尿裤、 一次性杯子、大骨头、贝壳、花盆、陶瓷等",
      "砖块、瓷砖等"
    ]
    var req = ["投放时请注意轻放 易破损的请连带包装或包裹后轻放 如易挥发，请密封后投放",
      "轻投轻放 清洁干燥，避免污染 废纸尽量平整 立体包装物请清空内容物，清洁后压扁投放 有尖锐边角的，应包裹后投放",
      "尽量沥干水分 难以辨识类别的生活垃圾投入干垃圾容器内",
      "纯流质的食物垃圾，如牛奶等，应直接倒进下水口 有包装物的湿垃圾应将包装物去除后分类投放，包装物请投放到对应的可回收物或干垃圾容器",
      "不能直接丢入垃圾桶，需要投入专门的建筑垃圾桶或联系物业处理!"
    ]

    var model = {
      "name": names[i],
      "color": colors[i],
      "icon": "../../resources/" + (i + 1).toString() + ".png",
      "des": des[i],
      "inc": inc[i],
      "req": req[i]
    }
    return model
  }
})