<style scoped>
@import "./im.less";
</style>

<template>
    <div class="rong-im" id="rong-im">
		<!-- 会话列表 -->
		<div class="rong-conversation-box">
          <div class="rong-conversation-list">
              <div class="rong-conversation" v-for="conversation in conversationList" @click="show(conversation)">
                  <div class="rong-conversation-user">
                      <div class="rong-conversation-avatar rong-avatar" :style="{'background-image': 'url(' + conversation._target.portrait + ')'}"></div>
                  </div>
                  <div class="rong-conversation-title">{{conversation._target.name}}</div>
                  <div class="rong-conversation-message">
                      <span class="rong-conversation-sendername">{{conversation._sender.name}}:</span>
                      <em class="rong-conversation-content">{{conversation.latestMessage._content}}</em>
                  </div>
                  <div class="rong-conversation-senttime">{{conversation._sentTime}}</div>
              </div>
          </div>
        </div>
		<!-- 会话窗口消息列表 -->
		<div class="rong-main">
        <div class="rong-message-list">
            <div v-for="message in messageList" :class="['rong-message rong-message-' + message._direction ]">
                <div :class="['rong-avatar rong-message-' + message._direction + '-avatar']" :style="{'background-image': 'url(' + message._sender.portrait + ')'}"></div>
                <div class="rong-message-content">{{message._content}}</div>
                <div class="rong-message-senttime">
                    <em>{{message._sentTime}}</em>
                </div>
                <div class="rong-clearfix"></div>
            </div>
        </div>

        <div class="rong-edior-box">
          <div class="rong-editor-input">
            <textarea v-model="content" name="editor-input" class="rong-input rong-editor-input-content" placeholder="说点什么..."  @keyup.enter="send"></textarea>
          </div>
        </div>
    </div>
	</div>
</template>
<script>
export default {
  data() {
    return {
      conversationList: [],
      content: "",
      messageList: [],
      conversation: {
        id: "213",
        lastSendTime: 0,
        messageContent: []
      },
      supportNot: false
    };
  },
  mounted() {
    var appKey = "pkfcgjstpo4c8",
      token =
        "RC+2TjHioJk/mF5awqjbIlK3QQSRqCLrxz9COMqmuYituQXflObcXHQ72E47VfC+3CcDWmmlfOOu0xFtp8Ia0Q==";
    var params = {
      token,
      appKey
    };
    var callbacks = {
      getInstance: function(instance) {
        var callback = function() {
          if (RCS.config.templates) {
            for (var index in RCS.config.templates) {
              templates[index] = RCS.config.templates[index];
            }
          }
        };
      }
    };
    this.sdkInit(params, callbacks);
  },
  methods: {
    //   sdk初始化
    sdkInit(params, callbacks) {
      var that = this;
      var appKey = params.appKey;
      var token = params.token;
      var navi = params.navi || "";

      if (navi !== "") {
        //私有云
        var config = {
          navi: navi
        };
        console.log("私有云");
        console.log(params);
        RongIMLib.RongIMClient.init(appKey, null, config);
      } else {
        //公有云
        console.log("公有云");
        console.log(params);
        RongIMLib.RongIMClient.init(appKey);
      }

      var instance = RongIMClient.getInstance();

      // 连接状态监听器
      RongIMClient.setConnectionStatusListener({
        onChanged: function(status) {
          console.log(status);
          switch (status) {
            case RongIMLib.ConnectionStatus.CONNECTED:
              callbacks.getInstance && callbacks.getInstance(instance);
              break;
            case RongIMLib.ConnectionStatus.CONNECTING:
              console.log("正在链接");
              break;
            case RongIMLib.ConnectionStatus.DISCONNECTED:
              console.log("断开连接");
              break;
            case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
              console.log("其他设备登录");
              break;
            case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
              console.log("域名不正确");
              break;
            case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
              console.log("网络不可用");
              break;
            case RongIMLib.ConnectionStatus.DISCONNECTED:
              console.log("断开连接");
              break;
            case 4:
              console.log("token无效");
              break;
            default:
              console.log("未知错误");
              break;
          }
        }
      });
      RongIMClient.setOnReceiveMessageListener({
        // 接收到的消息

        onReceived: function(message) {
          // 判断消息类型
          console.log("新消息: " + message.targetId);
          if (message.offLineMessage) {
            return;
          }
          console.log(that.conversation);
          if (message.conversationType == RongIMLib.ConversationType.PRIVATE) {
            if (message.targetId == that.conversation.id) {
              that.updateMessage(message);
              //   clearUnreadCount(conversation.id);
            }
            that.updateConversationList();
          }
        }
      });
      //开始链接
      RongIMClient.connect(token, {
        onSuccess: function(userId) {
          callbacks.getCurrentUser && callbacks.getCurrentUser(userId);
          console.log("链接成功，用户id：" + userId);
        },
        onTokenIncorrect: function() {
          console.log("token无效");
        },
        onError: function(errorCode) {
          console.log("=============================================");
          console.log(errorCode);
        }
      });
    },
    textMessageFormat(content) {
      if (content.length === 0) {
        return "";
      }

      content = this.encodeHtmlStr(content);

      content = this.replaceUri(content, function(uri, protocol) {
        var link = uri;
        if (!protocol) {
          link = "http://" + uri;
        }
        return (
          '<a class="rong-link-site" target="_blank" href="' +
          link +
          '">' +
          uri +
          "</a>"
        );
      });

      content = this.replaceEmail(content, function(email) {
        return (
          '<a class="rong-link-email" href="mailto:' +
          email +
          '">' +
          email +
          "<a>"
        );
      });

      return this.emojiToHTML(content, 18);
    },
    // 显示新消息
    updateMessage(message) {
      console.log(message);
      if (message.messageType == "ReadReceiptMessage") {
        return; //ReadReceiptMessage的messageType
      }
      this.conversation.messageContent.push(message);
      this.messageList.push(message);
      var newMessage = this.modifyMessage(this.cloneObj(message));
      if (message.messageDirection != 1 && this.supportNot) {
        pushMessage(newMessage);
      }
      if (newMessage.sentTime - this.conversation.lastSendTime >= 60000) {
        //超过1分钟
        var messageTime = {};
        messageTime.content = {};
        messageTime.messageType = "TimeMessage";
        messageTime.sentTime = this.getTime(newMessage.sentTime);
        this.conversation.lastSendTime = newMessage.sentTime;
      }
    },
    //单条消息修饰
    modifyMessage(msg) {
      if (msg.messageType == "TextMessage") {
        msg.content.content = this.textMessageFormat(msg.content.content);
      } else if (msg.messageType == "FileMessage") {
        msg.content.size = this.getFileSize(msg.content.size);
      } else if (msg.messageType == "VoiceMessage") {
        RongIMLib.RongIMVoice.preLoaded(msg.content.content);
      }
      return msg;
    },

    //消息修饰，2条消息之间相差6000毫秒，显示消息发送时间
    modificateMessage(list) {
      var listTemp = JSON.parse(JSON.stringify(list));
      var _list = [];
      for (var i = 0; i < listTemp.length; i++) {
        var messageTime = {
          sentTime: utils.getTime(listTemp[i].sentTime),
          messageType: "TimeMessage"
        };
        var messageMap = [
          "TextMessage",
          "FileMessage",
          "SightMessage",
          "ImageMessage",
          "VoiceMessage"
        ];
        if (messageMap.indexOf(listTemp[i].messageType) >= 0) {
          listTemp[i] = modifyMessage(listTemp[i]);
        } else {
          listTemp[i].messageType = "UnknownMessage";
        }
        if (i == 0) {
          _list.push(messageTime);
        } else if (listTemp[i].sentTime - listTemp[i - 1].sentTime >= 60000) {
          _list.push(messageTime);
        }
        _list.push(listTemp[i]);
      }
      return _list;
    },
    // 更新会话列表
    updateConversationList() {
      var that = this;
      var callback = function(list) {
        var obj = {};
        obj.list = list;
        console.log(obj);
        that.conversationList = obj;
      };
      this.getConversationList(callback);
    },
    getConversationList(callback) {
      RongIMClient.getInstance().getConversationList(
        {
          onSuccess: function(list) {
            console.log(list);
            //用户信息处理 http://support.rongcloud.cn/kb/NjQ5
            var _list = [];
            for (var i = 0; i < list.length; i++) {
              if (
                list[i].conversationType == RongIMLib.ConversationType.PRIVATE
              ) {
                _list.push(list[i]);
              }
            }
            var temp = _list[0];
            for (var i = 0; i < _list.length; i++) {
              for (var j = i + 1; j < _list.length; j++) {
                if (_list[i].sentTime < _list[j].sentTime) {
                  var temp = _list[i];
                  _list[i] = _list[j];
                  _list[j] = temp;
                }
              }
            }
            callback && callback(_list);
          },
          onError: function(error) {
            // do something...
          }
        },
        null
      );
    },
    $(selector) {
      return document.querySelectorAll(selector);
    },
    show(node) {
      node.style.display = "block";
    },
    hide(node) {
      node.style.display = "none";
    },
    removeNode(selector) {
      var thisNode = utils.$(selector)[0];
      if (thisNode) {
        thisNode.parentNode.removeChild(thisNode);
      }
    },
    getStyle(node, prop) {
      if (node.currentStyle) {
        return node.currentStyle[prop] || "";
      } else if (window.getComputedStyle) {
        return window.getComputedStyle(node, null)[prop];
      }
    },
    indexOf(array, item) {
      if (array.indexOf) {
        return array.indexOf(item);
      }
      for (var i = 0, len = array.length; i < len; i++) {
        if (array[i] === item) {
          return i;
        }
      }
      return -1;
    },
    copy(json1, json2, flag, fn) {
      fn =
        fn ||
        function(e) {
          return e;
        };
      for (var key in json2) {
        if (flag || typeof json1[key] === "undefined" || json1[key] === null) {
          json1[key] = fn(json2[key]);
        }
      }
      return json1;
    },
    isChild(node, nodeParent) {
      while (node && node.tagName && node.tagName.toLowerCase() != "body") {
        if (node == nodeParent) {
          return true;
        }
        node = node.parentNode;
      }
      return false;
    },
    getTime(time) {
      var nowDate = new Date();
      var sendDate = new Date(time);
      var dateStr = "";
      if (
        nowDate.getFullYear() == sendDate.getFullYear() &&
        nowDate.getMonth() == sendDate.getMonth() &&
        nowDate.getDate() == sendDate.getDate()
      ) {
        dateStr =
          (sendDate.getHours() > 9
            ? sendDate.getHours()
            : "0" + sendDate.getHours()) +
          ":" +
          (sendDate.getMinutes() > 9
            ? sendDate.getMinutes()
            : "0" + sendDate.getMinutes());
      } else {
        dateStr =
          sendDate.getFullYear() +
          "-" +
          (sendDate.getMonth() > 8
            ? sendDate.getMonth() + 1
            : "0" + (sendDate.getMonth() + 1)) +
          "-" +
          (sendDate.getDate() > 9
            ? sendDate.getDate()
            : "0" + sendDate.getDate()) +
          " " +
          (sendDate.getHours() > 9
            ? sendDate.getHours()
            : "0" + sendDate.getHours()) +
          ":" +
          (sendDate.getMinutes() > 9
            ? sendDate.getMinutes()
            : "0" + sendDate.getMinutes());
      }
      return dateStr;
    },
    getFileSize(size) {
      var g = Math.pow(1024, 3);
      var m = Math.pow(1024, 2);
      var k = Math.pow(1024, 1);
      if (size > g) {
        size = (size / g).toFixed(2) + "G";
      } else if (size > m) {
        size = (size / m).toFixed(2) + "M";
      } else if (size > k) {
        size = (size / k).toFixed(2) + "K";
      } else {
        size = size + "B";
      }
      return size;
    },
    getFormValue(formArray) {
      var formData = {};
      for (var i = 0; i < formArray.length; i++) {
        formData[formArray[i]] = document.getElementsByName(
          formArray[i]
        )[0].value;
      }
      return formData;
    },
    fadein(ele) {
      ele.style.opacity = 0;
      ele.style.display = "block";
      if (ele) {
        var v = 0;
        var timer = null;
        timer = setInterval(function() {
          v += 1;
          setOpacity(ele, v);
          if (v == 100) {
            clearInterval(timer);
          }
        }, 1);
      }
    },
    fadeout: function(ele) {
      if (ele) {
        var v = 100;
        var timer = null;
        timer = setInterval(function() {
          v -= 1;
          setOpacity(ele, v);
          if (v == 0) {
            ele.style.display = "none";
            clearInterval(timer);
          }
        }, 1);
      }
    },
    downloadHistoryMsgFile: function(url, name) {
      var a = document.createElement("a");
      a.href = url;
      a.setAttribute("download", name || "");
      a.click();
    },
    encodeHtmlStr: function(str) {
      var replaceRule = [
        {
          symbol: "&",
          html: "&amp;"
        },
        //下述方法有问题,字符串中如有空格,会多加空格
        //white-space: pre-wrap; 能实现同样效果,并支持ie9, 故注释掉
        // {
        //     symbol: '[\\u0020]',
        //     html: '&nbsp;\u0020'
        // },
        {
          symbol: "[\\u0009]",
          html: "&nbsp;&nbsp;&nbsp;&nbsp;\u0020"
        },
        {
          symbol: "<",
          html: "&lt;"
        },
        {
          symbol: ">",
          html: "&gt;"
        },
        {
          symbol: '"',
          html: "&quot;"
        },
        {
          symbol: "'",
          html: "&#39;"
        },
        {
          symbol: "\\n\\r",
          html: "<br/>"
        },
        {
          symbol: "\\r\\n",
          html: "<br/>"
        },
        {
          symbol: "\\n",
          html: "<br/>"
        }
      ];

      for (var i = 0, len = replaceRule.length; i < len; i++) {
        var rule = replaceRule[i];
        var regExp = new RegExp(rule.symbol, "g");
        str = str.replace(regExp, rule.html);
      }

      return str;
    },
    replaceUri: function(str, callback) {
      var result = "";
      var protocol = "((?:http|https|ftp)\\:\\/\\/)?";
      var ip =
        "(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])\\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])";
      var host = "(?!@)(?:[a-z0-9-]{1,36}\\.)+[a-z]{2,6}";
      var port = "(?:\\:[0-9]{1,5})?";
      var path = "(?:[a-zA-Z0-9.,;?\\'+&%$#=~_\\-!()*\\/]*)";
      var uriReg = new RegExp(
        protocol + "(?:(?:" + ip + ")|(?:" + host + "))" + port + path,
        "ig"
      );

      result = str.replace(uriReg, function(uriStr, prot) {
        var lastIndex = arguments[arguments.length - 2];
        var prevChar = str.substr(lastIndex - 1, 1);
        var isEmail = prevChar === "@";
        var notDomain = !chkDomain(uriStr, prot);
        if (isEmail || notDomain) {
          return uriStr;
        }
        return callback.apply(null, arguments);
      });
      return result;
    },
    replaceEmail: function(str, callback) {
      var result = "";
      var emailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/gi;

      result = str.replace(emailReg, callback);

      return result;
    },
    cloneObj: function(obj) {
      var str,
        newobj = obj.constructor === Array ? [] : {};
      if (typeof obj !== "object") {
        return;
      } else if (window.JSON) {
        (str = JSON.stringify(obj)), //系列化对象
          (newobj = JSON.parse(str)); //还原
      } else {
        for (var i in obj) {
          newobj[i] = typeof obj[i] === "object" ? cloneObj(obj[i]) : obj[i];
        }
      }
      return newobj;
    },
    //判断当前是否是移动端
    browserRedirect: function(callback) {
      var sUserAgent = navigator.userAgent.toLowerCase();
      var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
      var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
      var bIsMidp = sUserAgent.match(/midp/i) == "midp";
      var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
      var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
      var bIsAndroid = sUserAgent.match(/android/i) == "android";
      var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
      var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
      if (
        bIsIpad ||
        bIsIphoneOs ||
        bIsMidp ||
        bIsUc7 ||
        bIsUc ||
        bIsAndroid ||
        bIsCE ||
        bIsWM
      ) {
        callback("phone");
      } else {
        callback("pc");
      }
    },
    // enjio
    init: function() {
      RongIMLib.RongIMEmoji.init();
    },
    emojiToHTML: function(emojiContent) {
      return RongIMLib.RongIMEmoji.emojiToHTML(emojiContent);
    },
    symbolToEmoji: function(sym) {
      return RongIMLib.RongIMEmoji.symbolToEmoji(sym);
    },
    getEmoji: function() {
      return RongIMLib.RongIMEmoji.list.map(function(data) {
        return data.node;
      });
    }
  }
};
</script>
