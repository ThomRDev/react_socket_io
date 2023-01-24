
export const getUserStorage = () => {
  return {
    agent : localStorage.getItem('agent') || null,
    desktop : localStorage.getItem('desktop') || null,
  }
}
