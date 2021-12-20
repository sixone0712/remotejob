import { Modal } from 'antd';
import { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getStatusRemoteJob, getStatusRemoteJobStop } from '../../lib/api/axios/requests';
import { QUERY_KEY } from '../../lib/api/query/queryKey';
import { PAGE_URL } from '../../lib/constants';
import { openNotification } from '../../lib/util/notification';
import { LoginUserSelector } from '../../reducers/slices/loginUser';
import { RemoteJobStatusState } from '../../types/Job';

export default function useRemoteJobStatus() {
  const history = useHistory();
  const [isError, setError] = useState(false);
  const loggedInUser = useSelector(LoginUserSelector);

  const { data, isFetching, refetch } = useQuery<RemoteJobStatusState[]>(
    [QUERY_KEY.STATUS_REMOTE_LIST],
    getStatusRemoteJob,
    {
      refetchInterval: 3000,
      onError: () => {
        if (!isError) {
          openNotification('error', 'Error', `Failed to response the status of remote`);
          setError(true);
        }
      },
      onSuccess: () => {
        setError(false);
      },
    }
  );

  const moveToRemoteJobAdd = useCallback(() => {
    history.push(PAGE_URL.STATUS_REMOTE_ADD);
  }, [history]);

  const moveToRemoteJobEdit = useCallback(
    ({ jobId, siteId, jobName }: { jobId: number; siteId: number; jobName: string }) => {
      history.push(PAGE_URL.STATUS_REMOTE_EDIT({ jobId, siteId, jobName }));
    },
    [history]
  );

  const openEditeModal = useCallback(
    ({ jobId, siteId, jobName, prevStop }: { jobId: number; siteId: number; jobName: string; prevStop: boolean }) => {
      let isMoveEdit = false;
      const confirm = Modal.confirm({
        className: 'edit_remote_job',
        title: 'Edit Remote Job',
        content: `Are you sure to edit remote job '${jobName}'?`,
        onOk: async () => {
          diableCancelBtn();
          try {
            const { stop } = await getStatusRemoteJobStop(jobId);
            if (prevStop !== stop) {
              openNotification(
                'error',
                'Error',
                `The information of remote job '${jobName}' on the server has been changed. So, run the update. please try again!`
              );
            } else {
              if (stop) {
                isMoveEdit = true;
              } else {
                openNotification('error', 'Error', `After Stop remote job '${jobName}', please try again!`);
              }
            }
          } catch (e) {
            openNotification('error', 'Error', `Failed to edit remote job '${jobName}'!`);
          } finally {
            if (isMoveEdit) {
              moveToRemoteJobEdit({ jobId, siteId, jobName });
            } else {
              refetch();
            }
          }
        },
      });

      const diableCancelBtn = () => {
        confirm.update({
          cancelButtonProps: {
            disabled: true,
          },
        });
      };
    },
    [moveToRemoteJobEdit, refetch]
  );

  return {
    data,
    isFetching,
    isError,
    loggedInUser,
    openEditeModal,
  };
}
