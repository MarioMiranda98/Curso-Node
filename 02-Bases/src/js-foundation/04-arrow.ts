interface User {
  id: number;
  name: string;
}

export const users: User[] = [
  {
    id: 1,
    name: "John Doe",
  },
  {
    id: 2,
    name: "Jane Doe",
  },
];

export const getUserById = (id: number, callback: (err?: string, user?: User) => void) => {
  const user = users.find((user) => user.id === id);

  setTimeout(() => {
    callback(!user ? 'User does not exist' : undefined, user);
  }, 1500);
};

