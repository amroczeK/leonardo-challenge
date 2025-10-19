import React from "react";

type FieldErrorProps = {
  errorId: string;
  isError: boolean;
  errorMessage: string;
};

function FieldError({ errorId, isError, errorMessage }: FieldErrorProps) {
  if (!isError) {
    return null;
  }

  return (
    <p id={errorId} className="text-sm text-red-600">
      {errorMessage}
    </p>
  );
}

export default FieldError;
