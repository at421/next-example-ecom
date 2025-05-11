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
    // The original onSubmit was sending to '/api/login', which is incorrect for a password reset request.
    // Assuming the correct endpoint is '/api/forgot-password' or similar.
    // Also, the original payload only sent email, which is correct for a forgot password request.
    await postData(`${server}/api/forgot-password`, {
      email: data.email,
    });
    // TODO: Add success/error handling (e.g., show a message to the user)
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