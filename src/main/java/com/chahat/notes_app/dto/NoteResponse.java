package com.chahat.notes_app.dto;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Data
@Builder
public class NoteResponse {
    private Long id;
    private String title;
    private String content;
    private boolean publicShare;
    private String shareSlug;
    private Instant createdAt;
    private Instant updatedAt;
}
