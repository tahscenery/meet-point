export type Validity = { isValid: boolean; errorMessage?: string };

type StringRecord<Value> = Record<string, Value>;
type ValidityIn = StringRecord<string>;
type ValidityOut = StringRecord<Validity>;

function getFormValidation<Form extends ValidityIn>(
  validation: (form: Form) => ValidityOut,
  form: Form
): ValidityOut {
  return validation(form);
}

export function checkForm<Form extends ValidityIn>(
  validation: (form: Form) => ValidityOut,
  form: Form
): boolean {
  return Object.entries(getFormValidation(validation, form))
    .map(element => element[1])
    .map(validity => validity.isValid)
    .reduce((acc, curr) => acc && curr, true);
}

export default { checkForm };
