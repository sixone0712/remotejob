import { FormInstance, RadioChangeEvent } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { FormRemoteJobStepsDrawer } from './useRemoteJobStepsDrawer';

export default function useRemoteJobStepsDrawerExcute({ form }: { form: FormInstance<FormRemoteJobStepsDrawer> }) {
  const [timeMoment, setTimeMoment] = useState<moment.Moment | null>(null);
  const [time, setTime] = useState<string[]>([]);
  const [mode, setMode] = useState<'time' | 'cycle' | 'pre' | 'next'>('time');

  const onChangeTime = useCallback(
    (time: string[]) => {
      setTime(time);
      form.setFieldsValue({
        time,
      });
    },
    [form]
  );

  const onChangeTimeMoment = useCallback(
    (value: moment.Moment | null, dateString: string) => {
      if (time.findIndex((item) => item === dateString) === -1) {
        onChangeTime([...time, dateString]);
      }
      setTimeMoment(null);
    },
    [time, onChangeTime]
  );

  const setExcuteMode = useCallback((e: RadioChangeEvent) => {
    setMode(e.target.value);
  }, []);

  useEffect(() => {
    setMode(form.getFieldValue('mode') ?? 'time');
    setTime(form.getFieldValue('time') ?? []);
  }, []);

  return { excuteMode: mode, setExcuteMode, timeMoment, onChangeTimeMoment, time, onChangeTime };
}
