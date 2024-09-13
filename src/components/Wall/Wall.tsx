import React, { useState, useEffect } from "react";
import Modal from "./Modal/Modal";
import { Note } from "../Note/Note";
import "./Wall.css";

interface NoteType {
  id: number;
  message: string;
  date: string;
  deadline: string;
  priority: number;
}
const Wall: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [nextId, setNextId] = useState(1);
  const [editNoteId, setEditNoteId] = useState<number | null>(null);
  const [movingNoteId, setMovingNoteId] = useState<number | null>(null);
  useEffect(() => {
    try {
      const storedNotes = localStorage.getItem("notes");
      if (storedNotes) {
        const parsedNotes = JSON.parse(storedNotes) as NoteType[];
        console.log(parsedNotes);
        setNotes(parsedNotes);
        if (parsedNotes.length > 0) {
          setNextId(Math.max(...parsedNotes.map((note) => note.id)) + 1);
        }
      }
    } catch (error) {
      console.error("Failed to load notes from localStorage:", error);
    }
  }, []);
  const saveNotesToLocalStorage = (updatedNotes: NoteType[]) => {
    try {
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
    } catch (error) {
      console.error("Failed to save notes to localStorage:", error);
    }
  };
  const openModal = (noteId: number | null = null) => {
    setEditNoteId(noteId);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const saveNote = (message: string, date: string, deadline: string) => {
    if (editNoteId !== null) {
      const updatedNotes = notes.map((note) =>
        note.id === editNoteId ? { ...note, message, date, deadline } : note
      );
      setNotes(updatedNotes);
      saveNotesToLocalStorage(updatedNotes);
    } else {
      const newNote: NoteType = {
        id: nextId,
        message,
        date,
        deadline,
        priority: nextId,
      };
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      setNextId(nextId + 1);
      saveNotesToLocalStorage(updatedNotes);
    }
    closeModal();
  };
  const deleteNote = (id: number) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    saveNotesToLocalStorage(updatedNotes);
  };

  const handleMove = (id: number) => {
    if (movingNoteId === null) {
      setMovingNoteId(id);
    } else {
      const updatedNotes = notes.map((note) => {
        if (note.id === id) {
          const movingNote = notes.find((n) => n.id === movingNoteId);
          if (movingNote) {
            const tempPriority = note.priority;
            note.priority = movingNote.priority;
            movingNote.priority = tempPriority;
          }
        }
        return note;
      });

      setNotes(updatedNotes);
      saveNotesToLocalStorage(updatedNotes);
      setMovingNoteId(null);
    }
  };
  return (
    <div className="wall">
      <div className="heading-container">
        <h3 className="heading">
          Here you can have any notes,just click add note button and start to
          write some notes
        </h3>
        <button className="add-btn" onClick={() => openModal(null)}>
          Add Note
        </button>
      </div>
      <div className="notes-container">
        {notes
          .sort((a, b) => a.priority - b.priority) 
          .map((note) => (
            <Note
              key={note.id}
              id={note.id}
              message={note.message}
              date={note.date}
              deadline={note.deadline}
              priority={note.priority}
              onDelete={(id) => {
                const updatedNotes = notes.filter((note) => note.id !== id);
                setNotes(updatedNotes);
                saveNotesToLocalStorage(updatedNotes);
              }}
              onEdit={() => openModal(note.id)}
              onMove={handleMove}
              isMoving={movingNoteId === note.id} 
            />
          ))}
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={saveNote}
          editNote={
            editNoteId !== null
              ? notes.find((note) => note.id === editNoteId)
              : undefined
          }
        />
      )}
    </div>
  );
};

export default Wall;
