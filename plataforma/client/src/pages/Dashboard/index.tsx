import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { InvestigationCard } from './components/InvestigationCard';
import { ProgressChart } from './components/ProgressChart';
import { BudgetSummary } from './components/BudgetSummary';

export const Dashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const investigations = useSelector((state: RootState) => state.investigations.items);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Bienvenido, {user?.nombre}
      </Typography>

      <Grid container spacing={3}>
        {/* Resumen de Investigaciones */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Investigaciones Activas
            </Typography>
            {investigations.slice(0, 3).map((investigation) => (
              <InvestigationCard 
                key={investigation._id} 
                investigation={investigation} 
              />
            ))}
          </Paper>
        </Grid>

        {/* Gráfico de Progreso */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Progreso General
            </Typography>
            <ProgressChart investigations={investigations} />
          </Paper>
        </Grid>

        {/* Resumen de Presupuesto */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Resumen de Presupuestos
            </Typography>
            <BudgetSummary investigations={investigations} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}; 