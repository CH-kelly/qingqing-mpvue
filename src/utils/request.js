let baseUrl = "https://qqxy.shengbokj.com/"
function getRequest(url,data) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: baseUrl + url, //仅为示例，并非真实的接口地址
            method: 'GET',
            data: data || '',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                console.log(res.data)
                if (res.statusCode === 200) {
                    resolve(res.data);
                } else {
                    reject(res.data)
                }
            },
            fail() {

                reject(res.data);
            }
        })
    })
}
function postRequest(url,data){
    return new Promise((resolve, reject) => {
        wx.request({
            url: baseUrl + url, //仅为示例，并非真实的接口地址
            method: 'POST',
            data: data || '',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                // console.log(res.data)
                if (res.statusCode === 200) {
                    resolve(res.data);
                } else {
                    reject(res.data)
                }
            },
            fail() {

                reject(res.data);
            }
        })
    })
}
function uploadPhoto(data){
    const tempFilePaths = data.tempFilePaths;
    const token = data.token;
    const http = baseUrl + '/home/user/img_uplode';
    console.log(tempFilePaths,token,http);
    
    return new Promise((resolve,reject)=> {
      wx.uploadFile({
        url: http, //仅为示例，非真实的接口地址
        filePath: tempFilePaths[0],
        name: 'img',
        formData: {
          'token':token
        },
        success (res){
          resolve(res)
        },fail: (err) => {
          // 调用接口失败
          reject(err)
        }
      })
    })
}

export { getRequest, postRequest,uploadPhoto }