import Link from "next/link";
import Layout from "./(dashboard)/(routes)/layout";
export default function NotFound() {
  return (
    <Layout>
      <section className="flex items-center h-screen p-16 bg-gray-50 dark:bg-gray-700">
        <div className="container flex flex-col items-center ">
          <div className="flex flex-col gap-6 max-w-md text-center">
            <h2 className="font-extrabold text-9xl text-gray-600 dark:text-gray-100">
              <span className="sr-only">Error</span>
              <span className="text-pink-600">404</span>
            </h2>
            <p className="text-2xl md:text-3xl dark:text-gray-300">
              Sorry, we couldn&apos;t find this page.
            </p>
            <Link
              href="/dashboard"
              className="px-8 py-4 text-xl font-semibold rounded bg-sky-500 text-gray-50 hover:text-gray-200"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
