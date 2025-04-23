// DatePicker.tsx
import * as React from "react"
import { format, getMonth, setMonth, setYear } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DatePickerProps {
  value?: Date | null
  onChange?: (date: Date | null) => void
  tabIndex?: number
  id?: string
  disabled?: boolean
  className?: string
}

export function DatePicker({ value, onChange, tabIndex, id, disabled, className }: DatePickerProps) {
  const date = value

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)

  const handleMonthChange = (month: string) => {
    const newDate = setMonth(date ?? new Date(), months.indexOf(month))
    onChange?.(newDate)
  }

  const handleYearChange = (year: string) => {
    const newDate = setYear(date ?? new Date(), parseInt(year))
    onChange?.(newDate)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal rounded-md",
            !date && "text-muted-foreground", className
          )}
          tabIndex={tabIndex}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a birthday</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex p-3 gap-x-2">
          <Select
            onValueChange={handleMonthChange}
            value={date ? months[getMonth(date)] : undefined}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              <SelectGroup>
                {months.map((month, index) => (
                  <SelectItem key={index} value={month}>{month}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            onValueChange={handleYearChange}
            value={date ? date.getFullYear().toString() : undefined}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              <SelectGroup>
                {years.map((year, index) => (
                  <SelectItem key={index} value={year.toString()}>{year}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Calendar
          id={id}
          mode="single"
          selected={date || undefined}
          onSelect={(d) => { onChange?.(d ?? null); console.log('date selected: ', d) }}
          initialFocus
          month={date ?? undefined}
          onMonthChange={(d) => onChange?.(d)}
        />
      </PopoverContent>
    </Popover>
  )
}
