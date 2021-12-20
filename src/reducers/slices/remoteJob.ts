import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddressOption } from '../../types/address';
import {
  JobCycleType,
  JobModeType,
  JobScriptType,
  JobStepType,
  RemoteJobDetailState,
  RemoteJobStepDetailState,
  RemoteJobType,
  TransferRemoteJobJudgeRule,
} from '../../types/Job';
import { RootState } from '../rootReducer';

export interface RemoteJobReduxState {
  job: RemoteJobDetailReduxState;
  steps: RemoteJobStepDetailState[];
  currentStep: RemoteJobCurStepReduxState;
  visible: RemoteJobVisibleReduixState;
  stepConfig: RemoteJobStepConfigReduxState;
}

export interface RemoteJobVisibleReduixState {
  isAddStep: boolean;
  isStep: boolean;
  isScript: boolean;
  isJudgeRules: boolean;
}
export interface RemoteJobDetailReduxState extends Omit<RemoteJobDetailState, 'steps'> {}

export interface RemoteJobCurStepReduxState {
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

export interface RemoteJobStepConfigReduxState {
  selectIdx: number | null;
  type: RemoteJobType | null;

  stepName: string | null;
  stepType: JobStepType | null;
  enable: boolean;
  mode: JobModeType | null;
  time: string[];
  cycle: JobCycleType | null;
  period: number | null;
  preStep: number | null;
  nextStep: number | null;
  isEmail: boolean | null;
  recipient: AddressOption[];
  subject: string | null;
  body: string | null;
  selectJudgeRules: TransferRemoteJobJudgeRule[];
  before: number | null;
  description: string | null;
  scriptType: JobScriptType | null;
  script: string | null;
}

const initialJobState: RemoteJobDetailReduxState = {
  jobId: null,
  jobName: null,
  siteId: null,
  siteName: null,
  planIds: [],
};

const initialState: RemoteJobReduxState = {
  job: initialJobState,
  steps: [],
  currentStep: {
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
  },
  visible: {
    isAddStep: false,
    isStep: false,
    isScript: false,
    isJudgeRules: false,
  },
  stepConfig: {
    selectIdx: null,
    type: null,
    stepName: null,
    stepType: null,
    enable: false,
    mode: null,
    time: [],
    cycle: null,
    period: null,
    preStep: null,
    nextStep: null,
    isEmail: null,
    recipient: [],
    subject: null,
    body: null,
    selectJudgeRules: [],
    before: null,
    description: null,
    scriptType: null,
    script: null,
  },
};

const remoteJob = createSlice({
  name: 'remoteJob',
  initialState,
  reducers: {
    remoteJobInitReducer: () => initialState,
    remoteJobInfoReducer: (state, action: PayloadAction<Partial<RemoteJobDetailState>>) => {
      state.job = {
        ...state.job,
        ...action.payload,
      };
    },
    remoteStepsInfoReducer: (state, action: PayloadAction<RemoteJobStepDetailState[]>) => {
      state.steps = action.payload;
    },
    remoteJobAddStepsInfoReducer: (state, action: PayloadAction<RemoteJobStepDetailState>) => {
      state.steps.push(action.payload);
    },
    remoteJobStepsInfoReducer: (
      state,
      action: PayloadAction<{ index: number; stepData: Partial<RemoteJobStepDetailState> }>
    ) => {
      const { index, stepData } = action.payload;

      state.steps[index] = {
        ...state.steps[index],
        ...stepData,
      };
    },
    remoteJobDeleteStepsInfoReducer: (state, action: PayloadAction<number>) => {
      state.steps.splice(action.payload, 1);
    },
    remoteJobStepsEnableReducer: (state, action: PayloadAction<number[]>) => {
      state.steps.forEach((item, idx) => {
        state.steps[idx].enable = action.payload.includes(item.index as number) ? true : false;
      });
    },
    remoteJobVisibleReducer: (state, action: PayloadAction<Partial<RemoteJobVisibleReduixState>>) => {
      state.visible = {
        ...state.visible,
        ...action.payload,
      };
    },
    remoteJobStepConfigReducer: (state, action: PayloadAction<Partial<RemoteJobStepConfigReduxState>>) => {
      state.stepConfig = {
        ...state.stepConfig,
        ...action.payload,
      };
    },
    remoteJobStepCurrentStepReducer: (state, action: PayloadAction<Partial<RemoteJobCurStepReduxState>>) => {
      state.currentStep = {
        ...state.currentStep,
        ...action.payload,
      };
    },
  },
});

export const {
  remoteJobInitReducer,
  remoteJobInfoReducer,
  remoteStepsInfoReducer,
  remoteJobAddStepsInfoReducer,
  remoteJobStepsInfoReducer,
  remoteJobDeleteStepsInfoReducer,
  remoteJobStepsEnableReducer,
  remoteJobVisibleReducer,
  remoteJobStepConfigReducer,
  remoteJobStepCurrentStepReducer,
} = remoteJob.actions;

export const selectRemoteJobInfo = (state: RootState) => state.remoteJob.job;
export const selectRemoteJobSteps = (state: RootState) => state.remoteJob.steps;
export const selectRemoteJobStep = (stepId: number) => (state: RootState) => state.remoteJob.steps[stepId];
export const selectRemoteJobStepsEnable = createSelector(selectRemoteJobSteps, (steps) => {
  return steps.filter((item) => item.enable).map((item) => item.index);
});
export const selectRemoteJobAllVisible = (state: RootState) => state.remoteJob.visible;
export const selectRemoteJobVisible = (name: keyof RemoteJobVisibleReduixState) =>
  createSelector<RootState, RemoteJobVisibleReduixState, boolean>(
    selectRemoteJobAllVisible,
    (state) =>
      ({
        ['isStep']: state.isStep,
        ['isScript']: state.isScript,
        ['isJudgeRules']: state.isJudgeRules,
      }[name as string] ?? false)
  );
export const selectRemoteJobStepConfig = (state: RootState) => state.remoteJob.stepConfig;
export const selectRemoteJobAllCurrentStep = (state: RootState) => state.remoteJob.currentStep;

export default remoteJob.reducer;
