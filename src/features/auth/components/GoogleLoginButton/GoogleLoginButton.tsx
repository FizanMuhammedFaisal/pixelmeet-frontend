import React from 'react'
import {
  GoogleLogin,
  type CredentialResponse,
  useGoogleOneTapLogin
} from '@react-oauth/google'

interface GoogleAuthProps {
  onLoginSuccess: (credential: CredentialResponse) => void
  onLoginError?: () => void
  enableOneTap?: boolean
}

const GoogleAuthButton: React.FC<GoogleAuthProps> = ({
  onLoginSuccess,
  onLoginError = () => {},
  enableOneTap = true
}) => {
  useGoogleOneTapLogin({
    onSuccess: onLoginSuccess,
    onError: onLoginError,
    disabled: !enableOneTap
  })

  return (
    <div className='w-full flex justify-center'>
      <GoogleLogin
        onSuccess={onLoginSuccess}
        onError={onLoginError}
        useOneTap={enableOneTap}
        type='standard'
        theme='outline'
        size='large'
        text='continue_with'
        shape='rectangular'
        logo_alignment='left'
        locale='en'
        auto_select={true}
      />
    </div>
  )
}

export default GoogleAuthButton
