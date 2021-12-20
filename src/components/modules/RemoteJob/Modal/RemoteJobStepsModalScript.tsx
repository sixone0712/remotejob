import styled from '@emotion/styled';
import { Modal } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-min-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/snippets/python';
import 'ace-builds/src-noconflict/theme-github';
import { JobScriptType } from '../../../../types/Job';

export type RemoteJobStepsModalScriptProps = {
  type: JobScriptType;
  title: string;
  visible: boolean;
  setVisible: (value: boolean) => void;
  script: string | null;
  onChangeScript: (value: string | null) => void;
};

export default React.memo(function RemoteJobStepsModalScript({
  type,
  title,
  visible,
  setVisible,
  script,
  onChangeScript,
}: RemoteJobStepsModalScriptProps): JSX.Element {
  const [code, setCode] = useState<string>('');

  const onChange = (value: string) => {
    setCode(value);
  };

  const onClose = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onOk = useCallback(() => {
    onChangeScript(code || null);
    setVisible(false);
  }, [onChangeScript, setVisible, code]);

  useEffect(() => {
    setCode(script ?? '');
  }, [script]);

  return (
    <Modal title={title} visible={visible} onOk={onOk} onCancel={onClose} width={600} destroyOnClose>
      <StyledEditor>
        <AceEditor
          placeholder="Input Python Code Here!"
          // mode="python"
          theme="github"
          name="regex"
          width={'552px'}
          onChange={onChange}
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={code ?? undefined}
          setOptions={
            type === 'python'
              ? {
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: false,
                  showLineNumbers: true,
                  tabSize: 4,
                }
              : undefined
          }
          enableSnippets={true}
        />
      </StyledEditor>
    </Modal>
  );
});

const StyledEditor = styled.div`
  margin-top: 10px;
  * {
    font-family: consolas;
    line-height: 1;
  }
`;
