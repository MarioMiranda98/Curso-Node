interface User {
  id: number;
  name: string;
}

const users: User[] = [
  {
    id: 1,
    name: "John Doe",
  },
  {
    id: 2,
    name: "Jane Doe",
  },
];

export function getUserById(id: number, callback: (err?: string, user?: User) => void) {
  const user = users.find((user) => user.id === id);

  callback(!user ? 'User does not exist' : undefined, user);
}
