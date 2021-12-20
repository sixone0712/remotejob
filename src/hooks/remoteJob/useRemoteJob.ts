import queryString from 'query-string';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getRemoteJobInfo } from '../../lib/api/axios/requests';
import { QUERY_KEY } from '../../lib/api/query/queryKey';
import { PAGE_URL } from '../../lib/constants';
import { openNotification } from '../../lib/util/notification';
import {
  remoteJobInitReducer,
  selectRemoteJobInfo,
  remoteJobInfoReducer,
  remoteStepsInfoReducer,
} from '../../reducers/slices/remoteJob';
import { RemoteJobDetailState, RemoteJobType, REMOTE_JOB_STEP } from '../../types/Job';

export function useRemoteJob({ type }: { type: RemoteJobType }) {
  const { search } = useLocation();
  const { sid: siteId, jid: jobId, name: jobName } = queryString.parse(search);
  const history = useHistory();
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(REMOTE_JOB_STEP.PLANS);
  const selectJob = useSelector(selectRemoteJobInfo);

  const { data: jobData, isFetching: isFetchingJobData } = useQuery<RemoteJobDetailState>(
    [QUERY_KEY.JOB_REMOTE_JOB_INFO, selectJob.jobId],
    () => getRemoteJobInfo(selectJob.jobId as number),
    {
      enabled: Boolean(selectJob.jobId) && type === 'edit',
      onError: () => {
        openNotification('error', 'Error', `Failed to get remote job information "${selectJob.jobName}".`);
      },
      onSuccess: (data) => {
        const { jobId, jobName, planIds, siteId, siteName, steps } = data;
        dispatch(remoteJobInfoReducer({ jobId, jobName, planIds, siteId, siteName }));
        dispatch(remoteStepsInfoReducer(steps));
      },
    }
  );

  const onBack = useCallback(() => {
    history.push(PAGE_URL.STATUS_REMOTE);
  }, [history]);

  const onNextAction = useCallback(async () => {
    return true;
  }, []);

  const disabledNext = useMemo(() => false, []);

  useEffect(() => {
    dispatch(remoteJobInitReducer());
  }, []);

  useEffect(() => {
    if (type === 'edit' && siteId && jobId && jobName) {
      dispatch(
        remoteJobInfoReducer({
          siteId: +siteId,
          jobId: +jobId,
          jobName: jobName as string,
        })
      );
    }
  }, [type, siteId, jobId, jobName]);

  return {
    current,
    setCurrent,
    onBack,
    onNextAction,
    disabledNext,
  };
}
