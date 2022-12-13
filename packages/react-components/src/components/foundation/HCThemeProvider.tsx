import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { theme } from '../../foundation/theme';

export const HCThemeProvider: React.FC<React.PropsWithChildren> = ({
	children
}) => {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
