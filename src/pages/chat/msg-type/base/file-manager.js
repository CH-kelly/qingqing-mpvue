import FileSaveManager from "../../file-save-manager";
import {downloadFile} from "../../../../utils/tools";

export default class FileManager {

    constructor(page) {
        this._page = page;
    }

    /**
     * 接收到消息时，通过UI类的管理进行渲染
     * @param msg 接收到的消息，这个对象应是由 im-operator.js 中的createNormalChatItem()方法生成的。
     */
     showMsg({msg}) {
        const url = msg.content;
        const localFilePath = FileSaveManager.get(msg);
        if (!localFilePath) {
            try {
                downloadFile({url}).then(res=>{
                    const {tempFilePath} =  res
                    FileSaveManager.saveFileRule({tempFilePath}).then(res1=>{
                        const {savedFilePath} =  res1;
                        msg.content = savedFilePath;
                        this._page.UI && this._page.UI.updateViewWhenReceive(msg);
                        FileSaveManager.set(msg, savedFilePath);
                    })
                })
            } catch (e) {
                console.warn('文件类型消息下载或存储失败，将使用网络url访问该文件', e);
                this._page.UI && this._page.UI.updateViewWhenReceive(msg);
            }
        } else {
            msg.content = localFilePath;
            this._page.UI.updateViewWhenReceive(msg);
        }
    }

    /**
     * 发送文件类型消息
     * @param type 消息类型
     * @param content 由输入组件接收到的临时文件路径
     * @param duration 由输入组件接收到的录音时间
     */
     sendOneMsg({type, content, duration}) {
        try {
            FileSaveManager.saveFileRule({tempFilePath: content}).then(res=>{
                const {savedFilePath} =  res
                console.log('sendOneMsg-------  ',res);
                this._sendFileMsg({content: savedFilePath, duration, type});
            })
        } catch (e) {
             this._sendFileMsg({content, type, duration});
        }
    }

     _sendFileMsg({content, duration, type}) {
        this._page.imOperator.createNormalChatItem({type, content, duration}).then(res=>{
            const temp = res;
            console.log('_sendFileMsg-------  ',res);
            const {itemIndex} =  this._page.UI.showItemForMoment(temp);
             this.uploadFileAndSend({content, duration, itemIndex, type})
        })
    }

     uploadFileAndSend({content, duration, type, itemIndex}) {
        this._page.simulateUploadFile({savedFilePath: content, duration, itemIndex}).then(res=>{
            const {url} =  res
            const {msg} =  this._page.sendMsg({
                content: this._page.imOperator.createChatItemContent({type, content: url, duration}),
                itemIndex,
            });
            FileSaveManager.set(msg, content);
        })
        
    }

    resend({}) {
        //文件的重发在商业版中已经实现，开源版中需要你自行实现
    }
}
