import { React, useState } from "react";

import Header from "./Header";
import Footer from "./Footer";
import ShowNotes from "./ShowNotes";
import CreateArea from "./CreateArea";

import startingNotes from "../notes";

function App() {
    const [notes, setNotes] = useState(startingNotes);

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

    function deleteNote(id) {
        setNotes((prevNotes) => {
            return prevNotes.filter((note) => {
                return note.key !== id;
            });
        });
        console.log(id);
    }

    return (
        <div>
            <Header />
            <CreateArea addNote={addNote} />
            <ShowNotes notes={notes} deleteNote={deleteNote} />
            <Footer />
        </div>
    );
}

export default App;
