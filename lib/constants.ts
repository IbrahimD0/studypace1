import DailyGoal from "@/components/dashboard/DailyGoal";
import WeeklyOverview from "@/components/dashboard/WeeklyOverview";
import RecentTopics from "@/components/dashboard/RecentTopics";
import ProductivityStats from "@/components/dashboard/ProductivityStats";

export const weekDays: { id: number; name: string }[] = [
  { id: 1, name: "Mon" },
  { id: 2, name: "Tue" },
  { id: 3, name: "Wed" },
  { id: 4, name: "Thu" },
  { id: 5, name: "Fri" },
  { id: 6, name: "Sat" },
  { id: 7, name: "Sun" },
];

export const DashboardConent = [
  { id: 1, component: DailyGoal },
  { id: 2, component: WeeklyOverview },
  { id: 3, component: RecentTopics },
  { id: 4, component: ProductivityStats },
];
