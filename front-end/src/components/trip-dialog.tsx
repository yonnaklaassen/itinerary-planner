import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { PageBox, PageGrid } from './page-container';
import './trip-dialog.css';
import { useTheme } from "../themes/theme-context";
import CustomDateRangePicker from "./date-range-picker";
import { Dayjs } from "dayjs";
import LocationInput from "./location-input";
import { Libraries, LoadScript, useLoadScript } from "@react-google-maps/api";

interface TripDialogProps {
    onClose: () => void;
}

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "";
const GOOGLE_MAPS_LIBRARIES = ["places"] as Libraries;

export default function TripDialog({ onClose }: TripDialogProps) {
    const { theme } = useTheme();
    const [selectedTrip, setSelectedTrip] = useState<string | null>(null);
    const tripOptions = [
        { type: "solo", title: "Solo", description: "Go on a solo adventure, explore at your own pace." },
        { type: "group", title: "Group", description: "Plan a trip with friends or family." },
    ];
    const [step, setStep] = useState<number>(0);
    const [startingDate, setStartDate] = useState<Dayjs | null>(null);
    const [endingDate, setEndDate] = useState<Dayjs | null>(null);

    const [city, setCity] = useState<string | null>(null);
    const [country, setCountry] = useState<string | null>(null);
    const [tripName, setTripName] = useState<string>("");

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        libraries: GOOGLE_MAPS_LIBRARIES,
    });

    const handleTripNameChange = (e: ChangeEvent<HTMLInputElement>) =>
        setTripName(e.target.value);

    const handleDateRangeChange = (dates: { startDate: Dayjs | null; endDate: Dayjs | null }) => {
        setStartDate(dates.startDate);
        setEndDate(dates.endDate);
    };


    const handleBack = () => {
        if (step === 0) {
            onClose();
        } else {
            setStep(prev => prev - 1);
        }
    };

    const handleNext = () => setStep(prev => prev + 1);

    const handleSkipDates = () => {
        handleNext()
    }

    const isNextDisabled = () => {
        if (step === 0) return tripName.trim() === "";
        if (step === 1) return !city || !country;
        if (step === 2) return !startingDate && !endingDate;
        return false;
    };

    return (
        <div className="trip-dialog">
            {/* Step 1: Insert trip name. */}
            {step === 0 && (
                <PageBox>
                    <Typography variant='h3' component="h3">Insert trip name:</Typography>
                    <TextField
                        name="trip-name"
                        required
                        id="trip-name"
                        label="Trip name"
                        autoFocus
                        value={tripName}
                        autoComplete="off"
                        onChange={handleTripNameChange}
                        sx={{
                            '& .MuiInputBase-input': {
                                color: theme.textColor,
                            },
                            '& .MuiInputLabel-root': {
                                color: theme.textColor,
                            }
                        }}
                    />
                </PageBox>
            )}
            {step === 1 && (
                <PageBox>
                    {!isLoaded ? (
                        <div>Loading Google Maps...</div>
                    ) : loadError ? (
                        <div>Error loading Google Maps</div>
                    ) : (
                        <>
                            <Typography variant="h3" component="h3">
                                Insert your destination:
                            </Typography>
                            <LocationInput label="Destination" value={country} onChange={setCountry} />
                        </>
                    )}
                </PageBox>
            )}
            {
                step === 2 && (
                    <PageBox>
                        <Typography variant='h3' component="h3">Select the trip duration, or skip for now:</Typography>
                        <PageGrid container>
                            <CustomDateRangePicker onChange={handleDateRangeChange} />
                            {/* {
                            tripOptions.map(({ type, title, description }) => (
                                <PageGrid lg={12} md={12} key={type}>
                                    <Card className="trip-card"
                                        onClick={() => handleSelectTrip(type)}
                                        sx={{
                                            border: selectedTrip === type ? "4px solid var(--color-secondary)" : "1px solid var(--white)",
                                            "&:hover": selectedTrip !== type ? {
                                                outline: "3px solid var(--color-primary)",
                                                outlineOffset: "-3px"
                                            } : {},
                                        }}
                                    >
                                        <CardContent>
                                            <Typography variant='h4' component="h4">{title}</Typography>
                                            <Typography variant='body2'>{description}</Typography>
                                        </CardContent>
                                    </Card>
                                </PageGrid>
                            ))} */}
                        </PageGrid>
                    </PageBox>
                )}
            {/* Step 3: Next options for selected trip. */}
            {
                step === 3 &&

                <Typography variant="h3" component="h3">Next options for <span className='highlight'>{selectedTrip} </span> trip:</Typography>

            }

            <PageBox sx={{ display: 'flex', flexDirection: 'row' }}>
                {/* Back button. */}
                <Button variant="contained" onClick={handleBack}>
                    Back
                </Button>
                {/* Skip button. */}
                {
                    (step === 1 || step === 2) &&
                    <Button variant="contained" onClick={handleSkipDates} sx={{
                        opacity: 0.6,
                        '&:hover': {
                            opacity: 1,
                        },
                    }} >
                        Skip for now
                    </Button>
                }
                {/* Next button. */}
                <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={isNextDisabled()}>
                    Next
                </Button>
            </PageBox>
        </div >
    );
}
