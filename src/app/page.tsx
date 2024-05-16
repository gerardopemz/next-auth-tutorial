import { auth, signIn, signOut } from "@/server/auth";

export default async function Home() {
  const session = await auth();

  if (!session || !session.user) {
    return (
      <div className="py-16 flex flex-col items-center space-y-6">
        <form
          action={async () => {
            "use server";
            await signIn("github");
          }}
        >
          <button
            type="submit"
            className="rounded-md bg-gray-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
          >
            Sign In
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="py-16 flex flex-col items-center space-y-6">
      <div className="flex items-center space-x-4">
        <img
          className="inline-block h-12 w-12 rounded-full"
          src={session.user.image as string}
          alt="Profile picture"
        />
        <div>
          <h4 className="text-lg font-bold">{session.user.name}</h4>
          <p className="mt-1">*****@{session.user.email?.split("@")[1]}</p>
        </div>
      </div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button
          type="submit"
          className="rounded-md bg-gray-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
        >
          Sign Out
        </button>
      </form>
    </div>
  );
}
