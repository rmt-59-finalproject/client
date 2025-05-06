import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { http } from "@/helpers/axios";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  async function submitLogin(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      if (!username) {
        throw { message: "Username required" };
      }
      if (!name) {
        throw { message: "Name required" };
      }
      if (!password) {
        throw { message: "Password required" };
      }
      if (!role) {
        throw { message: "Role required" };
      }

      const data = await http({
        url: "/register",
        method: "POST",
        data: {
          name,
          username,
          password,
          role,
        },
        withCredentials: true,
      });
      console.log(data.data.message);
      toast.success(data.data.message);
    } catch (error) {
      console.log(error);
      toast.warning((error as Error).message);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-dvh w-full bg-gray-200">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Register ke Stockify</CardTitle>
          <CardDescription>Register akun tim baru anda.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Name</Label>
                <Input
                  id="Name"
                  type="text"
                  placeholder="Masukkan nama lengkap disini"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Masukkan username baru disini"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="******"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Role</Label>
                </div>
                <Select onValueChange={(val) => setRole(val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a role..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="warehouse">Warehouse</SelectItem>
                      <SelectItem value="driver">Driver</SelectItem>
                      <SelectItem value="outlet">Outlet</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-10">
              <Button type="submit" className="w-full">
                Register new account
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
