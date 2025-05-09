import { Box, Typography, ListItemIcon, ListItemText, List } from "@mui/material";
import { NavLink } from "react-router-dom";


import { Storage } from "@mui/icons-material";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import FilterFramesIcon from '@mui/icons-material/FilterFrames';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import DiscountIcon from '@mui/icons-material/Discount';

import { useSelector } from "react-redux";

const navItems = [
  {
    section: "Inventario",
    items: [
      {
        label: "Productos",
        icon: ViewInArIcon,
        to: "productos",
        rol: 'admin'
      },
      // {
      //   label: "Activos",
      //   icon: LinearScaleIcon,
      //   to: "activos",
      //   rol: 'admin'
      // },
      // {
      //   label: "Sucursales",
      //   icon: AddBusinessOutlinedIcon,
      //   to: "sucursales",
      //   rol: 'admin'
      // },
      {
        label: "Inventario Total",
        icon: Storage,
        to: "inventario-total",
        rol: 'admin'
      },
      // {
      //   label: "Ajustes de Inventario",
      //   icon: SettingsApplicationsOutlinedIcon,
      //   to: "ajustes-inventario",
      //   rol: 'admin'
      // },
      // {
      //   label: "Traspasos",
      //   icon: MoveDownIcon,
      //   to: "traspasos",
      //   rol: 'admin'
      // },
    ],
  },
  {
    section: "Operaciones",
    items: [
      // {
      //   label: "Pedidos",
      //   icon: FilterFramesIcon,
      //   to: "pedidos",
      //   rol: 'user'
      // },
      {
        label: "Nueva Venta",
        icon: ShoppingCartOutlinedIcon,
        to: "ventas",
        rol: 'user'
      },
      {
        label: "Gastos",
        icon: CreditCardOutlinedIcon,
        to: "gastos",
        rol: 'user'
      },
    ],
  },
  {
    section: "Reportes",
    items: [
      {
        label: "Reporte de Ventas",
        icon: ReceiptLongOutlinedIcon,
        to: "registros-ventas",
        rol: 'user'
      },
      {
        label: "Reporte de Gastos",
        icon: AssessmentOutlinedIcon,
        to: "reportes/gastos",
      },
      // {
      //   label: "Reporte de Sucursales",
      //   icon: AssessmentOutlinedIcon,
      //   to: "reportes/sucursales",
      // },
    ],
  },
];

export const NavLinksPhone = ({ handleDrawerClose }) => {
  const { user } = useSelector(state => state.auth);
  const rol = user.rol;
  return (
    <Box sx={{ width: 250, bgcolor: "background.paper", pt: 0, pl: 3 }}>
      <List sx={{ pr: 0 }}>
        {/* Inicio Section */}
        {rol !== 'user' &&
          <NavItem
            handleDrawerClose={handleDrawerClose}
            to={""}
            icon={DashboardOutlinedIcon}
            label={"Inicio"}
            end={true}
          />
        }
        {rol !== 'user' &&
          <NavItem
            handleDrawerClose={handleDrawerClose}
            to={"usuarios"}
            icon={PersonOutlineOutlinedIcon}
            label={"Usuarios"}
          />
        }
        <NavItem
          handleDrawerClose={handleDrawerClose}
          to={"clientes"}
          icon={PeopleAltOutlinedIcon}
          label={"Clientes"}
        />
        {rol !== 'user' &&
          <NavItem
            handleDrawerClose={handleDrawerClose}
            to={"cajas"}
            icon={InboxOutlinedIcon}
            label={"Cajas"}
          />
        }
        {/* {rol !== 'user' &&
          <NavItem
            handleDrawerClose={handleDrawerClose}
            to={"descuentos"}
            icon={DiscountIcon}
            label={"Descuentos"}
          />
        } */}
      </List>

      {/* Dynamic Sections */}
      {navItems.map((navSection) => (
        <Box key={navSection.section}>
          {rol === 'admin' &&
            <Typography
              sx={{
                fontSize: "14px",
                mb: 0,
                mt: 1,
                fontFamily: "Nunito",
                fontWeight: 500,
              }}
            >
              {navSection.section}
            </Typography>
          }
          <List sx={{ pr: 4 }}>
            {navSection.items.map((item) => {
              return (rol === 'admin' || item.rol === rol) &&
                (
                  <NavItem
                    handleDrawerClose={handleDrawerClose}
                    key={item.label}
                    to={item.to}
                    icon={item.icon}
                    label={item.label}
                  />
                )
            }
            )}
          </List>
        </Box>
      ))}
    </Box>)
}


const NavItem = ({ to, icon: Icon, label, end = false, handleDrawerClose }) => (
  <NavLink
    onClick={handleDrawerClose}
    to={`/user/${to}`}
    style={{ textDecoration: "none", color: "inherit" }}
    end={end}
  >
    {({ isActive }) => (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "8px 16px",
          borderRadius: 1,
          color: isActive ? "#800080" : "inherit",
          bgcolor: isActive ? "#f3e5f5" : "white",
          "&:hover": { backgroundColor: "#f3e5f5" },
        }}
      >
        <ListItemIcon sx={{ minWidth: 20 }}>
          <Icon sx={{ fontSize: "16px", color: isActive ? "#800080" : "inherit" }} />
        </ListItemIcon>
        <ListItemText
          primary={label}
          primaryTypographyProps={{ style: { fontSize: "14px", fontFamily: "Nunito" } }}
        />
      </Box>
    )}
  </NavLink>
);
