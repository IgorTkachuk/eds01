"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Loader2, Key } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <Card className='max-w-md'>
      <CardHeader>
        <CardTitle className='text-lg md:text-xl'>
          Аутентифікація користувача
        </CardTitle>
        <CardDescription className='text-xs md:text-sm'>
          Введіть ваш логін для доступу до Вашого облікового запису
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Ім&apos;я коистувача</Label>
            <Input
              id='email'
              type='email'
              placeholder='логін'
              required
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
            />
          </div>

          <div className='grid gap-2'>
            <div className='flex items-center'>
              <Label htmlFor='password'>Пароль</Label>
            </div>

            <Input
              id='password'
              type='password'
              placeholder='пароль'
              autoComplete='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='flex items-center gap-2'>
            <Checkbox
              id='remember'
              onClick={() => {
                setRememberMe(!rememberMe);
              }}
            />
            <Label htmlFor='remember'>Запам&apos;ятати мене</Label>
          </div>
          <Button
            type='submit'
            className='w-full'
            disabled={loading}
            onClick={async () => {
              await signIn.username({
                username,
                password,
                rememberMe,
                fetchOptions: {
                  onRequest: () => {
                    setLoading(true);
                  },
                  onResponse: () => {
                    setLoading(false);
                  },
                },
                callbackURL: "/request",
              });
            }}
          >
            {loading ? (
              <Loader2 size={16} className='animate-spin' />
            ) : (
              <p>Увійти</p>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
