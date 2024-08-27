import EditForm from "@/components/pages/products/Edit";
import React from "react";

function Edit({ params }) {
   const { id } = params;

   return <EditForm id={id} />;
}

export default Edit;
