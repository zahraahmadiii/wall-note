import React, { useEffect, useState } from "react";
import "./Note.css";
interface NoteProps {
  id: number;
  message: string;
  date: string;
  deadline: string;
  onDelete: (id: number) => void;
  onEdit: () => void;
}
export const Note: React.FC<NoteProps> = ({
  id,
  message,
  date,
  deadline,
  onDelete,
  onEdit,
}) => {
  const handleDelete = () => {
    onDelete(id);
  };
  const [isDeadlinePassed, setIsDeadlinePassed] = useState(false);
  useEffect(() => {
    const currentDate = new Date();
    const deadlineDate = new Date(deadline);

    if (deadlineDate < currentDate) {
      setIsDeadlinePassed(true);
    } else {
      setIsDeadlinePassed(false);
    }
  }, [deadline]);


  return (
    <div
      className={`note-container ${
        isDeadlinePassed ? "bg-red-300" : "bg-white"
      }`} 
    >
      <div className="text-container">
        <h3 className="note_title">{message}</h3>
        <p className="date">Date: {date}</p>
        <p className="deadline">Deadline: {deadline}</p>
      </div>
      <div className="btn-container">
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
        <button className="edit-btn" onClick={onEdit}>
          Edit
        </button>
      </div>
    </div>
  );
};
