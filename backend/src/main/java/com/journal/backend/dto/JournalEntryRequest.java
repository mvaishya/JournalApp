package com.journal.backend.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class JournalEntryRequest {

    @NotBlank(message = "User ID is required")
    private String userId;

    @NotNull(message = "Entry time is required")
    private LocalDateTime entryTime;

    @NotBlank(message = "Symbol is required")
    private String symbol;

    @NotNull(message = "Entry price is required")
    private Double entry;

    private Double stopLoss;

    @NotNull(message = "Position size is required")
    private Double positionSize;

    private Double target;
    private Double trailingStop;
    private LocalDateTime exitTime;
    private Double exit;
    private Double pnl;
    private String setup;

    // Constructors
    public JournalEntryRequest() {}

    // Getters and Setters
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public LocalDateTime getEntryTime() {
        return entryTime;
    }

    public void setEntryTime(LocalDateTime entryTime) {
        this.entryTime = entryTime;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public Double getEntry() {
        return entry;
    }

    public void setEntry(Double entry) {
        this.entry = entry;
    }

    public Double getStopLoss() {
        return stopLoss;
    }

    public void setStopLoss(Double stopLoss) {
        this.stopLoss = stopLoss;
    }

    public Double getPositionSize() {
        return positionSize;
    }

    public void setPositionSize(Double positionSize) {
        this.positionSize = positionSize;
    }

    public Double getTarget() {
        return target;
    }

    public void setTarget(Double target) {
        this.target = target;
    }

    public Double getTrailingStop() {
        return trailingStop;
    }

    public void setTrailingStop(Double trailingStop) {
        this.trailingStop = trailingStop;
    }

    public LocalDateTime getExitTime() {
        return exitTime;
    }

    public void setExitTime(LocalDateTime exitTime) {
        this.exitTime = exitTime;
    }

    public Double getExit() {
        return exit;
    }

    public void setExit(Double exit) {
        this.exit = exit;
    }

    public Double getPnl() {
        return pnl;
    }

    public void setPnl(Double pnl) {
        this.pnl = pnl;
    }

    public String getSetup() {
        return setup;
    }

    public void setSetup(String setup) {
        this.setup = setup;
    }
}
