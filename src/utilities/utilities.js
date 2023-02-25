export const isEmpty = (value) => {
  return (
    value === "" ||
    value?.length === 0 ||
    value === null ||
    value === undefined ||
    Object.keys(value)?.length === 0
  );
};
