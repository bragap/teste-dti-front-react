package com.example.backend.service;

import com.example.backend.model.Reminder;
import com.example.backend.repository.ReminderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ReminderService {

    @Autowired
    private ReminderRepository reminderRepository;

    public Reminder createReminder(Reminder reminder) {
        if (reminder.getDate().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("A data deve estar no futuro.");
        }
        return reminderRepository.save(reminder);
    }

    public List<Reminder> getAllReminders() {
        return reminderRepository.findAllByOrderByDateAsc();
    }

    public void deleteReminder(Long id) {
        reminderRepository.deleteById(id);
    }

    public List<Reminder> getRemindersByDate(LocalDate date) {
        return reminderRepository.findByDateOrderByDateAsc(date);
    }
}
