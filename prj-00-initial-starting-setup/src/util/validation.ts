export interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export function validate(validatableInput: Validatable) {
  let isValid = true;
  let inputLength = validatableInput.value.toString().trim().length;

  if (validatableInput.required) {
    isValid = isValid && inputLength !== 0;
  }

  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value == "string"
  ) {
    isValid = isValid && inputLength > validatableInput.minLength;
  }

  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value == "string"
  ) {
    isValid = isValid && inputLength < validatableInput.maxLength;
  }

  if (
    validatableInput.min != null &&
    typeof validatableInput.value == "number"
  ) {
    isValid = isValid && validatableInput.value > validatableInput.min;
  }

  if (
    validatableInput.max != null &&
    typeof validatableInput.value == "number"
  ) {
    isValid = isValid && validatableInput.value > validatableInput.max;
  }

  return isValid;
}

//end-validation
