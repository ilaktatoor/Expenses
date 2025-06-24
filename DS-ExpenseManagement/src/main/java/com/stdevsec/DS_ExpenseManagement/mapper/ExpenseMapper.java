package com.stdevsec.DS_ExpenseManagement.mapper;


import com.stdevsec.DS_ExpenseManagement.dto.ExpenseDto;
import com.stdevsec.DS_ExpenseManagement.entity.Expense;

public class ExpenseMapper {

    public static Expense toEntity(ExpenseDto dto) {
        return Expense.builder()
                .description(dto.getDescription())
                .amount(dto.getAmount())
                .category(dto.getCategory())
                .date(dto.getDate())
                .build();
    }

    public static ExpenseDto toDTO(Expense entity) {
        return ExpenseDto.builder()
                .description(entity.getDescription())
                .amount(entity.getAmount())
                .category(entity.getCategory())
                .date(entity.getDate())
                .userId(entity.getUser() != null ? entity.getUser().getId() : null)
                .build();
    }
}
