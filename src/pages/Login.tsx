import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

// Dummy user data
const users = [
  { email: "ken@chamasoft.com", password: "Ken1234!", role: "super_admin", name: "Ken Admin" },
  { email: "mwangi@chamasoft.com", password: "password", role: "official", name: "Mwangi Official", organizationIds: ["1", "2"] }
];

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      toast.success(`Welcome back, ${user.name}!`);
      
      if (user.role === "super_admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/org/select");
      }
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Octopus Demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <Button onClick={handleLogin} className="w-full">
            Login
          </Button>
          <div className="text-sm text-muted-foreground">
            <p>Demo accounts:</p>
            <p>Super Admin: ken@chamasoft.com / Ken1234!</p>
            <p>Official: mwangi@chamasoft.com / password</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}