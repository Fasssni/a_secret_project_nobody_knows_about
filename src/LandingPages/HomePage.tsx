import { useEffect, useRef, useState } from "react";
import "../main.css";
import cl from "./HomePage.module.css";

import { useNavigate } from "react-router-dom";

import image1 from ".././utils/pics/lp1.png";
import image2 from ".././utils/pics/lp2.png";
import image3 from ".././utils/pics/lp3.png";
import image4 from ".././utils/pics/lp4.png";

import socials from ".././utils/IntegrationData.json";

export const HomePage = () => {
  const navigate = useNavigate();

  const teams = [
    { id: 1, name: "Quantum" },
    { id: 2, name: "Stellar" },
    { id: 3, name: "Fusion" },
    { id: 4, name: "Nebula" },
    { id: 5, name: "Vertex" },
    { id: 6, name: "Pinnacle" },
    { id: 7, name: "Horizon" },
    { id: 8, name: "Zenith" },
    { id: 9, name: "Sapphire" },
    { id: 10, name: "Nova" },
  ];

  return (
    <div className={cl.main_container}>
      <main className={cl.home_unauth}>
        <div className={cl.top_calltoaction}>
          <h1 className={cl.namer}>Harness the potential of chat marketing</h1>
          <p className={cl.description}>
            Integrate and manage your channels seamlessly with our AI-powered
            customer relation management service.
          </p>
          <button
            className={cl.start_button}
            onClick={() => navigate("/signup")}
          >
            <span className={cl.onspan} data-text="get started for free">
              get started for free
            </span>
          </button>
          <div className={cl.image_container}>
            <div className={cl.phone_demo}>
              <img src={image1} alt="" className={cl.image} />
            </div>
          </div>
        </div>
        <section className={cl.promo_section}>
          <div className={cl.promotion}>
            <h4 className={cl.prom_desc}>Trusted by 5000+ teams</h4>
            <CompanyBanner companies={teams} />
          </div>
          <ScrollReplaceTitles />

          <div className={cl.progressbar}>
            <img src={image4} alt="" />
          </div>
          <h3 style={{ fontSize: "1.5rem", marginTop: "2rem" }}>
            Have all of you messangers at one place
          </h3>
          <div className={cl.socials}>
            {socials.map((item) => {
              return (
                <div className={cl.socials_container} key={item.title}>
                  <img src={item.imageUrl} alt="" />
                </div>
              );
            })}
          </div>
          <button
            className={cl.call_button}
            onClick={() => navigate("/signup")}
          >
            get started
          </button>
        </section>
      </main>

      <footer className={cl.footer}></footer>
    </div>
  );
};

const ScrollReplaceTitles = () => {
  const [replaceTitles, setReplaceTitles] = useState(false);
  const titlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (titlesRef.current) {
        const rect = titlesRef.current.getBoundingClientRect();
        const threshold = window.innerHeight / 2.2;

        setReplaceTitles(rect.top < threshold);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={cl.ad_title} ref={titlesRef}>
      <div className={cl.ad_screen_top}>
        <img src={image2} alt="" />
      </div>
      {replaceTitles ? (
        <h1 className={cl.ad_text}>Your business should be too</h1>
      ) : (
        <h1 className={cl.ad_text}>The world is digital</h1>
      )}
      <div className={cl.ad_screen_bottom}>
        <img src={image3} alt="" />
      </div>
    </div>
  );
};

type BannerType = {
  id: number;
  name: string;
};

type CompanyType = {
  companies: BannerType[];
};

const CompanyBanner = ({ companies }: CompanyType) => {
  const bannerRef = useRef(null);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const bannerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setScrolling(true);
          } else {
            setScrolling(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (bannerRef.current) {
      bannerObserver.observe(bannerRef.current);
    }

    return () => {
      if (bannerRef.current) {
        bannerObserver.unobserve(bannerRef.current);
      }
    };
  }, []);

  return (
    <div className={cl.banner} ref={bannerRef}>
      <div className={`${cl.companyList} ${scrolling ? cl.scrolling : ""}`}>
        {companies.map((company) => (
          <h4 key={company.id} className={cl.companyItem}>
            {company.name}
          </h4>
        ))}
      </div>
    </div>
  );
};
