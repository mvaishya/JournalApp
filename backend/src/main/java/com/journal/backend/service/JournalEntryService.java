package com.journal.backend.service;

import com.journal.backend.dto.JournalEntryRequest;
import com.journal.backend.dto.JournalEntryResponse;
import com.journal.backend.entity.JournalEntry;
import com.journal.backend.repository.JournalEntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class JournalEntryService {

    @Autowired
    private JournalEntryRepository journalEntryRepository;

    public List<JournalEntryResponse> getAllEntriesByUserId(String userId) {
        List<JournalEntry> entries = journalEntryRepository.findByUserIdOrderByEntryTimeDesc(userId);
        return entries.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public Optional<JournalEntryResponse> getEntryById(Long id) {
        Optional<JournalEntry> entry = journalEntryRepository.findById(id);
        return entry.map(this::convertToResponse);
    }

    public JournalEntryResponse createEntry(JournalEntryRequest request) {
        JournalEntry entry = convertToEntity(request);
        JournalEntry savedEntry = journalEntryRepository.save(entry);
        return convertToResponse(savedEntry);
    }

    public Optional<JournalEntryResponse> updateEntry(Long id, JournalEntryRequest request) {
        Optional<JournalEntry> existingEntry = journalEntryRepository.findById(id);
        
        if (existingEntry.isPresent()) {
            JournalEntry entry = existingEntry.get();
            updateEntityFromRequest(entry, request);
            JournalEntry savedEntry = journalEntryRepository.save(entry);
            return Optional.of(convertToResponse(savedEntry));
        }
        
        return Optional.empty();
    }

    public boolean deleteEntry(Long id) {
        if (journalEntryRepository.existsById(id)) {
            journalEntryRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<JournalEntryResponse> getEntriesByUserIdAndSymbol(String userId, String symbol) {
        List<JournalEntry> entries = journalEntryRepository.findByUserIdAndSymbolOrderByEntryTimeDesc(userId, symbol);
        return entries.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public List<JournalEntryResponse> getEntriesByUserIdAndDateRange(String userId, LocalDateTime startDate, LocalDateTime endDate) {
        List<JournalEntry> entries = journalEntryRepository.findByUserIdAndEntryTimeBetween(userId, startDate, endDate);
        return entries.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public long getEntryCountByUserId(String userId) {
        return journalEntryRepository.countByUserId(userId);
    }

    public Double getTotalPnlByUserId(String userId) {
        return journalEntryRepository.getTotalPnlByUserId(userId);
    }

    private JournalEntry convertToEntity(JournalEntryRequest request) {
        JournalEntry entry = new JournalEntry();
        entry.setUserId(request.getUserId());
        entry.setEntryTime(request.getEntryTime());
        entry.setSymbol(request.getSymbol());
        entry.setEntry(request.getEntry());
        entry.setStopLoss(request.getStopLoss());
        entry.setPositionSize(request.getPositionSize());
        entry.setTarget(request.getTarget());
        entry.setTrailingStop(request.getTrailingStop());
        entry.setExitTime(request.getExitTime());
        entry.setExit(request.getExit());
        entry.setPnl(request.getPnl());
        entry.setSetup(request.getSetup());
        return entry;
    }

    private void updateEntityFromRequest(JournalEntry entry, JournalEntryRequest request) {
        entry.setUserId(request.getUserId());
        entry.setEntryTime(request.getEntryTime());
        entry.setSymbol(request.getSymbol());
        entry.setEntry(request.getEntry());
        entry.setStopLoss(request.getStopLoss());
        entry.setPositionSize(request.getPositionSize());
        entry.setTarget(request.getTarget());
        entry.setTrailingStop(request.getTrailingStop());
        entry.setExitTime(request.getExitTime());
        entry.setExit(request.getExit());
        entry.setPnl(request.getPnl());
        entry.setSetup(request.getSetup());
    }

    private JournalEntryResponse convertToResponse(JournalEntry entry) {
        JournalEntryResponse response = new JournalEntryResponse();
        response.setId(entry.getId());
        response.setUserId(entry.getUserId());
        response.setEntryTime(entry.getEntryTime());
        response.setSymbol(entry.getSymbol());
        response.setEntry(entry.getEntry());
        response.setStopLoss(entry.getStopLoss());
        response.setPositionSize(entry.getPositionSize());
        response.setTarget(entry.getTarget());
        response.setTrailingStop(entry.getTrailingStop());
        response.setExitTime(entry.getExitTime());
        response.setExit(entry.getExit());
        response.setPnl(entry.getPnl());
        response.setSetup(entry.getSetup());
        response.setCreatedAt(entry.getCreatedAt());
        response.setUpdatedAt(entry.getUpdatedAt());
        return response;
    }
}
