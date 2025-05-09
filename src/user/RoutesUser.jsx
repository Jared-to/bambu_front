import { Route, Routes } from "react-router-dom"
import { PagHome } from "./pages/home/PagHome"
import { Navbar } from "./navbar/Navbar"
import { PagUsuarios } from "./pages/usuarios/PagUsuarios"
import { PagClientes } from "./pages/clientes/PagClientes"
import { PagCajas } from "./pages/cajas/PagCajas"
import { PagProductos } from "./pages/productos/PagProductos"
import { PagAgregarProducto } from "./pages/addProduct/PagAgregarProducto"
import { PagCategorias } from "./pages/categorias/PagCategorias"
import { PagAlmacenes } from "./pages/almacenes/PagAlmacenes"
import { PagProductoAlmacen } from "./pages/productoAlmacen/PagProductoAlmacen"
import { PagInventario } from "./pages/inventario/PagInventario"
import { PagAjusteInventario } from "./pages/ajuste-inventario/PagAjusteInventario"
import { PagGastos } from "./pages/gastos/PagGastos"
import { PagInventarioIncial } from "./pages/inventario-inicial/PagInventarioIncial"
import { PagRegistrosVentas } from "./pages/registros-ventas/PagRegistrosVentas"
import { PagGastosCategorias } from "./pages/gastosCategorias/PagGastosCategorias"
import { PagCajaInfo } from "./pages/cajaInfo/PagCajaInfo"
import { PagReporteGasto } from "./pages/reporte-gastos/PagReporteGasto"
import { PagHistorialProduct } from "./pages/historialProduct/PagHistorialProduct"
import { PagCuotasVenta } from "./pages/cuotasVenta/PagCuotasVenta"
import { PagPerfilCliente } from "./pages/perfilCliente/PagPerfilCliente"
import { PagActivos } from "./pages/activos/PagActivos"
import { PagActivosCategorias } from "./pages/activos-categorias/PagActivosCategorias"
import { PagActivosMovimientos } from "./pages/activos-movimientos/PagActivosMovimientos"
import { NuevaVentaV3 } from "./pages/nueva-venta-v3/NuevaVentaV3"
import { PagPedidos } from "./pages/pedidos/PagPedidos"
import { PagPedidosPendientes } from "./pages/pedidosPendientes/PagPedidosPendientes"
import { PagTraspasos } from "./pages/traspasos/PagTraspasos"
import { PagNuevoTraspasos } from "./pages/nuevo-traspasos/PagNuevoTraspasos"
import { PagReporteSucursales } from "./pages/reporte-sucursales/PagReporteSucursales"
import { PagConfig } from "./pages/config/PagConfig"
import { PagPedidosCancelados } from "./pages/pedidosCancelados/PagPedidosCancelados"
import { PagDescuentos } from "./pages/descuentos/PagDescuentos"
import { Unauthorized } from "./Unauthorized"
import { RoutesProtected } from "./RoutesProtected"


export const RoutesUser = () => {
  return (
    <Navbar>
      <Routes>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/" element={<PagHome />} />
        <Route path="/usuarios" element={
          <RoutesProtected element={<PagUsuarios />} allowedRoles={['admin']} />
        } />
        <Route path="/clientes" element={<PagClientes />} />
        {/* <Route path="/clientes/perfil/:id" element={<PagPerfilCliente />} /> */}
        <Route path="/cajas" element={
          <RoutesProtected element={<PagCajas />} allowedRoles={['admin']} />
        } />
        <Route path="/cajas/info/:id" element={
          <RoutesProtected element={<PagCajaInfo />} allowedRoles={['admin']} />
        } />
        {/* <Route path="/descuentos" element={<PagDescuentos />} /> */}

        {/* <Route path="/activos" element={<PagActivos />} />
        <Route path="/activos/categorias" element={<PagActivosCategorias />} />
        <Route path="/activos/movimientos/:id" element={<PagActivosMovimientos />} /> */}

        <Route path="/productos" element={
          <RoutesProtected element={<PagProductos />} allowedRoles={['admin']} />
        } />
        <Route path="/productos/editar-producto/:id" element={
          <RoutesProtected element={<PagAgregarProducto />} allowedRoles={['admin']} />
        } />
        <Route path="/productos/agregar-producto" element={
          <RoutesProtected element={<PagAgregarProducto />} allowedRoles={['admin']} />
        } />
        <Route path="/productos/categorias" element={
          <RoutesProtected element={<PagCategorias />} allowedRoles={['admin']} />
        } />
        {/* <Route path="/sucursales" element={
          <RoutesProtected element={<PagAlmacenes />} allowedRoles={['admin']} />
        } /> */}
        {/* <Route path="/sucursales/sucursal/:id" element={
          <RoutesProtected element={<PagProductoAlmacen />} allowedRoles={['admin']} />
        } /> */}
        <Route path="/inventario-total" element={
          <RoutesProtected element={<PagInventario />} allowedRoles={['admin']} />
        } />
        <Route path="/historial/:id" element={
          <RoutesProtected element={<PagHistorialProduct />} allowedRoles={['admin']} />
        } />
        <Route path="/inventario-total/inventario-inicial" element={
          <RoutesProtected element={<PagInventarioIncial />} allowedRoles={['admin']} />
        } />
        <Route path="/ajustes-inventario" element={
          <RoutesProtected element={<PagAjusteInventario />} allowedRoles={['admin']} />
        } />
        <Route path="/gastos" element={<PagGastos />} />
        {/* <Route path="/traspasos" element={
          <RoutesProtected element={<PagTraspasos />} allowedRoles={['admin']} />
        } /> */}
        {/* <Route path="/traspasos/nuevo-traspaso" element={
          <RoutesProtected element={<PagNuevoTraspasos />} allowedRoles={['admin']} />
        } /> */}
        {/* <Route path="/traspasos/editar-traspaso/:id" element={
          <RoutesProtected element={<PagNuevoTraspasos />} allowedRoles={['admin']} />
        } /> */}


        {/* <Route path="/pedidos" element={<PagPedidos />} /> */}
        {/* <Route path="/pedidos/pendientes" element={<PagPedidosPendientes />} /> */}
        {/* <Route path="/pedidos/cancelados" element={<PagPedidosCancelados />}  /> */}


        <Route path="/gastos/categorias" element={
          <RoutesProtected element={<PagGastosCategorias />} allowedRoles={['admin']} />
        } />

        <Route path="/ventas" element={<NuevaVentaV3 />} />
        <Route path="/ventas/editar-venta/:id" element={<NuevaVentaV3 />} />
        {/* <Route path="/ventas/cuotas/:id" element={<PagCuotasVenta />} /> */}


        <Route path="/registros-ventas" element={<PagRegistrosVentas />} />

        <Route path="/reportes/gastos" element={
          <RoutesProtected element={<PagReporteGasto />} allowedRoles={['admin']} />
        } />

        <Route path="/reportes/sucursales" element={
          <RoutesProtected element={<PagReporteSucursales />} allowedRoles={['admin']} />
        } />

        <Route path="/config" element={
          <RoutesProtected element={<PagConfig />} allowedRoles={['admin']} />
        } />


      </Routes>
    </Navbar>
  )
}
