import { userLogin, userSignUp } from '@/services/postRequest';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { addLoginToken } from '@/services/storageUtils';
import useGetUserDeatil from '@/common/hook/useGetUserDeatil';
import { useRouter, useSearchParams } from 'next/navigation';
import { useStateContext } from '@/store';

function useSignupAuth({ setToast }) {
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
      const response = await userSignUp(value);
      const { data = {} } = response || {};
      const { user: userInfo, accessToken } = data || {};
      const token = data?.user?.token;

      dispatch({ type: 'SET_USER', payload: userInfo });
      addLoginToken(token);
      setLoading(false);
      getUser();
      setToast({
        showToast: true,
        message: ` Signed Up Successfully`,
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

export default useSignupAuth;
