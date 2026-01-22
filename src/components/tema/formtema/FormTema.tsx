import {
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";

interface TemaState {
  id?: number;
  descricao: string;
}

function FormTema() {
  const navigate = useNavigate();
  const [tema, setTema] = useState<TemaState>({ descricao: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;
  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTema, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) handleLogout();
    }
  }

  useEffect(() => {
    if (!token) {
      alert("Você precisa estar logado!");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id) buscarPorId(id);
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setTema({ ...tema, [e.target.name]: e.target.value });
  }

  async function gerarNovoTema(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (id) {
        await atualizar(`/temas/${id}`, tema, setTema, {
          headers: { Authorization: token },
        });
        alert("Tema atualizado com sucesso!");
      } else {
        await cadastrar(`/temas`, tema, setTema, {
          headers: { Authorization: token },
        });
        alert("Tema cadastrado com sucesso!");
      }
    } catch (error: any) {
      if (error.toString().includes("401")) handleLogout();
      else alert("Erro ao processar tema.");
    } finally {
      setIsLoading(false);
      navigate("/temas");
    }
  }

  return (
    <div className="container flex flex-col items-center justify-center mx-auto">
      <h1 className="text-4xl text-center my-8">
        {id ? "Editar Tema" : "Cadastrar Tema"}
      </h1>
      <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovoTema}>
        <div className="flex flex-col gap-2">
          <label htmlFor="descricao" className="font-semibold">
            Descrição do Tema
          </label>
          <input
            type="text"
            placeholder="Descreva aqui seu tema"
            name="descricao"
            value={tema.descricao}
            onChange={atualizarEstado}
            className="border-2 border-slate-700 rounded p-2"
            required
          />
        </div>
        <button
          className="rounded text-slate-100 bg-indigo-400 hover:bg-indigo-800 w-1/2 py-2 mx-auto disabled:opacity-50"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Salvando..." : id ? "Atualizar" : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}

export default FormTema;
