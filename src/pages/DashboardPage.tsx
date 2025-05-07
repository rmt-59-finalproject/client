import TableHistoryOrder from "@/components/TableHistoryOrder";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { http } from "@/helpers/axios";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { RootState } from "@/redux/rootStore";
import { setOrders } from "@/redux/slice/ORDERS";
import { useEffect } from "react";
import { Link } from "react-router";

export default function DashboardPage() {
  const { orders } = useAppSelector((state: RootState) => state.ORDERS);
  const dispatch = useAppDispatch();
  const requested = orders?.filter(
    (item) => item.status === "requested"
  ).length;
  const completed = orders?.filter(
    (item) => item.status === "completed"
  ).length;

  useEffect(() => {
    (async function fetchData() {
      try {
        const { data } = await http.get("/orders");
        console.log(data);

        dispatch(setOrders(data));
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => console.log(orders, "redux"), [orders]);

  return (
    <div className="flex flex-col justify-center items-center font-[family-name:Montserrat]">
      <div className="w-7xl">
        <div className="flex flex-row items-center px-5 pt-5 justify-between w-full ">
          <h1 className="text-2xl font-bold">
            Welcome {sessionStorage.getItem("name")}!
          </h1>
        </div>
        {/* Card Stats */}
        <div className="w-full h-50 p-5">
          <div className=" flex  gap-5  flex-row ">
            <Card className="flex-1/3">
              <CardHeader>
                <CardTitle>Requested Orders</CardTitle>
                <CardDescription>
                  <h1 className="text-5xl font-bold">{requested}</h1>
                  <h1 className="text-sm mt-2 opacity-80">
                    these orders require attention
                  </h1>
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="flex-1/3">
              <CardHeader>
                <CardTitle>Completed Orders</CardTitle>
                <CardDescription>
                  <h1 className="text-5xl font-bold">{completed}</h1>
                  <h1 className="text-sm mt-2 opacity-80">
                    {" "}
                    these orders completed to outlet
                  </h1>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
        {/*  */}
        <div className="px-5 pt-5 flex flex-row items-center justify-between">
          <h1 className="font-bold text-2xl">Recent Orders</h1>
          <Link to={"/warehouse/orders"}>
            <Button>View All</Button>
          </Link>
        </div>
        {/* button create order */}
        <div className="p-5">
          <TableHistoryOrder
            orderData={(orders || []).slice(0, 6).map((item) => item)}
          />
        </div>
      </div>
    </div>
  );
}
