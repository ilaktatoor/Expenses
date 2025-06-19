package com.stdevsec.DS_ExpenseManagement.repository;

import com.stdevsec.DS_ExpenseManagement.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository  extends JpaRepository<User, Long> {
}
