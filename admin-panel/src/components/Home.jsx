"use client";

import { useSession, signIn } from "next-auth/react";

export default function Home() {
   const { data: session, status } = useSession();

   if (status === "loading") {
      return (
         <div className="h-screen w-screen flex items-center justify-center">
            <span className="loading loading-dots loading-lg"></span>
         </div>
      );
   }

   if (!session) {
      return (
         <main className="h-screen w-screen flex items-center justify-center">
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
      <div className="h-screen w-screen flex flex-col items-end p-4">
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
