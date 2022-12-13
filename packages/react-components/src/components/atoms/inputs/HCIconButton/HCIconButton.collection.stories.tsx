import LockIcon from '@mui/icons-material/Lock';
import MailIcon from '@mui/icons-material/Mail';
import PersonIcon from '@mui/icons-material/Person';
import WarningIcon from '@mui/icons-material/Warning';

import Grid from '@mui/material/Grid';
import { Meta, Story } from '@storybook/react';
import { HCIconButton } from './HCIconButton';

export default {
	title: 'Atoms/Inputs/HCIconButton'
} as Meta<typeof HCIconButton>;

export const Collection: Story = () => (
	<Grid container spacing={2}>
		<Grid item>
			<HCIconButton color="error">
				<PersonIcon />
			</HCIconButton>
		</Grid>

		<Grid item>
			<HCIconButton color="success">
				<MailIcon />
			</HCIconButton>
		</Grid>

		<Grid item>
			<HCIconButton color="info">
				<LockIcon />
			</HCIconButton>
		</Grid>

		<Grid item>
			<HCIconButton color="warning">
				<WarningIcon />
			</HCIconButton>
		</Grid>
	</Grid>
);
