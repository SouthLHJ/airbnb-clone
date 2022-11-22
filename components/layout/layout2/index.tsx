import { Box, Container, Grid, Paper } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import React, { ReactNode, useEffect } from "react";
import { AccommodationProvider, useAccommodationDispatch, useAccommodationState } from '../../../contexts/accommodation';
import { PhotosProvider } from '../../../contexts/photos';
import { CustomColor } from '../../../interfaces/setting/color';

type Props = {
    children: ReactNode;
};



function Layout2({children }: Props) {
    return (
        <AccommodationProvider>
        <PhotosProvider>
            <Box sx={{width : "100%"}}>
                {children}
            </Box>
        </PhotosProvider>
        </AccommodationProvider>
    )
}

export default Layout2;

