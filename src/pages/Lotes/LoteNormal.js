import React from "react";
import { Grid} from "@material-ui/core";
import Controls from "../../components/controls/Controls";

export default function LoteNorma({values,handleInputChange}) {

  
const pessoaItems = [
  { id: "Física", title: "Física" },
  { id: "Jurídica", title: "Jurídica" },
];

  return (
    <Grid container spacing={3}>
        <Controls.Input
          grid={4}
          name="imogeo"
          label="Código"
          value={values.imogeo}
          onChange={handleInputChange}
         
        />

        <Controls.Input
          grid={4}
          label="SQL"
          name="imosql"
          value={values.imosql}
          onChange={handleInputChange}
         
        />
        <Controls.Input
          grid={4}
          label="IPTU"
          name="imoiptu"
          value={values.imoiptu}
          onChange={handleInputChange}
          
        />
        {/* linha */}

        <Controls.Input
          grid={5}
          label="Endereço"
          name="imoend"
          value={values.imoend}
          onChange={handleInputChange}
         
        />
        <Controls.Input
          grid={2}
          label="Nº"
          name="imonum"
          value={values.imonum}
          onChange={handleInputChange}
        />
        <Controls.Input
          grid={5}
          label="Bairro"
          name="imobai"
          value={values.imobai}
          onChange={handleInputChange}
        />
        {/* linha */}

        <Controls.Input
          grid={7}
          label="Município"
          name="imomun"
          value={values.imomun}
          onChange={handleInputChange}
        
        />
        <Controls.Input
          grid={2}
          label="UF"
          name="imouf"
          value={values.imouf}
          onChange={handleInputChange}
        />
        <Controls.Input
          grid={3}
          label="Cep"
          name="imocep"
          value={values.imocep}
          onChange={handleInputChange}
        />
            <Controls.RadioGroup
        name="imopessoa"
        label="Pessoa"
        value={values.imopessoa}
        onChange={handleInputChange}
        items={pessoaItems}
      />
        </Grid>   
  );
}
