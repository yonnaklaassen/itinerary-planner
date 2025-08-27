import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { PageBox, PageGrid } from './page-container';
import './trip-dialog.css';
import { useTheme } from "../themes/theme-context";

interface TripDialogProps {
    onClose: () => void;
}

export default function TripDialog({ onClose }: TripDialogProps) {
    const { theme } = useTheme();
    const [selectedTrip, setSelectedTrip] = useState<string | null>(null);
    const tripOptions = [
        { type: "solo", title: "Solo", description: "Go on a solo adventure, explore at your own pace." },
        { type: "group", title: "Group", description: "Plan a trip with friends or family." },
    ];
    const [step, setStep] = useState<number>(0);

    const [tripName, setTripName] = useState<string>("");

    const handleTripNameChange = (e: ChangeEvent<HTMLInputElement>) =>
        setTripName(e.target.value);

    const handleSelectTrip = (type: string) => {
        setSelectedTrip(type);
    };

    const handleBack = () => {
        if (step === 0) {
            onClose();
        } else {
            setStep(prev => prev - 1);
        }
    };

    const handleNext = () => setStep(prev => prev + 1);

    return (
        <div className="trip-dialog">
            {/* Step 1: Insert trip name. */}
            {step === 0 &&
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
            }
            {step === 1 &&
                <PageBox>
                    <Typography variant='h3' component="h3">Select the trip duration, or skip for now:</Typography>
                    <PageGrid container>
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
            }
            {/* Step 3: Next options for selected trip. */}
            {step === 2 &&

                <Typography variant="h3" component="h3">Next options for <span className='highlight'>{selectedTrip} </span> trip:</Typography>

            }

            <PageBox sx={{ display: 'flex', flexDirection: 'row' }}>
                {/* Back button. */}
                <Button variant="contained" onClick={handleBack}>
                    Back
                </Button>
                {/* Next button. */}
                <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={
                        (step === 0 && tripName.trim() === "") ||
                        (step === 1 && !selectedTrip)
                    }
                >
                    Next
                </Button>
            </PageBox>
        </div >
    );
}
