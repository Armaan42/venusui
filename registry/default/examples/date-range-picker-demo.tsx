import { DateRangePicker } from "@/registry/default/ui/date-range-picker"

export default function DateRangePickerDemo() {
  return (
    <div className="flex min-h-[26rem] w-full justify-center">
      <DateRangePicker label="Report period" locale="en-GB" />
    </div>
  )
}
