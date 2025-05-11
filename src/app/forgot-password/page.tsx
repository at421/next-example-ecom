'use client';

import Link from "next/link";
import { useForm } from "react-hook-form";

import { server } from "@/utils/server";
import { postData } from "@/utils/services";

type ForgotMail = {
  email: string;
  password?: string; // Add password as it's in the form, though not used in onSubmit
};

const ForgotPassword = () => {
  // Ensure useForm is correctly typed with the form data
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotMail>();

  const onSubmit = async (data: ForgotMail) => {
    // Note: The original code sends email to /api/login which seems incorrect for forgot password.
    // Assuming it should go to a forgotten password endpoint.
    // Keeping the original logic for now but highlighting the potential issue.
    // A proper forgot password flow usually involves sending an email with a reset link.
    // The original code sends email to /api/login and includes a password field in the form,
    // but the password is not sent in the postData call. This seems like a mix-up
    // between login and forgot password forms/logic in the original code.
    // For migration, we preserve the original form fields and submission logic,
    // but the API endpoint and payload might need review based on actual backend.

    // The original code only sent the email
    await postData(`${server}/api/login`, {
      email: data.email,
    });

    // If the intention was to send both email and password (which doesn't make sense for forgot password)
    // await postData(`${server}/api/login`, {
    //   email: data.email,
    //   password: data.password,
    // });

    // A more typical forgot password request would just send the email to a dedicated endpoint:
    // await postData(`${server}/api/forgot-password`, {
    //   email: data.email,
    // });
  };

  return (
    <section className="form-page">
      <div className="container">
        <div className="back-button-section">
          <Link href="/products">
            <i className="icon-left" />
            Back to shop
          </Link>
        </div>

        <div className="form-block">
          <h2 className="form-block__title">Forgot your password?</h2>
          <p className="form-block__description">
            Enter your email or phone number and recover your account
          </p>

          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form__input-row">
              <input
                className="form__input"
                placeholder="email"
                type="text"
                {...register("email", {
                  required: true,
                  pattern:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
              />

              {errors.email && errors.email.type === "required" && (
                <p className="message message--error">
                  This field is required
                </p>
              )}

              {errors.email && errors.email.type === "pattern" && (
                <p className="message message--error">
                  Please write a valid email
                </p>
              )}
            </div>

            {/* The password field seems out of place for a "Forgot Password" form */}
            {/* but it was present in the original code, so keeping it. */}
            {/* The onSubmit function in the original code did NOT send this password. */}
            <div className="form__input-row">
              <input
                className="form__input"
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              {errors.password && errors.password.type === "required" && (
                <p className="message message--error">
                  This field is required
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn--rounded btn--yellow btn-submit"
            >
              Reset password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;