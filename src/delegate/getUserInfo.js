
import store from '@/store/index'

let userInfo = store.state.userInfo || wx.getStorageSync('userInfo');
let user = JSON.parse(userInfo);
let data = {
    openid:user.openid || '123123' ,
    username:user.nickName,
    headimg:user.avatarUrl,
    key:'project-6bbf9ac94a7e4595',
}

export default userInfo = data;