import Image from "next/image";

export default async function UsersPage() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`);
  const data = await response.json();
  console.log(data);
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>Users</h1>
      <ul>
        {data.map((user: any) => (
          <li key={user.id}>{user.username} {user.email} {user.is_staff}</li>
        ))}
      </ul>
    </div>
  );
}
