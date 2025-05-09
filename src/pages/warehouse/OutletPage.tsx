import CardDriverAndOutlet from "@/components/CardDriverAndOutlet";
import { http } from "@/helpers/axios";
import { UserType } from "@/types";
import { useEffect, useState } from "react";

// halaman all driver role warehouse
export default function OutletPage() {
  const [data, setData] = useState<UserType[]>([]);
  useEffect(() => {
    getDriver();
  }, []);
  async function getDriver() {
    try {
      const data = await http.get("/users", {
        params: {
          role: "outlet",
        },
        withCredentials: true,
      });
      console.log(data.data);
      setData(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="bg-[url('data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2032%2032%27%20width=%2732%27%20height=%2732%27%20fill=%27none%27%20stroke=%27rgb(0%200%200%20/%200.2)%27%3e%3cpath%20d=%27M0%20.5H31.5V32%27/%3e%3c/svg%3e')] flex px-3 gap-10 flex-col justify-center items-center min-h-screen font-[family-name:Montserrat]">
      <div className="border border-gray-300 rounded-2xl flex flex-row items-center p-5 justify-between w-full ">
        <h1 className="text-2xl font-bold">All Outlets</h1>
      </div>

      <div className="border border-gray-300 rounded-2xl w-4xl p-5">
        <div className="flex flex-col gap-5">
          {data?.map((el) => {
            return (
              <CardDriverAndOutlet
                key={el?._id}
                name={el?.name}
                logo={"https://github.com/shadcn.png"}
                statistics={el?.statistics}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
