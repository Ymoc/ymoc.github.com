

/************获取样式（行内/外部/内嵌样式）************/
// function getStyle(obj, name) {
//     if (obj.currentStyle) {
//         return obj.currrentStyle[name];
//     } else {
//         return getComputedStyle(obj, false)[name];
//     }
// }
// 

$(function(){
	// 2个悬浮下拉菜单
	var curSearchType = $(".searchMenu");
	var searchTab = $(".searchMenu").children(".Tab"); 
	curSearchType.mouseover(function(){
		$(this).children(".Tab").css("display","block").css("border-top","none");
		// search的下拉菜单
		$("#searchTab").find("li").mouseover(function(){
			$(this).css("background-color","#EDF3FC");
		}).mouseout(function(){
			$(this).css("background-color","#fff");
		});
		// nav的下拉菜单
		$("#navTab").find("li").mouseover(function(){
			$(this).css("background-color","#CDEAFF");
		}).mouseout(function(){
			$(this).css("background-color","#469FE1");
		});

		$(this).children(".Tab").mouseout(function(){
			$(this).css("display","none")
		});
	}).mouseout(function(){
		$(this).children(".Tab").css("display","none")
	});

	$("#searchTxt").mouseover(function(){
		$(this).css("border-color","#3297D8");
	}).mouseout(function(){
		$(this).css("borderColor","#C1C4CB");
	});
	
	// 产品左拉菜单
	$("#proNav").mouseover(function(){
		$("#hover-block").css("background-position","-85px -80px");
	}).mouseout(function(){
		$("#hover-block").css("background-position","-85px 0");
	});
	$("#hover-block").click(function(){
		$("#pro-hide").animate({left:"-350px"});
		$("#proNav").mouseleave(function(){
			$("#pro-hide").animate({left:"-3px"})
		});
	})

	//title-bar的hover效果
	$(".changePingDao,#weather").mouseenter(function(){
		$("#weatherHide").css("display","block");
		$(this).next().css("display","block");
		$(this).parentsUntil(".news-content2").mouseleave(function(){
			$(".hoverBlock").css("display","none");
		})
		$(this).parentsUntil(".news-content").mouseleave(function(){
			$(".hoverBlock").css("display","none");
		})
		
	})
	
	
	
$(".hoverBlock").mouseenter(function(){
			// $(".hoverBlock").css("display","none");
		$(this).mouseleave(function(){
			$(".hoverBlock").css("display","none");

		});
		})
	//新闻标题 内容选项卡
	$(".tabTitle").mouseover(function(){
		$(this).parent().nextAll(".curTitle-content").hide();
		$(this).parent().nextAll(".tabTitle-content").show();
	});
	$(".curTitle").mouseover(function(){
		$(this).parent().nextAll(".tabTitle-content").hide();
		$(this).parent().nextAll(".curTitle-content").show();

	})

	//股票选项卡
	$("#gupiao-block li").mouseover(function(){
		var guPiaoName = $(this).children("a").attr("value");
		if(guPiaoName == "shangzheng"){
			$("#stockImg img").attr("src","images/"+guPiaoName+".png");
			$(".stockName a").text("上证指数");
			$(".price").text("14764.04");
			$(".changeData-l").text("-19.52");
			$(".changeData-r").text(" -0.38%");
		}
		else if(guPiaoName == "hengzhi"){
			$("#stockImg img").attr("src","images/"+guPiaoName+".png");
			$(".stockName a").text("恒生指数");
			$(".price").text("27068.44");
			$(".changeData-l").text("+88.79");
			$(".changeData-r").text("+0.33%");
		}
		else if(guPiaoName == "daozhi"){
			$("#stockImg img").attr("src","images/"+guPiaoName+".png");
			$(".stockName a").text("道琼斯");
			$(".price").text("17764.04");
			$(".changeData-l").text("-2.51");
			$(".changeData-r").text("-0.01%");
		}
		else if(guPiaoName == "tengan"){
			$("#stockImg img").attr("src","images/"+guPiaoName+".png");
			$(".stockName a").text("中证腾安");
			$(".price").text("3537.95");
			$(".changeData-l").text("+24.44");
			$(".changeData-r").text("+0.83%");
		}
	})

	//股票搜索栏
	var fixedVal =$("#gp-field").val();
	$("#gp-field").focusin(function() {
		$(this).val("");
	}).focusout(function() {
		$(this).val(fixedVal);
	});

	// 第二版新闻区title背景hover效果
	$(".changePingDao").parent().parent().mouseover(function(){
		$(this).find(".title-bar").css({"background-color":"#F7FAFD","borderTopWidth":"2px","padding-top":"0"});
	}).mouseout(function(){
		$(this).find(".title-bar").css({"background-color":"#fff","borderTopWidth":"1px","padding-top":"1px"});
	})

	//底部轮播图
	$("#scoll-list").mouseover(function(){
		$("#hoverBtn-l img").attr({
			src: 'images/btnLeftHover2.png',
		}).css({"opacity":"0.5"});
		
		$("#hoverBtn-r img").attr({
			src: 'images/btnRightHover2.png',
		}).css({"opacity":"0.5"});

		$("#hoverBtn-l img").mouseover(function(){
			$(this).attr({
				src: 'images/btnLeftHover2.png',
			}).css({"opacity":"1"});
			$("#hoverBtn-r img").attr({
				src: 'images/btnRightHover2.png',
			}).css({"opacity":"0.5"});
		});
		$("#hoverBtn-r img").mouseover(function(){
			$(this).attr({
				src: 'images/btnRightHover2.png',
			}).css({"opacity":"1"});
			$("#hoverBtn-l img").attr({
				src: 'images/btnLeftHover2.png',
			}).css({"opacity":"0.5"});
		});
	});
	$("#scoll-list,#hoverBtn-l img,#hoverBtn-r img").mouseout(function(){
		$("#hoverBtn-l img").attr({
			src: 'images/btnLeftHover1.png',
		}).css({"opacity":"1"});
		$("#hoverBtn-r img").attr({
			src: 'images/btnRightHover1.png',
		}).css({"opacity":"1"});
	});

	// 轮播按键
	var sollList = $("#scoll-list");
	var curLeft = null;
	var toOther1,toOther2,dicration;
	var jsObj;
	var timer1 = setInterval(autoLunbo,3000);
	$(".hoverBtn").click(function(){
		jsObj= this;
		clearInterval(timer1);
		lunboClick(jsObj);
		timer1 = setInterval(autoLunbo,3000);
	})
	//轮播函数
	function autoLunbo(){
		lunboClick($("#hoverBtn-r").get(0));
	}
	//点击函数
	function lunboClick(js){

		if(js.id=="hoverBtn-l"){
			toOther1=-2000;
			toOther2=0;
			dicration=1;
		};
		if(js.id=="hoverBtn-r"){
			toOther1=0;//要移动的另一边尽头的left
			toOther2=-2000;//移到尽头的临界值条件
			dicration=-1;
		};
		if(!sollList.is(":animated")){
			curLeft = parseInt(sollList.css("left"));
			if(curLeft==toOther2){
				sollList.animate({
					left: toOther1,
				},300)
				return 0;
			}
			sollList.animate({
				left: dicration*1000+curLeft,
			},400);
		}
	}
})
