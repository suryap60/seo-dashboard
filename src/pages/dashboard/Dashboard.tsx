import { KPICard } from "@/components/common/KPICard";
import { TrafficChart } from "@/components/charts/TrafficChart";
import { KeywordChart } from "@/components/charts/KeywordChart";
import { BacklinkChart } from "@/components/charts/BacklinkChart";
import { KeywordTable } from "@/components/charts/KeywordTable";
import { PageWrapper } from "@/components/layout/PageWrapper";
import {
  kpiData,
  trafficData,
  keywordRankingData,
  backlinkData,
  keywordPerformanceData,
} from "@/data/dashboard";

export default function Dashboard() {
  return (
    <PageWrapper
      title="Dashboard"
      description="Welcome back! Here's your SEO performance overview."
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <KPICard key={kpi.id} data={kpi} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TrafficChart data={trafficData} />
        <KeywordChart data={keywordRankingData} />
      </div>

      {/* Backlink Chart */}
      <div className="mt-6">
        <BacklinkChart data={backlinkData} />
      </div>

      {/* Keywords Table */}
      <div className="mt-6">
        <KeywordTable data={keywordPerformanceData} />
      </div>
    </PageWrapper>
  );
}
