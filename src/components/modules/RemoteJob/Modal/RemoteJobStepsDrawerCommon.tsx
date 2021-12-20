import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Badge, Form, FormInstance, Input, Space, Switch } from 'antd';
import React from 'react';
import { FormRemoteJobStepsDrawer } from '../../../../hooks/remoteJob/useRemoteJobStepsDrawer';
export function RemoteJobStepsDrawerCommon({ form }: { form: FormInstance<FormRemoteJobStepsDrawer> }) {
  return (
    <>
      <Form.Item label={<StepCommonLabel label="Step Type" />} name="stepType">
        <Input />
      </Form.Item>
      <Form.Item label={<StepCommonLabel label="Step Name" />} name="stepName">
        <Input />
      </Form.Item>
      <Form.Item label={<StepCommonLabel label="Description" />} name="description">
        <Input />
      </Form.Item>
    </>
  );
}

export const StepEmptyLable = styled.div`
  width: 10rem;
`;

export function StepCommonLabel({ label, depth = 0 }: { label: string; depth?: number }): JSX.Element {
  return (
    <Space
      css={css`
        width: 10rem;
        padding: ${depth !== 0 && '1rem'};
      `}
    >
      <Badge color={depth === 0 ? 'blue' : 'green'} />
      <div>{label}</div>
    </Space>
  );
}

export function StepSwitchLabel({
  label,
  checked,
  onClick,
  depth = 0,
}: {
  label: string;
  checked: boolean;
  onClick: () => void;
  depth?: number;
}): JSX.Element {
  return (
    <Space
      css={css`
        width: 10rem;
        padding: ${depth !== 0 && '1rem'};
      `}
    >
      <Badge color={depth === 0 ? 'blue' : 'green'} />
      <div>{label}</div>
      <Switch checkedChildren="On" unCheckedChildren="Off" checked={checked} onClick={() => onClick()} />
    </Space>
  );
}
