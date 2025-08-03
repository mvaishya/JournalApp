package com.journal.backend.controller;

import com.journal.backend.dto.JournalEntryRequest;
import com.journal.backend.dto.JournalEntryResponse;
import com.journal.backend.service.JournalEntryService;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/journal")
@CrossOrigin(origins = "http://localhost:3000") // Allow React frontend
public class JournalEntryController {

    @Autowired
    private JournalEntryService journalEntryService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<JournalEntryResponse>> getAllEntriesByUserId(@PathVariable String userId) {
        List<JournalEntryResponse> entries = journalEntryService.getAllEntriesByUserId(userId);
        return ResponseEntity.ok(entries);
    }

    @GetMapping("/{id}")
    public ResponseEntity<JournalEntryResponse> getEntryById(@PathVariable Long id) {
        Optional<JournalEntryResponse> entry = journalEntryService.getEntryById(id);
        return entry.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<JournalEntryResponse> createEntry(@Valid @RequestBody JournalEntryRequest request) {
        try {
            JournalEntryResponse createdEntry = journalEntryService.createEntry(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdEntry);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<JournalEntryResponse> updateEntry(@PathVariable Long id, 
                                                           @Valid @RequestBody JournalEntryRequest request) {
        try {
            Optional<JournalEntryResponse> updatedEntry = journalEntryService.updateEntry(id, request);
            return updatedEntry.map(ResponseEntity::ok)
                              .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEntry(@PathVariable Long id) {
        boolean deleted = journalEntryService.deleteEntry(id);
        return deleted ? ResponseEntity.noContent().build() 
                       : ResponseEntity.notFound().build();
    }

    @GetMapping("/user/{userId}/symbol/{symbol}")
    public ResponseEntity<List<JournalEntryResponse>> getEntriesByUserIdAndSymbol(
            @PathVariable String userId, 
            @PathVariable String symbol) {
        List<JournalEntryResponse> entries = journalEntryService.getEntriesByUserIdAndSymbol(userId, symbol);
        return ResponseEntity.ok(entries);
    }

    @GetMapping("/user/{userId}/date-range")
    public ResponseEntity<List<JournalEntryResponse>> getEntriesByUserIdAndDateRange(
            @PathVariable String userId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        List<JournalEntryResponse> entries = journalEntryService.getEntriesByUserIdAndDateRange(userId, startDate, endDate);
        return ResponseEntity.ok(entries);
    }

    @GetMapping("/user/{userId}/stats")
    public ResponseEntity<Map<String, Object>> getUserStats(@PathVariable String userId) {
        long entryCount = journalEntryService.getEntryCountByUserId(userId);
        Double totalPnl = journalEntryService.getTotalPnlByUserId(userId);
        
        Map<String, Object> stats = Map.of(
            "entryCount", entryCount,
            "totalPnl", totalPnl != null ? totalPnl : 0.0
        );
        
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        return ResponseEntity.ok(Map.of("status", "UP", "service", "Journal Backend"));
    }
}
