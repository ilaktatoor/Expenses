package com.stdevsec.DS_ExpenseManagement.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WeeklySummaryDTO {
    private double totalWeekAmount;
    private double user1Total;
    private double user2Total;
    private String user1Name;
    private String user2Name;
    private double balance;
    private boolean even;
}