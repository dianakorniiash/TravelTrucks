"use client";

import AC from "@/public/AC.svg";
import Bathroom from "@/public/Bathroom.svg";
import Gas from "@/public/hugeicons_gas-stove.svg";
import Water from "@/public/ion_water-outline.svg";
import Kitchen from "@/public/Kitchen.svg";
import microwave from "@/public/lucide_microwave.svg";
import refrigerator from "@/public/solar_fridge-outline.svg";
import StarUnpositive from "@/public/starWi.svg";
import StarPositive from "@/public/StarYell.svg";
import TV from "@/public/TV.svg";
import radio from "@/public/ui-radios.svg";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import * as Yup from "yup";
import "./campers.css";


interface BookingFormValues {
  name: string;
  email: string;
  date: Date | null;
  comment: string;
}

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
  reviews: { reviewer_name: string; reviewer_rating: number; comment: string }[];
}

interface CamperClientProps {
  data: CamperData;
}

export default function CamperClient({ data }: CamperClientProps) {
  const [activeTab, setActiveTab] = useState<"features" | "reviews">("features");



const BookingSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  date: Yup.date().required("Booking date is required"),
  comment: Yup.string(),
});



const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Image
        key={i}
        src={i <= rating ? StarPositive : StarUnpositive}
        className="iconcategory"
        alt="star"
        width={16}
        height={16}
      />
    );
  }
  return stars;
};
const firsLetter = (word: string) => {
    const firstLetter = word[0].toUpperCase();
    return firstLetter;
};

  return (
    <main className="campersmain">
      <div className="contsainer-camper">
        <div className="info-block">
         <div>
          <h2 className="name">{data.name}</h2>

          <div className="meta">
            <span className="raiting-star">
                <Image
                    src={StarPositive}
                    className="Star"
                    alt="Star"
                    width={16}
                    height={16}
                  />
                {data.rating} ({data.reviews.length} Reviews)</span>
            <span className="raiting-info">{data.location}</span>
          </div>

          <span className="price">€{data.price}.00</span>
          </div>
          <div className="gallery">
            {data.gallery.map((item, index) => (
              <div key={index} className="image">
                <Image
                  src={item.thumb || "/placeholder.jpg"}
                  alt={data.name}
                  width={292}
                  height={300}
                  className="img-dataile"
                  unoptimized
                />
              </div>
            ))}
          </div>

          <p>{data.description}</p>
        </div>

        {/* Табы Features / Reviews */}
        <div className="tabs-container">
          <div className="tabs">
            <button
              className={`tab ${activeTab === "features" ? "active" : ""}`}
              onClick={() => setActiveTab("features")}
            >
              Features
            </button>
            <button
              className={`tab ${activeTab === "reviews" ? "active" : ""}`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </button>
          </div>
          <div className="tabs-line"></div>

          <div className="tab-content">
            {activeTab === "features" && (
                <div className="features">
              <div className="tags">
              {data.AC && <span><Image src={AC} className="iconcategory" alt="AC" width={20} height={20} /> AC</span>}
              {data.kitchen && <span><Image src={Kitchen} className="iconcategory" alt="AC" width={20} height={20} />Kitchen</span>}
              {data.bathroom && <span><Image src={Bathroom} className="iconcategory" alt="AC" width={20} height={20} />Bathroom</span>}
              {data.gas && <span><Image src={Gas} className="iconcategory" alt="AC" width={20} height={20} />Gas</span>}
              {data.water && <span><Image src={Water} className="iconcategory" alt="AC" width={20} height={20} />Water</span>}
              {data.TV && <span><Image src={TV} className="iconcategory" alt="AC" width={20} height={20} />TV</span>}
              {data.microwave && <span><Image src={microwave} className="iconcategory" alt="microwave" width={20} height={20} />Microwave</span>}
              {data.refrigerator && <span><Image src={refrigerator} className="iconcategory" alt="refrigerator" width={20} height={20} />Refrigerator</span>}
              {data.radio && <span><Image src={radio} className="iconcategory" alt="radio" width={20} height={20} />Radio</span>}
            </div>
            <div>
                <h3 className="titlle">Vehicle details</h3>
                <div className="line"></div>
                <div className="character">
                    <div className="block-character">
                        <p className="character">Form</p><p className="character">{data.form}</p>
                    </div>
                    <div className="block-character">
                        <p className="character">Length</p><p className="character">{data.length}</p>
                    </div>
                    <div className="block-character">
                        <p className="character">Width</p><p className="character">{data.width}</p>
                    </div>
                    <div className="block-character">
                        <p className="character">Height</p><p className="character">{data.height}</p>
                    </div>
                    <div className="block-character">
                        <p className="character">Tank</p><p className="character">{data.tank}</p>
                    </div>
                    <div className="block-character">
                        <p className="character">Consumption</p><p className="character">{data.consumption}</p>
                    </div>
                </div>
            </div>
                </div>
            )}
            {activeTab === "reviews" && (
              <div className="reviews-list">
                {data.reviews.map((r, i) => (
                <div className="container-coment" key={i}>
                    <div className="top-cooment">
                        <div className="iconname">{firsLetter(r.reviewer_name)}</div>
                        <div className="con-n-r">
                            <p className="nameComentator">{r.reviewer_name}</p>
                            <div className="raiting">{renderStars(r.reviewer_rating)}</div>
                        </div>
                    </div>
                    <div>
                        <p className="comment">{r.comment}</p>
                    </div>
                </div>
                ))}
              </div>
            )}
            <div className="contact-us">
  <div>
    <h3 className="TitleUs">Book your campervan now</h3>
    <p className="comment">Stay connected! We are always ready to help you.</p>
  </div>

  <Formik<BookingFormValues>
  initialValues={{
    name: "",
    email: "",
    date: null,
    comment: "",
  }}
  validationSchema={BookingSchema}
  onSubmit={(values, { resetForm }) => {
    toast.success("Booking successful!");
    resetForm();
  }}
>
    {({ setFieldValue, values }) => (
      <Form className="ContainerForm">
        <Field
          name="name"
          placeholder="Name*"
          className="InputInfoC"
        />
        <ErrorMessage name="name" component="div" className="error" />

        <Field
          name="email"
          placeholder="Email*"
          className="InputInfoC"
        />
        <ErrorMessage name="email" component="div" className="error" />

        <DatePicker
  selected={values.date}
  onChange={(date: Date | null) => setFieldValue("date", date)}
  placeholderText="Booking date*"
  className="InputInfoC"
  dateFormat="dd/MM/yyyy"
/>
        <ErrorMessage name="date" component="div" className="error" />

        <Field
          as="textarea"
          name="comment"
          placeholder="Comment"
          className="InputDopInfo"
        />

        <button type="submit" className="btn-contact">
          Send
        </button>
      </Form>
    )}
  </Formik>
</div>
          </div>
        </div>
      </div>
    </main>
  );
}
