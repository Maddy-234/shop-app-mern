"use client";

import { Order, Product, User } from "@prisma/client";
import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { formatPrice } from "@/utils/formatPrice";
import { formatNumber } from "@/utils/formatNumber";

interface DashboardProps {
  orders: Order[];
  products: Product[];
  users: User[];
}

type DashboardDataType = {
  [key: string]: {
    label: string;
    digit: number;
  };
};
const Dashboard: React.FC<DashboardProps> = ({ orders, products, users }) => {
  const [dashboardData, setDashboardData] = useState<DashboardDataType>({
    sale: {
      label: "Total Sale",
      digit: 0,
    },
    products: {
      label: "Total Products",
      digit: 0,
    },
    orders: {
      label: "Total Orders",
      digit: 0,
    },
    paidOrders: {
      label: "Paid Orders",
      digit: 0,
    },
    unpaidOrders: {
      label: "Unpaid Orders",
      digit: 0,
    },
    users: {
      label: "Total Users",
      digit: 0,
    },
  });

  useEffect(() => {
    setDashboardData((prev) => {
      let tempData = { ...prev };
      const totalSale = orders.reduce((acc, item) => {
        if (item.status === "complete") {
          return acc + item.amount;
        } else {
          return acc;
        }
      }, 0);

      const paidOrders = orders.filter((order) => {
        return order.status === "complete";
      });

      const unpaidOrders = orders.filter((order) => {
        return order.status === "pending";
      });

      tempData.sale.digit = totalSale;
      tempData.orders.digit = orders.length;
      tempData.paidOrders.digit = paidOrders.length;
      tempData.unpaidOrders.digit = unpaidOrders.length;
      tempData.products.digit = products.length;
      tempData.users.digit = users.length;

      return tempData;
    });
  }, [orders, dashboardData, users, products]);

  const dashboardKeys = Object.keys(dashboardData);
  return (
    <div className="max-w-[1150px] m-auto">
      <div className="mb-4 mt-8">
        <Heading title="Stats" center />
      </div>
      <div className="grid grid-cols-2 gap-3 max-h-50vh overflow-y-auto">
        {dashboardKeys &&
          dashboardKeys.map((key) => {
            return (
              <div
                key={key}
                className="rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition"
              >
                <div className="text-xl md:text-4xl font-bold">
                  {dashboardData[key].label === "Total Sale" ? (
                    <>{formatPrice(dashboardData[key].digit)}</>
                  ) : (
                    <>{formatNumber(dashboardData[key].digit)}</>
                  )}
                </div>
                <div>{dashboardData[key].label}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Dashboard;
