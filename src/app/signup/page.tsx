"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Logo from '@/assets/logo.png';
import backgroundImage from '@/assets/background-lvs.png';
import { TipoUsuario } from '../types';

export default function SignUp() {
  const navigate = useRouter();
    
  const [usuario, setUsuario] = useState<TipoUsuario>({
    nome: "",
    email: "",
    senha: "",
  });

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/lvs/rest/user/cadastrar`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(usuario),
      });
      
      if (response.ok) {
        alert("Usuário criado com sucesso!");
        localStorage.setItem('userName', usuario.nome)
        console.log(`Olá, ${usuario.nome}`);
        
        navigate.push("/");
        setUsuario({
          nome: "",
          email: "",
          senha: "",
        });
      } else {
        // Se a resposta não for ok, lançamos um erro
        throw new Error('Falha na resposta do servidor');
      }
    } catch (error) {
      console.error("Falha no seu cadastro: ", error);
      alert("Conexão com a API falhou, não foi possível cadastrar o usuário");
      // Mantemos o usuário na página de signup
      navigate.push("/signup");
    }
  }

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="hidden lg:block w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage.src})` }}></div>
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8">
        <Image src={Logo} alt="Logo da LVS" className="mb-8 w-24 lg:w-32" />
        <h1 className="text-xl lg:text-2xl font-bold mb-4">Crie sua conta</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-sm lg:max-w-md">
          <div className="mb-4">
            <input
              type="text"
              value={usuario.nome}
              onChange={(e) => setUsuario({...usuario, nome: e.target.value})}
              placeholder="Insira seu nome"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-colors"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              value={usuario.email}
              onChange={(e) => setUsuario({...usuario, email: e.target.value})}
              placeholder="Insira seu email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-colors"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={usuario.senha}
              onChange={(e) => setUsuario({...usuario, senha: e.target.value})}
              placeholder="Insira sua senha"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-colors"
              required
            />
          </div>
          <div className="flex justify-around items-center gap-2">
            <button type="submit" className="bg-yellow-400 text-black font-bold py-2 px-4 rounded-md hover:bg-blue-500 transition-colors">
              Sign Up
            </button>
            <button type="button" onClick={() => navigate.push('/login')} className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors">
              Voltar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}