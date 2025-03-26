import { useForm } from "react-hook-form";
import { useLogin } from "../../features/authentication/useLogin";
import { useAuth } from "../../features/authentication/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import FormField from "./FormField";
import TextInput from "./TextInput";
import Button from "../Button";

function LoginForm() {
  const { login, error, isPending } = useLogin();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    const { email, password } = data;
    await login({ email, password });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      {error && (
        <div className="rounded-lg border border-red-700 bg-red-300 p-2 text-red-700">
          {error}
        </div>
      )}
      <div className="flex flex-col gap-6">
        <FormField label="Email" id="email" error={errors.email}>
          <TextInput
            type="email"
            name="email"
            autoComplete="new-email"
            placeholder="twójmail@gfcorp.pl"
            register={register}
            validation={{ required: "Email jest wymagany" }}
          />
        </FormField>
        <FormField label="Hasło" id="password" error={errors.password}>
          <TextInput
            type="password"
            name="password"
            autoComplete="new-password"
            placeholder="••••••"
            register={register}
            validation={{
              required: "Hasło jest wymagane",
              minLength: {
                value: 6,
                message: "Hasło musi mieć przynajmniej 6 znaków",
              },
            }}
          />
        </FormField>

        <div className="flex items-center gap-3">
          <input id="remember-me" type="checkbox" value="" />
          <label htmlFor="remember-me" className="text-dark-main">
            Zapamiętaj mnie
          </label>
        </div>

        <Button type="submit" buttonStyle="light">
          Zaloguj
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
