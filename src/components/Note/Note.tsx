import React, { useEffect, useState } from "react";
import "./Note.css";
interface NoteProps {
  id: number;
  message: string;
  date: string;
  deadline: string;
  priority: number;
  onDelete: (id: number) => void;
  onEdit: () => void;
  onMove: (id: number) => void;
  isMoving: boolean;
}
export const Note: React.FC<NoteProps> = ({
  id,
  message,
  date,
  deadline,
  priority,
  onDelete,
  onEdit,
  onMove,
  isMoving,
}) => {
  const handleDelete = () => {
    onDelete(id);
  };
  const handleMove = () => {
    onMove(id);
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
      } ${isMoving ? "border-yellow-400" : ""}`}
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
        <button className="move-btn" onClick={handleMove}>
          {isMoving ? "Selected" : "Move"}
        </button>
      </div>
    </div>
  );
};
