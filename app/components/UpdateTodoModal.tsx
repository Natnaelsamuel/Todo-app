// "use client";

// import React from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { format } from "date-fns";
// import toast from "react-hot-toast";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from "@/components/ui/popover";
// import { Calendar } from "@/components/ui/calendar";
// import { CalendarIcon } from "lucide-react";
// import { cn } from "@/lib/utils";

// import { Todo } from "../types/todo";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// const formSchema = z.object({
//   title: z.string().min(1, "Title is required"),
//   status: z.enum(["pending", "in_progress", "completed"]),
//   deadline: z.date().refine((date) => date > new Date(), {
//     message: "Deadline must be in the future",
//   }),
// });

// type FormData = z.infer<typeof formSchema>;

// const statusOptions = ["pending", "in_progress", "completed"];

// export default function UpdateTodoModal({
//   onClose,
//   onTodoUpdated,
//   todo,
// }: {
//   onClose: () => void;
//   onTodoUpdated: () => void;
//   todo: Todo;
// }) {
//   const form = useForm<FormData>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: todo.title,
//       status: todo.status as "pending" | "in_progress" | "completed",
//       deadline: new Date(todo.deadline),
//     },
//   });

//   const onSubmit = async (data: FormData) => {
//     try {
//       const res = await fetch(`/api/todos/${todo.id}`, {
//         method: "PUT",
//         body: JSON.stringify(data),
//         headers: { "Content-Type": "application/json" },
//       });

//       if (!res.ok) throw new Error("Failed to update todo");

//       toast.success("Todo updated successfully!", {
//         duration: 3000,
//       });
//       onClose();
//       onTodoUpdated();
//     } catch (error) {
//       console.error("Update error:", error);
//       toast.error("Failed to update todo", {
//         duration: 3000,
//       });
//     }
//   };

//   return (
//     <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
//       <div className="bg-white border p-6 rounded-lg w-full max-w-md shadow-lg dark:bg-black">
//         <h2 className="text-xl font-semibold mb-4">Update Todo</h2>

//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             <FormField
//               control={form.control}
//               name="title"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Title</FormLabel>
//                   <FormControl>
//                     <Input {...field} placeholder="Todo title" />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="status"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Status</FormLabel>
//                   <Select value={field.value} onValueChange={field.onChange}>
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select a status" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       {statusOptions.map((status) => (
//                         <SelectItem key={status} value={status}>
//                           {status.charAt(0).toUpperCase() + status.slice(1)}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="deadline"
//               render={({ field }) => (
//                 <FormItem className="flex flex-col">
//                   <FormLabel>Deadline</FormLabel>
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <Button
//                         variant={"outline"}
//                         className={cn(
//                           "w-full justify-start text-left font-normal",
//                           !field.value && "text-muted-foreground"
//                         )}
//                       >
//                         <CalendarIcon className="mr-2 h-4 w-4" />
//                         {field.value
//                           ? format(field.value, "PPP")
//                           : "Select a deadline"}
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-auto p-0">
//                       <Calendar
//                         mode="single"
//                         selected={field.value}
//                         onSelect={field.onChange}
//                         disabled={(date) => date < new Date()}
//                         initialFocus
//                       />
//                     </PopoverContent>
//                   </Popover>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <div className="flex justify-end gap-2 pt-2">
//               <Button variant="outline" type="button" onClick={onClose}>
//                 Cancel
//               </Button>
//               <Button type="submit" variant='main'>Update Todo</Button>
//             </div>
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// }

"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { CalendarIcon, X } from "lucide-react";

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
import { cn } from "@/lib/utils";
import { COLOR_THEME } from "@/lib/theme";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Todo } from "../types/todo";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  status: z.enum(["pending", "in_progress", "completed"]),
  deadline: z.date().refine((date) => date > new Date(), {
    message: "Deadline must be in the future",
  }),
});

type FormData = z.infer<typeof formSchema>;

const statusOptions = ["pending", "in_progress", "completed"];

const statusColors = {
  pending: "bg-amber-400 dark:bg-amber-600",
  in_progress: "bg-blue-400 dark:bg-blue-600",
  completed: "bg-green-400 dark:bg-green-600",
};

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
      title: todo.title,
      status: todo.status as "pending" | "in_progress" | "completed",
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
        position: "top-center",
      });
      onClose();
      onTodoUpdated();
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update todo", {
        duration: 3000,
        position: "top-center",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className={`bg-white dark:bg-gray-900 border ${COLOR_THEME.primary.border} rounded-lg w-full max-w-md mx-4 shadow-xl`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Update Todo
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter todo title..."
                        className={`focus:ring-2 focus:ring-purple-500 focus:border-transparent ${COLOR_THEME.primary.border}`}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Status
                    </FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger className={`${COLOR_THEME.primary.border}`}>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statusOptions.map((status) => (
                          <SelectItem key={status} value={status}>
                            <div className="flex items-center gap-2">
                              <span
                                className={`w-3 h-3 rounded-full ${statusColors[status as keyof typeof statusColors]}`}
                              />
                              {status.charAt(0).toUpperCase() +
                                status.slice(1).replace("_", " ")}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Deadline
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal h-11",
                            !field.value && "text-muted-foreground",
                            `${COLOR_THEME.primary.border} hover:bg-purple-50 dark:hover:bg-gray-800`
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Select deadline</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="border-0"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="outline"
                  type="button"
                  onClick={onClose}
                  className={`${COLOR_THEME.primary.border} hover:bg-gray-50 dark:hover:bg-gray-800`}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className={`${COLOR_THEME.primary[500]} hover:${COLOR_THEME.primary[600]} text-white`}
                >
                  Update Todo
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}