import React, { useState } from "react";
import { Box, IconButton, styled, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider, PickersDay } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useTheme } from "src/themes/theme-context";

const CustomDatePicker = () => {
    const { theme } = useTheme();
    return (
        <Box display="flex" gap={2} alignItems="center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label=""
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
                            },
                        },
                        desktopPaper: {
                            sx: {
                                backgroundColor: theme.backgroundColor,
                                color: theme.textColor,
                                // Day numbers
                                '& .MuiPickersDay-root': { color: theme.textColor },
                                '& .MuiPickersDay-root.Mui-selected': {
                                    backgroundColor: 'var(--color-primary)',
                                    color: theme.textColor,
                                },
                                '& .MuiPickersDay-root.MuiPickersDay-today': {
                                    borderColor: 'var(--color-primary)',
                                    color: theme.textColor,
                                },

                                // Month/Year labels
                                '& .MuiTypography-root': { color: theme.textColor },

                                // Weekday labels
                                '& .MuiPickersCalendarHeader-label': { color: theme.textColor },

                                // Month arrows
                                '& .MuiPickersArrowSwitcher-root button': { color: theme.textColor },

                                // Year arrows
                                '& .MuiPickersYearHeader-root .MuiPickersArrowSwitcher-root button': {
                                    color: theme.textColor,
                                },
                            },
                        },
                    }}
                />
            </LocalizationProvider>
        </Box>
    );
};

export default CustomDatePicker;
