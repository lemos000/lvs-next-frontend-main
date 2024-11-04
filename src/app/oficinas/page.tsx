"use client";
import { useEffect, useState } from "react";
import {
  FaBars,
  FaChevronCircleRight,
  FaChevronLeft,
  FaHeart,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { BsBoxSeam } from "react-icons/bs";
import Goat from "@/assets/theGoat.png";
import { TipoOficina } from "../types";

export default function Oficinas() {
  const [oficinas, setOficinas] = useState<TipoOficina[]>([]);
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const consumoApi = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/lvs/rest/oficinas/listar",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Falha ao buscar oficinas");
      }
      const dados = await response.json();
      setOficinas(dados);
      setError(null);
    } catch (error) {
      console.error("Erro ao buscar oficinas:", error);
      setError("Conexão com a API falhou, não foi possível buscar oficinas");
    }
  };

  useEffect(() => {
    consumoApi();
  }, []);

  const toggleFavorite = (index: number) => {
    setFavorites((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDelete = async (nome: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/lvs/rest/oficinas/deletar?nome=${nome}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        alert("Oficina foi excluída com sucesso!");
        consumoApi();
      } else {
        throw new Error("Falha ao excluir oficina");
      }
    } catch (error) {
      console.error("Falha na exclusão da oficina: ", error);
      alert("Erro ao excluir oficina. Por favor, tente novamente.");
    }
  };

  return (
    <div>
      <div className="bg-[#00163e] min-h-screen text-[#3b82f6] flex">
        <div
          className={`w-72 bg-[#001e4d] p-4 overflow-y-auto transition-transform transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 z-50 fixed md:relative`}
        >
          <h2 className="text-[#F1B82D] mb-4 text-xl flex items-center">
            <BsBoxSeam className="mr-2" />
            Oficinas Sugeridas
          </h2>
          <ul className="flex-grow">
            {oficinas.slice(0, 3).map((oficina, index) => (
              <li key={index} className="mb-2">
                <div>
                  <p className="block p-3 bg-[#002a6e] rounded-lg text-white hover:bg-[#003a9e]">
                    {oficina.nome}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-4 mt-auto pt-4">
            <Link href="/oficinas/cadastrar">
              <p className="flex items-center justify-center p-3 gap-2 text-sm bg-[#ffa216] text-[#00163e] rounded-lg font-bold hover:bg-[#e0a81d]">
                Cadastrar sua própria oficina!
                <FaChevronCircleRight className="mr-2" />
              </p>
            </Link>
            <Link href="/">
              <p className="flex items-center justify-center p-3 bg-[#F1B82D] text-[#00163e] rounded-lg font-bold hover:bg-[#e0a81d]">
                <FaChevronLeft className="mr-2" />
                Voltar à página principal
              </p>
            </Link>

            <button
              onClick={toggleSidebar}
              className="flex items-center justify-center p-3 bg-[#3b82f6] text-white rounded-lg font-bold hover:bg-[#2563eb] md:hidden"
            >
              <FaTimes className="mr-2" />
              Fechar
            </button>
          </div>
        </div>
        <div className="flex-grow flex flex-col">
          <header className="bg-[#00163e] p-4 flex justify-between items-center relative">
            <button
              onClick={toggleSidebar}
              className="text-[#F1B82D] md:hidden"
            >
              <FaBars className="text-xl" />
            </button>
            <div className="hidden md:flex items-center justify-center">
              <h1 className="text-[#F1B82D] font-bold text-xl">
                Goat by LVS (BETA)
              </h1>
            </div>
            <Image
              src={Goat}
              alt="LVS Logo"
              width={80}
              height={80}
              className="w-20 h-20"
            />
          </header>
          <div className="flex justify-center border-b border-[#3b82f6] p-2">
            <Link href="/chatbot">
              <p className={`mx-4 p-2 text-white `}>Chat</p>
            </Link>
            <Link href="/oficinas">
              <p className={`mx-4 p-2 text-white`}>Oficinas</p>
            </Link>
          </div>

          <div className="p-5 bg-azulEscuro h-full">
            {error ? (
              <div className="text-red-500 text-center p-4 bg-red-100 rounded-lg">
                {error}
              </div>
            ) : (
              oficinas.map((oficina, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-center bg-blue-900 rounded-lg p-4 mb-4 shadow transition hover:bg-yellow-500 cursor-pointer"
                >
                  <div className="w-12 h-12 bg-yellow-400 rounded-full mb-2 sm:mb-0 sm:mr-4"></div>
                  <div className="flex-1 text-center sm:text-left">
                    <div>
                      <div className="block">
                        <h2 className="text-lg font-bold text-white">
                          {oficina.nome}
                        </h2>
                        <div className="text-sm text-gray-400">
                          {oficina.endereco} • {oficina.contato}
                        </div>
                        <span
                          className={`text-sm ${
                            oficina.status === "Aberto"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {oficina.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaHeart
                      className={`w-6 h-6 cursor-pointer mr-4 ${
                        favorites[index] ? "text-red-500" : "text-gray-400"
                      }`}
                      onClick={() => toggleFavorite(index)}
                    />
                    <FaTrash
                      className="w-6 h-6 cursor-pointer text-red-500"
                      onClick={() => handleDelete(oficina.nome)}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
