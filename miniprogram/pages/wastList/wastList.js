"use strict";
Page({
    data: {
        wasts: {}
    },
    onLoad: function (option) {
      var model = getApp().globalData.collections[option.index]
        this.setData({
          wasts: model
        });
        wx.setNavigationBarTitle({
          title: model.name,
        })
    },
});