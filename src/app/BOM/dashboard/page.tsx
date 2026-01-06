"use client"
import { TrendingUp } from "lucide-react"
import { Cell, Pie, PieChart } from "recharts"
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
import { useQuery } from "@tanstack/react-query"
import { Paginated } from "@/models/common/paginated"
import { useState } from "react"
import { PaginationState } from "@tanstack/react-table"
import { api } from "@/lib/api"

interface externalBi {
  order_type_id: string,
  order_type_total_count: number
}

interface BiOrderStatus {
  status: string,
  total: number
}

export default function Dashboardpage() {
  const PIE_COLORS = [
    '#2563eb', // blue
    '#16a34a', // green
    '#f59e0b', // amber
    '#ef4444', // red
    '#8b5cf6', // violet
  ]


  const { data, isLoading, isFetching, refetch } = useQuery<Paginated<externalBi>>(
    {
      queryKey: ['externalbi'],
      queryFn: async () =>
        await api
          .get<
            Paginated<externalBi>
          >(`externalbi/type`)
          .json(),
    }
  );

  const { data: orderStatus, isLoading: isLoadingStatus, isFetching: isFetchingStatuss } = useQuery<Paginated<BiOrderStatus>>(
    {
      queryKey: ['status'],
      queryFn: async () =>
        await api
          .get<
            Paginated<BiOrderStatus>
          >(`externalbi/status`)
          .json(),
    }
  );
  const statusMap = orderStatus?.data.reduce<Record<string, number>>(
    (acc, cur) => {
      acc[cur.status] = cur.total
      return acc
    },
    {}
  ) ?? {}


  const chartConfig = {
    visitors: {
      label: 'Collection 1',
    },
    chrome: {
      label: 'Collection 1',
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
      <>
        <h3 className="mb-4 text-xl font-bold tracking-tight">
          สรุปยอดคำสั่งซื้อ
        </h3>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          <div className="rounded-2xl bg-green-50 p-5 shadow-sm">
            <p className="text-sm font-medium text-green-700">จัดส่งแล้ว</p>
            <p className="mt-2 text-5xl font-extrabold text-green-700">
              {statusMap["Completed"] ?? 0}
            </p>
            <p className="mt-1 text-sm text-green-600">ออเดอร์</p>
          </div>

          <div className="rounded-2xl bg-yellow-50 p-5 shadow-sm">
            <p className="text-sm font-medium text-yellow-700">
              รอชำระเงิน
            </p>
            <p className="mt-2 text-5xl font-extrabold text-yellow-600">
              {statusMap["Pending"] ?? 0}
            </p>
            <p className="mt-1 text-sm text-yellow-600">ออเดอร์</p>
          </div>


          <div className="rounded-2xl bg-blue-100 p-5 shadow-sm">
            <p className="text-sm font-medium text-blue-600">
              รอแอดมินตรวจสอบ
            </p>
            <p className="mt-2 text-5xl font-extrabold text-blue-600">
              {statusMap["Verifying"] ?? 0}
            </p>
            <p className="mt-1 text-sm text-blue-600">ออเดอร์</p>
          </div>

          <div className="rounded-2xl bg-red-100 p-5 shadow-sm">
            <p className="text-sm font-medium text-red-700">ยกเลิก</p>
            <p className="mt-2 text-5xl font-extrabold text-red-700">
              {statusMap["Rejected"] ?? 0}
            </p>
            <p className="mt-1 text-sm text-red-700">ออเดอร์</p>
          </div>

          <div className="rounded-2xl bg-gray-900 p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-300">ทั้งหมด</p>
            <p className="mt-2 text-5xl font-extrabold text-white">
              {(statusMap["Completed"] ?? 0) +
                (statusMap["Pending"] ?? 0) +
                (statusMap["Verifying"] ?? 0) + 
                (statusMap["Rejected"] ?? 0)}
            </p>
            <p className="mt-1 text-sm text-gray-300">ออเดอร์</p>
          </div>
        </div>


        {/* Chart */}
        <Card className="mt-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">
              สัดส่วนประเภทคำสั่งซื้อ
            </CardTitle>
            <CardDescription>
              แสดงจำนวนออเดอร์ตามประเภท
            </CardDescription>
          </CardHeader>

          <CardContent className="flex justify-center">
            <ChartContainer
              config={chartConfig}
              className="aspect-square h-80"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Pie
                  data={data?.data}
                  dataKey="total"
                  nameKey="order_type_name"
                  innerRadius={70}
                  outerRadius={110}
                  stroke="none"
                >
                  {data?.data?.map((_, index) => (
                    <Cell
                      key={index}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>

          <CardFooter className="flex flex-col gap-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 font-medium text-foreground">
              แนวโน้มเพิ่มขึ้น 5.2% เดือนนี้
              <TrendingUp className="h-4 w-4" />
            </div>
            <span>อ้างอิงข้อมูล 6 เดือนล่าสุด</span>
            
          </CardFooter>
        </Card>
      </>
    </PageCard>

  );
}
