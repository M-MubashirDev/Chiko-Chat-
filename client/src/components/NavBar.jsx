export default function NavBar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="text-white text-xl font-bold">
          MyLogo
        </a>

        {/* Menu Items */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <a href="#" className="text-gray-300 hover:text-white">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-300 hover:text-white">
              About
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-300 hover:text-white">
              Services
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-300 hover:text-white">
              Contact
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white">☰</button>
      </div>
    </nav>
  );
}
