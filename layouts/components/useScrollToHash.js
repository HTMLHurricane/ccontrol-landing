"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const useScrollToHash = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Проверяем, если в URL есть хэштег
    const hash = window.location.hash.replace("#", "");

    if (hash) {
      const element = document.getElementById(hash);

      // Ждем, пока DOM загрузится и элемент появится, затем прокручиваем
      const interval = setInterval(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          clearInterval(interval);
        }
      }, 100); // Проверяем наличие элемента каждую 100мс, пока он не появится

      return () => clearInterval(interval);
    }
  }, [pathname]);

  // Обработка повторного клика на ту же ссылку
  useEffect(() => {
    const handleClick = (event) => {
      const target = event.target;

      if (target.tagName === "A" && target.hash) {
        const hash = target.hash.replace("#", ""); // Убираем # из хэша
        const element = document.getElementById(hash);

        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          event.preventDefault(); // Предотвращаем дефолтное поведение
        }
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);
};

export default useScrollToHash;
