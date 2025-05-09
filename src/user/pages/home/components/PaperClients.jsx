import { Box, Paper, Typography, List, ListItem, ListItemText } from "@mui/material";

export const PaperClients = ({ data = [] }) => {
  return (
    <Paper elevation={0} sx={{ p: 2, borderRadius: 4, border: "1px solid #dbe0e6", }}>
      <Typography
        fontWeight={600}
        fontFamily={'Nunito'}
        textAlign={'center'}
        color="primary"
        sx={{ marginBottom: 2, fontSize: '1.2rem' }}
      >
        Cumpleaños más Cercanos
      </Typography>
      <Box>
        <List sx={{ maxHeight: '200px', overflowY: 'auto', px: 2 }}>
          {data.length > 0 ? (
            data.map((client, index) => (
              <ListItem
                key={index}
                sx={{
                  backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff',
                  borderRadius: 2,
                  marginBottom: 1,
                  boxShadow: 1,
                  padding: '10px 15px',
                  display: 'flex',
                  justifyContent: 'space-between', // Ensuring content is spaced out
                  alignItems: 'center', // Centering content vertically
                }}
              >
                <ListItemText
                  primary={
                    <Typography fontWeight={500} fontSize="1rem" color="text.primary">
                      {client?.nombre + ' ' + client?.apellido}
                    </Typography>
                  }
                  secondary={
                    client.daysUntilBirthday === 0 ? (
                      <Box
                        sx={{
                          backgroundColor: '#4caf50',
                          color: 'white',
                          padding: '5px 10px',
                          borderRadius: '5px',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          textAlign: 'center',
                        }}
                      >
                        ¡Hoy es su cumpleaños!
                      </Box>
                    ) : (
                      <Typography fontSize="0.875rem" color="text.secondary">
                        {client.daysUntilBirthday} días restantes
                      </Typography>
                    )
                  }
                />
              </ListItem>
            ))
          ) : (
            <Typography fontSize="0.9rem" color="text.secondary" textAlign="center">
              No hay cumpleaños próximos.
            </Typography>
          )}
        </List>

      </Box>
    </Paper>
  );
};
