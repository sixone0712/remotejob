import React from 'react';
import { css } from '@emotion/react';

import { StepCommonLabel } from './RemoteJobStepsDrawerCommon';
import { EMAIL_BEFORE_MAX } from '../../../../lib/constants';
import { Form, InputNumber, Space } from 'antd';
import { H_SPACE } from '../../../atoms/Space';

export type remoteJobStepsDrawerRulesProps = {
  children?: React.ReactNode;
};

export function remoteJobStepsDrawerRules({ children }: remoteJobStepsDrawerRulesProps): JSX.Element {
  return <div css={styleRules}>remoteJobStepsDrawerEtc</div>;
}

const styleRules = css``;

export type RemoteJobStepsDrawerBeforeProps = {};

export function RemoteJobStepsDrawerBefore({}: RemoteJobStepsDrawerBeforeProps): JSX.Element {
  return (
    <div css={styleBefore}>
      <Space>
        <Form.Item
          label={<StepCommonLabel label="Before" />}
          className="before"
          name="before"
          required
          rules={[
            {
              required: true,
              message: `Please input a number between 1 to 999!`,
            },
          ]}
        >
          <InputNumber
            min={1}
            max={EMAIL_BEFORE_MAX}
            formatter={(value) => {
              return value ? JSON.stringify(Math.floor(value)) : '';
            }}
          />
        </Form.Item>
        <Form.Item>
          <div>Day</div>
        </Form.Item>
      </Space>
    </div>
  );
}

const styleBefore = css``;
