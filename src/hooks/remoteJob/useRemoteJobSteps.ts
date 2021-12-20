import { useForm } from 'antd/lib/form/Form';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  remoteJobStepsEnableReducer,
  remoteJobVisibleReducer,
  selectRemoteJobSteps,
  selectRemoteJobStepsEnable,
} from '../../reducers/slices/remoteJob';
import useTypedSelector from '../../reducers/useTypedSelector';
import { AddressOption } from '../../types/address';
import { RemoteJobStepDetailState, RemoteJobType } from '../../types/Job';
import { FormRemoteJobStepsDrawer } from './useRemoteJobStepsDrawer';

export default function useRemoteJobStep() {
  const dispatch = useDispatch();
  const stepList = useTypedSelector(selectRemoteJobSteps);
  const enableList = useTypedSelector(selectRemoteJobStepsEnable);
  const [form] = useForm<FormRemoteJobStepsDrawer>();

  const setEnableList = useCallback(
    (value: number[]) => {
      dispatch(remoteJobStepsEnableReducer(value));
    },
    [dispatch]
  );

  const onChangeEnable = (selectedRowKeys: React.Key[], selectedRows: RemoteJobStepDetailState[]) => {
    setEnableList(selectedRowKeys as number[]);
  };
  const onToggleAllEnable = useCallback(() => {
    if (stepList && stepList.length > 0)
      setEnableList(enableList.length === stepList.length ? [] : (stepList.map((item) => item.index) as number[]));
  }, [stepList, enableList, setEnableList]);

  const openEditStepDrawer = useCallback(
    (record: RemoteJobStepDetailState) => {
      form.setFieldsValue(convertResStepToFormStep(record));
      dispatch(
        remoteJobVisibleReducer({
          isStep: true,
        })
      );
    },
    [dispatch, form]
  );

  const openAddStepDrawer = useCallback(() => {
    dispatch(
      remoteJobVisibleReducer({
        isAddStep: true,
      })
    );
  }, [dispatch]);

  return {
    stepList,
    enableList,
    setEnableList,
    onChangeEnable,
    onToggleAllEnable,
    openAddStepDrawer,
    openEditStepDrawer,
    form,
  };
}

function convertResStepToFormStep(resStep: RemoteJobStepDetailState | null): FormRemoteJobStepsDrawer {
  if (!resStep) return initialCurrentStep;

  const {
    index,
    jobId,
    stepId,
    stepName,
    stepType,
    enable,
    mode,
    time,
    cycle,
    period,
    preStep,
    nextStep,
    isEmail,
    customEmails,
    emailBook,
    groupBook,
    subject,
    body,
    before,
    selectJudgeRules,
    description,
    scriptType,
    script,
  } = resStep;
  console.log('resStep', resStep);

  return {
    index: index ?? null,
    type: index ? 'edit' : 'add',
    stepName,
    stepType,
    enable,
    mode,
    time,
    cycle,
    period,
    preStep,
    nextStep,
    isEmail,
    recipient: convertRecipientState({ customEmails, emailBook, groupBook }),
    subject,
    body,
    selectJudgeRules: selectJudgeRules?.map((item) => ({ ...item, key: item.itemId.toString() })) || [],
    before,
    description,
    scriptType,
    script,
  };
}

export function convertRecipientState({
  groupBook,
  emailBook,
  customEmails,
}: {
  groupBook: AddressOption[] | null;
  emailBook: AddressOption[] | null;
  customEmails: string[] | null;
}): AddressOption[] {
  const newRecipients: AddressOption[] = [];
  if (groupBook && groupBook.length > 0) {
    groupBook.map((item) => {
      const { id, name, email, group } = item;
      newRecipients.push({
        id,
        name,
        email,
        group,
        label: `@${name}`,
        value: id.toString(),
      });
    });
  }

  if (emailBook && emailBook.length > 0) {
    emailBook.map((item) => {
      const { id, name, email, group } = item;
      newRecipients.push({
        id,
        name,
        email,
        group,
        label: `${name} <${email}>`,
        value: id.toString(),
      });
    });
  }

  if (customEmails && customEmails.length > 0) {
    customEmails.map((item) => {
      newRecipients.push({
        id: 0,
        name: item,
        email: item,
        group: false,
        label: item,
        value: item,
      });
    });
  }

  return newRecipients;
}

const initialCurrentStep: FormRemoteJobStepsDrawer = {
  index: null,
  type: 'add',
  stepName: null,
  stepType: 'custom',
  enable: false,
  mode: null,
  time: [],
  cycle: null,
  period: null,
  preStep: null,
  nextStep: null,
  isEmail: false,
  recipient: [],
  subject: null,
  body: null,
  selectJudgeRules: [],
  before: null,
  description: null,
  scriptType: null,
  script: null,
};
