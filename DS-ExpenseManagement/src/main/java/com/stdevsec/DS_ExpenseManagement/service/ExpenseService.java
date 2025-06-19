package com.stdevsec.DS_ExpenseManagement.service;

import com.stdevsec.DS_ExpenseManagement.dto.ExpenseDto;
import com.stdevsec.DS_ExpenseManagement.dto.WeeklySummaryDTO;

import java.util.List;

public interface ExpenseService {
    List<ExpenseDto> getAll();
    List<ExpenseDto> getThisWeek();
    ExpenseDto save(ExpenseDto dto);
    void delete(Long id);
    WeeklySummaryDTO getWeeklySummary();

}
