import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, RefreshCw, Trash2, Edit } from "lucide-react";
import { InventoryItem } from "@/types";
import { http } from "@/helpers/axios";
import { toast } from "sonner";
import DialogAddModal from "./DialogAddModal";
import DialogDeleteModal from "./DialogDeleteModal";
import DialogEditStock from "./DialogEditStock";

export default function InventoryPage() {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [metadata, setMetadata] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  // const [showAddForm, setShowAddForm] = useState(false);
  // const [showUpdateForm, setShowUpdateForm] = useState(false);
  // const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  // const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const fetchInventory = async () => {
    try {
      const response = await http.get(`/inventory?limit=${limit}&page=${page}&search=${searchQuery}`);

      console.log(response.data.data);
      setMetadata(response.data);
      setInventoryItems(response.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, [page, limit, searchQuery]);

  // const handleUpdateStock = (item: InventoryItem) => {
  //   setSelectedItem(item);
  //   setShowUpdateForm(true);
  // };

  // const handleDeleteItem = (item: InventoryItem) => {
  //   setSelectedItem(item);
  //   setShowDeleteDialog(true);
  // };

  // const handleAddSuccess = () => {
  //   setShowAddForm(false);
  //   fetchInventory();
  //   toast({
  //     title: "Success",
  //     description: "Inventory item added successfully",
  //   });
  // };

  // const handleUpdateSuccess = () => {
  //   setShowUpdateForm(false);
  //   fetchInventory();
  //   toast({
  //     title: "Success",
  //     description: "Stock updated successfully",
  //   });
  // };

  // const handleDeleteSuccess = () => {
  //   setShowDeleteDialog(false);
  //   fetchInventory();
  //   toast.success("Item deleted successfully");
  // };

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
    setPage(1);
    setSearchQuery(e.target.value);
  }

  return (
    <div className="flex flex-col justify-center items-center font-[family-name:Montserrat]">
      <div className="w-7xl">
        <div className="flex flex-row items-center px-5 pt-5 justify-between w-full ">
          <div className="flex flex-row justify-between items-center w-full">
            <h1 className="text-2xl font-bold">Inventory Management</h1>
            <DialogAddModal />
          </div>
        </div>
        <div className="container mx-auto py-8">
          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between"></CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search inventory..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
                <Button variant="default" onClick={fetchInventory}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>

              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inventoryItems.length > 0 ? (
                        inventoryItems.map((item) => (
                          <TableRow key={item._id}>
                            <TableCell className="font-medium">
                              {item.name}
                            </TableCell>
                            <TableCell>
                              <Badge variant="neutral">{item.category}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="neutral">{item.stock}</Badge>
                            </TableCell>
                            <TableCell>{item.unit}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <DialogEditStock id={item._id} />
                                <DialogDeleteModal id={item._id} />
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={5}
                            className="text-center py-4 text-muted-foreground"
                          >
                            Item inventori tidak ditemukan
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}

              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing {inventoryItems.length} items from total{" "}
                  {metadata?.totalItems} items, page {metadata.page} of{" "}
                  {metadata.totalPages}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="noShadow"
                    size="sm"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={inventoryItems.length < limit}
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* {showAddForm && (
            <AddInventoryForm
              onClose={() => setShowAddForm(false)}
              onSuccess={handleAddSuccess}
            />
          )}

          {showUpdateForm && selectedItem && (
            <UpdateStockForm
              item={selectedItem}
              onClose={() => setShowUpdateForm(false)}
              onSuccess={handleUpdateSuccess}
            />
          )}

          {showDeleteDialog && selectedItem && (
            <DeleteConfirmDialog
              item={selectedItem}
              onClose={() => setShowDeleteDialog(false)}
              onSuccess={handleDeleteSuccess}
            />
          )} */}
        </div>
      </div>
    </div>
  );
}
