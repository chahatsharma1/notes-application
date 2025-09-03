package com.chahat.notes_app.controller;

import com.chahat.notes_app.dto.CreateNoteRequest;
import com.chahat.notes_app.dto.NoteResponse;
import com.chahat.notes_app.dto.UpdateNoteRequest;
import com.chahat.notes_app.service.NoteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
@RequiredArgsConstructor
public class NoteController {

    @Autowired
    private NoteService noteService;

    @GetMapping
    public List<NoteResponse> list(@AuthenticationPrincipal String email) {
        return noteService.list(email);
    }

    @PostMapping
    public NoteResponse create(@Valid @RequestBody CreateNoteRequest req, @AuthenticationPrincipal String email) {
        return noteService.create(req, email);
    }

    @GetMapping("/{id}")
    public NoteResponse get(@PathVariable Long id, @AuthenticationPrincipal String email) {
        return noteService.get(id, email);
    }

    @PutMapping("/{id}")
    public NoteResponse update(@PathVariable Long id, @RequestBody UpdateNoteRequest req, @AuthenticationPrincipal String email) {
        return noteService.update(id, req, email);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id, @AuthenticationPrincipal String email) {
        noteService.delete(id, email);
    }

    @GetMapping("/public/{slug}")
    public NoteResponse getBySlug(@PathVariable String slug) {
        return noteService.getBySlug(slug);
    }
}
