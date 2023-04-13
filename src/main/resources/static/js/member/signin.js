/**
 * 
 */

$(function(){
	$("#login-form>ul li:nth-child(1) input").focus(function(){
		$(this).parent().css("border","1px solid #03c75a");
		$(this).siblings("span").css("color","black");
		console.log($(this).index());
	})
/*	console.log($("#login-form>ul li:nth-child(1) input").is(":focus"));*/
	$("#login-form>ul li:nth-child(1) input").blur(function(){
		$(this).parent().css("border","1px solid #dadada");
		$(this).siblings("span").css("color","#777");
	})

	$("#login-form>ul li:nth-child(2)>input").focus(function(){
		$(this).parent().css("border","1px solid #03c75a");
		$(this).parent().prev("li").css("border-bottom","none");
		$(this).siblings("span").css("color","black");
	})
	
	$("#login-form>ul li:nth-child(2)>input").blur(function(){
		$(this).parent().css("border","1px solid #dadada");
		$(this).parent().css("border-top","none");
		$(this).parent().prev("li").css("border-bottom","1px solid #dadada");
		$(this).siblings("span").css("color","#777");
	})
	
	$(".menu-box >.menu").siblings("li").click(menuClicked);
	
	$("#mnumber>input").focus(function(){
		$(this).parent().css("border","1px solid #03c75a");
	})
	})

function menuClicked(){
		$(this).siblings("li").removeClass("view");
		$(this).addClass("view");
		console.log($(this).index());
		var index = $(this).index();
		var menucontentlist = $(".menu-content-box>.menu-content");
		menucontentlist.siblings().css("display","none");
		menucontentlist.eq(index).css("display","block");
}
/*function idFocus(){
	if($("#login-form-div>form>ul li:nth-child(1) input").is(":focus")){
		$("#login-form-div>form>ul li:nth-child(1) input").parent().css("border","1px solid #03c75a");
		$("#login-form-div>form>ul li:nth-child(1) input").siblings("span").css("color","black");
	}else{
		$("#login-form-div>form>ul li:nth-child(1) input").parent().css("border","1px solid #dadada");
		$("#login-form-div>form>ul li:nth-child(1) input").siblings("span").css("color","#777");
	}
}*/