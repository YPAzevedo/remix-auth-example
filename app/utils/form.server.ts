export function isNil(value: unknown): boolean {
  return value === undefined || value === null;
}

export function validateNoEmptyFormFields(
  form: FormData,
  fields: string[],
  validator = isNil
) {
  return fields.map((field) => form.get(field)).every(validator);
}
