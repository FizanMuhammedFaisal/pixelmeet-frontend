import React from 'react';
import { QueryProvider } from './QueryProvider';

import { GoogleProvider } from './GoogleAuthProvider';
import { ThemeProvider } from './ThemeProvider';
import { FormProviderComponent } from './FormProvider';

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <>
      <QueryProvider>
        <FormProviderComponent>
          <ThemeProvider>
            <GoogleProvider>{children}</GoogleProvider>
          </ThemeProvider>
        </FormProviderComponent>
      </QueryProvider>
    </>
  );
};
