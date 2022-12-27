import React from "react";
import Note from "./Note";

function ShowNotes(props) {
    return props.notes.map((noteProps) => {
        // console.log(noteProps.key);
        return (
            <Note
                key={noteProps._id}
                title={noteProps.title}
                content={noteProps.content}
                deleteNote={() => {
                    props.deleteNote(noteProps._id);
                }}
            />
        );
    });
}

export default ShowNotes;
