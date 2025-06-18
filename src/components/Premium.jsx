import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const Premium = () => {

  const [isUserPremium, setIsUserPremium] = useState(false);
  useEffect(() => {
    verifyPremiumUser();
  }, [])

  const verifyPremiumUser = async (res) => {
    const response = await axios.get(
      BASE_URL + "/premium/verify",
      { withCredentials: true },
    );
    if (res.data.isPremium) {     // here error showing cannot read the properties of undefined (reading 'data')
      setIsUserPremium(true);
    }
  }

  const handlePayClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      {
        membershipType: type,
      },
      { withCredentials: true },
    );

    // Extract the details from the order response
    const {amount, currency, order_id, notes, keyId} = order.data;

    // it should open the razorpay payment gateway

    const options = {
      key: keyId,
      amount,
      currency,
      name: "DevSphere",
      description: "Join the developer community",
      order_id,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.email,
        contact: "1800-230-2561",
      },
      theme: {
        color: "#F37254",
      },
      handler: verifyPremiumUser,
    };
    
    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  return isUserPremium ? (
    "You are Already a Premium User"
  ) : (
    <div className="m-20">
      <div className="flex w-full">
        <div className="card bg-stone-700 rounded-box grid h-80 w-60 flex-grow place-items-center">
          <h1 className="font-semibold text-4xl text-orange-400">Premium</h1>
          <ul className="list-disc pl-5 space-y-1">
            <li className="text-2xl font-semibold text-white">
              Chat with other People{" "}
            </li>
            <li className="text-2xl font-semibold text-white">
              100 connection request per day
            </li>
            <li className="text-2xl font-semibold text-white">Blue tick </li>
            <li className="text-2xl font-semibold text-white">3 month plan </li>
          </ul>
          <button
            onClick={() => handlePayClick("premium")}
            className="btn glass dark:bg-pink-500 font-mono">
            Switch to Premium
          </button>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-stone-700 rounded-box grid h-80 w-60 flex-grow place-items-center">
          <h1 className="font-semibold text-4xl text-orange-400">
            Premium Plus+
          </h1>
          <ul className="list-disc  space-y-1">
            <li className="text-2xl font-semibold text-white">
              chat with other People{" "}
            </li>
            <li className="text-2xl font-semibold text-white">
              200 connection request per day
            </li>
            <li className="text-2xl font-semibold text-white">Blue tick </li>
            <li className="text-2xl font-semibold text-white">
              send Emojis and GIFs
            </li>
            <li className="text-2xl font-semibold text-white">6 month Plan</li>
          </ul>
          <button
            onClick={() => handlePayClick("premium-plus")}
            className="btn glass text dark:bg-sky-500 font-mono">
            Switch to Premium Plus+
          </button>
        </div>
      </div>
    </div>
  );
}

export default Premium;
