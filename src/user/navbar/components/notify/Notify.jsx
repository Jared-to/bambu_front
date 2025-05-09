import { useState } from "react";
import { Badge, Box, ButtonBase, Divider, IconButton, Popover, Typography } from "@mui/material"
import RefreshIcon from '@mui/icons-material/Refresh';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NotifyType from "./components/NotifyType";



export const Notify = ({ typografy, cantidad = [], handlePedidosPendientes,load }) => {
  //estados
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  //funciones
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <>
      <ButtonBase onClick={handleClick} sx={{ mr: 3 }}>
        <Box p={1}
          sx={{
            bgcolor: '#ddeff0',
            borderRadius: 4,
            transition: '0.4s',
            '&:hover': {
              bgcolor: '#356169',
              '& .icon': {
                color: '#ddeff0',
              },
            }
          }}>
          <Badge color="secondary" badgeContent={cantidad.length}>
            <NotificationsNoneOutlinedIcon className="icon" sx={{ color: '#356169' }} />
          </Badge>
        </Box>
      </ButtonBase>
      <Popover
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            borderRadius: 4,
            marginTop: 2,
            minWidth: '17%',
            maxWidth: '300px',
            height: 'auto',
            maxHeight: '50vh',
            minHeight: 'auto',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ p: 1 }}>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Typography fontWeight={600} sx={{ fontFamily: typografy, fontSize: "1.1rem", color: 'black' }}>
              Pedidos Pendientes
            </Typography>
            <IconButton onClick={()=>handlePedidosPendientes()}>
              <RefreshIcon sx={{ color: 'blue' }} />
            </IconButton>
          </Box>
          <Divider sx={{ my: 1 }} />
        </Box>
        <Box  maxHeight={'auto'} overflow={'auto'}>
          {cantidad.map(((notify, indexy) => (
            <Box key={indexy}>
              <NotifyType colorsText={'black'} typography={typografy} data={notify} />
            </Box>
          )))}
        </Box>
      </Popover>
    </>
  )
}
