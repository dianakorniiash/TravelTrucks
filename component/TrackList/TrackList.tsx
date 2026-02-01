"use client";

import AC from "@/public/AC.svg";
import Bathroom from "@/public/Bathroom.svg";
import Gas from "@/public/hugeicons_gas-stove.svg";
import Water from "@/public/ion_water-outline.svg";
import Kitchen from "@/public/Kitchen.svg";
import Like from "@/public/Like.svg";
import LikeFaforite from "@/public/LikeActive.svg";
import microwave from "@/public/lucide_microwave.svg";
import refrigerator from "@/public/solar_fridge-outline.svg";
import Star from "@/public/StarYell.svg";
import TV from "@/public/TV.svg";
import radio from "@/public/ui-radios.svg";
import { useTrucksStore } from "@/store/campers";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import "./TrackList.css";



export default function TrucksList() {
  const { trucks, fetchFirstPage, fetchNextPage, filters, loading, currentPage } =
    useTrucksStore();

const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem("favorites");
    return data ? JSON.parse(data) : [];
  });

  const buttonDissable = trucks.total > currentPage * 4;

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      let updated;

      if (prev.includes(id)) {
        updated = prev.filter((f) => f !== id);
      } else {
        updated = [...prev, id];
      }

      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    fetchFirstPage();
  }, [filters, fetchFirstPage]);

  return (
    <div className="list">
      {trucks.items.map((t) => (
        <div key={t.id} id={t.id} className="card">

          {/* LEFT IMAGE */}
          <div className="image">
            <Image
              src={t.gallery?.[0]?.thumb || "/placeholder.jpg"}
              alt={t.name}
              width={300}
              height={200}
              unoptimized
            />
          </div>


          <div className="content">


            <div className="container-price">
            <div className="top">
              <h3>{t.name}</h3>
              <div className="Price-like">
              <p className="price">€{t.price}.00</p>
              <Image
                    onClick={() => toggleFavorite(t.id)}
                    src={favorites.includes(t.id) ? LikeFaforite : Like}
                    className="Like"
                    alt="Like"
                    width={26}
                    height={24}
                  />
              </div>
            </div>


            <div className="meta">
              <span className="raiting-star">
                <Image
                    src={Star}
                    className="Star"
                    alt="Star"
                    width={16}
                    height={16}
                  />
                {t.rating} ({t.reviews.length} Reviews)</span>
              <span>{t.location}</span>
            </div>
            </div>


            <p className="desc">
              {t.description}
            </p>

            <div className="tags">
              {t.AC && <span><Image src={AC} className="iconcategory" alt="AC" width={20} height={20} /> AC</span>}
              {t.kitchen && <span><Image src={Kitchen} className="iconcategory" alt="AC" width={20} height={20} />Kitchen</span>}
              {t.bathroom && <span><Image src={Bathroom} className="iconcategory" alt="AC" width={20} height={20} />Bathroom</span>}
              {t.gas && <span><Image src={Gas} className="iconcategory" alt="AC" width={20} height={20} />Gas</span>}
              {t.water && <span><Image src={Water} className="iconcategory" alt="AC" width={20} height={20} />Water</span>}
              {t.TV && <span><Image src={TV} className="iconcategory" alt="AC" width={20} height={20} />TV</span>}
              {t.microwave && <span><Image src={microwave} className="iconcategory" alt="microwave" width={20} height={20} />Microwave</span>}
              {t.refrigerator && <span><Image src={refrigerator} className="iconcategory" alt="refrigerator" width={20} height={20} />Refrigerator</span>}
              {t.radio && <span><Image src={radio} className="iconcategory" alt="radio" width={20} height={20} />Radio</span>}
            </div>

            <Link href={`/campers/${t.id}`}><button className="btn">Show more</button></Link>
          </div>
        </div>
      ))}

      {loading && <span className="loader"></span>}

      {!loading && buttonDissable && <button onClick={fetchNextPage} className="btnmore">Load more</button>}
    </div>
  );
}