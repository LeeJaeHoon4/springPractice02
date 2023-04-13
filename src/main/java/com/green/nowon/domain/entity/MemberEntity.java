package com.green.nowon.domain.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
@Builder //객체 생성 패턴 중builder 생성 패턴을 사용할거라는 어노테이션
@AllArgsConstructor
@NoArgsConstructor
//getter 메소드 자동 생성 어노테이션
//어노테이션을 써서 생성하는 이유는 getter/setter작성시  테이블이 꼬여버릴수있음
@Getter
@SequenceGenerator(initialValue = 1,allocationSize = 1,name = "gen_seq_mem",sequenceName = "seq_mem")
@Table(name="member")
//JPA의 entity클래스 임을 나타냄
//아래 클래스가 데이터 베이스 테이블과 매핑되는 클래스임을 나타내는 어노테이션
//jpa는 javax.persistence 패키지에서 가져옴
@Entity
public class MemberEntity  {
	//pk임을 나타내는 어노테이션
	@Id
	@GeneratedValue(generator = "gen_seq_mem",strategy =  GenerationType.SEQUENCE)
	private long no; // 회원가입 테이블pk로활용
	//ddl 옵션 주기위한 @column어노테이션 없어도 table의 column으로 인식
	@Column(nullable= false, unique = true)
	private String email;
	//@Column(nullable= false)와 같은 의미
	@Column(nullable= false)
	private String password;
	
	@Column(nullable= false)
	private String name;
	
	//insert시 자동으로 넣어줌
	@CreationTimestamp
	//카멜 표기법으로 표기시 오라클에서 _로 자동으로 넣어줌
	private LocalDateTime createdDate;
	
	
	
}
