import { ComponentMeta, ComponentStory } from '@storybook/react';
import { HCGlass } from './HCGlass';

export default {
	title: 'Atoms/Surfaces/HCGlass',
	component: HCGlass
} as ComponentMeta<typeof HCGlass>;

const Template: ComponentStory<typeof HCGlass> = (props) => (
	<HCGlass {...props} />
);

export const Primary = Template.bind({});
Primary.args = {
	width: 300,
	height: 300
};
