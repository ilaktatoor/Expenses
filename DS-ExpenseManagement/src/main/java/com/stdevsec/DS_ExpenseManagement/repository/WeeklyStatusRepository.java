package com.stdevsec.DS_ExpenseManagement.repository;


import com.stdevsec.DS_ExpenseManagement.entity.WeeklyStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface WeeklyStatusRepository extends JpaRepository<WeeklyStatus, Long> {
    Optional<WeeklyStatus> findByWeekStart(LocalDate weekStart);
}