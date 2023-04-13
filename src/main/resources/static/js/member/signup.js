/**
 * 
 */
var input;
var thisid;
var target;
var msg;
 $(function(){
	 checkBoxAll = $(".terms :checkbox");
	 $(".essential input").focus(esInputFocus);
	 $(".essential input").blur(esInputBlur);
	 $(".terms-tit :checkbox").click(allAgreeChecked);
	 $(".check-box :checkbox").click(inputChecked);
/*	 $("#email").keyup(emailKeyup);*/
	 
})
 
 function esInputFocus(){
	 input = $(".essential input");
	 if(input.is(":focus")){
		 $(this).css("border","3px solid black");
	 }
 }
 
 function esInputBlur(){
	 input = $(".essential input");
	 thisid = $(this).attr("id");
	 var label_txt = $(this).siblings("label").text();
	//백틱을 사용하면 변수를 텍스트 안에 넣을수 있다 es6부터 사용 구 버전 브라우저지원x
	 msg = `${label_txt}는 필수 입력 항목입니다.`;
	
	if(thisid === "email"){
		var emailadd = $(this).val().trim();
		var flag = validateEmail(emailadd);
		//이메일 검수
		if($(this).val().trim().length <1 ){
			$(this).siblings("span").text(msg);
			$(this).siblings("span").css("display","block");
			$(this).siblings("span").css("padding-top","0.5em");
		}else if(!flag){
			$(this).siblings("span").text("email 형식에 맞지 않습니다.");
			$(this).siblings("span").css("display","block");
			$(this).siblings("span").css("padding-top","0.5em");
		}else{
			$.ajax({
				url: "/sign/email-check",
				type: "post",
				data: { email: $(this).val().trim() },
				error: function() {
					alert("ajax 실패");
				},
				//비동기 요청이 정상 처리되면 function() 실행
				success: function(result) {
					console.log(result);
					console.log($(this));
					if (!result) {
						$("#email").siblings("span").text("중복된 이메일입니다.");
						$("#email").siblings("span").css("display", " block");
						$("#email").siblings("span").css("padding-top", "0.5em");
					} else {
						$("#email").siblings("span").text("사용 가능한 email 입니다.");
						$("#email").siblings("span").css("color", "#03c75a");
						$("#email").siblings("span").css("padding-top", "0.5em");
						$("#email").siblings("span").css("display", " block");
					}
				}
			});
		}
		//비밀번호검수
	}else if(thisid === "pwd1"){
			var password = $(this).val().trim();
			var flag = validatePassword(password);
			if(password.length<10){
				$(this).siblings("span").text("비밀 번호는 10자리 이상입니다.");
				$(this).siblings("span").css("display","block");
				$(this).siblings("span").css("padding-top","0.5em");
			}else if(!flag){
				$(this).siblings("span").text("비밀번호가 10자리 이상이고 특수문자 1개 이상을 포함하고 중복된 문자 3개 이상을 포함되지 않아야 합니다.");  
				$(this).siblings("span").css("display","block");
				$(this).siblings("span").css("padding-top","0.5em");
			}else{
				$(this).siblings("span").css("display","none");
			}
	}else if (thisid ==="pwd2"){
		var password = $("#pwd1").val().trim();
		var passwordcheck = $(this).val().trim();
		if(password === passwordcheck){
			$(this).siblings("span").css("display","none");
		}else{
			$(this).siblings("span").text("비밀 번호가 일치 하지 않습니다.");
			$(this).siblings("span").css("display","block");
			$(this).siblings("span").css("padding-top","0.5em");
		}
	}else if(thisid === "name"){
		var name = $(this).val().trim();
		if(!validateKorean(name)){
			$(this).siblings("span").text("한국어 이름 형식에 맞지 않습니다.");
			$(this).siblings("span").css("display","block");
			$(this).siblings("span").css("padding-top","0.5em");
		}else{
			$(this).siblings("span").css("display","none");
		}
	}
	 if(!input.is(":focus")){
		 $(this).css("border","1px solid #dadada");
	 }

 }

function allAgreeChecked(){
	var flag = $(this).is(":checked");
	if(flag){
		$(".check-box :checkbox").prop("checked", true);
	}else{
		$(".check-box :checkbox").prop("checked", false);
	}
	
}

function inputChecked(){	
	/*var flag;*/
/*	var dd = $(".terms dd");*/
	if($(this).is(":checked")){
		$(this).prop("checked", true);
/*		for(var i = 0; i < dd.length; i++){
			if(dd.eq(i).children().find("input").is(":checked")){
				flag = true;
			}else{
				flag= false;
				break;
			}	
		}*/

	}else{
		$(this).prop("checked", false);
		/*flag= false;*/
	}
	/*$(".terms :checked").not($(this)).length << 전체 클릭 input을 제외한 나머지 input의 properties가 checked인가를 비교하는것*/
	var cnum = $(".terms :checkbox").not($(".terms-tit :checkbox")).length;
	console.log(cnum);
	cnum ===  $(".terms :checked").not($(".terms-tit :checkbox")).length ? $(".terms-tit :checkbox").prop("checked", true) : $(".terms-tit :checkbox").prop("checked", false);
	
/*	if(flag){
		$(".terms-tit input").prop("checked",true);
	}else{
		$(".terms-tit input").prop("checked",false);
	}*/	
}

function validateEmail(email) {
  var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  // 비밀번호가 10자리 이상이고, 특수문자 1개 이상을 포함하고,
  // 중복된 문자 3개 이상을 포함하지 않는지 확인합니다.
  var passwordRegex = /^(?!.*(.).*\1)(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)(?=.*[a-zA-Z]).{10,}$/;
  return passwordRegex.test(password);
}

function validateKorean(name) {
  var regExp = /^[가-힣]{2,4}$/; // 2~4글자의 한글 이름
  var invalidRegExp = /[ㄱ-ㅎㅏ-ㅣ]/; // 자음 또는 모음 단일로만 이루어진 이름
  return regExp.test(name) && !invalidRegExp.test(name);
}


/*function emailKeyup(){
	var in_eamil = $(this).val().trim();
	if(in_eamil.length <6){
		return ;
	}	
	
	$.ajax({
		url:"/sign/email-check",
		type:"post",
		data:{email:$(this).val().trim()},
		error:function(){
			alert("ajax 실패");
		},
		//비동기 요청이 정상 처리되면 function() 실행
		success:function(result){
			if(!result){
				$(this).siblings("span").text("중복된 이메일입니다.");
				$(this).siblings("span").css("display"," block");
				$(this).siblings("span").css("padding-top","0.5em");
			}
		}	
		});
}*/
