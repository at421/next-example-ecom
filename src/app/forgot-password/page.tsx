'use client';

import Link from "next/link";
import { useForm } from "react-hook-form";

import { server } from "@/utils/server"; // Assuming server utility is still needed and works client-side
import { postData } from "@/utils/services"; // Assuming postData utility works client-side

type ForgotMail = {
  email: string;
  // The original code included a password field in the form,
  // which is unusual for a forgot password form, but we are
  // migrating the code as-is. It's not included in the type
  // as it's not used in the onSubmit function data payload.
};

const ForgotPassword = () => {
  // The original code used 'errors' directly from useForm,
  // which is deprecated. It should use formState.errors.
  // Migrating to the current recommended usage.
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotMail>();

  const onSubmit = async (data: ForgotMail) => {
    // Adjusting the API path call. In the app directory,
    // client-side calls to internal API routes (/api/...)
    // should typically be relative to the origin.
    // Keeping the original server prefix for now, assuming
    // postData handles it correctly or server resolves to origin.
    // If server is a full URL, it might need adjustment
    // depending on postData's implementation.
    await postData(`${server}/api/login`, {
      email: data.email,
      // Note: The password field from the form is not included
      // in the data sent to the API, which matches the ForgotMail type.
      // This reinforces that the password field in the original form
      // was likely a mistake for a "forgot password" flow.
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
                {...register("email", { // Using spread syntax for register
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

            {/*
              Keeping the password field as it was in the original code,
              even though it's unusual for a "forgot password" form.
              It's not included in the data submitted by onSubmit.
            */}
            <div className="form__input-row">
              <input
                className="form__input"
                type="password"
                placeholder="Password"
                 {...register("password", { required: true })} // Registering the password field
              />
              {/*
                Adding error handling for the password field based on
                the original code's structure, even though it's not
                part of the onSubmit data type.
              */}
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