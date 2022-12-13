import { ComponentMeta, ComponentStory } from '@storybook/react';
import { HCBackground } from './HCBackground';

export default {
	title: 'Atoms/Surfaces/HCBackground',
	component: HCBackground
} as ComponentMeta<typeof HCBackground>;

const Template: ComponentStory<typeof HCBackground> = (props) => <></>;

export const Primary = Template.bind({});
Primary.args = {};
