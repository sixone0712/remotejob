import { FormInstance } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  remoteJobVisibleReducer,
  selectRemoteJobAllVisible,
  selectRemoteJobVisible,
} from '../../reducers/slices/remoteJob';
import useTypedSelector from '../../reducers/useTypedSelector';
import { JobScriptType } from '../../types/Job';
import { FormRemoteJobStepsDrawer } from './useRemoteJobStepsDrawer';

export default function useRemoteJobStepsDrawerScript({ form }: { form: FormInstance<FormRemoteJobStepsDrawer> }) {
  const dispatch = useDispatch();
  const [scriptType, setScriptTypeState] = useState<JobScriptType>('python');
  const isScript = useTypedSelector(selectRemoteJobVisible('isScript'));
  const script: string | null = form.getFieldValue('script') ?? null;

  const setIsScript = useCallback(
    (isScript: boolean) => {
      dispatch(
        remoteJobVisibleReducer({
          isScript,
        })
      );
    },
    [dispatch]
  );

  const setScriptType = useCallback((value: JobScriptType) => {
    setScriptTypeState(value);
  }, []);

  const setScript = useCallback(
    (script: string | null) => {
      form.setFieldsValue({
        script,
      });
    },
    [form]
  );

  useEffect(() => {
    setScriptTypeState(form.getFieldValue('scriptType'));
  }, []);

  return {
    scriptType,
    setScriptType,
    script,
    setScript,
    isScript,
    setIsScript,
  };
}
