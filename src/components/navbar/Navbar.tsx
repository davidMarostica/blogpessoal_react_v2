import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

function Navbar() {
  const navigate = useNavigate();
  const { handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    alert("O Usuário foi desconectado com sucesso!");
    navigate("/");
  }

  return (
    <>
      <div className="w-full flex justify-center py-4 bg-green-900 text-white">
        <div className="container flex justify-between text-lg items-center">
          <Link to="/home" className="text-2xl font-bold">
            Blog Pessoal
          </Link>
          <div className="flex gap-4">
            <Link to="/postagens" className="hover:underline">
              Postagens
            </Link>
            <Link to="/temas" className="hover:underline">
              Temas
            </Link>
            <Link to="/cadastroTema" className="hover:underline">
              Cadastrar tema
            </Link>
            <Link to="/perfil" className="hover:underline">
              Perfil
            </Link>
            <button onClick={logout} className="hover:underline">
              Sair
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
