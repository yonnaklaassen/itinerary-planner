import { Container, ContainerProps, Box, BoxProps, GridProps, Grid } from '@mui/material';

interface PageBoxProps extends BoxProps {
    xs?: number | string;
    sm?: number | string;
    md?: number | string;
    lg?: number | string;
}

interface PageGridProps extends GridProps {
    size?: {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
    };
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
}
export function PageContainer({
    children,
    sx,
    fluid,
    maxWidth,
    ...props
}: ContainerProps & { fluid?: boolean }) {
    return (
        <Container
            {...props}
            maxWidth={fluid ? false : maxWidth ?? "md"}
            sx={{
                mt: { xs: 4, sm: 6, md: 8, lg: 10 },
                mb: { xs: 2, sm: 4, md: 6, lg: 10 },
                px: { xs: 2, sm: 3, md: 4, lg: 6 },
                ...(fluid && {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }),
                ...sx,
            }}
        >
            {children}
        </Container>
    );
}

export function PageBox({ children, sx, xs, sm, md, lg, ...props }: PageBoxProps) {
    return (
        <Box
            {...props}
            sx={{
                p: 2,
                width: {
                    xs: xs ?? '100%',
                    sm: sm ?? '100%',
                    md: md ?? '100%',
                    lg: lg ?? '100%',
                },
                mx: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                ...sx,
            }}
        >
            {children}
        </Box>
    );
}

export function PageGrid({ children, size, xs, sm, md, lg, ...props }: PageGridProps) {
    const gridSize = {
        xs: xs ?? size?.xs ?? 12,
        sm: sm ?? size?.sm ?? 6,
        md: md ?? size?.md ?? 4,
        lg: lg ?? size?.lg ?? 3,
    };

    return (
        <Grid {...props} size={gridSize}>
            {children}
        </Grid>
    );
}