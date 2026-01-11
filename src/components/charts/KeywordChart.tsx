import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { KeywordRankingPoint } from "@/types/dashboard";

interface KeywordChartProps {
  data: KeywordRankingPoint[];
}

export function KeywordChart({ data }: KeywordChartProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 animate-fade-in">
      <h3 className="mb-6 text-lg font-semibold text-foreground">Keyword Rankings Trend</h3>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <XAxis
              dataKey="week"
              axisLine={true}
              tickLine={false}
              tick={{ fill: "hsl(0, 0%, 60%)", fontSize: 12 }}
              stroke="hsl(0, 0%, 30%)"
            />
            <YAxis
              axisLine={true}
              tickLine={false}
              tick={{ fill: "hsl(0, 0%, 60%)", fontSize: 12 }}
              width={35}
              stroke="hsl(0, 0%, 30%)"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0, 0%, 12%)",
                border: "1px solid hsl(0, 0%, 18%)",
                borderRadius: "8px",
                color: "hsl(0, 0%, 95%)",
              }}
              formatter={(value: number) => [`rankings : ${value}`, ""]}
              labelFormatter={(label) => label}
            />
            <Line
              type="linear"
              dataKey="rankings"
              stroke="hsl(0, 72%, 51%)"
              strokeWidth={2}
              dot={{ fill: "hsl(0, 0%, 100%)", stroke: "hsl(0, 72%, 51%)", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: "hsl(0, 72%, 51%)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
