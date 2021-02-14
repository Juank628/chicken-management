export const isNumber = (value, min = -Infinity, max = Infinity) => {
  const errors = [];
  if (isNaN(value) || value === "") {
    errors.push("debe ingresar un número");
  }
  if (value < min) {
    errors.push(`el valor mínimo es ${min}`);
  }
  if (value > max) {
    errors.push(`el valor máximo es ${max}`);
  }
  return errors;
};

export const isString = (value, minLength = 0, maxLength = Infinity) => {
  const errors = [];
  if (!typeof value === String) {
    errors.push("debe ingresar un string");
  }
  if (value.length < minLength) {
    errors.push(`mínimo ${minLength} caracteres`);
  }
  if (value.length > maxLength) {
    errors.push(`máximo ${maxLength} caracteres`);
  }
  return errors;
};

export const isNotEmpty = (value) => {
  const errors = [];
  if (typeof (value === String)) {
    if (value === "") {
      errors.push("campo vacío");
    }
  }

  return errors;
};
