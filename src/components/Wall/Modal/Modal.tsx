import React, { useEffect } from "react";
import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (message: string, date: string, deadline: string) => void;
  editNote?: {
    id: number;
    message: string;
    date: string;
    deadline: string;
  };
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, editNote }) => {
  const [message, setMessage] = React.useState("");
  const [date, setDate] = React.useState("");
  const [deadline, setDeadline] = React.useState("");
  useEffect(() => {
    if (editNote) {
      setMessage(editNote.message);
      setDate(editNote.date);
      setDeadline(editNote.deadline);
    }
  }, [editNote]);
  const handleSave = () => {
    onSave(message, date, deadline);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{editNote ? 'Edit Note' : 'Add New Note'}</h2>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your note"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <button onClick={handleSave}>
          {editNote ? "Save Changes" : "Save"}
        </button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
