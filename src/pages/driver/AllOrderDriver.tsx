import { CardOrderComponent } from "@/components/CardOrder";
import { http } from "@/helpers/axios";
import { OrderType } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

// Ini adalah halaman All Order dari Driver yang login
export default function AllOrderDriver() {
  const [orderData, setOrderData] = useState<OrderType[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  function navigateDetail(id: string) {
    navigate(`/orders/${id}`);
  }
  async function fetchData() {
    try {
      const uri = `/driver/orders?status=delivered`;
      const data = await http.get(uri, {
        withCredentials: true,
      });
      console.log(data.data);
      const dataResponse: OrderType[] = data.data;
      setOrderData(dataResponse);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="flex flex-col justify-start items-center min-h-screen w-full ">
        <div className="flex flex-col max-w-6xl justify-center items-center w-full">
          <div className="border border-gray-300 rounded-2xl flex flex-row items-center w-full p-5 justify-between">
            <div>
              <h1 className="text-2xl font-bold">Order History</h1>
            </div>
          </div>
        </div>
        <div className=" min-h-screen p-4 max-w-6xl font-bold text-lg w-full">
          {orderData.length > 0 ? (
            // ADA ORDERAN
            <>
              {orderData.map((order) => {
                return (
                  <CardOrderComponent
                    key={order._id}
                    el={order}
                    nameButton={"Detail Order"}
                    click={() => navigateDetail(order._id)}
                  />
                );
              })}
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
  );
}
