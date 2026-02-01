import { getTrackId } from "@/lib/api";
import CamperClient from "./camperpage";
import "./campers.css";

export interface CamperData {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: string;
  engine: string;
  AC: boolean;
  bathroom: boolean;
  kitchen: boolean;
  TV: boolean;
  radio: boolean;
  refrigerator: boolean;
  microwave: boolean;
  gas: boolean;
  water: boolean;
  gallery: { thumb: string; original: string }[];
  reviews: {
    reviewer_name: string;
    reviewer_rating: number;
    comment: string;
  }[];
}

interface CampersProps {
  params: { id: string };
}

export default async function Campers({ params }: CampersProps) {
  const { id } = params;

  const response = await getTrackId(id);
  const data: CamperData = response.data;

  return <CamperClient data={data} />;
}
