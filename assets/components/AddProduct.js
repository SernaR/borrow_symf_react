import React, { useState } from 'react';
import * as Yup from 'yup'

import productApi from '../api/product'
import Form from './forms/Form';
import Field from './forms/Field';
import Button from './forms/Button'
import File from '../components/forms/File'

import { Container, makeStyles } from '@material-ui/core';
import ErrorMessage from './forms/ErrorMessage';

const useStyles = makeStyles((theme) => ({
    from_container: {
      marginTop: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', 
      marginTop: theme.spacing(1),
    }
}))

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Le nom est obligatoire").min(3, "Il faut 3 caractères au minimum"),
    description: Yup.string().required("La description est obligatoire"),
})

const AddProduct = () => {
    const classes = useStyles();
    const [errorMessage, setErrorMessage] = useState()
    const [image, setImage] = useState([])

    const handleChange = (file) => setImage(file)

    const handleSubmit = async(product) => {
        //event.preventDefault()
        
        const { name, description } = product
        let formData = new FormData()
        
        formData.append('name', name)
        formData.append('description', description)
        if(image) formData.append('imageFile', image)

        const result = await productApi.store(formData)
        if(!result.ok) return setErrorMessage("Oups, un problème est survenu")
        alert('Tous est OK')
    }

    return ( 
        <Container component="main" maxWidth="xs">
            <div className={classes.from_container}>
                <ErrorMessage errorMessage={errorMessage} />
                <Form
                    initialValues={{ name: '', description: '' }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                    >  
                        <Field 
                            label='Nom du produit'
                            name="name" 
                            autoFocus
                            />
                        <Field
                            label='Description'
                            name="description"
                            />
                         <File onChange={handleChange}/>
                        <Button title="Enregistrer" />
                </Form>
            </div> 
        </Container>
    );
}

export default AddProduct;