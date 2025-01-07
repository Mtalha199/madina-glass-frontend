import React, { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  addDays,
  isSameMonth,
  isToday,
} from "date-fns";
import { ChevronLeft, ChevronRight, Phone, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import BreadCrumbCommon from "@/Commons/BreadCrumbCommon";
import { MODULENAME, SCREEN_PATH } from "@/Constant";
import ContactSpamHistory from "./ContantSpanHistory";
const events = [
  { date: "2024-11-05", time: "19:00", type: "available" },
  { date: "2024-11-06", time: "19:00", type: "available" },
  { date: "2024-11-07", time: "19:00", type: "available" },
  { date: "2024-11-08", time: "19:00", type: "available" },
  { date: "2024-11-09", time: "18:00", type: "booked" },
  { date: "2024-11-09", time: "19:00", type: "booked" },
  { date: "2024-11-09", time: "20:00", type: "booked" },
  { date: "2024-11-09", time: "21:00", type: "booked" },
  { date: "2024-11-10", time: "18:00", type: "booked" },
];

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 10, 1)); // November 2024
  const [sheetData, setSheetData] = useState({ date: "", events: [] });
  const [sheetContent, setSheetContent] = useState(null); // State to store content for Sheet

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfMonth(monthEnd);

  const dateFormat = "d";
  const rows = [];

  let days = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, dateFormat);
      const cloneDay = day;

      const dayEvents = events.filter(
        (event) => event.date === format(cloneDay, "yyyy-MM-dd")
      );
      const bookedEvents = dayEvents.filter((event) => event.type === "booked");
      const hasAvailableEvent = dayEvents.some(
        (event) => event.type === "available"
      );

      days.push(
        <div
          key={day.toString()}
          className={`min-h-[100px] p-2 border ${
            !isSameMonth(day, currentMonth) ? "bg-muted" : ""
          } ${hasAvailableEvent ? "bg-green-100" : ""} ${
            isToday(day) ? "bg-blue-100" : ""
          }`}
        >
          <div className="font-semibold flex justify-between items-center">
            {formattedDate}
            {hasAvailableEvent && (
              <CheckCircle className="text-green-500 w-4 h-4" />
            )}
          </div>
          {bookedEvents.slice(0, 2).map((event, idx) => (
            <div key={idx} className={`text-xs p-1 mt-1 rounded bg-red-200`}>
              {event.time}
            </div>
          ))}
          {bookedEvents.length > 2 && (
            <Sheet>
              <SheetTrigger asChild>
                <div
                  className="text-xs text-primary cursor-pointer mt-2"
                  onClick={() =>
                    setSheetData({
                      date: format(cloneDay, "yyyy-MM-dd"),
                      events: bookedEvents,
                    })
                  }
                >
                  +{bookedEvents.length - 2} more
                </div>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>+1 (813) 995 8659</SheetTitle>
                  <SheetTitle>
                    {" "}
                    <p className="text-gray-500 text-sm">November 15, 2024</p>
                    <hr />
                  </SheetTitle>
                </SheetHeader>
                <ContactSpamHistory />
              </SheetContent>
            </Sheet>
          )}
          {isSameMonth(day, currentMonth) &&
            parseInt(formattedDate) >= 11 &&
            parseInt(formattedDate) <= 16 && (
              <div className="text-xs text-gray-500 mt-10">Not Scheduled</div>
            )}
          {isSameMonth(day, currentMonth) && parseInt(formattedDate) > 16 && (
            <Sheet>
              <SheetTrigger asChild>
                <div className="text-xs text-primary mt-10 underline">
                  View Schedule
                </div>
              </SheetTrigger>
              <SheetContent className="flex flex-col h-full">
              <SheetHeader>
                  <SheetTitle>+1 (813) 995 8659</SheetTitle>
                  <SheetTitle>
                    {" "}
                    <p className="text-gray-500 text-sm">November 15, 2024</p>
                    <hr />
                  </SheetTitle>
                </SheetHeader>
                <div className="flex-grow">
                  <div className="mb-3">
                  <p className="text-gray-500 mt-2">Check</p>
                  <h2>Every 2 hours</h2>  
                  </div>
                  <div className="mb-3">
                  <p className="text-gray-500">Starting at</p>
                  <h2>01:00</h2>  
                  </div>
                  <div className="mb-3">
                  <p className="text-gray-500">Ending at</p>
                  <h2>13:00</h2>  
                  </div>
                  <div className="mb-3">
                  <p className="text-gray-500">Checkers</p>
                  <h2>Every 2 hours</h2>  
                  </div>
                </div>
                <div className="mt-auto flex ">
            <Button variant="outline">Edit Schedule</Button>
          </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div key={day.toString()} className="grid grid-cols-7 ">
        {days}
      </div>
    );
    days = [];
  }

  return (
    <>
      <BreadCrumbCommon
        ITEMS={[
          { label: "DNC Scrubber", href: SCREEN_PATH.DNC_SCRUBBER },
          { label: MODULENAME.DNC_SCRUBBER },
        ]}
        SHOW_BUTTONS={false}
      />
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Phone className="w-5 h-5 mr-2" />
          <span className="font-semibold">+1 (813) 995 8659</span>
        </div>
        <Button variant="outline">Reschedule</Button>
      </div>
      <div className=" bg-muted border flex items-center justify-between p-2">
        <h2 className="text-xl font-bold">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <div className="flex gap-2">
          <Button
            className="h-6 w-6 rounded-full"
            variant="outline"
            size="sm"
            onClick={prevMonth}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            className="h-6 w-6 rounded-full"
            variant="outline"
            size="sm"
            onClick={nextMonth}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 bg-muted border">
        {[
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ].map((day) => (
          <div key={day} className="text-center font-semibold p-2">
            {day}
          </div>
        ))}
      </div>
      {rows}
    </>
  );
}
