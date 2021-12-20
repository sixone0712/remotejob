import { FormInstance, useForm } from 'antd/lib/form/Form';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  remoteJobVisibleReducer,
  selectRemoteJobStepConfig,
  selectRemoteJobVisible,
} from '../../reducers/slices/remoteJob';
import useTypedSelector from '../../reducers/useTypedSelector';
import { AddressOption } from '../../types/address';
import {
  JobCycleType,
  JobModeType,
  JobScriptType,
  JobStepType,
  RemoteJobStepDetailState,
  RemoteJobType,
  TransferRemoteJobJudgeRule,
} from '../../types/Job';

export interface FormRemoteJobStepsDrawer {
  index: number | null;
  type: RemoteJobType;
  stepName: string | null;
  stepType: JobStepType;
  enable: boolean;
  mode: JobModeType | null;
  time: string[];
  cycle: JobCycleType | null;
  period: number | null;
  preStep: number | null;
  nextStep: number | null;
  isEmail: boolean;
  recipient: AddressOption[];
  subject: string | null;
  body: string | null;
  selectJudgeRules: TransferRemoteJobJudgeRule[];
  before: number | null;
  description: string | null;
  scriptType: JobScriptType | null;
  script: string | null;
}

export default function useRemoteJobStepsDrawer({ form }: { form: FormInstance<FormRemoteJobStepsDrawer> | null }) {
  const dispatch = useDispatch();
  const visible = useTypedSelector(selectRemoteJobVisible('isStep'));
  const stepConfig = useTypedSelector(selectRemoteJobStepConfig);

  const onCloseDrawer = useCallback(() => {
    dispatch(
      remoteJobVisibleReducer({
        isStep: false,
      })
    );
  }, [dispatch]);

  return { form, visible, onCloseDrawer, stepConfig };
}
