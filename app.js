App({
  onLaunch: function() {
    this.updateManagerDefault();
  },
  updateManagerDefault() {
    let _this = this;
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function(res) {
        if (res.hasUpdate && util.config.ForcedUpdate) {
          updateManager.onUpdateReady(function() {
            wx.showModal({
              title: '更新提示',
              showCancel: false,
              content: '新版本已经准备好，是否重启应用？',
              success: function(res) {
                if (res.confirm) {
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function() {
            wx.showModal({
              title: '已经有新版本',
              content: '新版本已经上线，请您删除当前小程序，重新搜索打开',
            })
          })
        } else {
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，请升级到最新微信版本后重试。'
      })
    }
  }
})