import { AnimatedButton } from "@/components/AnimatedButton";
import { isRouteErrorResponse, Link, useRouteError } from "react-router";

export default function ErrorBoundary() {
  const error = useRouteError();

  const exception = isRouteErrorResponse(error)
    ? {
        code: `${error.status} - ${error.statusText}`,
        msg: `This page does not exist! Did you forget to add it to the router ?`,
      }
    : { code: `500 - Unexpected error`, msg: "an unexpected error occcurred" };

  return (
    <div className="h-screen w-full max-w-md text-center md:max-w-xl mx-auto py-24 flex items-center flex-col gap-4">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-extrabold text-gray-900">
          {exception.code}
        </h1>
        <p className="mt-2 text-sm first-letter:capitalize font-semibold text-gray-600">
          {exception.msg}
        </p>
      </div>
      <AnimatedButton size="sm">
        <Link to="/">Go back to home</Link>
      </AnimatedButton>
    </div>
  );
}
