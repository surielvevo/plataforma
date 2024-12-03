const Investigation = require('../models/Investigation');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

exports.generarReporteTrimestral = async (req, res) => {
  try {
    const { investigacionId } = req.params;
    const { trimestre, año } = req.query;

    const investigacion = await Investigation.findOne({
      _id: investigacionId,
      investigador: req.user._id
    }).populate('investigador', 'nombre departamento');

    if (!investigacion) {
      return res.status(404).json({
        status: 'error',
        message: 'Investigación no encontrada'
      });
    }

    // Crear PDF
    const doc = new PDFDocument();
    const filename = `reporte-${investigacionId}-${trimestre}-${año}.pdf`;
    const filepath = path.join(__dirname, '..', 'public', 'reportes', filename);

    // Pipe el PDF a un archivo
    doc.pipe(fs.createWriteStream(filepath));

    // Agregar contenido al PDF
    doc.fontSize(20).text('Reporte Trimestral de Investigación', {
      align: 'center'
    });

    doc.moveDown();
    doc.fontSize(14).text(`Título: ${investigacion.titulo}`);
    doc.fontSize(12).text(`Investigador: ${investigacion.investigador.nombre}`);
    doc.text(`Departamento: ${investigacion.investigador.departamento}`);
    doc.text(`Trimestre: ${trimestre} - ${año}`);

    doc.moveDown();
    doc.fontSize(14).text('Resumen de Presupuesto');
    
    // Tabla de presupuesto
    let totalPresupuestado = 0;
    let totalEjecutado = 0;

    investigacion.presupuesto.forEach(partida => {
      doc.fontSize(12).text(`${partida.categoria}:`);
      doc.text(`Presupuestado: $${partida.monto}`);
      doc.text(`Ejecutado: $${partida.ejecutado}`);
      doc.moveDown(0.5);

      totalPresupuestado += partida.monto;
      totalEjecutado += partida.ejecutado;
    });

    doc.moveDown();
    doc.fontSize(14).text('Totales:');
    doc.text(`Total Presupuestado: $${totalPresupuestado}`);
    doc.text(`Total Ejecutado: $${totalEjecutado}`);
    doc.text(`Porcentaje Ejecutado: ${((totalEjecutado/totalPresupuestado) * 100).toFixed(2)}%`);

    // Finalizar PDF
    doc.end();

    // Enviar URL del archivo
    res.status(200).json({
      status: 'success',
      data: {
        reporteUrl: `/reportes/${filename}`
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
}; 