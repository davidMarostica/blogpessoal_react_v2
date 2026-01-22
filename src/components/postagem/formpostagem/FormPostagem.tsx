import {
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

interface Tema {
  id: number;
  descricao: string;
}

interface Postagem {
  id: number;
  titulo: string;
  texto: string;
  data: string;
  tema: Tema;
}

function FormPostagem() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [isLoading, setIsLoading] = useState(false);
  const [temas, setTemas] = useState<Tema[]>([]);
  const [postagem, setPostagem] = useState<Postagem>({
    id: 0,
    titulo: "",
    texto: "",
    data: "",
    tema: { id: 0, descricao: "" },
  });

  useEffect(() => {
    if (!token) {
      alert("Você precisa estar logado!");
      navigate("/");
      return;
    }

    carregarTemas();
    if (id) carregarPostagem();
  }, [token, id]);

  async function carregarTemas() {
    try {
      await buscar("/temas", setTemas, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) handleLogout();
    }
  }

  async function carregarPostagem() {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) handleLogout();
    }
  }

  function atualizarEstado(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setPostagem({ ...postagem, [name]: value });
  }

  function selecionarTema(e: ChangeEvent<HTMLSelectElement>) {
    const temaId = parseInt(e.target.value);
    const temaSelecionado = temas.find((t) => t.id === temaId) || {
      id: 0,
      descricao: "",
    };
    setPostagem({ ...postagem, tema: temaSelecionado });
  }

  async function salvarPostagem(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (id) {
        await atualizar(`/postagens/${id}`, postagem, setPostagem, {
          headers: { Authorization: token },
        });
        alert("Postagem atualizada!");
      } else {
        await cadastrar("/postagens", postagem, setPostagem, {
          headers: { Authorization: token },
        });
        alert("Postagem criada!");
      }
      navigate("/postagens");
    } catch (error: any) {
      if (error.toString().includes("401")) handleLogout();
      else alert("Erro ao salvar postagem.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <h1 className="text-1xl font-bold text-center mb-8">
        {id ? "Editar Postagem" : "Nova Postagem"}
      </h1>

      <form onSubmit={salvarPostagem} className="space-y-6">
        <div>
          <label className="block font-medium mb-2">Título</label>
          <input
            type="text"
            name="titulo"
            value={postagem.titulo}
            onChange={atualizarEstado}
            required
            className="w-full p-3 border rounded-lg"
            placeholder="Digite o título"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Conteúdo</label>
          <textarea
            name="texto"
            value={postagem.texto}
            onChange={atualizarEstado}
            required
            rows={5}
            className="w-full p-3 border rounded-lg"
            placeholder="Digite o conteúdo"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Tema</label>
          <select
            value={postagem.tema.id || ""}
            onChange={selecionarTema}
            required
            className="w-full p-3 border rounded-lg"
          >
            <option value="" disabled>
              Selecione um tema
            </option>
            {temas.map((tema) => (
              <option key={tema.id} value={tema.id}>
                {tema.descricao}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate("/postagens")}
            className="flex-1 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:opacity-50"
          >
            {isLoading ? "Salvando..." : id ? "Atualizar" : "Publicar"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormPostagem;
