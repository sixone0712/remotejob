import React from 'react';
import { css } from '@emotion/react';

export type LocalJobProps = {
  children?: React.ReactNode;
};

export default function LocalJob({ children }: LocalJobProps): JSX.Element {
  return <div css={style}>LocalJob</div>;
}

const style = css``;
