

export const clearInput = (inputElementId: string) => {
  const element = document.getElementById(inputElementId) as HTMLInputElement;
  element.value = ""
}
