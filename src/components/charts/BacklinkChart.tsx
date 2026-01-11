import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { BacklinkDataPoint } from "@/types/dashboard";

interface BacklinkChartProps {
  data: BacklinkDataPoint[];
}

export function BacklinkChart({ data }: BacklinkChartProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 animate-fade-in">
      <h3 className="mb-6 text-lg font-semibold text-foreground">Backlinks This Week</h3>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <XAxis
              dataKey="day"
              axisLine={true}
              tickLine={false}
              tick={{ fill: "hsl(0, 0%, 60%)", fontSize: 12 }}
              stroke="hsl(0, 0%, 30%)"
            />
            <YAxis
              axisLine={true}
              tickLine={false}
              tick={{ fill: "hsl(0, 0%, 60%)", fontSize: 12 }}
              width={30}
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
            <Bar
              dataKey="count"
              fill="hsl(0, 72%, 51%)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
