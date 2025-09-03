package com.chahat.notes_app.dto;

import lombok.Data;

@Data
public class UpdateNoteRequest {
    private String title;
    private String content;
    private Boolean publicShare;
}