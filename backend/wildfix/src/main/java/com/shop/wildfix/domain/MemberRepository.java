package com.shop.wildfix.domain;

import com.shop.wildfix.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
