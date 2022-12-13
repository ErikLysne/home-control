import Grid from '@mui/material/Grid';
import { Meta, Story } from '@storybook/react';
import { HCTypography } from './HCTypography';

export default {
	title: 'Atoms/Data display/HCTypography'
} as Meta;

export const Collection: Story = () => {
	return (
		<Grid
			container
			display="flex"
			flexDirection="column"
			columnSpacing={2}
			rowSpacing={2}
			columns={1}
		>
			<Grid item>
				<HCTypography variant="h1">h1 Typography</HCTypography>
			</Grid>
			<Grid item>
				<HCTypography variant="h2">h2 Typography</HCTypography>
			</Grid>
			<Grid item>
				<HCTypography variant="h3">h3 Typography</HCTypography>
			</Grid>
			<Grid item>
				<HCTypography variant="h4">h4 Typography</HCTypography>
			</Grid>
			<Grid item>
				<HCTypography variant="h5">h5 Typography</HCTypography>
			</Grid>
			<Grid item>
				<HCTypography variant="h6">h6 Typography</HCTypography>
			</Grid>
			<Grid item>
				<HCTypography variant="body1">body1 Typography</HCTypography>
			</Grid>
			<Grid item>
				<HCTypography variant="body2">body2 Typography</HCTypography>
			</Grid>
		</Grid>
	);
};
