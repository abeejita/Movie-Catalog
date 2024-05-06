import {Meta, StoryFn} from '@storybook/react';

import Header from "./Header";
import React from 'react';

const meta = {
    title: 'Components/Header',
    component: Header,
    parameters: {
        layout: "centered",
        docs: {
            story: {
                inline: false,
                iframeHeight: false
            }
        }
    },
    argTypes: {
    },
    tags: ["autodocs"],
} as Meta;

export default meta;

const Template: StoryFn<{}> = (args) => <Header {...args} />;

/**
 * A default Header.
 */
export const Default = Template.bind({});
Default.args = {
};