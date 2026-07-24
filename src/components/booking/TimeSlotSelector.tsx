"use client";

import { useState, useMemo } from "react";
import { format, addMinutes, isBefore, isAfter, startOfDay, addHours } from "date-fns";

// The project typings file does not export a Database type in all setups.
// Fall back to a loose any type to avoid import errors; narrow if you have a
// concrete Database type to use.
type Database = any;

type BusinessHour = Database["public"]["Tables"]["business_hours"]["Row"];
type BlockedDate = Database["public"]["Tables"]["blocked_dates"]["Row"];
type Appointment = Database["public"]["Tables"]["appointments"]["Row"];
type BusinessSettings = Database["public"]["Tables"]["business_settings"]["Row"];

interface TimeSlotSelectorProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  serviceDuration: number;
  businessHours: BusinessHour[];
  blockedDates: BlockedDate[];
  existingAppointments: Appointment[];
  settings: BusinessSettings | null;
}

export default function TimeSlotSelector({
  selectedDate,
  onSelectDate,
  selectedTime,
  onSelectTime,
  serviceDuration,
  businessHours,
  blockedDates,
  existingAppointments,
  settings,
}: TimeSlotSelectorProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const slotInterval = settings?.slot_interval_minutes || 30;
  const bookingNotice = settings?.booking_notice_hours || 24;

  // Calendar Logic
  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
    
    return days;
  };

  const isDateBlocked = (date: Date) => {
    // Check if it's before today
    const today = startOfDay(new Date());
    if (isBefore(date, today)) return true;

    // Check booking notice (if today or tomorrow)
    const noticeDate = addHours(new Date(), bookingNotice);
    if (isBefore(addHours(date, 23), noticeDate)) return true; // simplified check

    // Check blocked dates
    const dateStr = format(date, "yyyy-MM-dd");
    if (blockedDates.some(b => b.blocked_date === dateStr)) return true;

    // Check business hours
    const dayOfWeek = date.getDay();
    const hours = businessHours.find(h => h.weekday === dayOfWeek);
    if (!hours || !hours.is_open) return true;

    return false;
  };

  const availableSlots = useMemo(() => {
    if (!selectedDate) return [];

    const dayOfWeek = selectedDate.getDay();
    const hours = businessHours.find(h => h.weekday === dayOfWeek);
    
    if (!hours || !hours.is_open) return [];

    const slots = [];
    let currentTime = new Date(selectedDate);
    const [startHour, startMin] = hours.start_time.split(':').map(Number);
    currentTime.setHours(startHour, startMin, 0, 0);

    const endTime = new Date(selectedDate);
    const [endHour, endMin] = hours.end_time.split(':').map(Number);
    endTime.setHours(endHour, endMin, 0, 0);

    const selectedDateStr = format(selectedDate, "yyyy-MM-dd");
    const daysAppointments = existingAppointments.filter(
      app => app.appointment_date === selectedDateStr && app.status !== 'cancelled'
    );

    const now = new Date();
    const noticeTime = addHours(now, bookingNotice);

    while (isBefore(currentTime, endTime)) {
      const slotEnd = addMinutes(currentTime, serviceDuration);
      
      // Stop if slot goes past business hours
      if (isAfter(slotEnd, endTime)) break;

      // Check booking notice
      if (isBefore(currentTime, noticeTime)) {
        currentTime = addMinutes(currentTime, slotInterval);
        continue;
      }

      // Check overlapping
      const isOverlapping = daysAppointments.some(app => {
        const appStart = new Date(selectedDate);
        const [aStartH, aStartM] = app.start_time.split(':').map(Number);
        appStart.setHours(aStartH, aStartM, 0, 0);

        const appEnd = new Date(selectedDate);
        const [aEndH, aEndM] = app.end_time.split(':').map(Number);
        appEnd.setHours(aEndH, aEndM, 0, 0);

        // Overlap logic: new_start < existing_end AND new_end > existing_start
        return isBefore(currentTime, appEnd) && isAfter(slotEnd, appStart);
      });

      if (!isOverlapping) {
        slots.push({
          start: new Date(currentTime),
          end: new Date(slotEnd),
          label: format(currentTime, "h:mm a")
        });
      }

      currentTime = addMinutes(currentTime, slotInterval);
    }

    return slots;
  }, [selectedDate, businessHours, existingAppointments, serviceDuration, slotInterval, bookingNotice]);

  const nextMonth = () => setCurrentMonth(addMinutes(currentMonth, 30 * 24 * 60)); // rough 1 month
  const prevMonth = () => setCurrentMonth(addMinutes(currentMonth, -30 * 24 * 60));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Calendar */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <button 
            type="button" 
            onClick={prevMonth}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <div className="font-['Manrope'] font-bold text-lg text-slate-900">
            {format(currentMonth, "MMMM yyyy")}
          </div>
          <button 
            type="button" 
            onClick={nextMonth}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
            <div key={d} className="font-['Work_Sans'] text-xs font-semibold text-slate-400 py-2">
              {d}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {generateCalendar().map((date, i) => {
            if (!date) return <div key={i} className="p-2"></div>;
            
            const isBlocked = isDateBlocked(date);
            const isSelected = selectedDate && format(selectedDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd");
            
            return (
              <button
                key={i}
                type="button"
                disabled={isBlocked}
                onClick={() => {
                  onSelectDate(date);
                  onSelectTime(""); // Reset time when date changes
                }}
                className={`
                  aspect-square rounded-full flex items-center justify-center text-sm font-['Work_Sans'] transition-all
                  ${isSelected ? 'bg-brand-green text-white font-bold shadow-md transform scale-105' : ''}
                  ${!isSelected && !isBlocked ? 'hover:bg-brand-green/10 text-slate-700 hover:text-brand-green' : ''}
                  ${isBlocked ? 'text-slate-300 cursor-not-allowed' : ''}
                `}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slots */}
      <div className="border-t md:border-t-0 md:border-l border-slate-200 pt-6 md:pt-0 md:pl-8">
        <h3 className="font-['Manrope'] font-bold text-lg text-slate-900 mb-4">
          {selectedDate ? format(selectedDate, "EEEE, MMMM d") : "Select a date"}
        </h3>
        
        {selectedDate ? (
          availableSlots.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {availableSlots.map((slot, i) => {
                const timeStr = format(slot.start, "HH:mm:ss");
                const isSelected = selectedTime === timeStr;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => onSelectTime(timeStr)}
                    className={`
                      py-3 px-4 rounded-xl font-['Work_Sans'] text-sm font-semibold transition-all border
                      ${isSelected 
                        ? 'bg-brand-green border-brand-green text-white shadow-[0_4px_14px_rgba(14,118,59,0.25)]' 
                        : 'bg-white border-slate-200 text-slate-700 hover:border-brand-green hover:text-brand-green hover:bg-brand-green/5'
                      }
                    `}
                  >
                    {slot.label}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="h-[200px] flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-slate-300 text-4xl mb-2">event_busy</span>
              <p className="font-['Work_Sans'] text-slate-500 text-sm">No available times on this date.</p>
            </div>
          )
        ) : (
          <div className="h-[200px] flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-slate-200 text-4xl mb-2">touch_app</span>
            <p className="font-['Work_Sans'] text-slate-400 text-sm">Select a date on the calendar<br/>to see available times.</p>
          </div>
        )}
      </div>
    </div>
  );
}
