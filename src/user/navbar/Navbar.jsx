import { useEffect, useMemo, useState } from "react";
import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";

import { ThemeProvider as MuiThemeProvider, Box, Divider, IconButton, AppBar, Toolbar, useMediaQuery, Drawer, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

import { styled } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MenuIcon from '@mui/icons-material/Menu';
import { NavLinks } from "./components/navlink/NavLinks";
import { NavLinksClose } from "./components/navlink/NavLinksClose";
import { NavLinksPhone } from "./components/navlink/NavLinksPhone";
import { MenuUser } from "./components/menuUser/MenuUser";
import { Notify } from "./components/notify/Notify";
import { io } from "socket.io-client";
import { usePedidosStore } from "../../hooks/usePedidosStore";


const drawerWidth = 240;

const openedMixin = {
  width: drawerWidth,
  transition: "width 225ms cubic-bezier(0.4, 0, 0.6, 1)",
  overflowX: "hidden",
  "@media (max-width:500px)": {
    marginTop: 37,
    marginLeft: 0,
    borderRadius: 0,
    p: 0,
  }
};

const closedMixin = {
  transition: "width 195ms cubic-bezier(0.4, 0, 0.6, 1)",
  overflowX: "hidden",
  width: "calc(56px + 1px)",
  "@media (min-width:1400px)": {
    width: "calc(64px + 1px)",
  },
  "@media (max-width:500px)": {
    width: "calc(0px)",
    marginTop: 37,
    marginLeft: 0,
    borderRadius: 0,
    p: 0,
  },
};
const DrawerStyled = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ open, color }) => useMemo(() => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  marginTop: 0,
  transition: 'width 225ms cubic-bezier(0.4, 0, 0.6, 1)', // Agregamos la transición para el tamaño del Drawer
  ...(open && {
    ...openedMixin,
    '& .MuiDrawer-paper': {
      ...openedMixin,
      marginTop: 37,
      maxHeight: '93vh',
      '::-webkit-scrollbar': {
        width: '5px',
      },
      marginLeft: 0,
      zIndex: 1,
      border: 'none',
      p: 2,
      backgroundColor: color,
    },
  }),
  ...(!open && {
    ...closedMixin,
    '& .MuiDrawer-paper': {
      ...closedMixin,
      marginTop: 37,
      '::-webkit-scrollbar': {
        width: '0px',
      },
      border: 'none',
      zIndex: 1,
      marginLeft: 0,
      p: 2,
      backgroundColor: color,
    },
  }),
}), [open, color]));

// Inicializar el socket
const socket = io("wss://api.items.bo", {
  transports: ["websocket"],
  reconnectionAttempts: 5,
  timeout: 5000,
});

export const Navbar = ({ children }) => {
  const theme = useTheme();
  const mediaQuery = useMediaQuery('(max-width:600px)');
  const [open, setOpen] = useState(false);
  const [cantidad, setCantidad] = useState([])
  const [load, setLoad] = useState([])
  const { getPedidosPendientes } = usePedidosStore()
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handlePedidosPendientes = (data) => {
    setCantidad(data);
  };


  // Recargar pedidos manualmente
  const recargarPedidos = async () => {
    const data = await getPedidosPendientes();

    setCantidad(data)
  };

  // useEffect(() => {
  //   // Escuchar el evento de pedidos pendientes
  //   socket.on("pedidosPendientes", handlePedidosPendientes);

  //   // Eliminar el evento cuando el componente se desmonte
  //   return () => {
  //     socket.off("pedidosPendientes", handlePedidosPendientes);
  //   };
  // }, []); // Asegúrate de que esto solo se ejecute una vez al montar el componente


  return (
    <>
      {/* Menu lateral */}
      <MuiThemeProvider theme={theme}>
        <Box sx={{ display: "flex", backgroundColor: 'white' }}>
          <AppBar position="fixed" sx={{ zIndex: 2, boxShadow: 'none', backgroundColor: 'white', height: '60px' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', }}>
              <Box display={'flex'}>
                {mediaQuery ?
                  '' :
                  <NavLink to="/user/" style={{ display: "flex", alignItems: "center", maxWidth: "120px" }}>
                    <img
                      src={'https://items.bo/wp-content/uploads/2021/03/cropped-Sin-titulo-3.png'}
                      alt="logoITC"
                      style={{
                        height: "auto",
                        maxWidth: "100%",
                      }}
                    />
                  </NavLink>
                }
                <IconButton // Movemos el IconButton aquí dentro
                  color="inherit"
                  aria-label="open drawer"
                  onClick={open ? handleDrawerClose : handleDrawerOpen}
                  edge="start"
                  sx={{ ml: { xs: 0, md: 8 } }}
                >
                  <MenuIcon sx={{ color: 'green', fontSize: '1.6rem' }} />
                </IconButton>
              </Box>
              <Box display={'flex'} alignContent={'center'} alignItems={'center'}>
                {/* <CajaStatus contador={null} /> */}
                {/* <Notify typografy={'Nunito'} cantidad={cantidad} handlePedidosPendientes={recargarPedidos} load={load} /> */}
                <MenuUser />
              </Box>
            </Toolbar>
          </AppBar>
          {mediaQuery ?
            <Drawer open={open} onClose={handleDrawerClose} sx={{ '& .MuiDrawer-paper': { width: '70%', bgcolor: 'white' } }} >
              <Box display={'flex'} justifyContent={'center'} p={1} pt={2}>
                <NavLink to="/user/" style={{ display: "flex", alignItems: "center", maxWidth: "120px" }}>
                  <img
                    src={'https://items.bo/wp-content/uploads/2021/03/cropped-Sin-titulo-3.png'}
                    alt="logoITC"
                    style={{
                      height: "auto",
                      maxWidth: "100%",
                    }}
                  />
                </NavLink>
              </Box>
              <NavLinksPhone handleDrawerClose={handleDrawerClose} />
            </Drawer>
            :
            <DrawerStyled className="scrollable-div" variant="permanent" open={open} color={'white'}>
              {/* links */}
              {open ?
                <NavLinks />
                :
                <NavLinksClose />
              }
            </DrawerStyled>
          }
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flexGrow: 1,
            overflow: 'auto',
            position: 'relative',
          }}>
            <Box mt={8} sx={{ borderRadius: 5, p: { xs: 1, sm: 1, md: 4, lg: 3 }, backgroundColor: '#fafbfe' }}>
              {children}
            </Box>
          </Box>
        </Box>
      </MuiThemeProvider >
    </>

  );
};
