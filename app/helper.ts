export const createId = (args: string[]) => {
  let concated = "";
  args.forEach((arg) => (concated += arg));
  let id = 0;
  for (let index = 0; index < concated.length; index++) {
    id += concated.charCodeAt(index);
  }
  return id;
};
