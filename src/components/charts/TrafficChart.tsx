import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { TrafficDataPoint } from "@/types/dashboard";

interface TrafficChartProps {
  data: TrafficDataPoint[];
}

export function TrafficChart({ data }: TrafficChartProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 animate-fade-in">
      <h3 className="mb-6 text-lg font-semibold text-foreground">Traffic Overview</h3>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorDirect" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              axisLine={true}
              tickLine={false}
              tick={{ fill: "hsl(0, 0%, 60%)", fontSize: 12 }}
              stroke="hsl(0, 0%, 30%)"
            />
            <YAxis
              axisLine={true}
              tickLine={false}
              tick={{ fill: "hsl(0, 0%, 60%)", fontSize: 12 }}
              width={45}
              stroke="hsl(0, 0%, 30%)"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0, 0%, 12%)",
                border: "1px solid hsl(0, 0%, 18%)",
                borderRadius: "8px",
                color: "hsl(0, 0%, 95%)",
              }}
            />
            <Area
              type="monotone"
              dataKey="organic"
              stroke="hsl(0, 72%, 51%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorOrganic)"
            />
            <Area
              type="monotone"
              dataKey="direct"
              stroke="hsl(0, 72%, 65%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorDirect)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
