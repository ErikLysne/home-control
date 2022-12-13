import PersonIcon from '@mui/icons-material/Person';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { HCIconButton } from './HCIconButton';

export default {
	title: 'Atoms/Inputs/HCIconButton',
	component: HCIconButton
} as ComponentMeta<typeof HCIconButton>;

const Template: ComponentStory<typeof HCIconButton> = (props) => (
	<HCIconButton {...props} />
);

export const Primary = Template.bind({});
Primary.args = {
	children: <PersonIcon />
};
