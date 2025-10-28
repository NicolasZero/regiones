import React, { useState } from 'react';
import Link from 'next/link';
import { ChartColumn, CalendarCheck, LucideNotebookText, FilePlus, Award, UsersRound, Ambulance, ChevronDown } from 'lucide-react';
const links = [
  {
    name: "Métricas",
    href: "/dashboard",
    permission: "admin",
    icon: ChartColumn,
  },
  {
    name: "Actividades",
    icon: CalendarCheck,
    sublinks: [
      { name: "Agendar", href: "/dashboard/register-schedule-activities", icon: CalendarCheck },
      { name: "Ver agenda", href: "/dashboard/schedule", icon: LucideNotebookText },
    ],
  },
  {
    name: "Logros",
    icon: FilePlus,
    sublinks: [
      { name: "Registrar actividad", href: "/dashboard/register-achievements", icon: FilePlus },
      { name: "Ver logros", permission: "admin", href: "/dashboard/achievements", icon: Award },
    ],
  },
  {
    name: "Unidades móviles",
    icon: Ambulance,
    sublinks: [
      { name: "Agendar", href: "/dashboard/register-schedule-mobile-units", icon: CalendarCheck },
      { name: "Ver agenda", href: "/dashboard/schedule-mobile-units", icon: LucideNotebookText },
    ],
  },
  {
    name: "Usuarios",
    href: "/dashboard/users",
    permission: "admin",
    icon: UsersRound,
  },
];

interface NavigationProps {
  userLoggin: { role_id: number };
  handleCloseDrawer?: () => void;
}

const Navigation = ({ userLoggin, handleCloseDrawer }: NavigationProps) => {
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>({});

  const toggleSubmenu = (name: string) => {
    setOpenSubmenus((prev) => {
      const newSubmenus = Object.keys(prev).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {} as { [key: string]: boolean });
      return {
        ...newSubmenus,
        [name]: !prev[name],
      };
    });
  };

  return (
    <nav>
      <ul className="space-y-4">
        {links.map((link) => (
          link.permission === "admin" && userLoggin.role_id === 2 ? null :
          <li key={link.name}>
            {link.href ? (
              <Link
                href={link.href}
                className="text-base capitalize dark:text-dark-foreground dark:hover:bg-dark-foreground dark:hover:text-dark text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-primary hover:text-white group transition duration-300"
                onClick={handleCloseDrawer}
              >
                <link.icon className="w-6 h-6 text-primary dark:group-hover:text-dark group-hover:text-dark-foreground" />
                <span className="ml-3">{link.name}</span>
              </Link>
            ) : (
              <div
                onClick={() => toggleSubmenu(link.name)}
                className="cursor-pointer text-base capitalize dark:text-dark-foreground dark:hover:bg-dark-foreground dark:hover:text-dark text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-primary hover:text-white group transition duration-300"
              >
                <link.icon className="w-6 h-6 text-primary dark:group-hover:text-dark group-hover:text-dark-foreground" />
                <span className="ml-3">{link.name}</span>
                {link.sublinks && (
                  <ChevronDown className="w-6 h-6 text-primary dark:group-hover:text-dark group-hover:text-dark-foreground" />
                )}
              </div>
            )}
            {link.sublinks && (
              <ul
                className={`ml-4 mt-2 space-y-2 transition-all duration-10 ease-out overflow-hidden ${openSubmenus[link.name] ? 'max-h-screen' : 'max-h-0'
                  }`}
              >
                {link.sublinks.map((sublink) => (
                  sublink.permission === "admin" && userLoggin.role_id === 2 ? null :
                  <li key={sublink.name}>
                    <Link
                      href={sublink.href}
                      className="text-base capitalize dark:text-dark-foreground dark:hover:bg-dark-foreground dark:hover:text-dark text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-primary hover:text-white group transition duration-300"
                      onClick={handleCloseDrawer}
                    >
                      <sublink.icon className="w-6 h-6 text-primary dark:group-hover:text-dark group-hover:text-dark-foreground" />
                      <span className="ml-3">{sublink.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav >
  );
};

export default Navigation;