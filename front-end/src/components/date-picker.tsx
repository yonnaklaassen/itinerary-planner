import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider, PickersDay } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useTheme } from "src/themes/theme-context";
import { Dayjs } from "dayjs";
import { PageBox } from "./page-container";

interface CustomDatePickerProps {
    label?: string;
    value?: Dayjs | null;
    onChange?: (value: Dayjs | null) => void;
    minDate?: Dayjs;
    maxDate?: Dayjs;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
    label = "",
    value,
    onChange,
    minDate,
    maxDate,
}) => {
    const { theme } = useTheme();
    const [internalValue, setInternalValue] = useState<Dayjs | null>(value ?? null);

    const handleChange = (newValue: Dayjs | null) => {
        setInternalValue(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <PageBox >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label={label}
                    value={internalValue}
                    minDate={minDate}
                    maxDate={maxDate}
                    onChange={handleChange}
                    views={['day', 'month', 'year']}
                    slots={{
                        textField: TextField,
                    }}
                    slotProps={{
                        openPickerButton: {
                            sx: {
                                color: theme.textColor,
                            },
                        },
                        textField: {
                            sx: {
                                '& .MuiInputBase-input': {
                                    color: theme.textColor,
                                },
                                '& input.MuiInputBase-input:empty::before': {
                                    content: 'attr(placeholder)',
                                    color: theme.textColor,
                                },
                                // Label color when field is filled or shrunk
                                '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                                    color: theme.textColor,
                                },

                                // Optional: Label color when focused
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: 'var(--color-accent)',
                                },
                            },
                        },
                        desktopPaper: {
                            sx: {
                                backgroundColor: theme.backgroundColor,
                                color: theme.textColor,

                                // Day numbers
                                '& .MuiPickersDay-root': {
                                    color: theme.textColor,
                                    '&:hover': {
                                        backgroundColor: 'var(--color-accent)',
                                    },
                                },

                                // Select day
                                '& .MuiPickersDay-root.Mui-selected': {
                                    backgroundColor: 'var(--color-primary)',
                                    '&:hover': {
                                        backgroundColor: 'var(--color-accent)',
                                    },
                                },

                                // Today (day view)
                                '& .MuiPickersDay-root.MuiPickersDay-today': { border: '1px solid var(--color-secondary)', },

                                // Month buttons
                                '& .MuiPickersMonth-monthButton': {
                                    color: theme.textColor,
                                    '&:hover': {
                                        backgroundColor: 'var(--color-accent)',
                                    },
                                    '&.Mui-selected': {
                                        backgroundColor: 'var(--color-primary)',
                                        '&:hover': {
                                            backgroundColor: 'var(--color-accent)',
                                        },
                                    },
                                },

                                // Year buttons
                                '& .MuiPickersYear-yearButton': {
                                    color: theme.textColor,
                                    '&:hover': {
                                        backgroundColor: 'var(--color-accent)',
                                    },
                                    '&.Mui-selected': {
                                        backgroundColor: 'var(--color-primary)',
                                        '&:hover': {
                                            backgroundColor: 'var(--color-accent)',
                                        },
                                    },
                                },

                                //  Weekday labels
                                '& .MuiTypography-root': { color: theme.textColor },

                                // Month/Year labels
                                '& .MuiPickersCalendarHeader-label': { color: theme.textColor },

                                // Month arrows (prev/next)
                                '& .MuiPickersArrowSwitcher-root button': { color: theme.textColor },

                                // Month/year switch button (the down arrow)
                                '& .MuiPickersCalendarHeader-switchViewButton': {
                                    color: theme.textColor,
                                },

                                // Disabled days (datview)
                                '& .MuiPickersDay-root.Mui-disabled': {
                                    color: 'var(--color-error)',
                                    opacity: 0.5,
                                    pointerEvents: 'none',
                                },

                                // Disabled months (month view)
                                '& .MuiPickersMonth-monthButton.Mui-disabled': {
                                    color: 'var(--color-error)',
                                    opacity: 0.5,
                                    pointerEvents: 'none',
                                },

                                // Disabled years (year view)
                                '& .MuiPickersYear-yearButton.Mui-disabled': {
                                    color: 'var(--color-error)',
                                    opacity: 0.5,
                                    pointerEvents: 'none',
                                },
                            },

                        },

                    }}
                />
            </LocalizationProvider>
        </PageBox>
    );
};

export default CustomDatePicker;
