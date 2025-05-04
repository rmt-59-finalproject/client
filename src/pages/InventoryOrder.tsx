import React from "react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const DeliveryCard = () => {
  return (
    <div className="p-4 bg-white rounded-xl shadow-md max-w-md mx-auto sm:max-w-lg md:max-w-2xl">
      <h2 className="text-lg font-semibold text-gray-900 mb-1">
        ORD-5003 - Harbor Coffee Shop
      </h2>
      <p className="text-sm text-gray-500 mb-3">
        5 items • Due by 11:45 AM • 3.2 miles away
      </p>

      <div className="mb-3">
        <p className="text-sm text-gray-700 font-medium">Delivery Address:</p>
        <p className="text-sm text-blue-600">
          123 Harbor Way, Seaside, CA 94019
        </p>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Order Items:</p>
        <ul className="text-sm text-gray-800 space-y-1">
          <li className="flex justify-between">
            <span>Premium Coffee Beans</span>
            <span>2 boxes</span>
          </li>
          <li className="flex justify-between">
            <span>Organic Tea Assortment</span>
            <span>1 box</span>
          </li>
          <li className="flex justify-between">
            <span>Ceramic Coffee Mugs</span>
            <span>10 units</span>
          </li>
          <li className="flex justify-between">
            <span>Branded Tote Bags</span>
            <span>5 units</span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
        <Button className="w-full sm:w-auto">Verify Delivery</Button>
        <Button
          variant="outline"
          className="w-full sm:w-auto flex items-center gap-1"
        >
          <MapPin size={16} />
          Navigate
        </Button>
      </div>
    </div>
  );
};

export default DeliveryCard;
