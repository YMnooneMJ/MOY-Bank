import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Transaction } from "@/types";
import { useAuth } from "../context/AuthContext";


interface Props {
  transactions: Transaction[];
}

const DownloadStatement = ({ transactions }: Props) => {
  const { user } = useAuth();

  const handleDownload = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("MOY-Bank - Account Statement", 14, 20);
    doc.setFontSize(10);
    doc.text(`Name: ${user?.fullName || "N/A"}`, 14, 27);
    doc.text(`Account Number: ${user?.accountNumber || "N/A"}`, 14, 32);
    doc.text(`Generated: ${new Date().toLocaleString("en-NG")}`, 14, 37);

    autoTable(doc, {
      startY: 45,
      head: [["Date", "Type", "Amount (₦)", "Status", "To / From"]],
      body: transactions.map((tx) => [
        new Date(tx.createdAt).toLocaleDateString(),
        tx.type.charAt(0).toUpperCase() + tx.type.slice(1),
        `₦${tx.amount.toLocaleString()}`,
        tx.status,
        tx.type === "deposit"
          ? tx.receiver?.fullName || "-"
          : tx.sender?.fullName || tx.receiver?.fullName || "-",
      ]),
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [34, 197, 94], // green
        textColor: 255,
        halign: "center",
      },
    });

    doc.save("MOY_Bank_Statement.pdf");
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
    >
      Download PDF
    </button>
  );
};

export default DownloadStatement;
