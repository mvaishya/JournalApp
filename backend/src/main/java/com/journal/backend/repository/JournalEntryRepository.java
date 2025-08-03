package com.journal.backend.repository;

import com.journal.backend.entity.JournalEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface JournalEntryRepository extends JpaRepository<JournalEntry, Long> {
    
    List<JournalEntry> findByUserIdOrderByEntryTimeDesc(String userId);
    
    List<JournalEntry> findByUserIdAndSymbolOrderByEntryTimeDesc(String userId, String symbol);
    
    @Query("SELECT j FROM JournalEntry j WHERE j.userId = :userId AND j.entryTime BETWEEN :startDate AND :endDate ORDER BY j.entryTime DESC")
    List<JournalEntry> findByUserIdAndEntryTimeBetween(@Param("userId") String userId, 
                                                       @Param("startDate") LocalDateTime startDate, 
                                                       @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT COUNT(j) FROM JournalEntry j WHERE j.userId = :userId")
    long countByUserId(@Param("userId") String userId);
    
    @Query("SELECT SUM(j.pnl) FROM JournalEntry j WHERE j.userId = :userId AND j.pnl IS NOT NULL")
    Double getTotalPnlByUserId(@Param("userId") String userId);
}
