import React from "react";
import Logo from "../img/logo.png";

export default function Footer() {
    return (
        <footer class="bg-black w-full mt-4 ">
            <div class="w-full max-w-screen mx-auto p-4 md:py-8">
                <div class="sm:flex sm:items-center sm:justify-between">
                    <a href="#" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <img src={Logo} class="h-36" alt="Sumatera Utara Logo" />
                        <span class="self-center text-4xl font-semibold whitespace-nowrap text-white hover:text-green-600">Sumatera Utara</span>
                    </a>
                    <ul class="flex flex-wrap mt-2 items-center mb-6 text-lg font-medium text-white sm:mb-0">
                        <li>
                            <a href="#" class="hover:underline me-4 md:me-6 hover:text-green-600">Home</a>
                        </li>
                        <li>
                            <a href="#" class="hover:underline me-4 md:me-6 hover:text-green-600">Category</a>
                        </li>
                        <li>
                            <a href="#" class="hover:underline me-4 md:me-6 hover:text-green-600">About Us</a>
                        </li>
                        <li>
                            <a href="https://github.com/KnoWingFly/uas_pti/" class="hover:underline me-7 hover:text-green-600">GitHub</a>
                        </li>
                    </ul>
                </div>
                <hr class="my-6 sm:mx-auto border-black-700 lg:my-8" />
                <span class="block text-sm sm:text-center text-white">© 2024 <a href="#" class="hover:text-green-600">Sumatera Utara™</a>. All Rights Reserved.</span>
            </div>
        </footer>

    );
}