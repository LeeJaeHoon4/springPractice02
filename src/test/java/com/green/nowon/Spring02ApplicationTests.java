package com.green.nowon;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.green.nowon.domain.entity.MemberEntity;
import com.green.nowon.domain.entity.MemberEntityRepository;

@SpringBootTest
class Spring02ApplicationTests {
	
	@Autowired
	MemberEntityRepository repo;
	//@Test
	void 임시계정생성() {
		System.out.println("member테이블 접속 객체 : "+repo);
		repo.save(MemberEntity.builder().email("test01@test.com").password("1234").name("노원그린").build());
	}

}
