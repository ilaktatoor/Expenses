package com.stdevsec.DS_ExpenseManagement.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WeeklySummaryDTO {
    private Double totalWeekAmount;
    private Double user1Total;
    private Double user2Total;
    private Double balance; // cuánto debe uno al otro
    private Boolean even;
}
