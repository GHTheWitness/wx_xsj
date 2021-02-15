import tools from "../../utils/public.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StudentWorkList:[
      {pic:"/images/xszp1.jpg",title:"UI设计作品",desc:"FILM AND TELEVISION LATER"},
      {pic:"/images/xszp2.jpg",title:"UI设计作品",desc:"FILM AND TELEVISION LATER"},
      {pic:"/images/xszp3.jpg",title:"UI设计作品",desc:"FILM AND TELEVISION LATER"},
      {pic:"/images/xszp4.jpg",title:"UI设计作品",desc:"FILM AND TELEVISION LATER"},
      {pic:"/images/xszp5.jpg",title:"电商设计作品",desc:"E-commerce design works"},
      {pic:"/images/xszp6.jpg",title:"影视后期作品",desc:"Later works of film and television"},
      {pic:"/images/xszp7.jpg",title:"建筑景观作品",desc:"Architectural landscape works"},
      {pic:"/images/xszp8.jpg",title:"三维仿真作品",desc:"3D SIMULATION WORKS"},
    ],
    dynamicList:[]
  },

  getRequest(){
    wx.request({
      url: 'https://ku.qingnian8.com/school/list.php',
      data:{
        num:5
      },
      success:res=>{
        res.data.forEach(item => {
          var time=new Date(item.posttime*1000)
          item.posttime=tools.getMyDate(time,"yyyy-MM-dd")
          item.title=tools.getStrLen(item.title,12)
        });
        this.setData({
          dynamicList:res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRequest()
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
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})