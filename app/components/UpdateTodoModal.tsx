"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import { Todo } from "../types/todo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  title: z.string().min(1, "Title is required"),
  status: z.enum(["pending", "in-progress", "completed"]),
  deadline: z.date().refine((date) => date > new Date(), {
    message: "Deadline must be in the future",
  }),
});

type FormData = z.infer<typeof formSchema>;

const statusOptions = ["pending", "in-progress", "completed"];

export default function UpdateTodoModal({
  onClose,
  onTodoUpdated,
  todo,
}: {
  onClose: () => void;
  onTodoUpdated: () => void;
  todo: Todo;
}) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: todo.username,
      title: todo.title,
      status: todo.status as "pending" | "in-progress" | "completed",
      deadline: new Date(todo.deadline),
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch(`/api/todos/${todo.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to update todo");

      toast.success("Todo updated successfully!", {
        duration: 3000,
      });
      onClose();
      onTodoUpdated();
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update todo", {
        duration: 3000,
      });
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white border p-6 rounded-lg w-full max-w-md shadow-lg dark:bg-black">
        <h2 className="text-xl font-semibold mb-4">Update Todo</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Your username" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Todo title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Deadline</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value
                          ? format(field.value, "PPP")
                          : "Select a deadline"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Update Todo</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

// "use client";
// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { Todo } from "../types/todo";
// import { Button } from "@/components/ui/button";

// const statusOptions = ["pending", "in-progress", "completed"];

// const UpdateTodoModal = ({
//   onClose,
//   onTodoUpdated,
//   todo,
// }: {
//   onClose: () => void;
//   onTodoUpdated: () => void;
//   todo: Todo;
// }) => {
//   const [status, setStatus] = useState(todo.status);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const res = await fetch(`/api/todos/${todo.id}`, {
//         method: "PUT",
//         body: JSON.stringify({ status }),
//         headers: { "content-type": "application/json" },
//       });

//       if (res.ok) {
//         toast.success("Todo updated successfully!", {
//           duration: 3000,
//         });
//         onClose();
//         onTodoUpdated();
//       } else {
//         toast.error("Failed to update todo.", {
//           duration: 3000,
//         });
//       }
//     } catch (error) {
//       console.error("Update todo error:", error);
//       toast.error("An error occurred while updating the todo.", {
//         duration: 3000,
//       });
//     }
//   };

//   return (
//     <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
//       <div className="bg-white border p-6 rounded-lg w-full max-w-md shadow-lg">
//         <h2 className="text-xl font-semibold mb-4">Update Todo Status</h2>

//         <div className="mb-4">
//           <p className="font-medium">Title: <span className="font-normal">{todo.title}</span></p>
//           <p className="font-medium">Username: <span className="font-normal">{todo.username}</span></p>
//           <p className="font-medium">Deadline: <span className="font-normal">{todo.deadline}</span></p>
//         </div>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <div className="flex flex-col gap-2">
//             <label htmlFor="status" className="font-medium">Status</label>
//             <select
//               id="status"
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//               className="border p-2 rounded text-black"
//               required
//             >
//               {statusOptions.map((option) => (
//                 <option key={option} value={option}>
//                   {option.charAt(0).toUpperCase() + option.slice(1)}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="flex justify-end gap-2">
//             {/* <button
//               type="button"
//               onClick={onClose}
//               className="btn btn-error px-4 py-2"
//             >
//               Cancel
//             </button> */}
//             <Button onClick={onClose} className="cursor-pointer">Cancel</Button>
//             {/* <button
//               type="submit"
//               className="btn btn-success px-4 py-2"
//             >
//               Update Status
//             </button> */}
//             <Button className="cursor-pointer" variant="success">Update Status</Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateTodoModal;
