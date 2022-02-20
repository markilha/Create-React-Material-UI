import React from "react";
import { Grid} from "@material-ui/core";
import Controls from "../../components/controls/Controls";




const pessoaItems = [
  { id: "Física", title: "Física" },
  { id: "Jurídica", title: "Jurídica" },
];



export default function LoteJuridico({values,handleInputChange}) {

  return (
   // <Form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Controls.Input
          grid={4}
          name="imogeo"
          label="Código"
          value={values.imogeo}
          onChange={handleInputChange}         
        />       
      
      </Grid>
   
  );
}
