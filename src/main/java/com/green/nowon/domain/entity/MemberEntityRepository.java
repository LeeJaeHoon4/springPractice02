package com.green.nowon.domain.entity;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberEntityRepository extends JpaRepository< MemberEntity, Long>{
	//추상 메서드 (쿼리 메서드) 작성 가능
	
	Optional<MemberEntity> findByEmail(String email);

	
	
	
}
