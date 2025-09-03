package com.chahat.notes_app.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateNoteRequest {
    @NotBlank
    private String title;
    private String content;
    private Boolean publicShare = false;
}
