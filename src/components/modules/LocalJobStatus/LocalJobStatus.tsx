import React from 'react';
import { css } from '@emotion/react';

export type LocalJobStatusProps = {
  children?: React.ReactNode;
};

export default function LocalJobStatus({ children }: LocalJobStatusProps): JSX.Element {
  return <div css={style}>LocalJobStatus</div>;
}

const style = css``;
