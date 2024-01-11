'use client'

import { adminNavOptions, navOptions, styles } from "@/utils";
// import GlobalState from '@/context'
// import GlobalContext from '@/context'
// import { showNavModal, setShowNavModal } from '@/context'
// import { Fragment, useContext } from "react"
// import CommonModal from "../CommonModal";


// Import statements for useContext and GlobalContext
import { useContext } from 'react';
// Importing GlobalContext with curly braces
import { GlobalContext } from '@/context';

// Other import statements remain unchanged
import { showNavModal, setShowNavModal } from '@/context';
import { Fragment } from 'react';
import CommonModal from '../CommonModal';

// Rest of your code...



const isAdminView = false
const isAuthUser = true
const user = {
    role: "admin",
};


function NavItems({ isModalView = false }) {
    return (
        <div className={`items-center justify-between w-full md:flex md:w-auto ${isModalView ? "" : "hidden"}`} id="nav-items">

            <ul className={`flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white ${isModalView ? "border-none" : "border border-gray-100 "}`}>

                {
                    isAdminView ? adminNavOptions.map(item => <li className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0" key={item.id}>{item.label}</li>) :

                        navOptions.map(item => <li className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0" key={item.id}>{item.label}</li>)
                }

            </ul>

        </div>
    )
}


export default function Navbar() {

    const { showNavModal, setShowNavModal } = useContext(GlobalContext)

    return (
        <>

            <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">

                <div className="max-w-screen-x1 flex flex-wrap items-center justify-between mx-auto p-4 ">


                    <div className="flex items-center cursor-pointer">

                        <span className="slef-center text-2x1 font-semibold whitespace-nowrap">
                            Ecommercery
                        </span>

                    </div>

                    <div className="flex md:order-2 gap-2">
                        {
                            !isAdminView && isAuthUser ? (
                                <Fragment>
                                    <button className={styles.button}>Account</button>
                                    <button className={styles.button}>Cart</button>
                                </Fragment>

                            ) : null
                        }

                        {
                            user?.role === "admin" ? (
                                isAdminView ?
                                    (<button className={styles.button}>Client View</button>) :
                                    (<button className={styles.button}>Admin View</button>)
                            ) : null
                        }

                        {
                            isAuthUser ? <button className={styles.button}>Logout</button> : <button className={styles.button}>Login</button>
                        }

                        <button
                            data-collapse-toggle="navbar-sticky"
                            type="button"
                            className="inline-flex border border-gray-400 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 w-[3em]"
                            aria-controls="navbar-sticky"
                            aria-expanded="false"
                            onClick={() => setShowNavModal(true)}
                        >
                            <span className="sr-only">Open Main Menu</span>
                            <img
                                className="w-[3em] h-6 " // Adjust the size and margin as needed
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAbFBMVEX///8AAAA+Pj7m5ubi4uKgoKD7+/vc3NxJSUnz8/PV1dWrq6vo6OicnJyNjY3t7e0tLS1ubm5SUlIiIiKTk5M1NTW9vb18fHwWFhYcHBxNTU2zs7NgYGCCgoJDQ0NmZmYpKSnMzMx2dnYQEBA2pQpSAAACRklEQVR4nO3diVLCMBSF4bDKDkUWFwSX939HcXfsbXD0Omdy/b8nOGdSmpZpkpQAAAAAAAAAAAAA/Ny8U6r5N9oNp+tWydq9Yb7gTJ3QwSx3eS7U6VwsGodxro7mpqnihTqYm4Vd8Eady5H5W5yoU7my5o0It9EPU6PhpTqUq3W9YF+dyVm94Zk6krNO+IZnwW+lrdakfpmqIzkz7qVX6kyulkbDsTqUq2ujYazL1CqYNupUjswhTKlS53JT2QVTWqqTOdk1FYzyApX7GyON9up4vzYY5QoeTcbVvl2qQdWrP48CAAAAAAAAAAAAAAAAAAD8petDyQstF9XmRL8ISxLGmX79GB96W6tJXgueq7M5WfcbGrbVydwM7IIrdS5HPavgUJ3KlbUif6oO5coaxBg7RrzZGw3VmZzVC3bVkZzVV8nGX+kcbQyN1UHqSM6MO03Zuyd91TYaxp8PYz3TmM/ekQbRfC79B+8WaRj+/TD1Y+wccWjq9yTA/zS3p/6L2mxLfslYb+9O9AMAAAAAAAAAAAAAAAAAAPDVne5CnzMzGqi/EP21/FlBW3U8F5nznmIs5c6c2bVTJ3NzbxcM8BX7O/Nr9ljH5UYfQvsAxPLnic+snSPUmZzVC0ZbJVs/XJ2VzqXpBp8szEWkl+pMrm6Ne+lMHcrVymjYUYdyZRytHuXV6cXWKhhqzm9YCBznOjWv0eeKD+poLh4aCx4nxXt1OgcNv8E3k1XZO4CcrzID+D6Q3WJ1rC2+AAAAAAAAAAAAAHzTI5g3RrtGGKxdAAAAAElFTkSuQmCC" // Replace with the actual image URL
                                alt="Menu Icon"
                            />
                            {/* <svg
    className="w-6 h-6"
    aria-hidden="true"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  > */}
                            <path
                                fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1 1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            ></path>
                            {/* </svg> */}
                        </button>

                        {/* <button 
    data-collapse-toggle="navbar-sticky"
    type="button"
    className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-200 focus:outline-none focus:ring-2"
    // "inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-200 focus:outline-none"
    aria-controls="navbar-sticky"
    aria-expanded="false"
    >
        <span className="sr-only">Open Main Menu</span>
        <svg 
        className="w-6 h-6"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        ></svg>
        <path
        fillRule="evenodd"
        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1zM3 10a1 1 0 011-1h12a1 1 0 110 2h4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2h4a1 1 0"
        // "M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1 1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
        clip-rule="evenodd"
        ></path>
    </button> */}

                    </div>
                    <NavItems isModal={false} />
                </div>

            </nav>
            <CommonModal showModalTitle={false} mainContent={<NavItems isModalView={true} />} show={showNavModal} setShow={setShowNavModal} />
        </>
    )

}