import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAppStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { Permission } from "@/lib/types";

const formSchema = z.object({
  name: z.string().min(1, "Role name is required"),
  permissions: z.array(z.string()),
});

interface AddRoleFormProps {
  onSuccess: () => void;
}

const availablePermissions = [
  { id: '1', name: 'view dashboard' },
  { id: '2', name: 'onboard groups' },
  { id: '3', name: 'view reports' },
];

export function AddRoleForm({ onSuccess }: AddRoleFormProps) {
  const { toast } = useToast();
  const addRole = useAppStore((state) => state.addRole);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      permissions: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const permissions: Permission[] = availablePermissions.map(perm => ({
      id: perm.id,
      name: perm.name,
      checked: values.permissions.includes(perm.id),
    }));

    addRole({
      name: values.name,
      permissions,
    });
    
    toast({
      title: "Success",
      description: "Role added successfully",
    });
    
    onSuccess();
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter role name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="permissions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Permissions</FormLabel>
              <div className="space-y-3">
                {availablePermissions.map((permission) => (
                  <div key={permission.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={permission.id}
                      checked={field.value.includes(permission.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...field.value, permission.id]);
                        } else {
                          field.onChange(field.value.filter((id) => id !== permission.id));
                        }
                      }}
                    />
                    <label htmlFor={permission.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {permission.name}
                    </label>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onSuccess}>
            Cancel
          </Button>
          <Button type="submit">Add Role</Button>
        </div>
      </form>
    </Form>
  );
}