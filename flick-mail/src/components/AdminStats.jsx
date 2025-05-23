import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  ArrowUpRight,
  Eye,
  MessageSquare,
  Clock,
  ShoppingCart,
  DollarSign,
  Activity,
} from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "1,847",
    change: "+12.5%",
    icon: Users,
  },
  {
    title: "Page Views",
    value: "32.4K",
    change: "+8.2%",
    icon: Eye,
  },
  {
    title: "Active Sessions",
    value: "423",
    change: "+5.7%",
    icon: ArrowUpRight,
  },
  {
    title: "Feedback",
    value: "182",
    change: "+14.3%",
    icon: MessageSquare,
  },
  {
    title: "Avg. Time",
    value: "4m 32s",
    change: "+2.1%",
    icon: Clock,
  },
  {
    title: "Sales",
    value: "$12.5K",
    change: "+18.2%",
    icon: ShoppingCart,
  },
  {
    title: "Revenue",
    value: "$48.2K",
    change: "+9.5%",
    icon: DollarSign,
  },
  {
    title: "Engagement",
    value: "67.8%",
    change: "+4.6%",
    icon: Activity,
  },
];

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">{stat.change}</span> from last
                month
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
