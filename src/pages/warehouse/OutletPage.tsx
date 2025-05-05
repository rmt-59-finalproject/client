import CardDriverAndOutlet from "@/components/CardDriverAndOutlet";
import { Button } from "@/components/ui/button";
import { http } from "@/helpers/axios";
import { useEffect, useState } from "react";

type DriverType = {
  _id: string;
  username: string;
  name: string;
  role: string;
};
// halaman all driver role warehouse
export default function OutletPage() {
  const [data, setData] = useState<DriverType[]>([]);
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
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="w-7xl flex flex-col justify-center items-center">
        <div className="border border-gray-300 rounded-2xl flex flex-row items-center p-5 justify-between w-full ">
          <div>
            <h1 className="text-2xl font-bold">All Outlets</h1>
          </div>
        </div>

        {/*  */}
        <div className="border border-gray-300 rounded-2xl mt-10 w-4xl p-5">
          <div className="flex flex-col gap-5">
            {data?.map((el) => {
              return (
                <CardDriverAndOutlet
                  name={el?.name}
                  logo={"https://github.com/shadcn.png"}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
