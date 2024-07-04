import React from 'react';

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';

interface ProductDetailProps {
  name?: string;
  description?: string;
  price?: number;
  cate_id?: string;
  quantity?: number;
  image?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

const ProductDetailPage = ({
  name,
  description,
  price,
  cate_id,
  quantity,
  image,
  status,
  createdAt,
  updatedAt,
}: ProductDetailProps) => {
  return (
    <Container maxWidth='md' sx={{ mt: 2, mb: 4 }}>
      <CardMedia component='img' height='400' image={image} alt={name} />

      <Typography
        variant='h6'
        sx={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          mt: 1,
        }}
      >
        {name}
      </Typography>
      <Typography variant='body2' color='textSecondary' paragraph>
        {description}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant='subtitle1' color='textSecondary'>
            Price
          </Typography>
          <Typography variant='h6'>${price}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='subtitle1' color='textSecondary'>
            Category ID
          </Typography>
          <Typography variant='h6'>{cate_id}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='subtitle1' color='textSecondary'>
            Quantity
          </Typography>
          <Typography variant='h6'>{quantity}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='subtitle1' color='textSecondary'>
            Status
          </Typography>
          <Typography variant='h6'>{status}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='subtitle1' color='textSecondary'>
            Created At
          </Typography>
          <Typography variant='h6'>
            {createdAt && new Date(createdAt).toLocaleString()}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='subtitle1' color='textSecondary'>
            Updated At
          </Typography>
          <Typography variant='h6'>
            {updatedAt && new Date(updatedAt).toLocaleString()}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetailPage;
