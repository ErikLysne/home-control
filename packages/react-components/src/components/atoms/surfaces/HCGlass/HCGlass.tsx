import Box, { BoxProps } from '@mui/material/Box';
import { Theme } from '@mui/material/styles';
import { glassify } from 'foundation';
import React from 'react';

export interface HCGlassProps extends React.PropsWithChildren {
	width?: BoxProps['width'];
	height?: BoxProps['height'];
	grade?: keyof Theme['glass']['gradient'];
	boxProps?: BoxProps;
}

export const HCGlass = React.forwardRef<HTMLDivElement, HCGlassProps>(
	function HCGlass(props, ref) {
		const { children, width, height, grade, boxProps, ...rest } = props;

		return (
			<Box
				ref={ref}
				{...boxProps}
				{...rest}
				sx={{
					...glassify({
						grade
					}),
					width,
					height
				}}
			>
				{children}
			</Box>
		);
	}
);
