import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { addMonths } from 'date-fns';
import { FreshnessBar, Props } from './FreshnessBar';
import Label from '../label';
import { Flex } from '../flex';

const monthAgo = addMonths(new Date(), -1);
const halfAYearAgo = addMonths(new Date(), -6);
const threeMonthsAgo = addMonths(new Date(), -3);
const almostAYearAgo = addMonths(new Date(), -11);

export default {
  title: 'Quartz/FreshnessBar',
  component: FreshnessBar,
  args: {
    expirationDate: new Date(monthAgo),
    size: 'md',
  },
  argTypes: {
    expirationDate: {
      control: {
        type: 'date',
      },
    },
  },
} as Meta;

export const Default: Story<Props> = (props) => (
  <Flex flexDirection="column" alignItems="center" sx={{ gap: '40px' }}>
    <Flex sx={{ gap: '20px' }}>
      <Label text="Half a year ago">
        <FreshnessBar expirationDate={halfAYearAgo} />
      </Label>
      <Label text="3 months ago">
        <FreshnessBar expirationDate={threeMonthsAgo} />
      </Label>
      <Label text="11 months ago, expiring soon">
        <FreshnessBar expirationDate={almostAYearAgo} />
      </Label>
    </Flex>

    <Flex>
      <Label text="try out datepicker below">
        <FreshnessBar {...props} />
      </Label>
    </Flex>
  </Flex>
);
