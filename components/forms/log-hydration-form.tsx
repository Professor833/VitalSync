import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner"; // Assuming you have toast for notifications

const beverageTypes = [
  { value: "water", label: "Water" },
  { value: "coffee", label: "Coffee" },
  { value: "tea", label: "Tea" },
  { value: "juice", label: "Juice" },
  { value: "soda", label: "Soda" },
  { value: "other", label: "Other" },
] as const;

const logHydrationFormSchema = z.object({
  beverageType: z.enum(beverageTypes.map(bt => bt.value) as [string, ...string[]], {
    required_error: "Please select a beverage type.",
  }),
  amount: z.coerce
    .number({
      required_error: "Amount is required.",
      invalid_type_error: "Amount must be a number.",
    })
    .positive({ message: "Amount must be positive." }),
  time: z.string().refine((val) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(val), {
    message: "Please enter a valid time in HH:MM format.",
  }),
});

type LogHydrationFormValues = z.infer<typeof logHydrationFormSchema>;

interface LogHydrationFormProps {
  onSuccess?: () => void;
  onClose?: () => void;
}

export function LogHydrationForm({ onSuccess, onClose }: LogHydrationFormProps) {
  const defaultTime = new Date().toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const form = useForm<LogHydrationFormValues>({
    resolver: zodResolver(logHydrationFormSchema),
    defaultValues: {
      beverageType: "water",
      amount: undefined, // Or a common default like 250
      time: defaultTime,
    },
  });

  function onSubmit(data: LogHydrationFormValues) {
    console.log("Hydration Logged:", data);
    // TODO: Implement actual data persistence
    toast.success("Hydration logged successfully!", {
      description: `${data.amount}ml of ${data.beverageType} at ${data.time}.`,
    });
    onSuccess?.(); // Call onSuccess to close modal or reset form
    form.reset();
    if (onClose) {
      onClose();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="beverageType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Beverage Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a beverage" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {beverageTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
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
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount (ml)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g., 250" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Log Hydration</Button>
        </div>
      </form>
    </Form>
  );
}
