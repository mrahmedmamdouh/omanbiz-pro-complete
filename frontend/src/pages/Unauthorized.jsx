import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldExclamationIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="text-center">
        <ShieldExclamationIcon className="mx-auto h-24 w-24 text-red-500" />
        <h1 className="text-3xl font-bold text-gray-900 mt-4">Unauthorized</h1>
        <p className="text-gray-600 mt-2 mb-8">
          You don't have permission to access this page.
        </p>
        <Link
          to="/dashboard"
          className="btn-primary"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Go back to dashboard
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;