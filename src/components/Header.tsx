import { type FC } from "react";

const Header: FC = () => {
  return (
    <header className="bg-primary text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Angyalmancsok</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="hover:text-gray-300">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-gray-300">
                About
              </a>
            </li>
            <li>
              <a href="/services" className="hover:text-gray-300">
                Services
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-gray-300">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
