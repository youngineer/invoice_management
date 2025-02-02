import { LOGO_URL, RESOURCES_LINK } from "../../utils/constants";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div
      className="top-0 left-0 right-0 shadow-sm z-50 font-serif"
      style={{ backgroundColor: "rgb(46, 7, 63)" }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <img src={LOGO_URL} className="h-8 w-auto" alt="Logo"></img>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="link link-underline"
              style={{ color: "rgb(235, 211, 248)" }}
            >
              Home
            </Link>
            <Link
              to="/invoices"
              className="link link-underline"
              style={{ color: "rgb(235, 211, 248)" }}
            >
              Invoices
            </Link>
            <Link
              to="/products"
              className="link link-underline"
              style={{ color: "rgb(235, 211, 248)" }}
            >
              Products
            </Link>
            <Link
              to="/customers"
              className="link link-underline"
              style={{ color: "rgb(235, 211, 248)" }}
            >
              Customers
            </Link>

            <a 
            className="link link-underline text-decoration:None"
            style={{ color: "rgb(235, 211, 248)" }} target="_blank" href={RESOURCES_LINK}>
              SAMPLE FILES
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
