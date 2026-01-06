"use client"
import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import PageCard from "@/components/PageCard";


export default function Dashboardpage() {
  const chartData = [
    { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
    { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
    { browser: 'firefox', visitors: 187, fill: 'var(--color-firefox)' },
    { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
    { browser: 'other', visitors: 90, fill: 'var(--color-other)' },
  ];

  const chartConfig = {
    visitors: {
      label: 'Visitors',
    },
    chrome: {
      label: 'Chrome',
      color: 'var(--chart-1)',
    },
    safari: {
      label: 'Safari',
      color: 'var(--chart-2)',
    },
    firefox: {
      label: 'Firefox',
      color: 'var(--chart-3)',
    },
    edge: {
      label: 'Edge',
      color: 'var(--chart-4)',
    },
    other: {
      label: 'Other',
      color: 'var(--chart-5)',
    },
  } satisfies ChartConfig;
  return (
    <PageCard title="แดชบอร์ด">
      <h3 className="mb-2 text-xl font-bold">สรุปยอดคำสั่งซื้อ</h3>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl bg-green-100 p-4 text-green-700">
          <div className="text-center">
            <p className="text-6xl font-bold"> 2 </p>
            <p className="text-2xl font-bold">ออเดอร์</p>
            <p>จัดส่งวอลเปเปอร์แล้ว</p>
          </div>
        </div>

        <div className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl bg-yellow-400 p-4 text-yellow-200">
          <div className="text-center">
            <p className="text-6xl font-bold"> 3 </p>
            <p className="text-2xl font-bold">ออเดอร์</p>
            <p>รอแอดมินตรวจสอบ</p>
          </div>
        </div>

        <div className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl bg-red-200 p-4 text-red-600">
          <div className="text-center">
            <p className="text-6xl font-bold"> 0 </p>
            <p className="text-2xl font-bold">ออเดอร์</p>
            <p>ยกเลิกออเดอร์</p>
          </div>
        </div>

        <div className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl bg-gray-600 p-4 text-gray-300">
          <div className="text-center">
            <p className="text-6xl font-bold"> 5 </p>
            <p className="text-2xl font-bold">ออเดอร์</p>
            <p>ทำนวนทั้งหมด</p>
          </div>
        </div>
      </div>

      <Card className="flex flex-col mt-3" >
        <CardHeader className="items-center pb-0">
          <CardTitle>Pie Chart - Separator None</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent className="flex-2 pb-0 inline">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square h-150"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                stroke="0"
              />
            </PieChart>
            
          </ChartContainer>

           <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square h-150"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                stroke="0"
              />
            </PieChart>
            
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 leading-none font-medium">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </PageCard>
  );
}
