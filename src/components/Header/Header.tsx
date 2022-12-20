export default function Header() {
  return (
    <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content top-0 fixed">
      <div className="flex-none">
        <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="flex-1 px-2 mx-2">
        <span className="text-lg font-bold">
          <img src="https://primedia.primark.com/i/primark/logo-primark?w=300" />
        </span>
      </div>
    </div>
  );
}
