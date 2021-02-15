// pages/works/works.js
var navIdOut="";
var pageNum=0;
var navIdx=0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navLists:[],
    navIdx:0,
    WkList:[],
    onLoaded:false
  },

  // 获取导航标题
  getNavData(){
    wx.request({
      url: 'https://ku.qingnian8.com/school/infoclass.php',
      success:res=>{       
        this.setData({
          navLists:res.data
        })
        console.log(res.data);
      }
    })
  },

  // 获取内容
  getWkList(classid=17,page=1,num=7){
    pageNum=page
    this.setData({
      onLoaded:true
    })
    wx.showLoading({
      title: '数据加载中...',
      mask:true
    })
    wx.request({
      url: 'https://ku.qingnian8.com/school/works.php',
      data:{
        cid:classid,
        num:num,
        page:page
      },
      success:res=>{
        if(res.data.length==0 || res.data.length<5){
          this.setData({
            onLoaded:false
          })
        }
        var oldList=this.data.WkList
        this.setData({
          WkList:oldList.concat(res.data)
        })
        wx.hideLoading()
        wx.stopPullDownRefresh()
      }
    })
  },

  clickNav(res){
    if(res.currentTarget){    
      var navIdx=res.currentTarget.dataset.idx
      var navId=res.currentTarget.dataset.id
    }else{
      var navIdx=res.navIdx
      var navId=res.navId
    }

    navIdOut=navId; 

    this.setData({
      navIdx,
      navId,
      WkList:[]
    }) 
    this.getWkList(navId)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id=options.id;
    var idx=options.idx
    navIdx=idx
    navIdOut=id
    // 获取标题
    this.getNavData()
    this.clickNav({navIdx,navIdOut})
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
      WkList:[]
    })
    this.getWkList(navIdOut);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    pageNum++
    // navIdOut当前ID，pageNum页码
    this.getWkList(navIdOut,pageNum)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})