import React from "react";
import Note from "./Note";

function ShowNotes(props) {
    return props.notes.map((noteProps) => {
        return (
            <Note
                key={noteProps.key}
                title={noteProps.title}
                content={noteProps.content}
                deleteNote={() => {
                    props.deleteNote(noteProps.key);
                }}
            />
        );
    });
}

export default ShowNotes;
