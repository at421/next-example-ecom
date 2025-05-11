'use client';

import Link from "next/link";
import { useForm } from "react-hook-form";

type ForgotMail = {
  email: string;
};

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotMail>();

  const onSubmit = async (data: ForgotMail) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          // Note: The original form also had a password field, but the onSubmit logic only sent email.
          // Assuming only email is needed for forgot password functionality based on onSubmit.
          // If password is required for reset, the API and form logic need adjustment.
          // For now, keeping only email in the payload as per original onSubmit.
        }),
      });

      if (!response.ok) {
        // Handle errors, e.g., show a message to the user
        console.error('Failed to reset password', await response.text());
      } else {
        // Handle success, e.g., show a success message or redirect
        console.log('Password reset request successful');
      }
    } catch (error) {
      console.error('Error submitting forgot password form', error);
    }
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

            {/* The original form had a password input, but it wasn't used in onSubmit for forgot password.
                Removing it as it seems unrelated to the forgot password functionality based on the original logic.
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
            */}

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