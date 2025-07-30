import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { code } = await request.json();
  const API_KEY = process.env.API_KEY;
  const API_URL = process.env.API_URL;

  try {
    const response = await fetch(`${API_URL}/Track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Apikey ${API_KEY}`,
      },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();

    // Log da resposta da API para ver o que está sendo retornado
    console.log("Resposta da API:", data);

    // Verificando se o campo 'json' existe e analisando a string JSON
    const parsedData = data.json ? JSON.parse(data.json) : data;

    // Log da resposta analisada
    console.log("Resposta analisada:", parsedData);

    if (parsedData.codObjeto) {
      return NextResponse.json(parsedData);
    } else {
      // Melhor mensagem de erro para mostrar no frontend
      return NextResponse.json(
        { message: "Objeto não encontrado. Verifique o código de rastreio." },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Erro ao acessar a API:", error);
    return NextResponse.json(
      { message: "Erro ao acessar a API de rastreio" },
      { status: 500 }
    );
  }
}
