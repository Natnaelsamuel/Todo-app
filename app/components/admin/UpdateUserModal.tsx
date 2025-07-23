"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { User } from "@/app/types/user";

const roleOptions = ["user", "admin"];

const UpdateTodoModal = ({
  onClose,
  onUserUpdated,
  user,
}: {
  onClose: () => void;
  onUserUpdated: () => void;
  user: User;
}) => {
  const [role, setRole] = useState(user.role);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "PUT",
        body: JSON.stringify({ role }),
        headers: { "content-type": "application/json" },
      });

      if (res.ok) {
        toast.success("User Role updated successfully!", {
          duration: 3000,
        });
        onClose();
        onUserUpdated();
      } else {
        toast.error("Failed to update User Role.", {
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Update user error:", error);
      toast.error("An error occurred while updating the user.", {
        duration: 3000,
      });
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white border p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Update User Status</h2>

        <div className="mb-4">
          <p className="font-medium">id: <span className="font-normal">{user.id}</span></p>
          <p className="font-medium">name: <span className="font-normal">{user.name}</span></p>
          <p className="font-medium">email: <span className="font-normal">{user.email}</span></p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="role" className="font-medium">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border p-2 rounded text-black"
              required
            >
              {roleOptions.map((option) => (
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
            <Button onClick={onClose} className="cursor-pointer" variant="outline">Cancel</Button>
            {/* <button
              type="submit"
              className="btn btn-success px-4 py-2"
            >
              Update Status
            </button> */}
            <Button className="cursor-pointer" variant="default">Update Status</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTodoModal;