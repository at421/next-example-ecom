'use client';

import Link from "next/link";
import { useForm } from "react-hook-form";

import { server } from "@/utils/server";
import { postData } from "@/utils/services";

type ForgotMail = {
  email: string;
};

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotMail>();

  const onSubmit = async (data: ForgotMail) => {
    // Note: The original code submits to `/api/login` which seems incorrect for a forgot password flow.
    // It's kept as-is based on the original source, but might need review.
    await postData(`${server}/api/login`, {
      email: data.email,
    });
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
                <p className="message message--error">This field is required</p>
              )}

              {errors.email && errors.email.type === "pattern" && (
                <p className="message message--error">
                  Please write a valid email
                </p>
              )}
            </div>

             {/* Note: The original form also had a password input for 'Forgot Password'.
                 This seems incorrect for a typical 'Forgot Password' flow (which usually asks for email to send a reset link).
                 Keeping it as-is based on the source, but it might need review/removal. */}
            <div className="form__input-row">
              <input
                className="form__input"
                type="password"
                placeholder="Password"
                 {...register("password", { required: true })}
              />
              {errors.password && errors.password.type === "required" && (
                <p className="message message--error">This field is required</p>
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