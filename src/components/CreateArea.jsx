import { React, useState } from "react";

function CreateArea(props) {
    const [noteTitle, setNoteTitle] = useState("");
    const [noteContent, setNoteContent] = useState("");

    function updateTitle(event) {
        setNoteTitle(event.target.value);
    }

    function updateContent(event) {
        setNoteContent(event.target.value);
    }

    return (
        <div>
            <form
                onSubmit={(event) => {
                    props.addNote(noteTitle, noteContent);
                    setNoteTitle("");
                    setNoteContent("");
                    event.preventDefault();
                }}
            >
                <input
                    name="title"
                    placeholder="Title"
                    value={noteTitle}
                    onChange={updateTitle}
                />
                <textarea
                    name="content"
                    placeholder="Take a note..."
                    rows="3"
                    value={noteContent}
                    onChange={updateContent}
                />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default CreateArea;
