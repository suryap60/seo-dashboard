export interface KPIData {
  id: string;
  title: string;
  value: string | number;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: string;
}

export interface TrafficDataPoint {
  month: string;
  organic: number;
  direct: number;
}

export interface KeywordRankingPoint {
  week: string;
  rankings: number;
}

export interface BacklinkDataPoint {
  day: string;
  count: number;
}

export interface KeywordPerformance {
  keyword: string;
  position: number;
  change: number | null;
  traffic: number;
  difficulty: "low" | "medium" | "high";
}
