"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

const CreateTodoModal = ({
  onClose,
  onTodoCreated,
}: {
  onClose: () => void;
  onTodoCreated: () => void;
}) => {
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ title, username, deadline }),
      headers: { "content-type": "application/json" },
    });
    if (res.ok) {
      toast.success("Todo created successfully!", {
        duration: 3000,
      });
      onClose();
      onTodoCreated?.();
    } else {
      toast.error("Failed to create todo.", {
        duration: 3000,
      });
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white border p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Create New Todo</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="font-medium">Username</label>
          <input
            type="text"
            placeholder="Your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 rounded text-black"
            required
          />
          <label className="font-medium">Title</label>
          <input
            type="text"
            placeholder="Todo Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded text-black"
            required
          />
          <label className="font-medium">Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="border p-2 rounded text-black accent-black"
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-error px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-success px-4 py-2"
            >
              Add Todo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTodoModal;
