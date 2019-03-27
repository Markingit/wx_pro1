const convertToStarsArray = function(stars) {
  let num = stars.toString().substring(0, 1);
  let array = [];
  for(let i=1; i<=5; i++) {
    if(i<=num){
      array.push(1);
    } else {
      array.push(0)
    }
  }
  return array
}

const http = function(url, callback) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "Content-Type": "json"
    },
    success: function (res) {
      callback(res.data)
    },
    fail: function (error) {
      console.log(error)
    }
  })
}

export {
  convertToStarsArray,
  http
}