import { Button, Center, Stack, TextInput, Title } from "@mantine/core";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { useEffect, useRef } from "react";

import { verifyLogin } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import { validateEmail } from "~/utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const body = await request.formData();
  const email = body.get("email");
  const password = body.get("password");

  if (!validateEmail(email)) {
    return json(
      { errors: { email: "Email is invalid", password: null } },
      { status: 400 },
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { email: null, password: "Password is required" } },
      { status: 400 },
    );
  }

  if (password.length < 8) {
    return json(
      { errors: { email: null, password: "Password is too short" } },
      { status: 400 },
    );
  }

  const user = await verifyLogin(email, password);

  if (!user) {
    return json(
      { errors: { email: "Invalid email or password", password: null } },
      { status: 400 },
    );
  }

  return createUserSession({
    request,
    userId: user.id,
    redirectTo: "/",
  });
};

export default function Login() {
  const actionData = useActionData<typeof action>();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Center>
      <Stack
        align="center"
        justify="flex-start"
        className="w-full md:w-1/2 px-8 md:px-0"
        mt="xl"
      >
        <Stack gap="xs" align="center" justify="center">
          <Title order={1}>Sign in</Title>
          <Link to="/register" className="text-green-500">
            Need an account?
          </Link>
        </Stack>
        <Form method="post" className="w-full">
          <fieldset>
            <Stack>
              <TextInput
                ref={emailRef}
                size="lg"
                placeholder="Email"
                name="email"
                className="w-full"
                type="email"
              />
              {actionData?.errors?.email ? (
                <div className="pt-1 text-red-700" id="email-error">
                  {actionData.errors.email}
                </div>
              ) : null}
              <TextInput
                ref={passwordRef}
                size="lg"
                placeholder="Password"
                name="password"
                type="password"
              />
              {actionData?.errors?.password ? (
                <div className="pt-1 text-red-700" id="password-error">
                  {actionData.errors.password}
                </div>
              ) : null}
              <Button type="submit" size="lg" color="green.6">
                Sign in
              </Button>
            </Stack>
          </fieldset>
        </Form>
      </Stack>
    </Center>
  );
}
