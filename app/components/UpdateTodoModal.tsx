"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Todo } from "../types/todo";
import { Button } from "@/components/ui/button";

const statusOptions = ["pending", "in-progress", "completed"];

const UpdateTodoModal = ({
  onClose,
  onTodoUpdated,
  todo,
}: {
  onClose: () => void;
  onTodoUpdated: () => void;
  todo: Todo;
}) => {
  const [status, setStatus] = useState(todo.status);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/todos/${todo.id}`, {
        method: "PUT",
        body: JSON.stringify({ status }),
        headers: { "content-type": "application/json" },
      });

      if (res.ok) {
        toast.success("Todo updated successfully!", {
          duration: 3000,
        });
        onClose();
        onTodoUpdated();
      } else {
        toast.error("Failed to update todo.", {
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Update todo error:", error);
      toast.error("An error occurred while updating the todo.", {
        duration: 3000,
      });
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white border p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Update Todo Status</h2>
        
        <div className="mb-4">
          <p className="font-medium">Title: <span className="font-normal">{todo.title}</span></p>
          <p className="font-medium">Username: <span className="font-normal">{todo.username}</span></p>
          <p className="font-medium">Deadline: <span className="font-normal">{todo.deadline}</span></p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="status" className="font-medium">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border p-2 rounded text-black"
              required
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2">
            {/* <button
              type="button"
              onClick={onClose}
              className="btn btn-error px-4 py-2"
            >
              Cancel
            </button> */}
            <Button onClick={onClose} className="cursor-pointer">Cancel</Button>
            {/* <button
              type="submit"
              className="btn btn-success px-4 py-2"
            >
              Update Status
            </button> */}
            <Button className="cursor-pointer" variant="success">Update Status</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTodoModal;