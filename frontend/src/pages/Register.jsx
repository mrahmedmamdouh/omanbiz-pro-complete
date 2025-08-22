import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { BuildingOfficeIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const schema = yup.object({
  firstName: yup.string().min(2, 'First name must be at least 2 characters').required('First name is required'),
  lastName: yup.string().min(2, 'Last name must be at least 2 characters').required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().matches(/^[0-9]{8,15}$/, 'Phone number must contain 8-15 digits only').required('Phone number is required'),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
      'Password must contain uppercase, lowercase, number, and special character')
    .required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
  businessName: yup.string().min(2, 'Business name must be at least 2 characters').required('Business name is required'),
  businessType: yup.string().required('Business type is required'),
  industry: yup.string().required('Industry is required'),
  city: yup.string().required('City is required'),
  agreeToTerms: yup.boolean().oneOf([true], 'You must agree to the terms and conditions'),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: registerUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

const onSubmit = async (data) => {
  console.log('Registration form data:', data); // Debug log
  
  const userData = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    password: data.password,
    businessData: {
      businessName: data.businessName,
      businessType: data.businessType,
      industry: data.industry,
      description: data.description || '',
      address: {
        street: data.street || '',
        city: data.city,
        state: data.state || 'Muscat',
        country: 'Oman',
        postalCode: data.postalCode || ''
      }
    }
  };

  console.log('Sending registration data:', userData); // Debug log

  try {
    const result = await registerUser(userData);
    
    console.log('Registration result:', result); // Debug log
    
    if (result.success) {
      toast.success('Registration successful! Welcome to OmanBiz Pro');
      navigate('/dashboard', { replace: true });
    } else {
      console.error('Registration failed:', result.error);
      toast.error(result.error || 'Registration failed');
    }
  } catch (error) {
    console.error('Registration error:', error);
    const errorMessage = error.response?.data?.error?.message || 
                        error.message || 
                        'Registration failed. Please try again.';
    toast.error(errorMessage);
  }
};
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="mx-auto h-12 w-auto flex justify-center">
            <BuildingOfficeIcon className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-blue-600">OmanBiz Pro</h1>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Create your business account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in here
            </Link>
          </p>
        </div>

        <div className="card">
          <div className="card-body">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input
                      {...register('firstName')}
                      type="text"
                      className={`form-input ${errors.firstName ? 'border-red-300' : ''}`}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                      <p className="form-error">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      {...register('lastName')}
                      type="text"
                      className={`form-input ${errors.lastName ? 'border-red-300' : ''}`}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                      <p className="form-error">{errors.lastName.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      className={`form-input ${errors.email ? 'border-red-300' : ''}`}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="form-error">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="form-label">
                      Phone Number
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      className={`form-input ${errors.phone ? 'border-red-300' : ''}`}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && (
                      <p className="form-error">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        {...register('password')}
                        type={showPassword ? 'text' : 'password'}
                        className={`form-input pr-10 ${errors.password ? 'border-red-300' : ''}`}
                        placeholder="Create a password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="form-error">{errors.password.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        {...register('confirmPassword')}
                        type={showConfirmPassword ? 'text' : 'password'}
                        className={`form-input pr-10 ${errors.confirmPassword ? 'border-red-300' : ''}`}
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="form-error">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Business Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="businessName" className="form-label">
                      Business Name
                    </label>
                    <input
                      {...register('businessName')}
                      type="text"
                      className={`form-input ${errors.businessName ? 'border-red-300' : ''}`}
                      placeholder="Enter your business name"
                    />
                    {errors.businessName && (
                      <p className="form-error">{errors.businessName.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="businessType" className="form-label">
                      Business Type
                    </label>
                    <select
                      {...register('businessType')}
                      className={`form-input ${errors.businessType ? 'border-red-300' : ''}`}
                    >
                      <option value="">Select business type</option>
                      <option value="llc">LLC</option>
                      <option value="corporation">Corporation</option>
                      <option value="partnership">Partnership</option>
                      <option value="sole_proprietorship">Sole Proprietorship</option>
                    </select>
                    {errors.businessType && (
                      <p className="form-error">{errors.businessType.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="industry" className="form-label">
                      Industry
                    </label>
                    <select
                      {...register('industry')}
                      className={`form-input ${errors.industry ? 'border-red-300' : ''}`}
                    >
                      <option value="">Select industry</option>
                      <option value="retail">Retail</option>
                      <option value="services">Services</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="construction">Construction</option>
                      <option value="technology">Technology</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="education">Education</option>
                      <option value="hospitality">Hospitality</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.industry && (
                      <p className="form-error">{errors.industry.message}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="city" className="form-label">
                      City
                    </label>
                    <input
                      {...register('city')}
                      type="text"
                      className={`form-input ${errors.city ? 'border-red-300' : ''}`}
                      placeholder="Enter your city"
                    />
                    {errors.city && (
                      <p className="form-error">{errors.city.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  {...register('agreeToTerms')}
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-900">
                  I agree to the{' '}
                  <Link to="/terms" className="text-blue-600 hover:text-blue-500">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-blue-600 hover:text-blue-500">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="form-error">{errors.agreeToTerms.message}</p>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary btn-lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="loading-spinner mr-2 !h-4 !w-4 !border-white"></div>
                      Creating account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;