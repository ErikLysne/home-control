import { ComponentMeta, ComponentStory } from '@storybook/react';
import { HCTypography } from './HCTypography';

export default {
	title: 'Atoms/Data display/HCTypography',
	component: HCTypography
} as ComponentMeta<typeof HCTypography>;

const Template: ComponentStory<typeof HCTypography> = (props) => (
	<HCTypography {...props} />
);

export const Primary = Template.bind({});
Primary.args = {
	variant: 'h1',
	children: 'Home Control'
};
