import type { Route } from "./+types/home";
import { Link, useLoaderData } from "react-router-dom";
import { getDB } from "~/utils/database";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader() {
  const db = await getDB('usermanagement');
  const users = await db.collection("userdata").find().toArray();
  return users;
}

export default function UserList() {
  const userData = useLoaderData<typeof loader>();
  return (
    <>
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">

        <div className="max-w-[600px] w-full space-y-6 px-4">
          <div className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
            <h1 className="max-w-2xl mt-4 sm:mt-6 text-5xl font-bold tracking-tighter text-gray-400 sm:leading-12 sm:text-6xl text-center">User List</h1>
            <Link to="/new-user" className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3 text-blue-500 text-white p-2 rounded">Add New User</Link>
            <div className="mt-8">
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">User Name</th>
                    <th className="border border-gray-300 px-4 py-2">Full Name</th>
                  </tr>
                </thead>
                {userData.map((user: any) => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.fullname}</td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
    <div>
      
    </div>
    </>
  );
}
