import Cookies from "js-cookie";
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import CreateArea from "./CreateArea";
import ShowNotes from "./ShowNotes";

function Main() {
    const [deleteNoteID, setDeleteNoteID] = useState();
    const [newNote, setNewNote] = useState({});
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate();
    const username = Cookies.get("username");

    useEffect(() => {
        fetch(`/api/${username}/notes`)
            .then((response) => {
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

    useEffect(() => {
        fetch(`/api/${username}/notes/addnote`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                newNote: newNote,
            }),
        })
            .then((response) => {
                if (response.status === 403) {
                    navigate("/login");
                }
                return response.json();
            })
            .then((newNotes) => {
                if (newNotes) {
                    setNotes(newNotes);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [newNote]);

    useEffect(() => {
        fetch(`/api/${username}/notes/deletenote`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                noteID: deleteNoteID,
            }),
        })
            .then((response) => {
                if (response.status === 403) {
                    navigate("/login");
                }
                return response.json();
            })
            .then((newNotes) => {
                if (newNotes) {
                    setNotes(newNotes);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [deleteNoteID]);

    function addNote(title, content) {
        const tempNote = {
            title: title,
            content: content,
        };
        setNewNote(tempNote);
    }

    function deleteNote(key) {
        setDeleteNoteID(key);
    }

    return (
        <div>
            <CreateArea addNote={addNote} />
            <ShowNotes notes={notes} deleteNote={deleteNote} />
        </div>
    );
}

export default Main;
