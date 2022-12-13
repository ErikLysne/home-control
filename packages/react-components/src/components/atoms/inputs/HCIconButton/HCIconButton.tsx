import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { glassify } from 'foundation';
import React from 'react';

export interface HCIconButtonProps extends React.PropsWithChildren {
	color?: IconButtonProps['color'];
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const HCIconButton = React.forwardRef<
	HTMLButtonElement,
	HCIconButtonProps
>(function HCIconButton(props, ref) {
	const { children, color = 'error', onClick, ...rest } = props;

	return (
		<IconButton
			ref={ref}
			color={color}
			size="large"
			sx={{
				...glassify({
					hover: true
				}),
				opacity: '90%',
				'&::before': {
					content: '""',
					position: 'absolute',
					inset: 0,
					m: 'auto',
					zIndex: -1,
					width: '75%',
					height: '75%',
					borderRadius: '50%',
					backdropFilter: 'blur(1px)',
					boxShadow: '0px 0px 10px 1px rgba(255,255,255,0.50)',
					border: (theme) => theme.glass.border,
					background: (theme) => theme.glass.gradient[4]
				}
			}}
			onClick={onClick}
			{...rest}
		>
			{children}
		</IconButton>
	);
});
