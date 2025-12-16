import Navbar from "./Navbar"
const Header = () => {
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto pq-4">
            <div className="flex justify-between items-center px-4">
                <h1 className="text-2xl font-bold text-gray-800">Mi Tienda</h1>
                <Navbar />
            </div>
        </div>
    </header>
  )
}

export default Header