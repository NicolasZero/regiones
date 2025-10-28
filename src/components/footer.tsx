export default function Footer({ }) {
    return (
        <footer className="w-full h-20 bg-white text-black flex-col justify-center items-start pt-2 dark:bg-dark border-t-2 dark:border-dark-foreground ">
            <p className="text-center text-sm text-gray-500 dark:text-dark-foreground">
                &copy; {new Date().getFullYear()}{" "}
                Instituto Nacional De La Mujer.
                Todos los derechos reservados.
            </p>
        </footer>
    )
}