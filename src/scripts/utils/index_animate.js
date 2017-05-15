
(function(){
	//当所有dom和图片加载完加载脚本
	window.onload = function(){
//		$("body").css("display","block")
	//设置动画的不显示
	//	$("#lodding_animate").css("display","none")

		loadAnimate("css/animate.min.css")
	}

	//动态生成link标签，添加css
function loadAnimate(url) {
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    }

})()
