import Cookies from "js-cookie";
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import CreateArea from "./CreateArea";
import ShowNotes from "./ShowNotes";

function Main() {
    const [newNote, setNewNote] = useState({});
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate();
    const username = Cookies.get("username");

    useEffect(() => {
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
                // console.log(fetchNotes);
                setNotes(fetchNotes);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        fetch(`/api/${username}/notes`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                newNote: newNote,
            }),
        })
            .then((response) => {
                console.log("fetch put");
                if (response.status === 403) {
                    navigate("/login");
                }
                return response.json();
            })
            .catch((err) => {
                console.log(err);
            });
    }, [newNote]);

    function addNote(title, content) {
        console.log("addnote func");
        setNewNote({
            key: notes.length + 1,
            title: title,
            content: content,
        });
        setNotes((prevNotes) => {
            return [...prevNotes, newNote];
        });
        console.log(notes);
    }

    function deleteNote(key) {
        setNotes((prevNotes) => {
            return prevNotes.filter((note) => {
                return note.key !== key;
            });
        });
    }

    console.log(notes);
    return (
        <div>
            <CreateArea addNote={addNote} />
            <ShowNotes notes={notes} deleteNote={deleteNote} />
        </div>
    );
}

export default Main;
