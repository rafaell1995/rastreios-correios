"use client";
import { useState } from "react";

// Função para extrair e transformar a URL no texto
const parseDetalhe = (detalhe: string) => {
  // Expressão regular para detectar URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // Verificando se existe uma URL no texto
  const urls = detalhe.match(urlRegex);

  if (urls) {
    // Se houver uma URL, criamos o link clicável
    return detalhe.split(urls[0]).map((part, index) => (
      <span key={index}>
        {part}
        {index === 0 ? (
          <a
            href={urls[0]}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600 hover:text-blue-800"
          >
            {urls[0]}
          </a>
        ) : null}
      </span>
    ));
  }

  // Se não houver URL, apenas retorna o texto original
  return <span>{detalhe}</span>;
};

const TrackPage = () => {
  const [codigo, setCodigo] = useState("");
  const [entregas, setEntregas] = useState<any[]>([]);
  const [erro, setErro] = useState("");

  const handleTrack = async () => {
    setErro(""); // Resetando o erro
    try {
      const response = await fetch("/api/rastreio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: codigo }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data.message || "Erro desconhecido");
        return;
      }

      if (data.codObjeto) {
        setEntregas((prev) => [...prev, data]);
        setCodigo(""); // Limpa o campo de entrada após o rastreio
      } else {
        setErro(data.message || "Objeto não encontrado");
      }
    } catch (error) {
      console.error("Erro ao rastrear:", error);
      setErro("Erro ao rastrear o objeto. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center py-12 px-6">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Rastreio de Encomendas
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="w-full p-4 text-lg text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite o código de rastreio"
          />
          <button
            onClick={handleTrack}
            className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Rastrear
          </button>
        </div>

        {erro && (
          <div className="mt-4 text-red-600 text-center">
            <strong>Erro: </strong>
            {erro}
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Entregas Rastreando
          </h2>
          {entregas.length === 0 ? (
            <p className="text-gray-500 text-center mt-4">
              Nenhuma encomenda rastreada ainda.
            </p>
          ) : (
            <ul className="mt-6 space-y-4">
              {entregas.map((entrega, index) => (
                <li
                  key={index}
                  className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition-all"
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    {entrega.codObjeto}
                  </h3>
                  <div className="mt-4 space-y-4">
                    {entrega.eventos.map((evento: any, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-start space-x-4 p-3 bg-white rounded-lg shadow-sm"
                      >
                        {/* Ícone */}
                        <span className="flex-shrink-0 text-blue-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="feather feather-file"
                          >
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"></path>
                            <line x1="14" y1="2" x2="14" y2="8"></line>
                            <line x1="6" y1="14" x2="18" y2="14"></line>
                          </svg>
                        </span>

                        <div>
                          {/* Descrição do evento */}
                          <p className="font-medium text-gray-800">
                            {evento.descricao}
                          </p>
                          <p className="text-sm text-gray-600">
                            {new Date(evento.dtHrCriado.date).toLocaleString()}
                          </p>
                          {/* Detalhe adicional */}
                          {evento.detalhe && (
                            <p className="text-xs text-blue-600 mt-2">
                              {parseDetalhe(evento.detalhe)}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackPage;
