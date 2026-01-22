import { Link } from "react-router-dom";

interface CardTemaProps {
  tema: {
    id: number;
    descricao: string;
  };
}

function CardTema({ tema }: CardTemaProps) {
  return (
    <div className="border flex flex-col rounded-2xl overflow-hidden">
      <header className="py-2 px-6 bg-green-500 text-white font-bold text-2xl">
        Tema
      </header>

      <p className="p-8 text-3xl bg-slate-200">{tema.descricao}</p>

      <div className="flex">
        <Link
          to={`/editartema/${tema.id}`}
          className="w-full bg-indigo-500 hover:bg-indigo-700 text-white flex items-center justify-center py-2"
        >
          Editar
        </Link>

        <Link
          to={`/deletartema/${tema.id}`}
          className="w-full bg-red-500 hover:bg-red-700 text-white flex items-center justify-center py-2"
        >
          Excluir
        </Link>
      </div>
    </div>
  );
}

export default CardTema;
