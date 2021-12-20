import React, { useMemo } from 'react';
import { css } from '@emotion/react';
import { Form, FormInstance, InputNumber, Radio, Select, Space, TimePicker } from 'antd';
import { FormRemoteJobStepsDrawer } from '../../../../hooks/remoteJob/useRemoteJobStepsDrawer';
import { StepCommonLabel, StepEmptyLable } from './RemoteJobStepsDrawerCommon';
import MarkUpTags from '../../../atoms/MarkupTags';
import useRemoteJobStepsDrawerExcute from '../../../../hooks/remoteJob/useRemoteJobStepsDrawerExcute';

export type RemoteJobStepsDrawerExcuteProps = {
  form: FormInstance<FormRemoteJobStepsDrawer>;
};

export default function RemoteJobStepsDrawerExcute({ form }: RemoteJobStepsDrawerExcuteProps): JSX.Element {
  const {
    excuteMode,
    setExcuteMode,
    timeMoment,
    onChangeTimeMoment,
    time,
    onChangeTime,
  } = useRemoteJobStepsDrawerExcute({ form });

  return (
    <div css={style}>
      <Form.Item label={<StepCommonLabel label="Excute Mode" />} name="mode" colon={false}>
        <Radio.Group onChange={setExcuteMode}>
          <Radio value="time">Specified Time</Radio>
          <Radio value="cycle">Cycle</Radio>
          <Radio value="pre">Previous</Radio>
          <Radio value="next">Next</Radio>
        </Radio.Group>
      </Form.Item>
      {excuteMode === 'cycle' && (
        <Form.Item label={<StepEmptyLable />} colon={false}>
          <Space>
            <Form.Item name="period" className="period">
              <InputNumber min={1} max={999} />
            </Form.Item>
            <Form.Item name="cycle" className="cycle">
              <Select>
                <Select.Option value="minute">Miniute</Select.Option>
                <Select.Option value="hour">Hour</Select.Option>
                <Select.Option value="day">Day</Select.Option>
              </Select>
            </Form.Item>
          </Space>
        </Form.Item>
      )}
      {excuteMode === 'time' && (
        <Form.Item label={<StepEmptyLable />} name="time" colon={false}>
          <Space direction="vertical">
            <TimePicker value={timeMoment} format="HH:mm" onChange={onChangeTimeMoment} />
            <MarkUpTags tags={time} setTags={onChangeTime} />
          </Space>
        </Form.Item>
      )}
      {excuteMode === 'pre' && (
        <Form.Item label={<StepEmptyLable />} colon={false}>
          <Space>
            <Form.Item name="Previos" className="preStep">
              <Select>
                <Select.Option value={1}>Collect</Select.Option>
                <Select.Option value={2}>Convert & Insert</Select.Option>
              </Select>
            </Form.Item>
          </Space>
        </Form.Item>
      )}
      {excuteMode === 'next' && (
        <Form.Item label={<StepEmptyLable />} colon={false}>
          <Space>
            <Form.Item name="Next" className="nextStep">
              <Select>
                <Select.Option value={1}>Collect</Select.Option>
                <Select.Option value={2}>Convert & Insert</Select.Option>
              </Select>
            </Form.Item>
          </Space>
        </Form.Item>
      )}
    </div>
  );
}

const style = css`
  .cycle {
    .ant-select {
      width: 6.25rem;
    }
  }
  .preStep,
  .nextStep {
    width: 10rem;
  }
`;
