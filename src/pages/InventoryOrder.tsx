import { useState } from "react";

const initialInventory = [
  {
    id: 1,
    name: "Premium Coffee Beans",
    category: "Food & Beverage",
    stock: 250,
    unit: "boxes",
  },
  {
    id: 2,
    name: "Organic Tea Assortment",
    category: "Food & Beverage",
    stock: 180,
    unit: "boxes",
  },
  {
    id: 3,
    name: "Ceramic Coffee Mugs",
    category: "Kitchenware",
    stock: 75,
    unit: "units",
  },
  {
    id: 4,
    name: "Coffee Filters",
    category: "Supplies",
    stock: 120,
    unit: "packs",
  },
  {
    id: 5,
    name: "Branded Tote Bags",
    category: "Merchandise",
    stock: 120,
    unit: "units",
  },
];

export default function InventoryOrder() {
  const [searchTerm, setSearchTerm] = useState("");
  const [orderItems, setOrderItems] = useState([]);

  const filteredInventory = initialInventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = (item) => {
    setOrderItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleQuantityChange = (id, qty) => {
    setOrderItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: parseInt(qty || 0) } : item
      )
    );
  };

  const handleRemove = (id) => {
    setOrderItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-50 min-h-screen">
      {/* Search */}
      <div className="mb-4">
        <label className="block text-lg font-bold mb-1">Inventory</label>
        <input
          type="text"
          placeholder="Search inventory..."
          className="w-full border border-gray-300 rounded-md p-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Inventory List */}
      <div className="space-y-3">
        {filteredInventory.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-xl shadow flex flex-col sm:flex-row justify-between items-start sm:items-center"
          >
            <div>
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-sm text-gray-500">
                {item.category} • In stock: {item.stock} {item.unit}
              </p>
            </div>
            <button
              onClick={() => handleAdd(item)}
              className="mt-3 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
            >
              Add to Order
            </button>
          </div>
        ))}
      </div>

      {/* Order Items */}
      {orderItems.length > 0 && (
        <div className="mt-6 space-y-3">
          <h2 className="text-lg font-bold">Order Items</h2>
          {orderItems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-start"
            >
              <div>
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  {item.category} • In stock: {item.stock} {item.unit}
                </p>
                <div className="mt-2">
                  <label className="text-sm text-gray-600">Quantity</label>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      handleQuantityChange(item.id, e.target.value)
                    }
                    className="w-20 border rounded px-2 py-1 text-center mt-1"
                  />
                </div>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-600 text-sm mt-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Review Button */}
      <div className="fixed bottom-4 left-0 right-0 px-4">
        <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold shadow-lg">
          Review Order
        </button>
      </div>
    </div>
  );
}
