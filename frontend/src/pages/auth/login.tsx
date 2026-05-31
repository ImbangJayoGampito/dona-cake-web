import { LoginForm } from "@/components/auth/login-form"

function Login() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="h-[90vh] w-full max-w-5xl">
        <LoginForm />
      </div>
    </div>
  )
}

export default Login
