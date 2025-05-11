'use client';

import Link from "next/link";
import { useForm } from "react-hook-form";

import { server } from "@/utils/server";
import { postData } from "@/utils/services";

type ForgotMail = {
  email: string;
};

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotMail>(); // Use formState to access errors

  const onSubmit = async (data: ForgotMail) => {
    // Assuming the API endpoint for password reset is different from login
    // The original code posted to /api/login, which seems incorrect for a password reset request.
    // Let's assume there's a correct endpoint, e.g., /api/forgot-password or similar.
    // For now, keeping the original logic but note the potential issue with the endpoint.
    // If the API expects a different structure or endpoint for password reset, this needs adjustment.
    await postData(`${server}/api/login`, { // Consider changing this endpoint if it's not the correct one for password reset
      email: data.email,
    });
    // Add logic here to handle the response (e.g., show success/error message)
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
                {...register("email", { // Use spread operator for register
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

             {/* The original code included a password field here, which is unusual for a forgot password form.
                 Assuming this was a mistake or intended for a different form. Removing it for a standard forgot password flow.
                 If it was intended for a 'reset password' form *after* receiving a reset link, this component's purpose is wrong.
                 Assuming this component is purely for *requesting* a password reset email. */}
            {/* <div className="form__input-row">
              <input
                className="form__input"
                type="password"
                placeholder="Password"
                {...register("password", { required: true })} // Use spread operator for register
              />
              {errors.password && errors.password.type === "required" && (
                <p className="message message--error">
                  This field is required
                </p>
              )}
            </div> */}

            <button
              type="submit"
              className="btn btn--rounded btn--yellow btn-submit"
            >
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;