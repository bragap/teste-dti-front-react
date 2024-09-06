package com.example.backend.repository;

import com.example.backend.model.Reminder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReminderRepository extends JpaRepository<Reminder, Long> {
    List<Reminder> findByDateOrderByDateAsc(LocalDate date);
    List<Reminder> findAllByOrderByDateAsc();
}
