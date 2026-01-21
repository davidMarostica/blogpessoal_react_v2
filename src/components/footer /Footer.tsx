import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react";

function Footer() {
  let data = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="mt-auto flex justify-center bg-green-900 text-white py-4">
        <div className="container flex flex-col items-center py-100">
          <p className="text-xl font-bold">
            Blog Pessoal Generation | Copyright: {data}
          </p>
          <p className="text-lg">Acesse nossas redes sociais</p>
          <div className="flex gap-2">
            <LinkedinLogoIcon size={48} weight="bold" />
            <InstagramLogoIcon size={48} weight="bold" />
            <FacebookLogoIcon size={48} weight="bold" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
