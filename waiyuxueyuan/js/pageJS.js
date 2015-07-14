onload = function() {
   
	// 顶部主图轮播
    var mainPicList = $("img-list");mainPicList.i=1;
    var oPicChilds = mainPicList.getElementsByTagName("img");
    var timer1 = setInterval(function(){
        lunboFn(mainPicList, oPicChilds, 1014);
     } ,3000);

    

    var prev = $("prev");
    var next = $("next");
    next.onclick = function(){
        clearInterval(timer1);
        lunboFn(mainPicList, oPicChilds, 1014,1);
        timer1=setInterval(function(){
        lunboFn(mainPicList, oPicChilds, 1014);
     } ,3000);
    };
    prev.onclick = function(){
        clearInterval(timer1);
        lunboFn(mainPicList, oPicChilds, 1014,-1);
        timer1=setInterval(function(){
        lunboFn(mainPicList, oPicChilds, 1014);
     } ,3000);
    };
	//news的轮播图
    var newsPicHovBlos = $("news-hov-block").getElementsByTagName("div");
	var newsPicList = $("news-list-item");newsPicList.i=1;
    var newsPicChilds = newsPicList.getElementsByTagName("img");
    var timer2 = setInterval(function(){
         lunboFn(newsPicList, newsPicChilds, 540); //
      } ,3000);
	//news的图片hover切换,注意事件绑定机制，不能设置为i，否则最后时间用的都是i=***.length了，设置为属性***[i].index
    var len = newsPicHovBlos.length;
    for(var i = 0;i<len;i++){
        newsPicHovBlos[i].index=i+1;
        newsPicHovBlos[i].onmouseover=function(){
            clearInterval(timer2);
            newsPicList.style.left=this.index*(-540)+"px";
            timer2 = setInterval(function(){
         lunboFn(newsPicList, newsPicChilds, 540); //
      } ,3000);
        }
    }

}

// id节点获取函数
function $(id) {
    return document.getElementById(id);
}
var x;
// 定时轮播函数,用于开头和末尾的2张图片无缝的转移
//*********************多组轮播问题干扰所在就是x应该是每组单独的，所以处在对象属性里
function lunboFn(oList, listPics, picWidth,decoration) {
	    
       x=oList.i;
       // if(oList == $("img-list"))
     if(decoration>0||!decoration){//根据decoration为正或者不存在，向右边播放（就是确定prev\next的onclick方向用的）
        x++;
        if (x == listPics.length) {
            oList.style.left = -picWidth + "px";
            x = 2;
        }
    }
    else{
        x--;
        if(x <0 ){
            oList.style.left = -picWidth*5 + "px";
            x = 4;
        }
    }
    startMove(oList, {left: -picWidth * x});
    oList.i=x;
}


// 轮播
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
            // var setInterval();
            else {
                cur = parseInt(getStyle(obj, name)); // cur 当前移动的数值
            }
            var speed = (iTarget - cur) / 9; // 物体运动的速度 数字越小动的越慢 /5 : 自定义的数字
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
    return obj.currentStyle[name];
  } else {
    return getComputedStyle(obj, false)[name];
  }
}