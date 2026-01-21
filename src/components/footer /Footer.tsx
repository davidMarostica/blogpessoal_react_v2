import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react";

function Footer() {
  let data = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="mt-8 flex justify-center bg-green-900 text-white">
        <div className="container flex flex-col items-center py-8">
          <p className="text-xl font-bold">
            Blog Pessoal Generation | Copyright: {data}
          </p>
          <p className="text-lg">Acesse nossas redes sociais</p>
          <div className="flex gap-2">
            <a
              href="https://www.linkedin.com/in/david-aparecido-da-silva"
              target="_blank"
            >
              <LinkedinLogoIcon size={48} weight="bold" />
            </a>
            <a href="https://www.instagram.com/seu_usuario" target="_blank">
              <InstagramLogoIcon size={48} weight="bold" />
            </a>
            <a href="https://www.facebook.com/seu_usuario" target="_blank">
              <FacebookLogoIcon size={48} weight="bold" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
