import type { KPIData, TrafficDataPoint, KeywordRankingPoint, BacklinkDataPoint, KeywordPerformance } from "@/types/dashboard";

export const kpiData: KPIData[] = [
  {
    id: "organic-traffic",
    title: "Organic Traffic",
    value: "24,582",
    change: "12.5% vs last month",
    changeType: "positive",
    icon: "BarChart3",
  },
  {
    id: "keywords-ranking",
    title: "Keywords Ranking",
    value: "1,247",
    change: "8.2% increase",
    changeType: "positive",
    icon: "TrendingUp",
  },
  {
    id: "total-backlinks",
    title: "Total Backlinks",
    value: "8,453",
    change: "156 this week",
    changeType: "positive",
    icon: "Link",
  },
  {
    id: "domain-authority",
    title: "Domain Authority",
    value: "68/100",
    change: "-2 points",
    changeType: "negative",
    icon: "Award",
  },
];

export const trafficData: TrafficDataPoint[] = [
  { month: "Jan", organic: 2400, direct: 1400 },
  { month: "Feb", organic: 3200, direct: 1600 },
  { month: "Mar", organic: 8500, direct: 3200 },
  { month: "Apr", organic: 6800, direct: 2800 },
  { month: "May", organic: 4200, direct: 2100 },
  { month: "Jun", organic: 3100, direct: 1800 },
  { month: "Jul", organic: 2800, direct: 1500 },
];

export const keywordRankingData: KeywordRankingPoint[] = [
  { week: "Week 1", rankings: 118 },
  { week: "Week 2", rankings: 132 },
  { week: "Week 3", rankings: 145 },
  { week: "Week 4", rankings: 168 },
];

export const backlinkData: BacklinkDataPoint[] = [
  { day: "Mon", count: 12 },
  { day: "Tue", count: 18 },
  { day: "Wed", count: 15 },
  { day: "Thu", count: 24 },
  { day: "Fri", count: 21 },
  { day: "Sat", count: 18 },
  { day: "Sun", count: 17 },
];

export const keywordPerformanceData: KeywordPerformance[] = [
  { keyword: "digital marketing", position: 3, change: 2, traffic: 1250, difficulty: "high" },
  { keyword: "seo tools", position: 5, change: -1, traffic: 890, difficulty: "medium" },
  { keyword: "content strategy", position: 8, change: 3, traffic: 720, difficulty: "medium" },
  { keyword: "link building", position: 12, change: null, traffic: 580, difficulty: "low" },
  { keyword: "keyword research", position: 15, change: 5, traffic: 450, difficulty: "high" },
  { keyword: "technical seo", position: 7, change: 1, traffic: 670, difficulty: "medium" },
];
