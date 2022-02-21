import React, { useEffect, useState } from "react";
import { Grid, Button, ButtonGroup } from "@material-ui/core";

import Controls from "../controls/Controls";
import { useForm } from "../useForm";
import Juridico from "./Juridico";
import Informacao from "./Informacao";

const initialFValues = {
  imoid: 0,
  imogeo: "",
  imosql: "",
  imomun: "",
  imobai: "",
  imopessoa: "Física",
};

export default function LoteForm(props) {
  const { addOrEdit, recordForEdit } = props;
  const [ativo, setAtivo] = useState(0);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("imogeo" in fieldValues)
      temp.imogeo = fieldValues.imogeo ? "" : "Campo é obrigatório";
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  function getStepContent() {
    switch (ativo) {
      case 0:
        return (
          <Informacao values={values} handleInputChange={handleInputChange} />
        );
      case 1:
        return (
          <Juridico values={values} handleInputChange={handleInputChange} />
        );

      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <Grid container spacing={3}>
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button onClick={() => setAtivo(0)}>Informação</Button>
        <Button onClick={() => setAtivo(1)}>Jurídico</Button>
      </ButtonGroup>

      {getStepContent()}

      <Grid item xs={12} >   
        <div>
          <Controls.Button type="submit" text="Salvar" onClick={handleSubmit} />
          <Controls.Button text="Limpar" color="default" onClick={resetForm} />
        </div>
      </Grid>
    </Grid>
  );
}
