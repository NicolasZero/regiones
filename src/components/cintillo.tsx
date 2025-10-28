import Image from "next/image"
import CintilloImg from "../../public/cintillo_ministerio.png"

export const Cintillo = () => {
    return (
        <div className="w-full relative lg:h-200px flex justify-center dark:bg-dark bg-white border-b-2 dark:border-dark-foreground">
            <Image src={CintilloImg} alt="Contillo de ministerio" className="z-50 bg-inherit p-2 "></Image>
        </div>
       
    )}