//我的库

/************完美运动框架************/
function startMove(obj, json, fnEnd) {
  // var MAX=18;
  //每次调用就只有一个定时器在工作(开始运动时关闭已有定时器)
  //并且关闭或者开启都是当前物体的定时器，已防止与页面上其他定时器的冲突，使每个定时器都互不干扰 
  clearInterval(obj.timer);
  obj.timer = setInterval(function() {
    var bStop = true; // 假设：所有的值都已经到了
    for (var name in json) {
      var cur = 0;
      var iTarget = json[name]; // 目标点
      //处理透明度，不能使用parseInt否则就为0了 
      if (name == 'opacity') {
        // *100 会有误差 0000007 之类的 所以要用 Math.round() 会四舍五入
        var cur = Math.round(parseFloat(getStyle(obj, name)) * 100);
      }
      var setInterval();
      else {
        cur = parseInt(getStyle(obj, name)); // cur 当前移动的数值
      }
      var speed = (iTarget - cur) / 12; // 物体运动的速度 数字越小动的越慢 /5 : 自定义的数字
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
      // if(Math.abs(speed)>MAX)speed=speed>0?MAX:-MAX;
      if (cur != iTarget) {
        bStop = false;
      };
      if (name == 'opacity') {
        obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')'; //IE
        obj.style.opacity = (cur + speed) / 100; //ff chrome
      } else {
        obj.style[name] = cur + speed + 'px';
      }
      document.title = obj.style.opacity;
      // 某个值不等于目标点 

    }
    // 都达到了目标点
    if (bStop) {
      clearInterval(obj.timer);
      if (fnEnd) { //只有传了这个函数才去调用
        fnEnd();
      }
    }
  }, 30);
}

/************获取样式（行内/外部/内嵌样式）************/
function getStyle(obj, name) {
  if (obj.currentStyle) {
    return obj.currrentStyle[name];
  } else {
    return getComputedStyle(obj, false)[name];
  }
}

//类选择节点，得到数组
function getElementsByClass(oParent, sClass) {
  var aResult = [];
  var aEle = oParent.getElementsByTagName("*");
  for (var i = 0; i < aEle.length; i++) {
    if (aEle[i].className == sClass) {
      return aResult.push(aEle[i]);
    }
  }
  return aResult;
}


//鼠标坐标，相对于页面
function getMousePos(ev) {
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
  return {
    x: ev.clientX + scrollLeft,
    y: ev.clientY + scrollTop
  };
}

//绑定事件
function myAddEvent(obj, evt, fn) {
  if (obj.attachEvent) {
    obj.attachEvent("on" + evt, fn)
  } else {
    obj.addEventListener(evt, fn, false);
  }
}

/***************ajax函数*******************/
function(way,data,url,fnSucess,fnFaid){
  var xmlHttpRequest;
    if(window.ActiveXObject){
      xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }else{
      xmlHttpRequest = new XMLHttpRequest();
      }
    return xmlHttpRequest;
  }
  var myXmlHttpRequest = "";
  myXmlHttpRequest = getXmlHttpObject();
  if(myXmlHttpRequest){
    //get模式
    if(way=="get"){
      //判断创建ok
        // open参数：post/get   对哪个服务器页面请求    是否异步
      //加入mytime防止从缓存中取数据而不是从服务器
         // var url = "/ajaxDemo/registerProcess.php?mytime="+new Date()+"&username="+$("username").value;
         //打开请求
         myXmlHttpRequest.open("get",url,true);
         //指定回调函数
         myXmlHttpRequest.onreadystatechange = fnSucess;
         //真正发送请求，如果是个体请求则填入null即可
         //如果是post请求则填入实际数据
         myXmlHttpRequest.send(null);
    }

    //post方式
    else{     
          //加入mytime防止从缓存中取数据而不是从服务器
          // var url = "/ajaxDemo/registerProcess.php";
          //要发送的数据
          // var data = "username="+$("username").value;
          //打开请求
          myXmlHttpRequest.open("post",url,true);
          //必须语句
          myXmlHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
          //指定回调函数
          myXmlHttpRequest.onreadystatechange = fnSucess;
          //真正发送请求，如果是个体请求则填入null即可
          //如果是post请求则填入实际数据
          myXmlHttpRequest.send(data);
        }
  }
  else{
    fnFaid();
  }