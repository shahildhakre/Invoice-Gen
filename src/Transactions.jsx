import React, { useEffect, useState } from "react";
import StatsGrid from "./StatsGrid";
import TableRow from "./TableRow";
import { query, collection, getDocs, where } from "firebase/firestore";
import { db } from "./firebase/firebase";
import { useAuth } from "./contexts/authcontexts";

function Transactions() {
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const transactionsRef = collection(db, "Transactions");
        const q = query(
          transactionsRef,
          where("email", "==", currentUser.email)
        );
        const transactionsSnapshot = await getDocs(q);

        const transactionsData = transactionsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTransactions(transactionsData);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    }

    fetchTransactions();
  }, [currentUser.email]); // Only re-run the effect if currentUser.email changes
  // 1. Invoice Generated
  let invoiceGenerated = transactions.length;

  // 2. Quantity of Items Sold
  let quantityOfItemsSold = transactions.length;

  // 3. Amount of Price Sold
  let totalAmountSold = 0;
  transactions.forEach((item) => {
    totalAmountSold += item.total;
  });

  // 4. Average Discount Rate
  let sumDiscountRate = 0;
  transactions.forEach((item) => {
    sumDiscountRate += item.discountRate;
  });
  let averageDiscountRate = sumDiscountRate / transactions.length;

  // 5. Average Tax Rate
  let sumTaxRate = 0;
  transactions.forEach((item) => {
    sumTaxRate += item.taxRate;
  });
  let averageTaxRate = sumTaxRate / transactions.length;
  let discountedAmount = (totalAmountSold * averageDiscountRate) / 100;
  const stats = [
    invoiceGenerated, // Invoice Generated
    quantityOfItemsSold, // Quantity of Items Sold
    totalAmountSold, // Amount of Price Sold
    averageDiscountRate, // Average Discount Rate
    averageTaxRate, // Average Tax Rate
    discountedAmount,
  ];

  return (
    <>
      <StatsGrid stats={stats} />
      <link
        href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,300;0,400;1,600&display=swap"
        rel="stylesheet"
      />

      <div className="w-screen bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-2 py-10">
          <div className="mt-6 overflow-hidden rounded-xl bg-white px-6 shadow lg:px-4">
            <table className="border-spacing-y-2 border-spacing-x-2 min-w-full border-collapse">
              <thead className="hidden border-b lg:table-header-group">
                <tr className="">
                  <td className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">
                    Order Date
                  </td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                    Invoice No
                  </td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                    Cashier Name
                  </td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                    Customer
                  </td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                    Discount Rate in %
                  </td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                    Tax Rate in %
                  </td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                    Price
                  </td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                    Invoice
                  </td>
                </tr>
              </thead>
              <tbody className="bg-white lg:border-gray-300">
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id} element={transaction} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Transactions;
