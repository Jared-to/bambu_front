const fecha = new Date();
const dia = fecha.getDate();
const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const mes = meses[fecha.getMonth()];
const año = fecha.getFullYear();

export const fechaFormateada = `${dia} de ${mes} del ${año}`;
