package com.green.nowon.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
//웹 에서 들어온 요청을 컨트롤러에게 매핑하기 위한 어노테이션
//지원 매핑 방식은 get,post,delete,put,patch가 있다.	
import org.springframework.web.bind.annotation.ResponseBody;

import com.green.nowon.domain.entity.MemberEntity;
import com.green.nowon.domain.entity.MemberEntityRepository;
@Controller
@RequestMapping("/sign/*")
//어노테이션 사용시 빈객체를 생성해 서블린 컨테이너에 singleton방식으로
//객체를 생성해서 서버가 끝날때까지 저장한다.
public class SignController {
	
	@GetMapping("signin")	
	//스프링 부트에서는 기존에 사용하던 request 객체등을 자동으로 생성해 주기 때문에
	//데이터를 페이지로 가져가기 위해서 사용하던 request.getAtrribute()대신에
	// Model이라는 객체를 만들어서 전달하게 된다.
	public String signin(Model model) {
		return "member/signin";
	}
	
	@GetMapping("signup")
	public String signup(Model model) {
		model.addAttribute("hello","모델객체에 의해 넘어온 값입니다.");
		return"member/signup";
	}
	@PostMapping("signup")
	public String signup(String email, String pw, String name) {
		System.out.println("이메일 : "+email);
		System.out.println("비밀번호 : "+pw);
		System.out.println("이름 : "+name);
		return "member/signup";
	}
	
	@Autowired
	private MemberEntityRepository repository;
	
	@PostMapping("email-check")
	/*@controller 아래에 작성된 String 메소드는 uri값이 기때문에 @ResponseBody 어노테이션을 통해 jason타입으로 리턴할것 이란걸 알려주어야한다*/ 
	public @ResponseBody boolean emailCheck(String email) {
		//select count(*) form member where email = 'email'; <<이라는 쿼리를 날리고 싶음
		Optional<MemberEntity> result =repository.findByEmail(email);
		if(result.isEmpty()/*조회 결과가 null이거나 비어있으면 true 반대는 .isPresent()*/) {
			//return값이 비어있으니 사용가능 email
			return true;
		}else {
			//return값이 비어있지 않아 사용불가 email
			return false;
		}//if끝
	}
	
}
