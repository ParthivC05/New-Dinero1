import { userLogin } from '@/services/postRequest';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { addLoginToken } from '@/services/storageUtils';
import useGetUserDeatil from '@/common/hook/useGetUserDeatil';
import { useRouter, useSearchParams } from 'next/navigation';
import { useStateContext } from '@/store';

function useLogin({ setToast }) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isLoading },
  } = useForm();
  const { dispatch } = useStateContext();
  const { getUser } = useGetUserDeatil();
  const router = useRouter();

  const onSubmit = async (value) => {
    setLoading(true);
    try {
      const response = await userLogin(value);
      const { data = {} } = response || {};
      console.log('response', response);
      const { user: userInfo, accessToken } = data || {};
      const token = accessToken;

      dispatch({ type: 'SET_USER', payload: userInfo });
      addLoginToken(token);
      setLoading(false);
      getUser();
      setToast({
        showToast: true,
        message: ` Logged In Successfully`,
        status: 'success',
      });
      router.push('/');
    } catch (error) {
      const fallbackMessage = 'Access denied, VPN  detected.';

      const apiMessage =
        error?.response?.data?.error ||
        error?.errors?.message ||
        error?.message ||
        fallbackMessage;
      //using custom toast
      setToast({
        showToast: true,
        message: apiMessage,
        status: 'error',
      });
    //   //sending errors to the form
    //   setError('username', {
    //     type: 'manual',
    //     message: apiMessage,
    //   });
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    isLoading,
    errors,
  };
}

export default useLogin;
