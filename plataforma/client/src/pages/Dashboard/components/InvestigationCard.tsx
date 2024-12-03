import React from 'react';
import { Card, CardContent, Typography, LinearProgress, Box } from '@mui/material';
import { Investigation } from '../../../types';

interface Props {
  investigation: Investigation;
}

export const InvestigationCard: React.FC<Props> = ({ investigation }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {investigation.titulo}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {investigation.descripcion.substring(0, 100)}...
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress 
              variant="determinate" 
              value={investigation.progreso} 
              sx={{ height: 10, borderRadius: 5 }}
            />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">
              {investigation.progreso}%
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}; 