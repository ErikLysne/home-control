import { ComponentMeta, ComponentStory } from '@storybook/react';
import { HCButton } from './HCButton';

export default {
	title: 'Atoms/Inputs/HCButton',
	component: HCButton
} as ComponentMeta<typeof HCButton>;

const Template: ComponentStory<typeof HCButton> = (props) => (
	<HCButton {...props} />
);

export const Primary = Template.bind({});
Primary.args = {
	children: 'Click me!'
};
