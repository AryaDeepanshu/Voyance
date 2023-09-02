import { axiosBaseURL } from "./axiosBaseURL";
import { OrderPlacedSuccessfully } from "./notification";

/* Function that control the Complete Reservation Mechanism: */
export const checkout = async (
  amount,
  property_name,
  bookingDetail,
  navigate,
  user
) => {
  const {
    data: { key },
  } = await axiosBaseURL.get("payment/getkey");

  const {
    data: { order },
  } = await axiosBaseURL.post("payment/pay", {
    amount,
    property_name,
  });

  const options = {
    key,
    amount: order.amount,
    currency: "INR",
    name: "Voyance",
    image:
      "https://res.cloudinary.com/additya/image/upload/v1678127598/Voyance/r9udien7vaenzecl8mmk.png",
    order_id: order.id,
    handler: async function (response) {
      await axiosBaseURL.post("order", {
        ...bookingDetail,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
      });

      OrderPlacedSuccessfully();
      navigate("/order");
      return;
    },
    prefill: {
      name: user.name,
      email: user.email,
      contact: user.phone,
    },
    theme: {
      color: "#008080",
    },
  };

  const razor = new window.Razorpay(options);
  razor.open();
};
