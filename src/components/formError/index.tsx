import React from "react";

interface IFormErrorProps {
  errorMessage: string;
}

const FormError = ({ errorMessage }: IFormErrorProps) => {
  return <span className="formError p-1 text-red-600">{errorMessage}</span>;
};

export default FormError;
