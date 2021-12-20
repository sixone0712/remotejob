import { css } from '@emotion/react';
import { Button, Drawer, Form, FormInstance } from 'antd';
import React from 'react';
import useRemoteJobStepsDrawer, { FormRemoteJobStepsDrawer } from '../../../../hooks/remoteJob/useRemoteJobStepsDrawer';
import { convertRemToPixels } from '../../../../lib/util/remToPixcels';
import { RemoteJobStepsDrawerCommon } from './RemoteJobStepsDrawerCommon';
import { RemoteJobStepsDrawerEmail } from './RemoteJobStepsDrawerEmail';
import { RemoteJobStepsDrawerBefore } from './RemoteJobStepsDrawerEtc';
import RemoteJobStepsDrawerExcute from './RemoteJobStepsDrawerExcute';
import RemoteJobStepsDrawerScript from './RemoteJobStepsDrawerScript';

export type RemoteJobStepsDrawerProps = {
  form: FormInstance<FormRemoteJobStepsDrawer>;
};

export default function RemoteJobStepsDrawer({ form }: RemoteJobStepsDrawerProps): JSX.Element {
  const { visible, onCloseDrawer } = useRemoteJobStepsDrawer({ form });

  return (
    <Drawer
      title={'Step'}
      placement="right"
      width={convertRemToPixels(67.25)}
      closable={true}
      onClose={onCloseDrawer}
      visible={visible}
      destroyOnClose
      // getContainer={false}
      forceRender
    >
      <Form form={form} onFinish={() => {}} layout="horizontal">
        {visible && (
          <>
            <RemoteJobStepsDrawerCommon form={form} />
            <RemoteJobStepsDrawerEmail form={form} />
            <RemoteJobStepsDrawerExcute form={form} />
            <RemoteJobStepsDrawerScript form={form} />
            <RemoteJobStepsDrawerBefore />
          </>
        )}
      </Form>
      <Button onClick={() => console.log(form.getFieldsValue())}>Show Form</Button>
      <Button htmlType="submit">Ok</Button>
    </Drawer>
  );
}

const style = css``;
