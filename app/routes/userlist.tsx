import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { getDB } from "~/utils/databas";
import { Link, useLoaderData } from "react-router-dom";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader() {
  const db = await getDB('usermanagement');
  const users = await db.collection("userdata").find().toArray();
  console.log(users);
  return users;
}

export default function UserList() {
  const userData = useLoaderData<typeof loader>();

  console.log("loaderData", userData)
  return (
    <>
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">

        <div className="max-w-[300px] w-full space-y-6 px-4">
          <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
            <h2>User List</h2>
            <Link to="/new-user" className="text-blue-500 underline">Add New User</Link>
      <ul>
        {userData.map((user: any) => (
          <li key={user._id}>
            {user.username} - {user.fullname}
          </li>
        ))}
      </ul>
            
          </nav>
        </div>
      </div>
    </main>
    <div>
      
    </div>
    </>
  );
}
