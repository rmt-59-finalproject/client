import { useParams } from "react-router";
export default function InvoiceDetailPage() {
  const params = useParams();
  const { invoiceId } = params;
  return (
    <>
      <div>Invoice nomor: {invoiceId} (contoh)</div>
    </>
  );
}
