import React, {useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
//import * as employeeService from "../../services/employeeService";


const pessoaItems = [
    { id: 'fisica', title: 'Fisica' },
    { id: 'Juridica', title: 'Jurídica' }    
]

const initialFValues = {
    imoid: 0,
    imogeo: '',
    imosql: '',
    imomun: '',
    imobai: '',
    imopessoa: 'juridica'  
}

export default function LoteForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('imogeo' in fieldValues)
            temp.imogeo = fieldValues.imogeo ? "" : "Campo é obrigatório"       
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="imogeo"
                        label="Código"
                        value={values.imogeo}
                        onChange={handleInputChange}
                        error={errors.imogeo}
                    />
                    <Controls.Input
                        label="SQL"
                        name="imosql"
                        value={values.imosql}
                        onChange={handleInputChange}
                        error={errors.imosql}
                    />
                  
                </Grid>
                <Grid item xs={6}>
                <Controls.Input
                        label="Município"
                        name="imomun"
                        value={values.imomun}
                        onChange={handleInputChange}
                        error={errors.imomun}
                    />
                    <Controls.Input
                        label="Bairro"
                        name="imobai"
                        value={values.imobai}
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
                        <Controls.Button
                            type="submit"
                            text="Salvar" />
                        <Controls.Button
                            text="Limpar"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
