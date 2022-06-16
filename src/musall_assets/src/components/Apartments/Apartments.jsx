import React, { useState, useEffect } from 'react';
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Page } from '../Page/Page';
import { useFormContext, Controller } from 'react-hook-form';
import UploadButton from '../atoms/uploadButton';

export function Apartments() {
  const [contract, setContract] = useState({
    description: '',
    scopeOfWork: '',
    priceOfItem: '',
    termsOfOwnership: '',
    numberOfTokens: '',
    image: '',
  });
  const methods = useForm();

  function FormInput({ name, label }) {
    const { control } = useFormContext();

    return (
      <Grid item xs={12} sm={6}>
        {/* <Controller 
              // as={TextField}
              render={({ field }) => <TextField {...field} />}
              name={name}
              control={control}
              label={label}
              fullWidth
              required={required}
              /> */}

        {/* <Controller
                  as={TextField}
                  name={name}
                  control={control}
                  label={label}
                  fullWidth
                  required
                  error={isError}
              /> */}

        <Controller
          render={({ field }) => (
            <TextField
              name={name}
              label={label}
              defaultValue=''
              fullWidth
              required
              onChange={(e) => field.onChange(e.target.value)}
              value={field.value}
            />
          )}
          control={control}
          name={name}
        />
      </Grid>
    );
  }
  return (
    <Page>
      <FormProvider {...methods}>
        <div id='Apartments'>
          <Typography variant='h6' gutterBottom>
            Shipping address
          </Typography>
          <form
            onSubmit={methods.handleSubmit((data) =>
              test({
                ...data,
                shippingCountry,
                shippingSubdivision,
                shippingOption,
              })
            )}
          >
            <Grid container item lg={12} spacing={1}>
              <TextField
                fullWidth
                multiline
                minRows={5}
                label='Description'
                id='description'
                placeholder='Description'
              />
              <TextField
                fullWidth
                multiline
                minRows={5}
                label='Scope of Work'
                id='scope-of-work'
                placeholder='Scope of Work'
              />
              <TextField
                fullWidth
                type='number'
                label='Price of Item'
                id='price-of-item'
                placeholder='Price of Item'
              />
              <TextField
                fullWidth
                multiline
                minRows={5}
                label='Terms of Ownership'
                id='terms-of-ownership'
                placeholder='Terms of Ownership'
              />
              <TextField
                fullWidth
                type='number'
                label='Number of Tokens'
                id='number-of-tokens'
                placeholder='Number of Tokens'
              />
              <Typography variant='h6' gutterBottom>
                Upload Album Art
              </Typography>
              <input type='file' />
            </Grid>
            <br />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button component={Link} variant='outlined' to='/cart'>
                Back to Cart
              </Button>
              <Button type='submit' variant='contained' color='primary'>
                Next
              </Button>
            </div>
          </form>
        </div>
      </FormProvider>
    </Page>
  );
}
