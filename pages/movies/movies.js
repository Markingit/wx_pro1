// pages/movies/moives.js
import { convertToStarsArray } from '../../utils/util.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const inTheatersUrl = app.globalData.doubanBase +
      "/v2/movie/in_theaters" + "?start=0&count=3"
    const comingSoonUrl = app.globalData.doubanBase +
      "/v2/movie/coming_soon" + "?start=0&count=3";
    const top250Url = app.globalData.doubanBase +
      "/v2/movie/top250" + "?start=0&count=3";
    
    this.getMovieListData(inTheatersUrl, 'inTheaters', "正在热映")
    this.getMovieListData(comingSoonUrl, 'comingSoon', "即将上映")
    this.getMovieListData(top250Url, 'top250', "豆瓣Top250")
  },
  onMoreTap: function (event) {
    let categorg = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + categorg,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (event) {
   
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

  },
  getMovieListData: function (url, settedKey, categoryTitle){
    let that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        that.getDoubanData(res.data, settedKey, categoryTitle)
      },
      fail: function (error) {
        console.log(error)
      }
    })
  },
  getDoubanData: function (moviesDouban, settedKey, categoryTitle) {
    let movies = [];
    for (var idx in moviesDouban.subjects) {
      let subject = moviesDouban.subjects[idx];
      let title = subject.title;
      if(title.length >= 6) {
        title = title.substring(0, 6) + '...'
      }
      let temp = {
        starts: convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    let readyData = {};
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies: movies
    }
    this.setData(readyData)
  }
})