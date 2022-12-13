import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
	interface Theme {
		glass: {
			stroke: string;
			border: string;
			gradient: {
				0: string;
				1: string;
				2: string;
				3: string;
				4: string;
			};
		};
	}
	interface ThemeOptions {
		glass?: {
			stroke?: string;
			border?: string;
			gradient?: {
				0?: string;
				1?: string;
				2?: string;
				3?: string;
				4?: string;
			};
		};
	}
}

export const theme = createTheme({
	palette: {
		primary: {
			main: '#0766FF',
			light: '#83b3ff',
			dark: '#043380'
		},
		secondary: {
			main: '#2e294e',
			light: '#585471',
			dark: '#1c192f'
		},
		success: {
			main: '#1fea33',
			light: '#8ff599',
			dark: '#10751a'
		},
		error: {
			main: '#ff5964',
			light: '#ffacb2',
			dark: '#802d32'
		},
		warning: {
			main: '#ffd400',
			light: '#ffe566',
			dark: '#ccaa00'
		},
		info: {
			main: '#78cad2',
			light: '#a1dae0',
			dark: '#60a2a8'
		}
	},
	glass: {
		stroke: 'rgba(255, 255, 255, 0.65)',
		border: '1px solid rgba(255, 255, 255, 0.65)',
		gradient: {
			0: 'radial-gradient(at 0% 0%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.70) 100%)',
			1: 'radial-gradient(at 0% 0%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.75) 100%)',
			2: 'radial-gradient(at 0% 0%, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.80) 100%)',
			3: 'radial-gradient(at 0% 0%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.85) 100%)',
			4: 'radial-gradient(at 0% 0%, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.90) 100%)'
		}
	},
	typography: {
		h1: {
			fontFamily: 'Poppins, sans-serif',
			fontSize: '48px',
			lineHeight: '56.25px',
			fontWeight: 600
		},
		h2: {
			fontFamily: 'Roboto, sans-serif',
			fontSize: '40px',
			lineHeight: '47px',
			fontWeight: 500
		},
		h3: {
			fontFamily: 'Roboto, sans-serif',
			fontSize: '32px',
			lineHeight: '38px',
			fontWeight: 500
		},
		h4: {
			fontFamily: 'Roboto, sans-serif',
			fontSize: '24px',
			lineHeight: '28px',
			fontWeight: 500
		},
		h5: {
			fontFamily: 'Roboto, sans-serif',
			fontSize: '20px',
			lineHeight: '23px',
			fontWeight: 500
		},
		h6: {
			fontFamily: 'Roboto, sans-serif',
			fontSize: '16px',
			lineHeight: '19px',
			fontWeight: 500
		}
	}
});
