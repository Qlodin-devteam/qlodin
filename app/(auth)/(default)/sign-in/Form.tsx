import { signInAction } from "@/actions";
import {
  AppInput,
  AppInputProps,
  FormButton,
  FormMessage,
} from "@/components/formComponents";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";

const SigninForm = () => {
  const [state, action, isPending] = useActionState(signInAction, {});

  return (
    <div className="p-8">
      <form className="p-3" action={action}>
        <div className="flex items-stretch mb-6 gap-4 flex-col">
          <FormMessage res={state} />
          {fields.map((field, index) => (
            <AppInput
              {...field}
              key={index}
              error={state?.fieldErrors?.[field.name]}
            />
          ))}
          <Link
            href="/forgot-password"
            className="text-sm text-black hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <FormButton loading={false} className="btn-form">
          Login
        </FormButton>
      </form>
      <div className="flex flex-col items-center justify-center text-black text-[22px] font-medium font-['Quicksand'] leading-7">
        or
      </div>
      <div className="flex flex-col gap-3 my-3">
        <div className="flex flex-col items-center justify-center rounded-sm p-2 bg-[#DDDBFF] text-black">
          <button className="flex items-center">
            <img
              className="w-6 h-6 mr-2"
              src="/facebook.png"
              alt="Facebook logo"
            />
            Sign in with Facebook
          </button>
        </div>
        <div className="flex flex-col items-center justify-center rounded-sm p-2 bg-[#DDDBFF] text-black">
          <button className="flex items-center">
            <img className="w-6 h-6 mr-2" src="/google.png" alt="Google logo" />
            Sign in with Google
          </button>
        </div>
        <div className="flex flex-col items-center justify-center rounded-sm p-2 bg-[#DDDBFF] text-black">
          <button className="flex items-center">
            <img className="w-10 h-6 mr-2" src="/apple.png" alt="Apple logo" />
            Sign in with Apple
          </button>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;

const fields: AppInputProps[] = [
  {
    type: "email",
    placeholder: "Email Address",
    name: "email",
    icon: <Mail />,
  },
  {
    type: "password",
    placeholder: "Password",
    name: "password",
    icon: <Lock />,
  },
];