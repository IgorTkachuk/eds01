"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function UserPanel({ userName }: { userName?: string }) {
  const router = useRouter();

  return (
    <div className='flex gap-2 items-center'>
      <p>{userName}</p>
      <Button
        variant='outline'
        onClick={() => {
          signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push("/login");
              },
            },
          });
        }}
      >
        Вийти
      </Button>
    </div>
  );
}
