import React, { useState, useEffect } from "react";
import CreateArea from "./CreateArea";
import ShowNotes from "./ShowNotes";

function Main() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        fetch("/api/test")
            .then((res) => {
                return res.json();
            })
            .then((fetchNotes) => {
                setNotes(fetchNotes);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function addNote(title, content) {
        const newNote = {
            key: notes.length + 1,
            title: title,
            content: content,
        };
        setNotes((prevNotes) => {
            return [...prevNotes, newNote];
        });
    }

    function deleteNote(key) {
        setNotes((prevNotes) => {
            return prevNotes.filter((note) => {
                return note.key !== key;
            });
        });
        // console.log(key);
    }

    return (
        <div>
            <CreateArea addNote={addNote} />
            <ShowNotes notes={notes} deleteNote={deleteNote} />
        </div>
    );
}

export default Main;
