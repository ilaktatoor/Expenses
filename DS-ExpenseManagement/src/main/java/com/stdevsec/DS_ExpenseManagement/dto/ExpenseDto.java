package com.stdevsec.DS_ExpenseManagement.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExpenseDto {
    private String description;
    private Double amount;
    private String category;
    private LocalDate date;
    private Long userId;
}
