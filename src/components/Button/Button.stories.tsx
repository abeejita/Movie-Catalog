import {Meta, StoryFn} from '@storybook/react';

import {IButton} from "./types";
import React from 'react';
import {Button} from "./index";

const meta = {
  title: 'Components/Button',
  component: Button,
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
    title: {
      control: {
        type: 'text',
      }
    },
    color: {
      control: {
        type: 'text',
      }
    },
    icon: {
      control: {
        type: 'boolean',
      },
      svg: {
        control: {
          type: 'string',
        }
      }
    }
  },
  tags: ["autodocs"],
} as Meta;

export default meta;

const Template: StoryFn<IButton> = (args) => <Button {...args} />;

/**
 * A default button with all the props.
 */
export const Default = Template.bind({});
Default.args = {
  title: 'Add to Favorites',
  color: 'blue',
  icon: true,
  svg: 'heart'
};