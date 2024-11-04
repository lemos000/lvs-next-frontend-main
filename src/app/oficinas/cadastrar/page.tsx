"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CadastroOficina() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: "",
    endereco: {
      rua: "",
      cidade: "",
      estado: "",
      cep: ""
    },
    contato: "",
    status: "Fechado"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("endereco.")) {
      const enderecoField = name.split(".")[1];
      setFormData((prevFormData) => ({
        ...prevFormData,
        endereco: {
          ...prevFormData.endereco,
          [enderecoField]: value
        }
      }));
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({ 
      ...prevFormData, 
      status: e.target.checked ? "Aberto" : "Fechado" 
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const enderecoCompleto = `${formData.endereco.rua}, ${formData.endereco.cidade}, ${formData.endereco.estado}, ${formData.endereco.cep}`;
    const dadosParaEnviar = {
      ...formData,
      endereco: enderecoCompleto
    };

    try {
      const response = await fetch("http://localhost:8080/lvs/rest/oficinas/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosParaEnviar)
      });

      if (response.ok) {
        alert("Oficina cadastrada com sucesso!");
        router.push("/oficinas");
      } else {
        alert("Erro ao cadastrar oficina.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar oficina:", error);
      alert("Erro ao cadastrar oficina.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#00163e] text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Cadastrar Oficina</h1>
      <form onSubmit={handleSubmit} className="bg-[#002a6e] p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="nome" className="block font-bold mb-2">
            Nome da Oficina
          </label>
          <input
            id="nome"
            name="nome"
            type="text"
            value={formData.nome}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#003a9e] text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Endereço</label>
          <input
            name="endereco.rua"
            type="text"
            placeholder="Rua"
            value={formData.endereco.rua}
            onChange={handleChange}
            className="w-full p-2 rounded mb-2 bg-[#003a9e] text-white"
            required
          />
          <input
            name="endereco.cidade"
            type="text"
            placeholder="Cidade"
            value={formData.endereco.cidade}
            onChange={handleChange}
            className="w-full p-2 rounded mb-2 bg-[#003a9e] text-white"
            required
          />
          <input
            name="endereco.estado"
            type="text"
            placeholder="Estado"
            value={formData.endereco.estado}
            onChange={handleChange}
            className="w-full p-2 rounded mb-2 bg-[#003a9e] text-white"
            required
          />
          <input
            name="endereco.cep"
            type="text"
            placeholder="CEP"
            value={formData.endereco.cep}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#003a9e] text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="contato" className="block font-bold mb-2">
            Contato
          </label>
          <input
            id="contato"
            name="contato"
            type="text"
            value={formData.contato}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#003a9e] text-white"
            required
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            id="status"
            name="status"
            type="checkbox"
            checked={formData.status === "Aberto"}
            onChange={handleStatusChange}
            className="mr-2"
          />
          <label htmlFor="status" className="font-bold">
            {formData.status}
          </label>
        </div>
        <button type="submit" className="w-full bg-[#F1B82D] text-[#00163e] font-bold py-2 px-4 rounded hover:bg-[#e0a81d]">
          Cadastrar
        </button>
        <Link href="/oficinas">
          <p className="mt-4 text-center underline hover:text-gray-300">Voltar para Oficinas</p>
        </Link>
      </form>
    </div>
  );
}