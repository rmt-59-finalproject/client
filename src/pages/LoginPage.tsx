import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const navigate = useNavigate();
  useEffect(() => {
    checkTokenOnLocalStorage();
  }, []);
  function checkTokenOnLocalStorage() {
    const token = localStorage.getItem("Authorization");
    if (token) {
      console.log("ada token di localStorage");
      navigate("/dashboard"); //contoh
    }

    console.log("tidak ada token di localStorage");
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-dvh w-full bg-amber-200">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login ke Stockify</CardTitle>
          <CardDescription>
            Masukkan email untuk masuk ke akun kamu.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
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
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button variant="neutral" className="w-full">
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
