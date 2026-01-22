import ListaPostagens from "../../components/postagem/listapostagens/ListaPostagens";
import ModalPostagem from "../../components/postagem/modalpostagem/ModalPostagem";

function Home() {
  return (
    <>
      <section className="bg-green-900 flex justify-center">
        <div className="container grid grid-cols-1 md:grid-cols-2 text-white py-8">
          <div className="flex flex-col gap-6 items-center justify-center p-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center">
              Seja Bem-Vinde!
            </h2>

            <p className="text-lg md:text-xl text-center">
              Expresse aqui seus pensamentos e opiniões
            </p>

            <div className="flex gap-4 mt-4">
              <ModalPostagem />
            </div>
          </div>

          <div className="flex justify-center items-center p-6">
            <img
              src="https://i.imgur.com/fyfri1v.png"
              alt="Imagem Página Home"
              className="w-full max-w-md rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>

      <ListaPostagens />
    </>
  );
}

export default Home;
