import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";

const HomeBanner = ({ banner }) => {
  return (
    <section className="section pb-[50px] pt-28">
      <div className="container">
        <div className="row text-center">
          <div className="mx-auto lg:col-10">
            <h1 className="font-primary font-bold">{banner.title}</h1>
            <Link
              className="w-[40%] btn btn-primary z-0 py-[14px] my-5"
              href="/contact"
              rel=""
            >
              Начать
            </Link>
            <p className="mt-4">{markdownify(banner.content)}</p>
            {banner.button.enable && (
              <Link
                className="btn btn-primary mt-4"
                href={banner.button.link}
                rel={banner.button.rel}
              >
                {banner.button.label}
              </Link>
            )}
            <img
              className="mx-auto mt-12"
              src={banner.image}
              width={750}
              height={390}
              alt="banner image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
