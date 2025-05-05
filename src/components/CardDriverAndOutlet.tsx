import { Card, CardContent } from "./ui/card";

type CardLogoAndName = { logo: string; name: string };

export default function CardDriverAndOutlet({ logo, name }: CardLogoAndName) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center p-4 w-full ">
          <div className="w-16 rounded-full flex items-center justify-center text-lg font-semibold text-gray-700 overflow-hidden">
            <img
              src={logo}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="ml-10">
            <h2 className="text-lg font-medium text-gray-900">{name}</h2>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
