import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import Navigation from "./navigation"
import Cookies from 'js-cookie';
import { useState } from "react";

export default function MobileNavigation() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const user = Cookies.get('user')
    const userLoggin = user ? JSON.parse(user) : null;

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
    }
   
    return (
        <Drawer direction="left" open={isDrawerOpen} onClose={handleCloseDrawer}> 
            <DrawerTrigger asChild>
                <button
                id="toggleSidebarMobile"
                aria-expanded="true"
                aria-controls="sidebar"
                className="lg:hidden text-white cursor-pointer p-1 focus:ring-2 focus:ring-white rounded"
                onClick={() => setIsDrawerOpen(true)}
            >
                <svg
                    id="toggleSidebarMobileHamburger"
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                    ></path>
                </svg>
                <svg
                    id="toggleSidebarMobileClose"
                    className="w-6 h-6 hidden"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    ></path>
                </svg>
            </button></DrawerTrigger>
            <DrawerContent>
                <Navigation userLoggin={userLoggin} handleCloseDrawer={handleCloseDrawer}/>
                <DrawerHeader>
                    <DrawerTitle className="hidden">Navegación</DrawerTitle>
                    <DrawerDescription className="hidden">Menú de navegación</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    <DrawerClose>
                        Cerrar
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>

    )
}