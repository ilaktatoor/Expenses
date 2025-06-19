package com.stdevsec.DS_ExpenseManagement.repository;

import com.stdevsec.DS_ExpenseManagement.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findAllByDateBetween(LocalDate start, LocalDate end);
}
