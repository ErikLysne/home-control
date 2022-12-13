import { BoxProps } from '@mui/material/Box';
import { Theme } from '@mui/material/styles';

export interface GlassifyOptions {
	grade?: keyof Theme['glass']['gradient'];
	hover?: boolean;
}

export const glassify = (options?: GlassifyOptions): BoxProps['sx'] => {
	const { grade = 0, hover } = options ?? {};

	const baseStyle: BoxProps['sx'] = {
		background: (theme) => theme.glass.gradient[grade],
		opacity: '70%',
		backdropFilter: 'blur(12px)',
		borderRadius: (theme) => theme.spacing(4),
		border: (theme) => theme.glass.border,
		boxSizing: 'border-box',
		boxShadow: '0px 4px 20px 2px rgba(0,0,0,0.15)'
	};

	const hoverStyle: BoxProps['sx'] = {
		':hover': {
			background: (theme) => theme.glass.gradient[3],
			boxShadow: '0px 2px 10px 2px rgba(0,0,0,0.20)'
		}
	};

	return {
		...baseStyle,
		...(hover ? hoverStyle : {})
	};
};
