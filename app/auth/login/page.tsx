import LoginForm from '@/components/auth/LoginForm';
import React from 'react';

const Page = () => {
  return (
    <div className='w-full px-2 py-2 md:w-[30%] m-auto mt-10'>
      <h1 className='text-2xl px-10 py-10 text-center'>Login</h1>
      <LoginForm></LoginForm>
    </div>
  );
};

export default Page
