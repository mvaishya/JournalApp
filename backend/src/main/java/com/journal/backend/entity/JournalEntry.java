package com.journal.backend.entity;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "journal_entries")
public class JournalEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "User ID is required")
    @Column(name = "user_id", nullable = false)
    private String userId;

    @NotNull(message = "Entry time is required")
    @Column(name = "entry_time", nullable = false)
    private LocalDateTime entryTime;

    @NotBlank(message = "Symbol is required")
    @Column(name = "symbol", nullable = false)
    private String symbol;

    @NotNull(message = "Entry price is required")
    @Column(name = "entry_price", nullable = false)
    private Double entry;

    @Column(name = "stop_loss")
    private Double stopLoss;

    @NotNull(message = "Position size is required")
    @Column(name = "position_size", nullable = false)
    private Double positionSize;

    @Column(name = "target")
    private Double target;

    @Column(name = "trailing_stop")
    private Double trailingStop;

    @Column(name = "exit_time")
    private LocalDateTime exitTime;

    @Column(name = "exit_price")
    private Double exit;

    @Column(name = "pnl")
    private Double pnl;

    @Column(name = "setup", length = 1000)
    private String setup;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors
    public JournalEntry() {}

    public JournalEntry(String userId, LocalDateTime entryTime, String symbol, Double entry, 
                       Double positionSize) {
        this.userId = userId;
        this.entryTime = entryTime;
        this.symbol = symbol;
        this.entry = entry;
        this.positionSize = positionSize;
    }

    // Lifecycle callbacks
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
