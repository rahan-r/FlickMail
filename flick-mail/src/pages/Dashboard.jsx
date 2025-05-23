import React, { useState, useEffect } from "react";
import { UserGrowthChart } from "../components/AdminChart";
import { UserList } from "../components/AdminInfo";
import { StatsCards } from "../components/AdminStats";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Dashboard() {
  const [isVerified, setIsVerified] = useState(false);
  const [key, setKey] = useState("");

  const handleVerification = () => {
    if (key === "123") {
      setIsVerified(true);
    } else {
      alert("Invalid key");
    }
  };

  if (!isVerified) {
    return (
      <div className="min-h-screen bg-background p-8 flex items-center justify-center">
        <Card className="w-[350px] border-black">
          <CardHeader>
            <CardTitle>Admin</CardTitle>
            <CardDescription>Enter key to access dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  {/* <Label htmlFor="name">Key</Label> */}
                  <Input
                    id="name"
                    placeholder="Enter key"
                    value={key}
                    type="password"
                    onChange={(e) => setKey(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={handleVerification}>Get In</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>
        <StatsCards />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <UserList />
          </div>
          <div className="lg:col-span-5">
            <div className="grid gap-4"></div>
          </div>
        </div>
        <UserGrowthChart />
      </div>
    </div>
  );
}

export default Dashboard;
