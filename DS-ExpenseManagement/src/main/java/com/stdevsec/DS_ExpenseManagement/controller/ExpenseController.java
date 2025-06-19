package com.stdevsec.DS_ExpenseManagement.controller;


import com.stdevsec.DS_ExpenseManagement.dto.ExpenseDto;
import com.stdevsec.DS_ExpenseManagement.dto.WeeklySummaryDTO;
import com.stdevsec.DS_ExpenseManagement.service.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ExpenseController {
    @Autowired
    private final ExpenseService expenseService;

    @GetMapping
    public List<ExpenseDto> getAll() {
        return expenseService.getAll();
    }

    @GetMapping("/week")
    public List<ExpenseDto> getThisWeek() {
        return expenseService.getThisWeek();
    }

    @PostMapping
    public ExpenseDto create(@RequestBody ExpenseDto dto) {
        return expenseService.save(dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        expenseService.delete(id);
    }

    @GetMapping("/week/summary")
    public WeeklySummaryDTO getWeeklySummary() {
        return expenseService.getWeeklySummary();
    }

}
