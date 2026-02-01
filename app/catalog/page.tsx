import Category from "@/component/Category/Category";
import TrackList from "@/component/TrackList/TrackList";
import { Metadata } from "next";
import "./catalog.css";

export const metadata: Metadata = {
  title: "Camper Catalog | Camper Rental",
  description: "Explore our campervan catalog. Filter by location, features, and book your ideal campervan today.",
  keywords: ["camper catalog", "camper rental", "vanlife", "travel", "book campervan"],
  openGraph: {
    title: "Camper Catalog",
    description: "Find and filter campervans with detailed specifications and reviews.",
    type: "website",
  },
};

export default function Catalog() {




    return (
        <div className="container-list">
        <div className="List-truck">
            <Category />
            <TrackList />
        </div>
        </div>
    )

}
