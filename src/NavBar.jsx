import React from "react";
import { doSignOut } from "./firebase/auth";
import { useAuth } from "./contexts/authcontexts";
import { useNavigate } from "react-router-dom";
function NavBar() {
  const navigate = useNavigate();
  const { userLoggedIn, setUserLoggedIn, currentUser } = useAuth();
  if (currentUser) {
    console.log(currentUser.email);
  }

  const onLogout = async () => {
    try {
      await doSignOut();
      setUserLoggedIn(false);
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <header class="flex w-full flex-wrap bg-white py-4 text-sm dark:bg-neutral-800 sm:flex-nowrap sm:justify-start">
        <nav
          class="mx-auto w-full max-w-[85rem] px-4 sm:flex sm:items-center sm:justify-between"
          aria-label="Global"
        >
          <a class="flex-none text-xl font-semibold dark:text-white" href="#">
            InvoGen
          </a>
          <div class="sm:ps-5 mt-5 flex flex-row items-center gap-5 sm:mt-0 sm:justify-end">
            <a
              class="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
              href="/"
            >
              Invoice
            </a>
            <a
              class="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
              href="/transactions"
            >
              Transactions
            </a>
            <a
              class="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
              href="/contact"
            >
              Contact us
            </a>
            <button
              type="button"
              onClick={onLogout}
              class="me-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Logout
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}

export default NavBar;
