const Premium = () => {
  return (
    <div className="m-20">
      <div className="flex w-full">
        <div className="card bg-stone-700 rounded-box grid h-80 w-60 flex-grow place-items-center">
          <h1 className="font-semibold text-4xl text-orange-400">Premium</h1>
          <ul class="list-disc pl-5 space-y-1">
            <li className="text-2xl font-semibold text-white">Chat with other People </li>
            <li className="text-2xl font-semibold text-white">100 connection request per day</li>
            <li className="text-2xl font-semibold text-white">Blue tick </li>
            <li className="text-2xl font-semibold text-white">3 month plan </li>
          </ul>
          <button className="btn glass dark:bg-pink-500 font-mono">
            Switch to Premium
          </button>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-stone-700 rounded-box grid h-80 w-60 flex-grow place-items-center">
          <h1 className="font-semibold text-4xl text-orange-400">
            Premium Plus+
          </h1>
          <ul class="list-disc  space-y-1">
            <li className="text-2xl font-semibold text-white">chat with other People </li>
            <li className="text-2xl font-semibold text-white">200 connection request per day</li>
            <li className="text-2xl font-semibold text-white">Blue tick </li>
            <li className="text-2xl font-semibold text-white">send Emojis and GIFs</li>
            <li className="text-2xl font-semibold text-white">6 month Plan</li>
          </ul>
          <button className="btn glass text dark:bg-sky-500 font-mono">
            Switch to Premium Plus+
          </button>
        </div>
      </div>
    </div>
  );
}

export default Premium
