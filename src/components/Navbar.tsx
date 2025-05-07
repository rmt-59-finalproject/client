"use client";

import { Button } from "@/components/ui/button";
import { Card } from "./ui/card";
import { useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <Card className="fixed border-4 border-black top-0 left-0 right-0 z-50 bg-white shadow-sm px-4 py-3">
      <div className="w-full p-3 mx-auto   flex items-center justify-between">
        <div>
          <img
            className="w-[50px] border-5 rounded-lg border-black"
            src={"/src/assets/stockify.png"}
            alt="image"
          />
        </div>

        <Button
          onClick={() => navigate("/login")}
          variant={"neutral"}
          size={"lg"}
        >
          Log in
        </Button>
      </div>
    </Card>
  );
}
