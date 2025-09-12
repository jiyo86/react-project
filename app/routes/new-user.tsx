import {Form, redirect } from "react-router";
import { getDB } from "~/utils/databas";


export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const username = formData.get("username");
  const fullname = formData.get("fullname");

  const db = await getDB('usermanagement');
  const newUser = { username, fullname };
  await db.collection("userdata").insertOne(newUser);
  return redirect("/");
}

export default function NewUser() {
  return (
    <Form method="post" className="flex flex-col gap-4 max-w-md mx-auto mt-10">
      <label>User Name</label>
      <input type="text" name="username"  className="border p-2 rounded" />
      <label>Full Name</label>
      <input type="text" name="fullname"  className="border p-2 rounded" />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add User
      </button>
    </Form>
  );
}
