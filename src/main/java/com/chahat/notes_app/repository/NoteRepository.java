package com.chahat.notes_app.repository;

import com.chahat.notes_app.entity.Note;
import com.chahat.notes_app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByOwner(User owner);
    Optional<Note> findByIdAndOwner(Long id, User owner);
    Optional<Note> findByShareSlug(String slug);
    boolean existsByShareSlug(String slug);
}
