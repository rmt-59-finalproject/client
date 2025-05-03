import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CreateOrderPage() {
  return (
    <div className="flex flex-col justify-start items-center min-h-screen w-full">
      {/* <div className="w-full flex flex-col bg-amber-300">
        <h1>Test</h1>
      </div> */}
      <div className="flex flex-col justify-center items-center w-full">
        <div className="border border-gray-300 rounded-2xl flex flex-row items-center w-full p-5 justify-between">
          <div>
            <h1 className="text-2xl font-bold">Request Order</h1>
          </div>
          <div className="flex gap-2">
            <Button>Create New Driver</Button>
          </div>
        </div>
        {/*  */}
      </div>
      <div className=" px-5 py-2.5 font-bold text-lg w-full">
        <h1>Inventory</h1>
        <Input />
      </div>
      <ScrollArea className="h-80 w-full">
        <div className="p-5 w-full flex flex-col gap-2 min-h-screen">
          <Card className="w-full">
            <div className="flex flex-row justify-between items-center">
              <CardContent>
                <div className="flex flex-col">
                  <h1 className="font-bold">Coffee Filters</h1>
                  <h1 className="text-[12px]">In stock: 120pcs</h1>
                </div>
              </CardContent>
              <CardContent>
                <Button>Add to order</Button>
              </CardContent>
            </div>
          </Card>
          <Card className="w-full">
            <div className="flex flex-row justify-between items-center">
              <CardContent>
                <div className="flex flex-col">
                  <h1 className="font-bold">Coffee Filters</h1>
                  <h1 className="text-[12px]">In stock: 120pcs</h1>
                </div>
              </CardContent>
              <CardContent>
                <Button>Add to order</Button>
              </CardContent>
            </div>
          </Card>
          <Card className="w-full">
            <div className="flex flex-row justify-between items-center">
              <CardContent>
                <div className="flex flex-col">
                  <h1 className="font-bold">Coffee Filters</h1>
                  <h1 className="text-[12px]">In stock: 120pcs</h1>
                </div>
              </CardContent>
              <CardContent>
                <Button>Add to order</Button>
              </CardContent>
            </div>
          </Card>
          <Card className="w-full">
            <div className="flex flex-row justify-between items-center">
              <CardContent>
                <div className="flex flex-col">
                  <h1 className="font-bold">Coffee Filters</h1>
                  <h1 className="text-[12px]">In stock: 120pcs</h1>
                </div>
              </CardContent>
              <CardContent>
                <Button>Add to order</Button>
              </CardContent>
            </div>
          </Card>
          <Card className="w-full">
            <div className="flex flex-row justify-between items-center">
              <CardContent>
                <div className="flex flex-col">
                  <h1 className="font-bold">Coffee Filters</h1>
                  <h1 className="text-[12px]">In stock: 120pcs</h1>
                </div>
              </CardContent>
              <CardContent>
                <Button>Add to order</Button>
              </CardContent>
            </div>
          </Card>
          <Card className="w-full">
            <div className="flex flex-row justify-between items-center">
              <CardContent>
                <div className="flex flex-col">
                  <h1 className="font-bold">Coffee Filters</h1>
                  <h1 className="text-[12px]">In stock: 120pcs</h1>
                </div>
              </CardContent>
              <CardContent>
                <Button>Add to order</Button>
              </CardContent>
            </div>
          </Card>
          <Card className="w-full">
            <div className="flex flex-row justify-between items-center">
              <CardContent>
                <div className="flex flex-col">
                  <h1 className="font-bold">Coffee Filters</h1>
                  <h1 className="text-[12px]">In stock: 120pcs</h1>
                </div>
              </CardContent>
              <CardContent>
                <Button>Add to order</Button>
              </CardContent>
            </div>
          </Card>
          <Card className="w-full">
            <div className="flex flex-row justify-between items-center">
              <CardContent>
                <div className="flex flex-col">
                  <h1 className="font-bold">Coffee Filters</h1>
                  <h1 className="text-[12px]">In stock: 120pcs</h1>
                </div>
              </CardContent>
              <CardContent>
                <Button>Add to order</Button>
              </CardContent>
            </div>
          </Card>
        </div>
      </ScrollArea>

      {/*  */}
      <div className="p-5 flex flex-col justify-center items-start w-full">
        <h1 className="text-2xl font-bold">Order Items</h1>
      </div>

      {/*  */}
      <div className="w-full">
        <ScrollArea className="h-80 w-full">
          <div className="p-5 w-full flex flex-col gap-2 min-h-screen">
            <Card className="w-full">
              <div className="flex flex-row justify-between items-center">
                <CardContent>
                  <div className="flex flex-col">
                    <h1 className="font-bold">Coffee Filters</h1>
                    <h1 className="text-[12px]">In stock: 120pcs</h1>
                  </div>
                </CardContent>
                <CardContent>
                  <Button>Add to order</Button>
                </CardContent>
              </div>
            </Card>
            <Card className="w-full">
              <div className="flex flex-row justify-between items-center">
                <CardContent>
                  <div className="flex flex-col">
                    <h1 className="font-bold">Coffee Filters</h1>
                    <h1 className="text-[12px]">In stock: 120pcs</h1>
                  </div>
                </CardContent>
                <CardContent>
                  <Button>Add to order</Button>
                </CardContent>
              </div>
            </Card>
            <Card className="w-full">
              <div className="flex flex-row justify-between items-center">
                <CardContent>
                  <div className="flex flex-col">
                    <h1 className="font-bold">Coffee Filters</h1>
                    <h1 className="text-[12px]">In stock: 120pcs</h1>
                  </div>
                </CardContent>
                <CardContent>
                  <Button>Add to order</Button>
                </CardContent>
              </div>
            </Card>
            <Card className="w-full">
              <div className="flex flex-row justify-between items-center">
                <CardContent>
                  <div className="flex flex-col">
                    <h1 className="font-bold">Coffee Filters</h1>
                    <h1 className="text-[12px]">In stock: 120pcs</h1>
                  </div>
                </CardContent>
                <CardContent>
                  <Button>Add to order</Button>
                </CardContent>
              </div>
            </Card>
            <Card className="w-full">
              <div className="flex flex-row justify-between items-center">
                <CardContent>
                  <div className="flex flex-col">
                    <h1 className="font-bold">Coffee Filters</h1>
                    <h1 className="text-[12px]">In stock: 120pcs</h1>
                  </div>
                </CardContent>
                <CardContent>
                  <Button>Add to order</Button>
                </CardContent>
              </div>
            </Card>
            <Card className="w-full">
              <div className="flex flex-row justify-between items-center">
                <CardContent>
                  <div className="flex flex-col">
                    <h1 className="font-bold">Coffee Filters</h1>
                    <h1 className="text-[12px]">In stock: 120pcs</h1>
                  </div>
                </CardContent>
                <CardContent>
                  <Button>Add to order</Button>
                </CardContent>
              </div>
            </Card>
            <Card className="w-full">
              <div className="flex flex-row justify-between items-center">
                <CardContent>
                  <div className="flex flex-col">
                    <h1 className="font-bold">Coffee Filters</h1>
                    <h1 className="text-[12px]">In stock: 120pcs</h1>
                  </div>
                </CardContent>
                <CardContent>
                  <Button>Add to order</Button>
                </CardContent>
              </div>
            </Card>
            <Card className="w-full">
              <div className="flex flex-row justify-between items-center">
                <CardContent>
                  <div className="flex flex-col">
                    <h1 className="font-bold">Coffee Filters</h1>
                    <h1 className="text-[12px]">In stock: 120pcs</h1>
                  </div>
                </CardContent>
                <CardContent>
                  <Button>Add to order</Button>
                </CardContent>
              </div>
            </Card>
          </div>
        </ScrollArea>
      </div>
      <div className="fixed bottom-4 left-0 right-0 px-4">
        <Button className="w-full">Review Order</Button>
      </div>
    </div>
  );
}
