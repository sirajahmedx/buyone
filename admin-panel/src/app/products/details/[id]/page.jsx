import Details from "@/components/pages/products/Details";
import React from "react";

function Detail({ params }) {
   const { id } = params;

   return <Details id={id} />;
}

export default Details;
