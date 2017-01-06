$(function(){
	
	//页面点击滑动
	var _index=0;
	var indexlen=$(".page").length;//总页数
	
//	容器对应七个页面的位置
	var arrPos=[];
	function getPos(){		
			
    	var pageHeight=$(".content").height();//页面高
		var contentHeight=pageHeight*indexlen;//容器高
		for(var i=0;i<indexlen;i++){
			var posTop=-i*pageHeight;
			arrPos.push(posTop);
		}
	}
	getPos();
	
	function slide(index){	
//			var headerHeight=$(".header").height();
//			var footerHeight=$(".footer").height();			
//	    	var pageHeight=$("body").height()-footerHeight-headerHeight;//页面高
	    	var pageHeight=$(".content").height();//页面高
			var contentHeight=pageHeight*indexlen;//容器高
		    var posTop=-index*pageHeight;
		    
		    var pagePos=[];
		    
	    		for(var i=0;i<indexlen;i++){				
					pagePos.push(-i*pageHeight);
				}  		
				
//			$(".content").css({height:pageHeight});
		    $(".page").css({height:pageHeight});
			$(".page_container").css({height:contentHeight}).animate({top:posTop+"px",},300
				,function(){
				scroll=false;
				$(".page_img>img").hide();
				
				switch(posTop){
			        case pagePos[0]:
				       shades($(".page1"));//滚动到第1个页面时执行的东西
				        break;
			        case pagePos[1]:
				        shades($(".page2"));//滚动到第2个页面时执行的东西
				        break;
			        case pagePos[2]:
				        shades($(".page3"));//滚动到第3个页面时执行的东西
				        break;
			        case pagePos[3]:
				        shades($(".page4"));//滚动到第4个页面时执行的东西
				        break; 
			        default:
				        shades($(".page5"));//滚动到最后一个页面时执行的东西
				        break;
			    }
		});
			$(".page_index i").removeClass("icon-circle").addClass("icon-dot").eq(index).removeClass("icon-dot").addClass("icon-circle");	
	}
	slide(_index);	
	//圆圈点击切换	
	$(".page_index>span").click(function(e){	
		 e.stopPropagation();
		 if(_index===$(this).index()){
		 	return;
		 }
		_index=$(this).index();		
		slide(_index);
	})	
		
	// jquery 兼容的滚轮滑动事件	
	var scroll=false;//防止滚动连续触发
	function scrollSlide(e){
		if(scroll){return}
	    scroll=true;
	    var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
	                (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox	   
	               
	    if (delta > 0) {	
	        // 向上滚	    
	         _index--;	      
	        if(_index<0){
	    		_index=0;
	    		scroll=false;
	    		return;
		    }	        
	    } else if (delta < 0) {
	        // 向下滚	       
	        _index++;
	        if(_index>indexlen-1){
	    		_index=indexlen-1;
	    		scroll=false;
		    	return;
		    }
	    }
	    slide(_index);
	}
	$(".page_container").on("mousewheel DOMMouseScroll", function (e) {
	     e.stopPropagation();	     
	     scrollSlide(e);	     	    
	});


	//重置窗口大小
	function adjust(){
		var pageHeight=$(".content").height();//页面高    		  		    
		$(".page").css({height:pageHeight});
		$(".page_container").css({height:pageHeight*indexlen})
		
//		$('.page_img img').css({
//			height:"80%"
//		})
//		$(".page_three img").css({
//			height:"50%"
//		})
	}
	$(window).resize(function(){
		//调整页面大小
		slide(_index);
		
		adjust();
		//调整图片大小 		
//		location.reload(); 		
	})

	//侧边栏滑出
	$(".btn_menu").click(function(){			
		$(".sidebar").animate({right:0},300);
	})
	//侧边栏隐藏
	$(".sidebar_hide").click(function(){
		var siderbarWidth=-$(".sidebar").outerWidth()+"px";
		$(".sidebar").animate({right:siderbarWidth},300);
	})	
	//登录弹出
	$(".login_title").click(function(){
		$(".mark").css({
			display:"block",
		})
	})
	//登录隐藏
	$(".login_header>span").click(function(){	
		$(".mark").css({
			display:"none",
		})
	})
	//ie模拟placeholder
	function placeholder(){
		$("#username").focus(function(){
			if($(this).siblings("label").text()=="QQ号/邮箱/手机号"){
				$(this).siblings("label").text("");
			}
		})
		$("#username").blur(function(){
			if($(this).val()==""){
				$(this).siblings("label").text("QQ号/邮箱/手机号").css({color:"#ccc"});;
			}
		})
		$("#passwd").focus(function(){
			if($(this).siblings("label").text()=="密码"){
				$(this).siblings("label").text("");				
			}
		})
		$("#passwd").blur(function(){
			if($(this).val()==""){
				$(this).siblings("label").text("密码").css({color:"#ccc"});		
			}
		})
		
	}
	placeholder();
	//用户登录验证
	 $(".btn_login").click(function (e) {
	 	var userval=$("#username").val();
	 	var passval=$("#passwd").val();
        if (userval == "") {
            alert("用户名不能为空");
            return false;
        }else if (passval == "") {
            alert("密码不能为空");
            return false;
        }else {
            $.ajax({
                type: "post",
                url: "php/login.php",
                async: false,
                dataType:"json",
                data: { 
                		username: userval,
                   		passwd: passval,
                },
                success: function (data, status) {
                    if (data.status==1) {
                        alert("登录成功");
                        login=true;
                        $(".mark").css({display:"none",})
                        $(".login_title a").text(data.user);

                        //勾选自动登录						
						if($("#auto_login").prop("checked")){//如果被选中								
							setCookie("username",userval,20);
							setCookie("passwd",passval,20);
						}else{//如果没选中
							removeCookie("username");
							removeCookie("passwd");
						}                       
                    }
                    else{
                    	alert("用户名或密码不对");  
                    	login=false;
                    }
                },
                error: function () { alert("用户名密码验证失败") ;login=false;}
                
            });
        }
        e.preventDefault();
   });
	
//自动登录
function autologin(){
	var user=getCookie("username");
	var passwd=getCookie("passwd");
	if(user){
		$(".login_title a").text(user);
		$("#username").val(user);
	 	$("#passwd").val(passwd);
	 	$("#auto_login").attr("checked",true);
	}
}
autologin();
//修改密码
var login=false;
function changepass(){
	$(".change_pass a").click(function(e){
		if(login){
			
		}else{
			alert("请先登录");
			e.preventDefault();
		}
	})
}
changepass();



//百叶窗效果
//function Shades(opation){
//	this.parent=opation.parent;
//	this.container=opation.container;
//}


//百叶窗效果
function shades(imgele){
	imgele.hide();
//  imgele.css({opacity:0});
	var imgsrc=imgele.attr("src");
	var htmls="<div class='shades'>"
					+"<div class='shades_item'><img src="+imgsrc+" /></div>"
					+"<div class='shades_item'><img src="+imgsrc+" /></div>"
					+"<div class='shades_item'><img src="+imgsrc+" /></div>"
					+"<div class='shades_item'><img src="+imgsrc+" /></div>"
					+"<div class='shades_item'><img src="+imgsrc+" /></div>"
				+"</div>" 
		imgele.after(htmls)		
	var shades=imgele.nextAll(".shades");
	var shadowitem=shades.find(".shades_item");
	var itemimg=shadowitem.find("img");
	var len=shadowitem.length;
	var imgw=imgele.width();
	var imgh=imgele.height();
	
//	console.log(imgw)
	
	shades.css({
		width:imgw,
		height:imgh,
		left:"50%",
		marginLeft:-imgw/2+"px"
	})
	for(i=0;i<len;i++){
		itemimg.eq(i).css({
			left:-i*imgw/5+"px"
		})
		shadowitem.eq(i).css({
			left:i*imgw/5+"px"
		}).animate({width:"20%"},1000,function(){
//			imgele.css({opacity:1});
			imgele.show();
			shades.remove();
		})
	}	
}

})	
