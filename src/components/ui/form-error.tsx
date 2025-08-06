type Props = {
  message?: string;
};
export const FormError = ({ message }: Props) => {
  if (message) return null;
  return (
    <div>
      <p className="text-red-500 text-sm"> {message}</p>
    </div>
  );
};
