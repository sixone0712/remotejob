import { blue } from '@ant-design/colors';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Empty, Result, Space, Table } from 'antd';
import React, { useCallback } from 'react';
import useRemoteJobStatus from '../../../hooks/remoteJob/useRemoteJobStatus';
import { TableColumnTitle } from '../../../lib/util/commonStyle';
import { compareTableItem } from '../../../lib/util/compareTableItem';
import { TableColumnPropsType } from '../../../types/common';
import { BuildHistoryState, RemoteJobStatusState } from '../../../types/Job';
import CustomIcon from '../../atoms/CustomIcon';
import TableTitle from '../../atoms/TableTitle';
export type RemoteJobStatusProps = {};

export default function RemoteJobStatus({}: RemoteJobStatusProps): JSX.Element {
  const { data, isError, loggedInUser, openEditeModal } = useRemoteJobStatus();
  const indexRender = useCallback((value: number, record: RemoteJobStatusState, index: number) => {
    return value + 1;
  }, []);

  const jobNameRender = useCallback((value: string, record: RemoteJobStatusState, index: number) => {
    return (
      <div>
        <div className="value">{value}</div>
      </div>
    );
  }, []);

  const lastResultRender = useCallback((value: BuildHistoryState, record: RemoteJobStatusState, index: number) => {
    const { stepName, endDate, historyId } = value;
    return (
      <div css={iconStyle(Boolean(value))}>
        <div className="value">
          <div>{stepName}</div>
          <div>{`(${endDate})`}</div>
          {/* <div className="value">{`${endDate} (${endDate})`}</div> */}
        </div>
      </div>
    );
  }, []);

  const statusRender = useCallback(
    (value: boolean, record: RemoteJobStatusState, index: number) => {
      const { jobId, siteId, jobName, stop: prevStop } = record;
      if (value)
        return (
          <div css={statusIconStyle(loggedInUser.roles.isRoleJob)}>
            <CustomIcon className="stopped" name="stop" />
            <span className="text" onClick={() => {}}>
              Stopped
            </span>
          </div>
        );
      else
        return (
          <div css={statusIconStyle(loggedInUser.roles.isRoleJob)} onClick={() => {}}>
            <CustomIcon className="running" name="play" />
            <span className="text">Running</span>
          </div>
        );
    },
    [loggedInUser]
  );

  const editRender = useCallback(
    (value: number, record: RemoteJobStatusState, index: number) => {
      const { jobId, siteId, jobName, stop: prevStop } = record;
      return loggedInUser.roles.isRoleJob ? (
        <EditOutlined css={iconStyle()} onClick={() => openEditeModal({ jobId, siteId, jobName, prevStop })} />
      ) : (
        <div>-</div>
      );
    },
    [loggedInUser, openEditeModal]
  );

  const deleteRender = useCallback(
    (value: number, record: RemoteJobStatusState, index: number) => {
      const { jobId, siteId, jobName, stop: prevStop } = record;
      return loggedInUser.roles.isRoleJob ? <DeleteOutlined css={iconStyle()} onClick={() => {}} /> : <div>-</div>;
    },
    [loggedInUser]
  );

  const renderTitle = useCallback(() => {
    const btn1 = {
      icon: <PlusOutlined />,
      // toolTip: 'Add',
      onClick: () => {},
      name: 'Add',
    };

    return (
      <TableTitle
        title={
          <Space>
            <div>{`- Registered Remote Job List : ${data?.length ?? 0}`}</div>
          </Space>
        }
        btn1={btn1}
      />
    );
  }, [data]);

  return (
    <div css={style}>
      <>
        <Table<RemoteJobStatusState>
          rowKey={'jobId'}
          dataSource={data}
          bordered
          title={renderTitle}
          size="middle"
          pagination={{
            position: ['bottomCenter'],
            showSizeChanger: true,
          }}
          css={tableStyle}
          locale={{
            emptyText: isError ? (
              <Result title="Failed to response data" status="warning" />
            ) : (
              <Empty description="No Data" />
            ),
          }}
        >
          <Table.Column<RemoteJobStatusState> {...remoteColumnProps.index} render={indexRender} />
          <Table.Column<RemoteJobStatusState> {...remoteColumnProps.jobName} render={jobNameRender} />
          <Table.Column<RemoteJobStatusState> {...remoteColumnProps.companyFabName} />
          <Table.Column<RemoteJobStatusState> {...remoteColumnProps.lastSuccess} render={lastResultRender} />
          <Table.Column<RemoteJobStatusState> {...remoteColumnProps.lastFailure} render={lastResultRender} />
          <Table.Column<RemoteJobStatusState> {...remoteColumnProps.stop} render={statusRender} />
          <Table.Column<RemoteJobStatusState> {...remoteColumnProps.edit} render={editRender} />
          <Table.Column<RemoteJobStatusState> {...remoteColumnProps.delete} render={deleteRender} />
        </Table>
      </>
    </div>
  );
}

const style = css``;

const tableStyle = css`
  width: 86rem;
`;

export type RemoteJobStatusColumnName =
  | 'index'
  | 'jobName'
  | 'companyFabName'
  | 'lastSuccess'
  | 'lastFailure'
  | 'stop'
  | 'edit'
  | 'delete';

const remoteColumnProps: TableColumnPropsType<RemoteJobStatusState, RemoteJobStatusColumnName> = {
  index: {
    key: 'index',
    title: <TableColumnTitle>No</TableColumnTitle>,
    dataIndex: 'index',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'index'),
    },
    width: 90,
  },
  jobName: {
    key: 'jobName',
    title: <TableColumnTitle>Job Name</TableColumnTitle>,
    dataIndex: 'jobName',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'jobName'),
    },
    width: 200,
  },
  companyFabName: {
    key: 'companyFabName',
    title: <TableColumnTitle>User-Fab Name</TableColumnTitle>,
    dataIndex: 'companyFabName',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'companyFabName'),
    },
    width: 200,
  },
  lastSuccess: {
    key: 'lastSuccess',
    title: <TableColumnTitle>Last Success</TableColumnTitle>,
    dataIndex: 'lastSuccess',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a.lastSuccess, b.lastSuccess, 'endDate'),
    },
    width: 289,
  },
  lastFailure: {
    key: 'lastFailure',
    title: <TableColumnTitle>Last Failure</TableColumnTitle>,
    dataIndex: 'lastFailure',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a.lastFailure, b.lastFailure, 'endDate'),
    },
    width: 289,
  },
  stop: {
    key: 'stop',
    title: <TableColumnTitle>Status</TableColumnTitle>,
    dataIndex: 'stop',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'stop'),
    },
    width: 120,
  },
  edit: {
    key: 'edit',
    title: <TableColumnTitle>Edit</TableColumnTitle>,
    dataIndex: 'jobId',
    align: 'center',
    width: 85,
  },
  delete: {
    key: 'delete',
    title: <TableColumnTitle>Delete</TableColumnTitle>,
    dataIndex: 'jobId',
    align: 'center',
    width: 85,
  },
};

const statusIconStyle = (isJob: boolean) => css`
  pointer-events: ${!isJob && 'none'};
  .running {
    color: #52c41a;
    -webkit-animation: blink 1s ease-in-out infinite alternate;
    animation: blink 1s ease-in-out infinite alternate;
    @keyframes blink {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }

  .stopped {
    color: #ff4d4f;
  }
  .text {
    cursor: ${isJob ? 'pointer' : 'default'};
    &:hover {
      color: ${isJob && blue[4]};
    }
    &:active {
      color: ${isJob && blue[6]};
    }
    margin-left: 0.3rem;
  }
`;

const iconStyle = (enable = true) => css`
  ${enable
    ? css`
        cursor: pointer;
        &:hover {
          color: ${blue[4]};
        }
        &:active {
          color: ${blue[6]};
        }
      `
    : css`
        cursor: not-allowed;
        .value {
          pointer-events: none;
        }
      `}
`;
