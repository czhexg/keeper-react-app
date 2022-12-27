import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateArea from "./CreateArea";
import ShowNotes from "./ShowNotes";

function Main() {
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const username = Cookies.get("username");
        // fetch("/api/test")
        fetch(`/api/${username}/notes`)
            .then((response) => {
                // console.log(res);
                if (response.status === 403) {
                    navigate("/login");
                }
                try {
                    return response.json();
                } catch (error) {
                    return [];
                }
            })
            .then((fetchNotes) => {
                console.log(fetchNotes);
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
