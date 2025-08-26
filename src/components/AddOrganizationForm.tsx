import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { ColorPicker } from "@/components/ui/color-picker";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  nature: z.string().min(1, "Nature is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
  tertiaryColor: z.string().optional(),
});

interface AddOrganizationFormProps {
  onSuccess: () => void;
  parentId?: string;
  parentName?: string;
}

export function AddOrganizationForm({ onSuccess, parentId, parentName }: AddOrganizationFormProps) {
  const { toast } = useToast();
  const addOrganization = useAppStore((state) => state.addOrganization);
  const [logo, setLogo] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      nature: "",
      email: "",
      phone: "",
      primaryColor: "#3b82f6",
      secondaryColor: "#10b981", 
      tertiaryColor: "#f59e0b",
    },
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogo(file);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    addOrganization({
      name: values.name,
      nature: values.nature,
      email: values.email,
      phone: values.phone,
      parentId,
      logoUrl: logo ? URL.createObjectURL(logo) : undefined,
      primaryColor: values.primaryColor,
      secondaryColor: values.secondaryColor,
      tertiaryColor: values.tertiaryColor,
    });
    
    toast({
      title: "Success",
      description: `${parentId ? 'Sub-organization' : 'Organization'} added successfully`,
    });
    
    onSuccess();
    form.reset();
    setLogo(null);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {parentName && (
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">Parent Organization:</p>
            <p className="font-medium">{parentName}</p>
          </div>
        )}
        
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter organization name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nature"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nature</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select organization type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Bank">Bank</SelectItem>
                  <SelectItem value="NGO">NGO</SelectItem>
                  <SelectItem value="Microfinance">Microfinance</SelectItem>
                  <SelectItem value="SACCO">SACCO</SelectItem>
                  <SelectItem value="Cooperative">Cooperative</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <label className="text-sm font-medium">Organization Logo</label>
          <div className="flex items-center gap-2">
            <Input
              id="logo"
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('logo')?.click()}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              {logo ? logo.name : "Upload Logo"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="primaryColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Color</FormLabel>
                <FormControl>
                  <ColorPicker
                    value={field.value || ""}
                    onChange={field.onChange}
                    placeholder="Select primary color"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="secondaryColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Secondary Color</FormLabel>
                <FormControl>
                  <ColorPicker
                    value={field.value || ""}
                    onChange={field.onChange}
                    placeholder="Select secondary color"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tertiaryColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tertiary Color</FormLabel>
                <FormControl>
                  <ColorPicker
                    value={field.value || ""}
                    onChange={field.onChange}
                    placeholder="Select tertiary color"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onSuccess}>
            Cancel
          </Button>
          <Button type="submit">Add Organization</Button>
        </div>
      </form>
    </Form>
  );
}