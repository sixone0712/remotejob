import { AddressOption } from './address';

export interface EmailBook {
  id: number;
  name: string;
  email: string;
  group: boolean;
}

export type JobType = 'remote' | 'local';
export type RemoteJobType = 'add' | 'edit';
export type JobStepType = 'collect' | 'convert' | 'summary' | 'cras' | 'version' | 'purge' | 'notice' | 'custom';
export type JobStatusType = 'success' | 'failure' | 'nodata' | 'processing' | 'notbuild' | 'canceled';
export type JobCycleType = 'hour' | 'minute' | 'day';
export type JobModeType = 'cycle' | 'time' | 'pre' | 'next';
export type JobScriptType = 'python' | 'shell';

export type PlanStatusType = 'registered' | 'collecting' | 'collected' | 'suspended' | 'halted' | 'completed';
export const REMOTE_JOB_STEP = {
  PLANS: 0,
  STEPS: 1,
  CHECK: 2,
};

// 1. GET Remote Job List
// GET /api/v1/status/job/remote
// RemoteJobStatus[]
export interface RemoteJobStatusState {
  index?: number;
  jobId: number;
  siteId: number;
  stop: boolean;
  companyName: string;
  fabName: string;
  companyFabName?: string;
  jobName: string;
  lastSuccess: BuildHistoryState;
  lastFailure: BuildHistoryState;
}

export interface BuildHistoryState {
  stepId: number;
  enable: boolean;
  description: string;
  historyId: string;
  stepType: JobStepType;
  stepName: string;
  endDate: string;
}

// 2. GET Remote Job Step Status Info
// GET /api/v1/status/job/remote/{jobId}/step
// RemoteJobStepStatus[]
export interface RemoteJobStepStatus {
  jobId: number;
  stepId: number;
  status: JobStatusType;
  error: string[];
  stepName: string;
  stepType: JobStepType;
  description: string;
  lastSuccess: BuildHistoryState;
  lastFailure: BuildHistoryState;
  enable: boolean;
}

// 3. GET Remote Job Build Queue Info : 앞으로 계획
// GET /api/v1/status/job/remote/{jobId}/buildqueue
// 4. GET Remote Job Build Executor Status Info : 현재 processing 것만 표시
// GET /api/v1/status/job/remote/{jobId}/buildexecutor
// RemoteBuildQueueStatus[]
export interface RemoteBuildQueueStatus {
  date: string;
  stepName: string;
  stepType: JobStepType;
  manual: boolean;
}

// 5. GET Remote Job Detail Info
// GET /api/v1/job/remote/{jobId}
export interface RemoteJobDetailState {
  jobId: number | null;
  jobName: string | null;
  siteId: number | null;
  siteName: string | null;
  planIds: number[];
  steps: RemoteJobStepDetailState[];
}

// 6. GET Remote Job Step Info
// GET /api/v1/job/remote/{jobId}/step/{stepId}

export interface RemoteJobStepDetailState {
  index?: number;
  jobId: number | null;
  stepId: number | null;
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
  customEmails: string[];
  emailBook: AddressOption[];
  groupBook: AddressOption[];
  subject: string | null;
  body: string | null;
  before: number | null;
  selectJudgeRules: SelectJudgeRule[];
  description: string | null;
  scriptType: JobScriptType | null;
  script: string | null;
}

export interface SelectJudgeRule {
  itemId: number;
  itemName: string;
  enable: boolean;
}

// 7. GET Remote Job Enable Step
// GET /api/v1/job/remote/{jobId}/step/enable
export interface RemoteJobStepEnable {
  stepId: number;
  enable: boolean;
  stepName: string;
  stepType: JobStepType;
}

// 8. Add Remote Job Step
// POST /api/v1/job/remote/step
// RemoteJobStepDetailState

export interface ReqRemoteJobStep {
  stepId: number;
  enable: boolean;
}

export interface ReqRemoteJob {
  siteId: number;
  jobName: string;
  planIds: number[];
  steps: ReqRemoteJobStep[];
}

///////////////////////////////
export interface RemoteJobJudgeRule {
  itemId: number;
  itemName: string;
  enable: boolean;
}

export interface TransferRemoteJobJudgeRule extends RemoteJobJudgeRule {
  key: string;
}

export interface RemoteJobPlanDetailState {
  index?: number;
  planId: number;
  planName: string;
  planType: string;
  machineNames: string[];
  targetNames: string[];
  description: string;
  status: string;
  error: string;
  measure: string;
  detail: PlanStatusType;
  machineCount?: number;
  targetCount?: number;
}
