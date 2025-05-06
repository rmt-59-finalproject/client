import { CardOrderComponent } from "@/components/CardOrder";
import { Button } from "@/components/ui/button";
import { http } from "@/helpers/axios";
import { OrderType } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function LandingPageDriver() {
  //   const [role, useRole] = useState("driver");
  const [orderData, setOrderData] = useState<OrderType[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const uri = `/driver/orders`;
      const data = await http.get(uri, {
        params: {
          status: "in_transit",
        },
        withCredentials: true,
      });
      console.log(data);
      console.log(data.data);
      const dataResponse: OrderType[] = data.data;
      setOrderData(dataResponse);
    } catch (error) {
      console.log(error);
    }
  }
  function navigateDriverOrder() {
    navigate("/driver-orders");
  }

  function navigateVerifyDriver(id: string) {
    navigate(`/verify-driver/${id}`);
  }
  return (
    <>
      {" "}
      (
      <>
        <div className="flex flex-col justify-start items-center min-h-screen w-full ">
          <div className="flex flex-col max-w-6xl justify-center items-center w-full">
            <div className="border border-gray-300 rounded-2xl flex flex-row items-center w-full p-5 justify-between">
              <div className="w-full">
                <h1 className="text-2xl font-bold"> Welcome</h1>
                <div className="flex flex-row justify-between items-center w-full">
                  <h1 className="text-lg opacity-70">
                    Here is today's missions:
                  </h1>
                  <Button onClick={navigateDriverOrder}>All Orders</Button>
                </div>
              </div>
            </div>
          </div>
          <div className=" min-h-screen p-4 max-w-6xl font-bold text-lg w-full">
            {orderData.length > 0 ? (
              // ADA ORDERAN
              <>
                <div className="flex flex-col gap-2">
                  {orderData?.map((el) => {
                    return (
                      <CardOrderComponent
                        key={el._id}
                        el={el}
                        nameButton={"Verify Items"}
                        click={() => navigateVerifyDriver(el?._id)}
                      />
                    );
                  })}
                </div>
              </>
            ) : (
              // GAADA ORDERAN
              <>
                <div className="min-h-20 opacity-70 flex justify-center items-center">
                  <h1>Ga ada orderan nih, santuy dulu aja...</h1>
                </div>
              </>
            )}
          </div>
        </div>
      </>
      )
    </>
  );
}
