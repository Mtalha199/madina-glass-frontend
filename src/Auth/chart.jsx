"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
// import { Card, CardHeader, CardTitle, CardContent, CardFooter, Button } from "@/components/ui";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const chartData = [
  { date: "16 June", clean: 30, robboKiller: 20, scout: 15, tMobile: 10 },
  { date: "17 June", clean: 40, robboKiller: 25, scout: 10, tMobile: 15 },
  { date: "18 June", clean: 35, robboKiller: 22, scout: 12, tMobile: 18 },
  { date: "19 June", clean: 50, robboKiller: 18, scout: 8, tMobile: 14 },
  { date: "20 June", clean: 45, robboKiller: 20, scout: 10, tMobile: 15 },
  { date: "21 June", clean: 55, robboKiller: 15, scout: 5, tMobile: 25 },
  { date: "22 June", clean: 60, robboKiller: 30, scout: 20, tMobile: 10 },
];

export function MultiColorStackedBarChart() {
  return (
    <Card>
      {/* <CardHeader>
        <CardTitle>Contact Statistics</CardTitle>
      </CardHeader> */}
      {/* <CardContent> */}

      {/* </CardContent> */}
      {/* <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline">Reschedule</Button>
        <Button variant="primary">Check Now</Button>
      </CardFooter> */}
    </Card>
  );
}

export default MultiColorStackedBarChart;
