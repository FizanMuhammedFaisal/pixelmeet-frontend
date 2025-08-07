import { FormProvider, useForm } from 'react-hook-form';

type Props = {
  children: React.ReactNode;
};

export const FormProviderComponent = ({ children }: Props) => {
  const methords = useForm();
  return <FormProvider {...methords}>{children}</FormProvider>;
};
