import { css } from '@emotion/react';
import { Checkbox, Popconfirm, Space, Table } from 'antd';
import { TableRowSelection } from 'antd/lib/table/interface';
import React, { useCallback } from 'react';
import useRemoteJobSteps from '../../../hooks/remoteJob/useRemoteJobSteps';
import { TableColumnTitle } from '../../../lib/util/commonStyle';
import { compareTableItem } from '../../../lib/util/compareTableItem';
import { TableColumnPropsType } from '../../../types/common';
import { RemoteJobStepDetailState, RemoteJobType } from '../../../types/Job';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import TableTitle from '../../atoms/TableTitle';
import { blue } from '@ant-design/colors';
import RemoteJobStepsDrawer from './Modal/RemoteJobStepsDrawer';
export type RemoteJobStepsProps = {};

export default function RemoteJobSteps({}: RemoteJobStepsProps): JSX.Element {
  const {
    stepList,
    enableList,
    setEnableList,
    onChangeEnable,
    onToggleAllEnable,
    openAddStepDrawer,
    openEditStepDrawer,
    form,
  } = useRemoteJobSteps();

  const AllCheckEnable = () => (
    <Checkbox
      checked={enableList && enableList.length ? true : false}
      indeterminate={stepList && enableList && enableList.length > 0 && enableList.length < stepList.length}
      onChange={onToggleAllEnable}
    />
  );

  const rowSelection: TableRowSelection<RemoteJobStepDetailState> = {
    type: 'checkbox',
    selectedRowKeys: enableList as number[],
    onChange: onChangeEnable,
    columnTitle: AllCheckEnable,
  };

  const onCell = (record: RemoteJobStepDetailState, rowIndex: number | undefined) => ({
    onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (enableList.find((item) => item === record.index) !== undefined) {
        setEnableList(enableList.filter((item) => item !== record.index) as number[]);
      } else {
        setEnableList(enableList.concat(record.index) as number[]);
      }
    },
  });

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
            <div>{`- Registered Remote Job Step List : ${stepList?.length ?? 0}`}</div>
          </Space>
        }
        btn1={btn1}
      />
    );
  }, [stepList]);

  const editRender = useCallback(
    (value: number, record: RemoteJobStepDetailState, index: number) => {
      return (
        <Popconfirm
          title="Are you sure to edit this step?"
          onConfirm={() => openEditStepDrawer(record)}
          okText="Ok"
          cancelText="Cancel"
        >
          <EditOutlined css={iconStyle} />
        </Popconfirm>
      );
    },
    [openEditStepDrawer]
  );

  const deleteRender = useCallback((value: number, record: RemoteJobStepDetailState, index: number) => {
    return (
      <Popconfirm
        title="Are you sure to delete this step?"
        onConfirm={() => {}}
        onCancel={() => {}}
        okText="Ok"
        cancelText="Cancel"
      >
        <DeleteOutlined css={iconStyle} />
      </Popconfirm>
    );
  }, []);

  return (
    <div css={style}>
      <Table<RemoteJobStepDetailState>
        rowKey={'index'}
        rowSelection={rowSelection}
        dataSource={stepList ?? []}
        bordered
        title={renderTitle}
        size="middle"
        pagination={{
          position: ['bottomCenter'],
        }}
        // onRow={onRow}
        tableLayout="fixed"
      >
        <Table.Column<RemoteJobStepDetailState> {...setpColumnProps.stepName} width={300} onCell={onCell} />
        <Table.Column<RemoteJobStepDetailState> {...setpColumnProps.description} width={500} onCell={onCell} />
        <Table.Column<RemoteJobStepDetailState> {...setpColumnProps.edit} width={80} render={editRender} />
        <Table.Column<RemoteJobStepDetailState> {...setpColumnProps.delete} width={80} render={deleteRender} />
      </Table>
      <RemoteJobStepsDrawer form={form} />
    </div>
  );
}

const style = css``;

const iconStyle = css`
  cursor: pointer;
  &:hover {
    color: ${blue[4]};
  }
  &:active {
    color: ${blue[6]};
  }
`;

type StepColumnName = 'stepName' | 'description' | 'edit' | 'delete';

const setpColumnProps: TableColumnPropsType<RemoteJobStepDetailState, StepColumnName> = {
  stepName: {
    key: 'stepName',
    title: <TableColumnTitle>Step Name</TableColumnTitle>,
    dataIndex: 'stepName',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'stepName'),
    },
  },
  description: {
    key: 'description',
    title: <TableColumnTitle>Description</TableColumnTitle>,
    dataIndex: 'description',
    align: 'center',
    sorter: {
      compare: (a, b) => compareTableItem(a, b, 'description'),
    },
  },
  edit: {
    key: 'edit',
    title: <TableColumnTitle>Edit</TableColumnTitle>,
    dataIndex: 'index',
    align: 'center',
  },
  delete: {
    key: 'delete',
    title: <TableColumnTitle>Delete</TableColumnTitle>,
    dataIndex: 'index',
    align: 'center',
  },
};
