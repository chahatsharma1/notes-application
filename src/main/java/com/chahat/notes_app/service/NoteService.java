package com.chahat.notes_app.service;

import com.chahat.notes_app.dto.CreateNoteRequest;
import com.chahat.notes_app.dto.NoteResponse;
import com.chahat.notes_app.dto.UpdateNoteRequest;
import com.chahat.notes_app.entity.Note;
import com.chahat.notes_app.entity.User;
import com.chahat.notes_app.repository.NoteRepository;
import com.chahat.notes_app.repository.UserRepository;
import com.chahat.notes_app.util.SlugUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private UserRepository userRepository;

    public List<NoteResponse> list(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        return noteRepository.findByOwner(user).stream().map(this::toDto).toList();
    }

    @Transactional
    public NoteResponse create(CreateNoteRequest req, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Note note =  new Note();
        note.setTitle(req.getTitle());
        note.setContent(req.getContent());
        note.setPublicShare(Boolean.TRUE.equals(req.getPublicShare()));
        note.setOwner(user);

        if (note.isPublicShare()) {
            note.setShareSlug(generateUniqueSlug());
        }

        return toDto(noteRepository.save(note));
    }

    public NoteResponse get(Long id, String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        Note note = noteRepository.findByIdAndOwner(id, user).orElseThrow(() -> new RuntimeException("Note not found"));
        return toDto(note);
    }

    @Transactional
    public NoteResponse update(Long id, UpdateNoteRequest req, String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        Note note = noteRepository.findByIdAndOwner(id, user).orElseThrow(() -> new RuntimeException("Note not found"));

        if (req.getTitle() != null) {
            note.setTitle(req.getTitle());
        }
        if (req.getContent() != null) {
            note.setContent(req.getContent());
        }

        if (req.getPublicShare() != null) {
            boolean wantPublic = req.getPublicShare();
            if (wantPublic && !note.isPublicShare()) {
                note.setPublicShare(true);
                note.setShareSlug(generateUniqueSlug());
            } else if (!wantPublic && note.isPublicShare()) {
                note.setPublicShare(false);
                note.setShareSlug(null);
            }
        }

        return toDto(note);
    }

    public void delete(Long id, String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        Note note = noteRepository.findByIdAndOwner(id, user).orElseThrow(() -> new RuntimeException("Note not found"));
        noteRepository.delete(note);
    }

    public NoteResponse getBySlug(String slug) {
        Note note = noteRepository.findByShareSlug(slug).filter(Note::isPublicShare).orElseThrow(() -> new RuntimeException("Public note not found"));
        return toDto(note);
    }

    private String generateUniqueSlug() {
        String slug;
        do {
            slug = SlugUtil.randomSlug(8);
        }
        while (noteRepository.existsByShareSlug(slug));
        return slug;
    }

    private NoteResponse toDto(Note note) {
        return NoteResponse.builder()
                .id(note.getId())
                .title(note.getTitle())
                .content(note.getContent())
                .publicShare(note.isPublicShare())
                .shareSlug(note.getShareSlug())
                .createdAt(note.getCreatedAt())
                .updatedAt(note.getUpdatedAt())
                .build();
    }
}
