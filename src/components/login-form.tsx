"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { singUp } from "@/server/user";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>З поверненням</CardTitle>
          <CardDescription>Увійдіть за Вашим email</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor='email'>Email</FieldLabel>
                <Input
                  id='email'
                  type='email'
                  placeholder='m@grmu.com.ua'
                  required
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  value={username}
                />
              </Field>
              <Field>
                <div className='flex items-center'>
                  <FieldLabel htmlFor='password'>Пароль</FieldLabel>
                  <a
                    href='#'
                    className='ml-auto text-sm underline-offset-4 hover:underline'
                  >
                    Забули Ваш пароль?
                  </a>
                </div>
                <Input
                  id='password'
                  type='password'
                  required
                  placeholder='пароль'
                  autoComplete='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>
              <Field>
                <Button
                  type='submit'
                  // type='button'
                  disabled={loading}
                  // onClick={singUp}
                  onClick={async () => {
                    await signIn.email({
                      email: username,
                      password,
                      fetchOptions: {
                        onRequest: () => {
                          setLoading(true);
                        },
                        onResponse: () => {
                          setLoading(false);
                        },
                        onError: (e) => {
                          if (e.error.code === "INVALID_EMAIL_OR_PASSWORD") {
                            toast.error(
                              "Помилка аутентифікації. Невірний логін або пароль.",
                            );
                          }
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
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className='px-6 text-center'></FieldDescription>
    </div>
  );
}
