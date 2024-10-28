"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import Container from "./Container";
import { Video } from "lucide-react";
// import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import { ClerkProvider } from "@clerk/nextjs";

const NavBar = () => {
  //   const router = useRouter();
  const { userId } = useAuth();
  return (
    <>
      <main className="sticky top-0 border border-b-primary/10">
        <Container>
          <section className="flex justify-between items-center">
            <Link href={"/"}>
              <div className="flex items-center gap-1 cursor-pointer">
                <Video />
                <div className="font-bold text-xl">VideoChat</div>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <UserButton />
              <ClerkProvider dynamic>
                {!userId && (
                  <>
                    <Link href={"/sign-in"}>
                      <Button size={"sm"} variant={"outline"}>
                        Sign In
                      </Button>
                    </Link>
                    <Link href={"/sign-up"}>
                      <Button size={"sm"}>Sign Up</Button>
                    </Link>
                  </>
                )}
              </ClerkProvider>
            </div>
          </section>
        </Container>
      </main>
    </>
  );
};

export default NavBar;
