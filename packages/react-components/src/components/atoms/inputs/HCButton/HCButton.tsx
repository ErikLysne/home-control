import Button from '@mui/material/Button';
import { glassify } from 'foundation';
import React from 'react';

export interface HCButtonProps extends React.PropsWithChildren {}

export const HCButton = React.forwardRef<HTMLButtonElement, HCButtonProps>(
	function HCButton(props, ref) {
		const { children, ...rest } = props;

		return (
			<Button
				ref={ref}
				size="large"
				variant="contained"
				{...rest}
				sx={{
					...glassify({
						hover: true
					}),
					borderRadius: 2,
					color: (theme) => theme.palette.common.black,
					fontWeight: 'bold'
				}}
			>
				{children}
			</Button>
		);
	}
);
