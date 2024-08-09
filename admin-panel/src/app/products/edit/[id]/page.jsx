import EditForm from "@/components/Pages/EditForm";
import React from "react";

function Edit({ params }) {
   const { id } = params;

   return <EditForm id={id} />;
}

export default Edit;
