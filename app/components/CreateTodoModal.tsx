// "use client";

// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "react-hot-toast";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { CalendarIcon } from "lucide-react";
// import { format } from "date-fns";
// import { Calendar } from "@/components/ui/calendar";
// import { cn } from "@/lib/utils";

// const formSchema = z.object({
//   title: z.string().min(1, "Title is required"),
//   deadline: z.date().refine((date) => date > new Date(), {
//     message: "Deadline must be in the future",
//   }),
// });

// type FormData = z.infer<typeof formSchema>;

// export default function CreateTodoModal({
//   onClose,
//   onTodoCreated,
// }: {
//   onClose: () => void;
//   onTodoCreated: () => void;
// }) {
//   const form = useForm<FormData>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "",
//     },
//   });

//   const onSubmit = async (data: FormData) => {
//     try {
//       const res = await fetch("/api/todos", {
//         method: "POST",
//         body: JSON.stringify(data),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (!res.ok) throw new Error("Failed to create todo");

//       toast.success("Todo created successfully!", {
//         duration: 3000,
//       });
//       onClose();
//       onTodoCreated();
//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong while creating the todo", {
//         duration: 3000,
//       });
//     }
//   };

//   return (
//     <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
//       <div className="bg-white border p-6 rounded-lg w-full max-w-md shadow-lg dark:bg-black">
//         <h2 className="text-xl font-semibold mb-4">Create New Todo</h2>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

//             <FormField
//               control={form.control}
//               name="title"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Title</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Todo title" {...field} />
//                   </FormControl>
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
//                         {field.value ? (
//                           format(field.value, "PPP")
//                         ) : (
//                           <span>Select date</span>
//                         )}
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

//             {/* <FormField
//               control={form.control}
//               name="deadline"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Deadline</FormLabel>
//                   <FormControl>
//                     <Input type="date" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             /> */}

//             <div className="flex justify-end gap-2 pt-2">
//               <Button type="button" variant="outline" onClick={onClose}>
//                 Cancel
//               </Button>
//               <Button type="submit" variant='main'>Add Todo</Button>
//             </div>
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// }

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
import { COLOR_THEME } from "@/lib/theme";

const formSchema = z.object({
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
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className={`bg-white dark:bg-gray-900 border ${COLOR_THEME.primary.border} rounded-lg w-full max-w-md mx-4 shadow-xl`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Create New Todo</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
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
                        placeholder="Enter todo title..." 
                        {...field} 
                        className={`focus:ring-2 focus:ring-purple-500 focus:border-transparent ${COLOR_THEME.primary.border}`}
                      />
                    </FormControl>
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
                            <span>Pick a date</span>
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

              <div className="flex justify-end gap-3 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onClose}
                  className={`${COLOR_THEME.primary.border} hover:bg-gray-50 dark:hover:bg-gray-800`}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className={`${COLOR_THEME.primary[500]} hover:${COLOR_THEME.primary[600]} text-white`}
                >
                  Create Todo
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}