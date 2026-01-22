import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

interface Tema {
  id: number;
  descricao: string;
}

function DeletarTema() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [tema, setTema] = useState<Tema>({ id: 0, descricao: "" });
  const [isLoading, setIsLoading] = useState(false);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (!token) {
      alert("Você precisa estar logado");
      navigate("/");
      return;
    }

    if (id) carregarTema();
  }, [token, id]);

  async function carregarTema() {
    try {
      const response = await axios.get(
        `https://blogpessoal-nest-zcc0.onrender.com/temas/${id}`,
        { headers: { Authorization: token } },
      );
      setTema(response.data);
    } catch (error: any) {
      if (error.response?.status === 401) handleLogout();
    }
  }

  async function deletarTema() {
    if (!confirm("Tem certeza que deseja excluir este tema?")) return;

    setIsLoading(true);

    try {
      await axios.delete(
        `https://blogpessoal-nest-zcc0.onrender.com/temas/${id}`,
        { headers: { Authorization: token } },
      );

      alert("Tema excluído com sucesso!");
      navigate("/temas");
    } catch (error: any) {
      if (error.response?.status === 401) handleLogout();
      else alert("Erro ao excluir tema.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container w-1/3 mx-auto">
      <h1 className="text-4xl text-center my-4">Excluir Tema</h1>

      <p className="text-center font-semibold mb-4">
        Tem certeza que deseja excluir este tema?
      </p>

      <div className="border rounded-2xl overflow-hidden shadow-lg">
        <header className="py-3 px-6 bg-red-600 text-white font-bold text-xl">
          Tema
        </header>

        <p className="p-8 text-2xl bg-gray-100 text-center min-h-[100px] flex items-center justify-center">
          {tema.descricao || "Carregando..."}
        </p>

        <div className="flex">
          <button
            onClick={() => navigate("/temas")}
            className="w-full py-3 bg-gray-500 text-white hover:bg-gray-600 font-medium disabled:opacity-50"
            disabled={isLoading}
          >
            Cancelar
          </button>

          <button
            onClick={deletarTema}
            className="w-full py-3 bg-red-500 text-white hover:bg-red-600 font-medium disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Excluindo..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarTema;
