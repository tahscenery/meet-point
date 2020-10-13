export type Validity<Error = String> = { isValid: boolean; error?: Error };

type StringRecord<Value> = Record<string, Value>;
type ValidityIn = StringRecord<string>;
type ValidityOut<Error = String> = StringRecord<Validity<Error>>;

export function validate<Form extends ValidityIn, Error = String>(
  validator: (form: Form) => ValidityOut<Error>,
  form: Form
): ValidityOut<Error> {
  return validator(form);
}

export function isValid(validations: ValidityOut): boolean {
  return Object.entries(validations)
    .map(element => element[1])
    .map(validity => validity.isValid)
    .reduce((acc, curr) => acc && curr, true);
}

export default { isValid, validate };
