import { userLogin, userSignUp } from '@/services/postRequest';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { addLoginToken } from '@/services/storageUtils';
import useGetUserDeatil from '@/common/hook/useGetUserDeatil';
import { useRouter, useSearchParams } from 'next/navigation';
import { useStateContext } from '@/store';
import Swal from 'sweetalert2';

function useSignupAuth() {
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
      Swal.fire({
        icon: 'success',
        title: 'Signed Up Successfully',
        showConfirmButton: false,
        timer: 1500,
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
      Swal.fire({
        icon: 'error',
        title: apiMessage,
        showConfirmButton: false,
        timer: 1500,
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
