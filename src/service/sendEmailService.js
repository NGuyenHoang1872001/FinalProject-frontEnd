import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const sendEmail = async ({
  email_store,
  email_customer,
  messageToCustomer,
}) => {
  const emailStore = email_store.storeEmail;
  const emailCustomer = email_customer.email;
  const ammount = messageToCustomer.ammount;
  const paymentMethod = messageToCustomer.paymentMethod;

  const text =
    "Your order has been confirmed with an amount is" +
    " " +
    ammount +
    " and payment method is" +
    " " +
    paymentMethod;

  const payload = { emailStore, emailCustomer, text };

  await emailjs
    .send(
      "service_z7dzspf",
      "template_nx95pnn",
      {
        from_name: emailStore,
        email: emailCustomer,
        message: text,
      },
      "KLwARqhN6P8uvAco6"
    )
    .then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
};
export default sendEmail;
