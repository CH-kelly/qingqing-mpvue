let baseUrl = "http://qqxy.shengbokj.com/"
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

export { getRequest, postRequest }