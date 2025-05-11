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
    // The original code sent email and password, but the form only has email.
    // Assuming the API expects just the email for password reset initiation.
    // Adjusting the payload based on the form inputs.
    await postData(`${server}/api/login`, {
      email: data.email,
    });
    // Note: The original code didn't handle the response or show feedback.
    // In a real app, you would add success/error handling here.
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
            Enter your email and recover your account
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
             {/* Note: The original form had a password field here, but it doesn't make sense for a forgot password form.
                 Removing it based on the title and description. If it was intended for 'confirm password'
                 or similar, the form type and logic would need significant changes. Assuming it was an error in the original form structure. */}

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