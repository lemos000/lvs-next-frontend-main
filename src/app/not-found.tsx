import Image from "next/image";
import GoatT from "@/assets/goat.gif";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-[100vw] h-[100vh] bg-amarelo text-black flex justify-center items-center">
      <div className="flex justify-center">
        <Image className="mx-10
        " src={GoatT} alt="mouse" width={100} height={50} priority={true} />
        <div className="">
          <h1 className="font-bold text-4xl">404: Page Not Found</h1>
          <p>O conteúdo que você está tentando acessar não está disponível!</p>
          <Link href="/" className="hover:font-semibold text-center text-azul">Voltar</Link>
        </div>
      </div>
    </div>
  );
}
