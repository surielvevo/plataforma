import React from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';
import { Investigation } from '../../../types';

interface Props {
  investigations: Investigation[];
}

export const BudgetSummary: React.FC<Props> = ({ investigations }) => {
  const getTotalBudget = () => {
    return investigations.reduce((total, inv) => {
      return total + inv.presupuesto.reduce((sum, p) => sum + p.monto, 0);
    }, 0);
  };

  const getTotalSpent = () => {
    return investigations.reduce((total, inv) => {
      return total + inv.presupuesto.reduce((sum, p) => sum + p.ejecutado, 0);
    }, 0);
  };

  const totalBudget = getTotalBudget();
  const totalSpent = getTotalSpent();
  const remainingBudget = totalBudget - totalSpent;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2, bgcolor: 'primary.light', color: 'white' }}>
          <Typography variant="h6">Presupuesto Total</Typography>
          <Typography variant="h4">${totalBudget.toLocaleString()}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2, bgcolor: 'secondary.light', color: 'white' }}>
          <Typography variant="h6">Ejecutado</Typography>
          <Typography variant="h4">${totalSpent.toLocaleString()}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2, bgcolor: 'success.light', color: 'white' }}>
          <Typography variant="h6">Disponible</Typography>
          <Typography variant="h4">${remainingBudget.toLocaleString()}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}; 