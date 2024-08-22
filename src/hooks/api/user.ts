export type User = {
  id: number;
  name: string;
  email: string;
};

export async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");

  return (await res.json()) as User[];
}
