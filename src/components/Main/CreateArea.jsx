import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab, Zoom } from "@mui/material";

function CreateArea(props) {
    const [noteTitle, setNoteTitle] = useState("");
    const [noteContent, setNoteContent] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    function updateTitle(event) {
        setNoteTitle(event.target.value);
    }

    function updateContent(event) {
        setNoteContent(event.target.value);
    }

    function updateFocus() {
        setIsFocused(true);
    }

    function submitForm(event) {
        if (noteTitle && noteContent) {
            props.addNote(noteTitle, noteContent);
            setNoteTitle("");
            setNoteContent("");
        }
        event.preventDefault();
    }

    return (
        <div>
            <form className="create-note" onSubmit={submitForm}>
                {isFocused ? (
                    <input
                        name="title"
                        placeholder="Title"
                        value={noteTitle}
                        onChange={updateTitle}
                    />
                ) : null}
                <textarea
                    name="content"
                    placeholder="Take a note..."
                    rows="3"
                    value={noteContent}
                    onChange={updateContent}
                    onFocus={updateFocus}
                />
                <Zoom in={isFocused}>
                    <Fab type="submit">
                        <AddIcon />
                    </Fab>
                </Zoom>
            </form>
        </div>
    );
}

export default CreateArea;
