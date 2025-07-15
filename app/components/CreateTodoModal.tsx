"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  title: z.string().min(1, "Title is required"),
  deadline: z.date().refine((date) => date > new Date(), {
    message: "Deadline must be in the future",
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function CreateTodoModal({
  onClose,
  onTodoCreated,
}: {
  onClose: () => void;
  onTodoCreated: () => void;
}) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      title: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to create todo");

      toast.success("Todo created successfully!", {
        duration: 3000,
      });
      onClose();
      onTodoCreated();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while creating the todo", {
        duration: 3000,
      });
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white border p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Create New Todo</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Your username" {...field} />
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
                    <Input placeholder="Todo title" {...field} />
                  </FormControl>
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
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Select date</span>
                        )}
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

            {/* <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deadline</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant='destructive' onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Add Todo</Button>
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
// import { Button } from "@/components/ui/button";

// const CreateTodoModal = ({
//   onClose,
//   onTodoCreated,
// }: {
//   onClose: () => void;
//   onTodoCreated: () => void;
// }) => {
//   const [username, setUsername] = useState("");
//   const [title, setTitle] = useState("");
//   const [deadline, setDeadline] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const res = await fetch("/api/todos", {
//       method: "POST",
//       body: JSON.stringify({ title, username, deadline }),
//       headers: { "content-type": "application/json" },
//     });
//     if (res.ok) {
//       toast.success("Todo created successfully!", {
//         duration: 3000,
//       });
//       onClose();
//       onTodoCreated?.();
//     } else {
//       toast.error("Failed to create todo.", {
//         duration: 3000,
//       });
//     }
//   };

//   return (
//     <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
//       <div className="bg-white border p-6 rounded-lg w-full max-w-md shadow-lg">
//         <h2 className="text-xl font-semibold mb-4">Create New Todo</h2>
//         <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//           <label className="font-medium">Username</label>
//           <input
//             type="text"
//             placeholder="Your username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="border p-2 rounded text-black"
//             required
//           />
//           <label className="font-medium">Title</label>
//           <input
//             type="text"
//             placeholder="Todo Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="border p-2 rounded text-black"
//             required
//           />
//           <label className="font-medium">Deadline</label>
//           <input
//             type="date"
//             value={deadline}
//             onChange={(e) => setDeadline(e.target.value)}
//             className="border p-2 rounded text-black accent-black"
//             required
//           />
//           <div className="flex justify-end gap-2">
//             {/* <button
//               type="button"
//               onClick={onClose}
//               className="btn btn-error px-4 py-2"
//             >
//               Cancel
//             </button> */}
//             <Button type="button" variant='destructive' onClick={onClose} className="px-4 py-2 cursor-pointer">
//               Cancel
//             </Button>
//             {/* <button type="submit" className="btn btn-success px-4 py-2">
//               Add Todo
//             </button> */}
//             <Button type="submit" className="px-4 py-2 cursor-pointer">
//               Add Todo
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateTodoModal;
