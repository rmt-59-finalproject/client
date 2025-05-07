import CardDriverAndOutlet from "@/components/CardDriverAndOutlet";
import { http } from "@/helpers/axios";
import { UserType } from "@/types";
import { useEffect, useState } from "react";

// halaman all driver role warehouse
export default function DriverPage() {
  const [data, setData] = useState<UserType[]>([]);
  useEffect(() => {
    getDriver();
  }, []);
  async function getDriver() {
    try {
      const data = await http.get("/users", {
        params: {
          role: "driver",
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
    <div className="flex px-3 gap-10 flex-col items-center min-h-screen font-[family-name:Montserrat]">
      <div className="border border-gray-300 rounded-2xl flex flex-row items-center p-5 justify-between w-full ">
        <h1 className="text-2xl font-bold">All Drivers</h1>
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
