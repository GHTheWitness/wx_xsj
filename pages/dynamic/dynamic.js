// pages/dynamic/dynamic.js
import tools from "../../utils/public.js"
var pageNum=0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dyLists:[],
    onLoading:false
  },
  getDyList(page=1){
    pageNum=page
    this.setData({
      onLoading:true
    })
    wx.showLoading({
      title: '数据加载中...',
      mask:true
    })
    wx.request({
      url: 'https://ku.qingnian8.com/school/list.php',
      data:{
        num:7,
        page:page
      },
      success:res=>{

        if(res.data.length==0 || res.data.length<7){
          this.setData({
            onLoading:false
          })
        }

        res.data.forEach(item=>{
          var nowTime=new Date(item.posttime*1000)
          item.posttime=tools.getMyDate(nowTime,"yyyy-MM-dd");
        })


        var oldDyList=this.data.dyLists;
        var newDyList=oldDyList.concat(res.data);
        this.setData({
          dyLists:newDyList
        })
        wx.hideLoading()
        wx.stopPullDownRefresh()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDyList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      dyLists:[]
    })
    this.getDyList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    pageNum++
    this.getDyList(pageNum)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})