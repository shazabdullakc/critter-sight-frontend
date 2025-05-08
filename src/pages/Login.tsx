
import AuthForm from "@/components/AuthForm";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 auth-background">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-primary">CritterSight</h1>
        <p className="text-muted-foreground">Smart wildlife detection and monitoring</p>
      </div>
      <AuthForm />
    </div>
  );
};

export default Login;
