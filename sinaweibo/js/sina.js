$(function(){
	var $stop = $("#stop");
	var $container = $(".img_container");//轮播图片Ul节点
	var picWidth = parseInt($container.children().css("width"));//图片宽度
	var pagesLen =( $container.children().length-1)*picWidth;//图片长度
	var curLeft = null;
	var toOther1,toOther2,dicration;
	var jsObj;

	var timer1 = setInterval(autoLunbo,3000);
	$(".out_hover").click(function(){
		jsObj= this;
		clearInterval(timer1);
		lunboClick(jsObj);
		timer1 = setInterval(autoLunbo,3000);
	})
	
	//轮播函数
	function autoLunbo(){
		lunboClick($("#next").get(0));
	}
	//点击函数
	function lunboClick(js){

		if(js.id=="prev"){
			toOther1=-pagesLen;
			toOther2=0;
			dicration=1;
		};
		if(js.id=="next"){
			toOther1=0;//要移动的另一边尽头的left
			toOther2=-pagesLen;//移到尽头的临界值条件
			dicration=-1;
		};
		if(!$container.is(":animated")){
			curLeft = parseInt($container.css("left"));
			if(curLeft==toOther2){
				$container.animate({
					left: toOther1,
				},300)
				return 0;
			}
			$container.animate({
				left: dicration*picWidth+curLeft,
			},400);
		}
	};

	// 鼠标hover轮播图片，停止轮播
	$(".scoll").children("img.out_hover").mouseover(function(event){
		$(this).css({"opacity":"1.0","filter":"alpha(opacity=100)"});
		})
	.mouseout(function(){
		$(this).css({"opacity":"0.5","filter":"alpha(opacity=50)"});
	})
})


	

	
	

	


