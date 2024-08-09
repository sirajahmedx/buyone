"use client";

import { useSession, signIn } from "next-auth/react";
import Loading from "../Loading";

export default function Home() {
   const { data: session, status } = useSession();

   if (status === "loading") {
      return <Loading />;
   }

   if (!session) {
      return (
         <main className="flex items-center justify-center">
            <div>
               <button
                  onClick={() => signIn("google")}
                  className="btn btn-info text-lg"
               >
                  Login With Google
               </button>
            </div>
         </main>
      );
   }

   return (
      <div className="flex flex-col items-end p-4">
         <div className="flex flex-col items-center">
            <div className="avatar mb-2 w-14">
               <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                     src={session.user.image}
                     alt="User Avatar"
                     className="w-full h-full object-cover"
                  />
               </div>
            </div>
            <p className="text-xl text-center">{session.user.name}</p>
         </div>
      </div>
   );
}
