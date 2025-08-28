import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { PageBox } from "./page-container";
import CustomDatePicker from "./date-picker";

interface CustomDateRangePickerProps {
    onChange?: (dates: { startDate: Dayjs | null; endDate: Dayjs | null }) => void;
}

export default function CustomDateRangePicker({ onChange }: CustomDateRangePickerProps) {
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);
    const today = dayjs().startOf("day");

    const handleStartChange = (newValue: Dayjs | null) => {
        setStartDate(newValue);
        if (endDate && newValue && endDate.isBefore(newValue, "day")) {
            setEndDate(null);
        }
        onChange?.({ startDate: newValue, endDate });
    };

    const handleEndChange = (newValue: Dayjs | null) => {
        setEndDate(newValue);
        onChange?.({ startDate, endDate: newValue });
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <PageBox>
                <CustomDatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={handleStartChange}
                    minDate={today}
                />
                <CustomDatePicker
                    label="End Date"
                    value={endDate}
                    onChange={handleEndChange}
                    minDate={startDate ?? today}
                />
            </PageBox>
        </LocalizationProvider>
    );
}
