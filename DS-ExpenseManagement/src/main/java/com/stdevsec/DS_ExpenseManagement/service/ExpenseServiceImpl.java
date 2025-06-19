package com.stdevsec.DS_ExpenseManagement.service;

import com.stdevsec.DS_ExpenseManagement.dto.ExpenseDto;
import com.stdevsec.DS_ExpenseManagement.dto.WeeklySummaryDTO;
import com.stdevsec.DS_ExpenseManagement.entity.Expense;
import com.stdevsec.DS_ExpenseManagement.mapper.ExpenseMapper;
import com.stdevsec.DS_ExpenseManagement.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExpenseServiceImpl implements ExpenseService{

    @Autowired
    private final ExpenseRepository expenseRepository;

    @Override
    public List<ExpenseDto> getAll() {
        return expenseRepository.findAll().stream()
                .map(ExpenseMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ExpenseDto> getThisWeek() {
        LocalDate start = LocalDate.now().with(DayOfWeek.MONDAY);
        LocalDate end = start.plusDays(6);
        return expenseRepository.findAllByDateBetween(start, end).stream()
                .map(ExpenseMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ExpenseDto save(ExpenseDto dto) {
        Expense saved = expenseRepository.save(ExpenseMapper.toEntity(dto));
        return ExpenseMapper.toDTO(saved);
    }

    @Override
    public void delete(Long id) {
        expenseRepository.deleteById(id);
    }

    @Override
    public WeeklySummaryDTO getWeeklySummary() {
        LocalDate start = LocalDate.now().with(DayOfWeek.MONDAY);
        LocalDate end = start.plusDays(6);
        List<Expense> weeklyExpenses = expenseRepository.findAllByDateBetween(start, end);

        double total = 0;
        double user1Total = 0;
        double user2Total = 0;

        for (Expense expense : weeklyExpenses) {
            total += expense.getAmount();
            if (expense.getUser().getId() == 1L) user1Total += expense.getAmount();
            else if (expense.getUser().getId() == 2L) user2Total += expense.getAmount();
        }

        double idealSplit = total / 2;
        double balance = Math.abs(user1Total - user2Total);
        boolean even = Math.abs(user1Total - idealSplit) < 0.01;

        return WeeklySummaryDTO.builder()
                .totalWeekAmount(total)
                .user1Total(user1Total)
                .user2Total(user2Total)
                .balance(balance)
                .even(even)
                .build();
    }

}
