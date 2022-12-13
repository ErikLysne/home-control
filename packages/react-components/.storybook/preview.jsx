import { HCBackground } from 'components/atoms';
import { HCThemeProvider } from 'components/foundation/HCThemeProvider';

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/
		}
	},
	layout: 'centered'
};

export const decorators = [
	(Story) => (
		<HCThemeProvider>
			<HCBackground />
			<Story />
		</HCThemeProvider>
	)
];
