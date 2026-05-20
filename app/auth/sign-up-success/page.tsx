export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6">
      <div className="max-w-md rounded-2xl border border-purple-500/20 bg-purple-950/30 p-8 text-center backdrop-blur">
        <h1 className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-3xl font-bold text-transparent">
          Account Created Successfully
        </h1>

        <p className="mt-4 text-gray-400">
          Please check your email to verify your account before logging in.
        </p>
      </div>
    </div>
  )
}