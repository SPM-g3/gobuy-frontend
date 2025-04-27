"use client"

import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import apiClient from "@/lib/apiClient";

export default function SalesReport() {
  const [salesData, setSalesData] = useState([]);
  const [timeRange, setTimeRange] = useState('week');
  const [topProducts, setTopProducts] = useState([]);

  const sampleData = [
    {
        "date": "2025-04-13",
        "sales": 1950
    },
    {
        "date": "2025-04-14",
        "sales": 1900
    },
    {
        "date": "2025-04-15",
        "sales": 1232
      },
      {
        "date": "2025-04-16",
        "sales": 1983
      },
      {
        "date": "2025-04-17",
        "sales": 2050
      },
      {
        "date": "2025-04-18",
        "sales": 2000
      },
      {
        "date": "2025-04-19",
        "sales": 1950
      },
      {
        "date": "2025-04-20",
        "sales": 2050
      }
  ];
  const weekTopProducts = [

    {
     id: 1,
      name: "李宁荷叶风衣",
      image: "/images/3.png",
      totalSold: 251,
      totalRevenue: 54459
    },
    {
      id: 2,
      name: "Phone 16 PROMAX",
      image: "/images/33.png",
      totalSold: 6,
      totalRevenue: 47994
    },
    {
      id: 3,
      name: "Tempo得宝纸巾抽纸",
      image: "/images/5.png",
      totalSold: 255,
      totalRevenue: 1527.45
    }   
  ];
  const monthTopProducts = [

    {
     id: 1,
     name: "Phone 16 PROMAX",
     image: "/images/33.png",
     totalSold: 899,
     totalRevenue: 6292101
    },
    {
      id: 2,
      name: "Tempo得宝纸巾抽纸",
      image: "/images/5.png",
      totalSold: 5710,
      totalRevenue: 34202.9
    },
    {
      id: 3,
      name: "太粮油粘米靓虾王香软米",
      image: "/images/31.png",
      totalSold: 1020,
      totalRevenue: 30498
    }   
  ];

  const quarterTopProducts = [

    {
     id: 1,
     name: "SAMSUNG Galaxy S24",
     image: "/images/4f97d864-3373-4e43-8d0e-0cd367cc6293.jpg",
     totalSold: 4599,
     totalRevenue: 13332501
    },
    {
      id: 2,
      name: "Xiaomi Redmi Note 13",
      image: "/images/12.png",
      totalSold: 5410,
      totalRevenue: 6481180
    },
    {
      id: 3,
      name: "Hawkins Pressure Cooker",
      image: "/images/32.png",
      totalSold: 5620,
      totalRevenue: 1680380
    }   
  ];
  

  useEffect(() => {
    // const fetchSalesData = async () => {
    //   try {
    //     const res = await apiClient.get('/admin/sales/data');
    //     setSalesData(res.data.sales);
    //   } catch (error) {
    //     console.error('Error fetching sales data:', error);
    //   }
    // };

    // fetchSalesData();

    // 使用样例数据来设置销售数据
    setSalesData(sampleData);
  }, []);

  useEffect(() => {
    // const fetchTopProducts = async () => {
    //   try {
    //     const res = await apiClient.get(`/admin/sales/top-products?timeRange=${timeRange}`);
    //     setTopProducts(res.data.topProducts);
    //   } catch (error) {
    //     console.error('Error fetching top products:', error);
    //   }
    // };
  
    // fetchTopProducts();
    if (timeRange === 'week') {
      setTopProducts(weekTopProducts);
    } else if (timeRange === 'month') {
      setTopProducts(monthTopProducts);
    } else if (timeRange === 'quarter') {
      setTopProducts(quarterTopProducts);
    }
  }, [timeRange]);


  
  return (
    <div>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Sales Report</h2>
        <div className="flex justify-center">
        <LineChart
          width={1200}
          height={400}
          data={salesData}
          margin={{
            top: 20, right: 50, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" interval={0} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
          {/* <Line type="monotone" dataKey="itemsSold" stroke="#82ca9d" /> */}
          </LineChart>
        </div>
      </div>
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-center">Top Selling Products</h2>
        <div className="flex justify-center mb-4">
            <select className="p-2 border rounded" value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            {/* <option value="year">Last Year</option> */}
            </select>
        </div>
        <div className="flex justify-around">
            {topProducts.map(product => (
            <div key={product.id} className="flex flex-col items-center">
                <img src={product.image} alt={product.name} className="max-w-full max-h-48 mb-2 object-contain" />
                <strong>{product.name}</strong>
                <p>{product.totalSold} units sold, ￥{product.totalRevenue.toFixed(2)} total revenue</p>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
}