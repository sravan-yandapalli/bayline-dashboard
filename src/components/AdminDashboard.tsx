"use client";

import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

const colors = ["#007BFF", "#00BFFF", "#3399FF", "#66CCFF", "#99CCFF"];

const mockTransactions = [
  {
    id: "TX123",
    name: "John Doe",
    type: "Individual",
    plan: "9999",
    status: "Completed",
    count: 87,
    date: "2025-06-15",
    time: "10:45 AM",
    email: "john@example.com",
    phone: "9876543210",
  },
  {
    id: "TX124",
    name: "Blue Hatchery",
    type: "Hatchery",
    plan: "4999",
    status: "Error",
    count: 0,
    date: "2025-06-16",
    time: "11:00 AM",
    email: "blue@example.com",
    phone: "9876543211",
  },
  {
    id: "TX125",
    name: "Alice",
    type: "Individual",
    plan: "",
    status: "Pending",
    count: 0,
    date: "2025-06-17",
    time: "01:30 PM",
    email: "alice@example.com",
    phone: "9876543212",
  },
];

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const today = "2025-06-17";

  const paidUsers = mockTransactions.filter(
    (txn) => txn.plan && txn.status === "Completed"
  );

  const unpaidUsers = mockTransactions.filter(
    (txn) => !txn.plan || txn.status !== "Completed"
  );

  const userStats = [
    {
      type: "Hatchery",
      value: mockTransactions.filter((txn) => txn.type === "Hatchery").length,
    },
    {
      type: "Individual",
      value: mockTransactions.filter((txn) => txn.type === "Individual").length,
    },
  ];

  const todayImageCount = mockTransactions
    .filter((txn) => txn.date === today)
    .reduce((sum, txn) => sum + txn.count, 0);

  const activeUsers = new Set(mockTransactions.map((txn) => txn.name)).size;

  const errorCount = mockTransactions.filter(
    (txn) => txn.status === "Error"
  ).length;

  const isRegistered = (txn: typeof mockTransactions[number]) => txn.name && txn.email && txn.phone;

  const filteredTransactions = mockTransactions.filter((txn) => {
    const matchesSearch =
      txn.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.phone.includes(searchTerm);
    const matchesType = typeFilter === "All" || txn.type === typeFilter;
    const matchesDate = !dateFilter || txn.date === dateFilter;
    return isRegistered(txn) && matchesSearch && matchesType && matchesDate;
  });

  const filteredUsers = filteredTransactions;

  const dailyCounts = Array.from(
    mockTransactions.reduce((map, txn) => {
      if (!map.has(txn.date)) map.set(txn.date, 0);
      map.set(txn.date, map.get(txn.date)! + txn.count);
      return map;
    }, new Map<string, number>())
  ).map(([date, count]) => ({ date, count }));

  return (
    <div className="p-4 md:p-6 bg-white text-blue-900 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center md:text-left">
        Admin Dashboard
      </h1>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="mb-6 flex flex-wrap justify-center md:justify-start gap-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        {/* OVERVIEW */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Users with Plan */}
            <Card className="bg-blue-50 shadow-xl">
              <CardContent className="p-4 md:p-6">
                <h2 className="text-lg font-semibold">Users with Plan</h2>
                <p className="text-2xl font-bold mt-2">{paidUsers.length}</p>
                <ul className="text-sm mt-2">
                  {paidUsers.map((user, i) => (
                    <li key={i}>
                      {user.name} ({user.type}) - {user.phone}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Registered Without Plan */}
            <Card className="bg-blue-50 shadow-xl">
              <CardContent className="p-4 md:p-6">
                <h2 className="text-lg font-semibold">Registered Without Plan</h2>
                <p className="text-2xl font-bold mt-2">{unpaidUsers.length}</p>
                <ul className="text-sm mt-2">
                  {unpaidUsers.map((user, i) => (
                    <li key={i}>
                      {user.name} ({user.type}) - {user.phone}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Today's Images */}
            <Card className="bg-blue-50 shadow-xl">
              <CardContent className="p-4 md:p-6">
                <h2 className="text-lg font-semibold">Today&apos;s Images Uploaded</h2>
                <p className="text-2xl font-bold mt-2">{todayImageCount}</p>
              </CardContent>
            </Card>

            {/* Active Users */}
            <Card className="bg-blue-50 shadow-xl">
              <CardContent className="p-4 md:p-6">
                <h2 className="text-lg font-semibold">Active Users</h2>
                <p className="text-2xl font-bold mt-2">{activeUsers}</p>
              </CardContent>
            </Card>

            {/* Errors */}
            <Card className="bg-blue-50 shadow-xl">
              <CardContent className="p-4 md:p-6">
                <h2 className="text-lg font-semibold">Errors</h2>
                <p className="text-2xl font-bold mt-2 text-red-600">{errorCount}</p>
              </CardContent>
            </Card>

            {/* User Type Pie Chart */}
            <Card className="bg-blue-50 shadow-xl col-span-1 sm:col-span-2 lg:col-span-1">
              <CardContent className="p-4 md:p-6">
                <h2 className="text-lg font-semibold">User Types</h2>
                <div className="w-full h-56 mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={userStats}
                        dataKey="value"
                        nameKey="type"
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        label
                      >
                        {userStats.map((_, index) => (
                          <Cell key={index} fill={colors[index % colors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ACTIVITY */}
        <TabsContent value="activity">
          <div className="bg-blue-50 rounded-xl p-6 shadow-xl mt-4">
            <h2 className="text-xl font-semibold mb-4">Shrimp Count Activity</h2>
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyCounts}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#007BFF" barSize={40} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        {/* TRANSACTIONS */}
        <TabsContent value="transactions">
          <div className="bg-blue-50 rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <Input
                placeholder="Search by name/email/phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 rounded border text-sm"
              >
                <option value="All">All Types</option>
                <option value="Hatchery">Hatchery</option>
                <option value="Individual">Individual</option>
              </select>
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-blue-100 text-left">
                    <th className="py-2 px-3">Name</th>
                    <th className="py-2 px-3">Type</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3">Count</th>
                    <th className="py-2 px-3">Date</th>
                    <th className="py-2 px-3">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((txn) => (
                    <tr key={txn.id} className="border-b hover:bg-blue-100">
                      <td className="py-2 px-3">{txn.name}</td>
                      <td className="py-2 px-3">{txn.type}</td>
                      <td className="py-2 px-3">{txn.status}</td>
                      <td className="py-2 px-3">{txn.count}</td>
                      <td className="py-2 px-3">{txn.date}</td>
                      <td className="py-2 px-3">{txn.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* USERS */}
        <TabsContent value="users">
          <div className="bg-blue-50 rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-4">User Details</h2>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <Input
                placeholder="Search by name/email/phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 rounded border text-sm"
              >
                <option value="All">All Types</option>
                <option value="Hatchery">Hatchery</option>
                <option value="Individual">Individual</option>
              </select>
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-blue-100 text-left">
                    <th className="py-2 px-3">Name</th>
                    <th className="py-2 px-3">Email</th>
                    <th className="py-2 px-3">Phone</th>
                    <th className="py-2 px-3">Type</th>
                    <th className="py-2 px-3">Plan</th>
                    <th className="py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-blue-100">
                      <td className="py-2 px-3">{user.name}</td>
                      <td className="py-2 px-3">{user.email}</td>
                      <td className="py-2 px-3">{user.phone}</td>
                      <td className="py-2 px-3">{user.type}</td>
                      <td className="py-2 px-3">{user.plan || "—"}</td>
                      <td className="py-2 px-3">{user.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
