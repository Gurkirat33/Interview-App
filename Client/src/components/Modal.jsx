const Modal = ({ setShowModal, onClickHandler, text }) => {
  return (
    <div className="fixed inset-0 z-[1000] flex h-full w-full flex-wrap items-center justify-center overflow-auto p-4 font-[sans-serif] before:fixed before:inset-0 before:h-full before:w-full before:bg-[rgba(0,0,0,0.5)]">
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="float-right w-3.5 shrink-0 cursor-pointer fill-gray-400 hover:fill-red-500"
          viewBox="0 0 320.591 320.591"
          onClick={() => setShowModal(false)}
        >
          <path
            d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
            data-original="#000000"
          ></path>
          <path
            d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
            data-original="#000000"
          ></path>
        </svg>

        <div className="my-8 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline w-14 fill-red-500"
            viewBox="0 0 286.054 286.054"
          >
            <path
              fill="#e2574c"
              d="M143.027 0C64.04 0 0 64.04 0 143.027c0 78.996 64.04 143.027 143.027 143.027 78.996 0 143.027-64.022 143.027-143.027C286.054 64.04 222.022 0 143.027 0zm0 259.236c-64.183 0-116.209-52.026-116.209-116.209S78.844 26.818 143.027 26.818s116.209 52.026 116.209 116.209-52.026 116.209-116.209 116.209zm.009-196.51c-10.244 0-17.995 5.346-17.995 13.981v79.201c0 8.644 7.75 13.972 17.995 13.972 9.994 0 17.995-5.551 17.995-13.972V76.707c-.001-8.43-8.001-13.981-17.995-13.981zm0 124.997c-9.842 0-17.852 8.01-17.852 17.86 0 9.833 8.01 17.843 17.852 17.843s17.843-8.01 17.843-17.843c-.001-9.851-8.001-17.86-17.843-17.86z"
              data-original="#e2574c"
            />
          </svg>

          <h4 className="mt-6 text-lg font-semibold text-gray-800">{text}</h4>
          <p className="mt-2 text-sm text-gray-500">Are you sure?</p>
        </div>

        <div className="flex gap-4 max-sm:flex-col">
          <button
            type="button"
            className="w-full rounded-lg border-none bg-gray-200 px-5 py-2.5 text-sm tracking-wide text-gray-800 outline-none hover:bg-gray-300"
            onClick={() => setShowModal(false)}
          >
            No
          </button>
          <button
            type="button"
            className="w-full rounded-lg border-none bg-red-500 px-5 py-2.5 text-sm tracking-wide text-white outline-none hover:bg-red-600"
            onClick={onClickHandler}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
