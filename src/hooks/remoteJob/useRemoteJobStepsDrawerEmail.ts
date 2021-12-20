import { FormInstance } from 'antd';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce/lib';
import { searchAddressEmailAndGroup } from '../../lib/api/axios/requests';
import { AddressOption } from '../../types/address';
import { FormRemoteJobStepsDrawer } from './useRemoteJobStepsDrawer';

export default function useRemoteJobStepsDrawerEmail({ form }: { form: FormInstance<FormRemoteJobStepsDrawer> }) {
  const [recipient, setRecipient] = useState<AddressOption[]>();
  const [isEnableEmail, setIsEnableEmailState] = useState(false);
  const selectRef = useRef<any>(null);

  const onChangeSubject = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      form.setFieldsValue({
        subject: e.target.value,
      });
    },
    [form]
  );

  const onChangeBody = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      form.setFieldsValue({
        body: e.target.value,
      });
    },
    [form]
  );

  const deboundcedSearch = useDebouncedCallback((value: string, callback: any) => {
    if (!value) {
      callback([]);
    } else {
      searchAddressEmailAndGroup(value).then((res) => {
        const newList = res.map((item) => ({
          ...item,
          label: item.group ? `@${item.name}` : `${item.name} <${item.email}>`,
          value: `${item.id}`,
        }));
        callback(newList);
      });
    }
  }, 300);

  const onChangeSelectEmail = useCallback(
    (recipient: any) => {
      form.setFieldsValue({
        recipient: recipient as AddressOption[],
      });
      setRecipient(recipient as AddressOption[]);
    },
    [form]
  );

  const onCreateCustomEmail = useCallback(
    (value: string) => {
      const newRecipient: AddressOption = {
        id: 0,
        name: value,
        email: value,
        group: false,
        label: value,
        value: value,
      };

      const recipient = form.getFieldValue('recipient');

      form.setFieldsValue({
        recipient: [...recipient, newRecipient],
      });
      setRecipient([...recipient, newRecipient]);
    },
    [form]
  );

  const onSelectEscKeyPress = useCallback((e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Escape') selectRef.current.blur();
  }, []);

  const setEnableEmail = useCallback(
    (checked: boolean, event: MouseEvent) => {
      form.setFieldsValue({
        isEmail: checked,
      });
      setIsEnableEmailState(checked);
    },
    [form]
  );

  useEffect(() => {
    setIsEnableEmailState(form.getFieldValue('isEmail') ?? false);
    setRecipient(form.getFieldValue('recipient') ?? []);
  }, []);

  return {
    recipient,
    selectRef,
    onChangeSubject,
    onChangeBody,
    deboundcedSearch,
    onChangeSelectEmail,
    onCreateCustomEmail,
    onSelectEscKeyPress,
    isEnableEmail,
    setEnableEmail,
  };
}
