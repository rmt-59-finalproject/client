import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function DriversPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="w-7xl flex flex-col justify-center items-center">
        <div className="border border-gray-300 rounded-2xl flex flex-row items-center p-5 justify-between w-full ">
          <div>
            <h1 className="text-2xl font-bold">All Drivers</h1>
          </div>
          <div className="flex gap-2">
            <Button>Create New Driver</Button>
          </div>
        </div>

        {/*  */}
        <div className="border border-gray-300 rounded-2xl mt-10 w-4xl p-5">
          <div className="flex flex-col gap-5">
            <Card>
              <CardContent>
                <div className="flex items-center p-4 w-full ">
                  <div className="w-16 rounded-full flex items-center justify-center text-lg font-semibold text-gray-700 overflow-hidden">
                    <img
                      src={"https://github.com/shadcn.png"}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="ml-10">
                    <h2 className="text-lg font-medium text-gray-900">
                      Ipsum Dolor
                    </h2>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className="flex items-center p-4 w-full ">
                  <div className="w-16 rounded-full flex items-center justify-center text-lg font-semibold text-gray-700 overflow-hidden">
                    <img
                      src={"https://github.com/shadcn.png"}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="ml-10">
                    <h2 className="text-lg font-medium text-gray-900">
                      Lorem Ipsum
                    </h2>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className="flex items-center p-4 w-full ">
                  <div className="w-16 rounded-full flex items-center justify-center text-lg font-semibold text-gray-700 overflow-hidden">
                    <img
                      src={"https://github.com/shadcn.png"}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="ml-10">
                    <h2 className="text-lg font-medium text-gray-900">
                      Dolor Lorem
                    </h2>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
