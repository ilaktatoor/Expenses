package com.stdevsec.DS_ExpenseManagement.service;

import com.stdevsec.DS_ExpenseManagement.dto.ExpenseDto;
import com.stdevsec.DS_ExpenseManagement.dto.WeeklySummaryDTO;
import com.stdevsec.DS_ExpenseManagement.entity.Expense;
import com.stdevsec.DS_ExpenseManagement.entity.User;
import com.stdevsec.DS_ExpenseManagement.entity.WeeklyStatus;
import com.stdevsec.DS_ExpenseManagement.mapper.ExpenseMapper;
import com.stdevsec.DS_ExpenseManagement.repository.ExpenseRepository;
import com.stdevsec.DS_ExpenseManagement.repository.UserRepository;
import com.stdevsec.DS_ExpenseManagement.repository.WeeklyStatusRepository;
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
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private WeeklyStatusRepository weeklyStatusRepository;

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
        // Load user by ID
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + dto.getUserId()));

        // Map dto to entity
        Expense expense = ExpenseMapper.toEntity(dto);
        expense.setUser(user);

        // Save and return dto
        Expense saved = expenseRepository.save(expense);
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

        String user1Name = "User 1";
        String user2Name = "User 2";

        Long user1Id = null;
        Long user2Id = null;

        for (Expense expense : weeklyExpenses) {
            total += expense.getAmount();

            Long userId = expense.getUser().getId();
            String name = expense.getUser().getName();

            if (user1Id == null || user1Id.equals(userId)) {
                user1Id = userId;
                user1Name = name;
                user1Total += expense.getAmount();
            } else if (user2Id == null || user2Id.equals(userId)) {
                user2Id = userId;
                user2Name = name;
                user2Total += expense.getAmount();
            }
        }

        double idealSplit = total / 2;
        double balance = Math.abs(user1Total - user2Total);

        LocalDate weekStart = LocalDate.now().with(DayOfWeek.MONDAY);
        boolean isEven = weeklyStatusRepository.findByWeekStart(weekStart)
                .map(WeeklyStatus::isEven)
                .orElse(Math.abs(user1Total - idealSplit) < 0.01);

        return WeeklySummaryDTO.builder()
                .totalWeekAmount(total)
                .user1Total(user1Total)
                .user2Total(user2Total)
                .user1Name(user1Name)
                .user2Name(user2Name)
                .balance(balance)
                .even(isEven)
                .build();
    }


    public void markWeekAsEven() {
        LocalDate today = LocalDate.now();
        LocalDate weekStart = today.with(java.time.DayOfWeek.MONDAY); // inicio de semana
        WeeklyStatus status = weeklyStatusRepository.findByWeekStart(weekStart)
                .orElse(WeeklyStatus.builder().weekStart(weekStart).build());

        status.setEven(true);
        weeklyStatusRepository.save(status);
    }


}
