import React from "react";
import { Search, ShoppingCart, User, Menu, X, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLazyLogoutUserQuery } from "../../../../redux/api/authApi";
import { useGetMeQuery } from "../../../../redux/api/userApi";
import defaultAvatar from "../../../../assets/default_avatar.jpg";

const HeaderIcons = ({ isMenuOpen, setIsMenuOpen, toggleSearch }) => {
  const navigate = useNavigate();

  // Get user and cart from Redux store
  const { user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Setup auth queries
  const [logout] = useLazyLogoutUserQuery();
  useGetMeQuery();

  // Calculate total cart items
  const cartItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Log cart state
  console.log("Cart Items:", cartItemsCount);

  const handleCartClick = (e) => {
    if (!user) {
      e.preventDefault();
      navigate("/login");
    } else {
      navigate("/cart");
    }
  };

  const handleUserClick = () => {
    if (user) {
      navigate("/me/profile");
    } else {
      navigate("/login");
    }
  };

  const handleLogout = async () => {
    navigate("/");
    const result = await logout();
    if (result.isSuccess) {
      navigate(0);
    }
  };

  return (
    <div className="flex items-center gap-5">
      {/* Search Icon */}
      <button onClick={toggleSearch} className="text-light hover:text-gray-300">
        <Search size={24} />
      </button>

      {/* Cart Icon with Counter */}
      <button
        onClick={handleCartClick}
        className="text-light hover:text-gray-300 relative"
      >
        <ShoppingCart size={24} />
        {cartItemsCount > 0 ? (
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {cartItemsCount}
          </span>
        ) : (
          <span className="absolute -top-1 -right-2 bg-gray-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            0
          </span>
        )}
      </button>

      {/* User Avatar or Default */}
      {user ? (
        <div className="relative group hidden lg:block">
          <img
            src={user.avatar?.url || defaultAvatar}
            alt="User Avatar"
            className="h-8 w-8 rounded-full border-2 border-primary cursor-pointer"
            onClick={handleUserClick}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 hidden group-hover:block">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              onClick={handleUserClick}
            >
              Profile
            </button>
            {user?.role === "admin" && (
              <button
                className="block w-full text-left px-4 py-2 text-light hover:bg-gray-200"
                onClick={() => navigate("/admin/dashboard")}
              >
                Admin
              </button>
            )}
            <button
              className="block w-full text-left px-4 py-2 text-light hover:bg-gray-200"
              onClick={handleLogout}
            >
              <LogOut size={16} className="inline-block mr-2" /> Logout
            </button>
          </div>
        </div>
      ) : (
        <button
          className="text-light hover:text-gray-300 hidden lg:block"
          onClick={() => navigate("/login")}
        >
          <User size={24} />
        </button>
      )}

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden text-light hover:text-gray-300"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );
};

export default HeaderIcons;
