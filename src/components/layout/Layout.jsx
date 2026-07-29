import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScaleWrapper from './ScaleWrapper';


export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col bg-[#FAF6EE] pt-0">
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
