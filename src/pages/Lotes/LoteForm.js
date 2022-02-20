import React, { useEffect } from "react";
import { Grid} from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/useForm";
//import * as employeeService from "../../services/employeeService";

const pessoaItems = [
  { id: "Física", title: "Física" },
  { id: "Jurídica", title: "Jurídica" },
];

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

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("imogeo" in fieldValues)
      temp.imogeo = fieldValues.imogeo ? "" : "Campo é obrigatório";
    setErrors({
      ...temp,
    });

    if (fieldValues === values) return Object.values(temp).every((x) => x === "");
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

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Controls.Input
          grid={4}
          name="imogeo"
          label="Código"
          value={values.imogeo}
          onChange={handleInputChange}
          error={errors.imogeo}
        />

        <Controls.Input
          grid={4}
          label="SQL"
          name="imosql"
          value={values.imosql}
          onChange={handleInputChange}
          error={errors.imosql}
        />
        <Controls.Input
          grid={4}
          label="IPTU"
          name="imoiptu"
          value={values.imoiptu}
          onChange={handleInputChange}
          error={errors.imoiput}
        />
        {/* linha */}

        <Controls.Input
          grid={5}
          label="Endereço"
          name="imoend"
          value={values.imoend}
          onChange={handleInputChange}
          error={errors.imoend}
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
          error={errors.imomun}
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

        <div>
          <Controls.Button type="submit" text="Salvar" />
          <Controls.Button text="Limpar" color="default" onClick={resetForm} />
        </div>
      </Grid>
    </Form>
  );
}
