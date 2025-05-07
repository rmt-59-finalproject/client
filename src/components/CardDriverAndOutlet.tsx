import { OrderStatus } from "@/types";
import { BadgeStatusColor } from "./BadgeStatusColor";
import { Card, CardContent } from "./ui/card";

export interface Statistics {
  requested?: number;
  approved: number;
  in_transit?: number;
  delivered?: number;
  completed?: number;
  rejected?: number;
}

type CardLogoAndName = { logo: string; name: string, statistics: Statistics | undefined };

export default function CardDriverAndOutlet({ logo, name, statistics }: CardLogoAndName) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center p-4 w-full font-[family-name:Montserrat]">
          <div className="w-16 rounded-full flex items-center justify-center text-lg font-semibold text-gray-700 overflow-hidden">
            <img
              src={logo}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="ml-10 flex-1 ">
            <h2 className="text-lg font-bold mb-1 text-gray-900">{name}</h2>
            <p>Order summary:</p>
            <div className="flex justify-between font-normal gap-4">
              {statistics && Object.entries(statistics).map(([key, value]) => {
                return <div className="flex items-center gap-1"><span className="">{value}</span><BadgeStatusColor status={key as OrderStatus} /></div>
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
