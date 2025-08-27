import { Button, CircularProgress, Typography } from "@mui/material";
import { useUser } from './contexts/user-context';
import './home.css';
import { useTheme } from './contexts/theme-context';
import { useState } from "react";
import TripDialog from "./trip-dialog";
import { PageBox, PageContainer } from "./page-container";

function Home() {
    const { theme } = useTheme();
    const { user, isLoading } = useUser();
    const [showTripDialog, setShowTripDialogue] = useState(false);

    const handleCreateTrip = () => {
        setShowTripDialogue(true);
    };

    return (
        <PageContainer>
            <PageBox>
                <header className="home-header">
                    {isLoading ? (
                        <CircularProgress size={24} />
                    ) : user ? (
                        <Typography variant="h1" component="h1">Hello {user.name} 👋</Typography>
                    ) : (
                        <Typography variant="h1" component="h1">Log in to unlock all features!</Typography>
                    )}
                </header>

                {/* Create trip button */}
                <div className="home-container">
                    {!isLoading && user && !showTripDialog && (
                        <div>
                            <Button
                                variant="contained"
                                sx={{
                                    color: theme.textColor,
                                }}
                                onClick={handleCreateTrip}
                            >
                                Create new trip!
                            </Button>
                        </div>
                    )}
                    {!isLoading && user && showTripDialog && (
                        <TripDialog onClose={() => setShowTripDialogue(false)} />
                    )}

                </div>
            </PageBox>
        </PageContainer>
    );
}
export default Home;
