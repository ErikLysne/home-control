import Box, { BoxProps } from '@mui/material/Box';
import React from 'react';

const HCBackgroundSphere = React.forwardRef<
	HTMLDivElement,
	{ radius?: number } & BoxProps['sx']
>(function HCBackgroundSphere(props, ref) {
	return (
		<Box
			sx={{
				...props,
				width: props.radius,
				height: props.radius,
				position: 'absolute',
				borderRadius: '50%',
				filter: 'blur(100px)'
			}}
		/>
	);
});

export const HCBackground = React.forwardRef<HTMLDivElement>(
	function HCBackground(props, ref) {
		return (
			<Box
				ref={ref}
				sx={{
					position: 'absolute',
					inset: 0,
					width: '100vw',
					height: '100vh',
					bgcolor: '#1972E5',
					overflow: 'hidden',
					zIndex: -1
				}}
				{...props}
			>
				<HCBackgroundSphere
					radius={450}
					top={-100}
					right={-100}
					bgcolor="#18C2FF"
				/>

				<HCBackgroundSphere
					radius={450}
					top={100}
					right={150}
					bgcolor="#E3D593"
				/>

				<HCBackgroundSphere
					radius={600}
					top={-200}
					left={-200}
					bgcolor="#FE79AE"
				/>

				<HCBackgroundSphere
					radius={600}
					bottom={-300}
					left={400}
					bgcolor="#85EBF7"
				/>

				<HCBackgroundSphere
					radius={500}
					bottom={-100}
					left={-200}
					bgcolor="#A9E6CD"
				/>
			</Box>
		);
	}
);
