import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import inamujerLogo from "../../public/ina.png";
import cintilloInamujer from "../../public/cintillo_ministerio.png";
import { Agenda, MobileUnit } from './types';

export function toBase64(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.onload = function () {
            const img = this as HTMLImageElement;
            let canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const context = canvas.getContext("2d");
            if (context) {
                context.drawImage(img, 0, 0);
            } else {
                reject(new Error("Failed to get 2D context"));
            }
            resolve(canvas.toDataURL("image/png").split(",")[1]);
        };
        image.src = url;
    });
}

let inamujerLogoBase64: string;
let cintilloInamujerBase64: string;

async function loadImages() {
    inamujerLogoBase64 = await toBase64(inamujerLogo.src);
    cintilloInamujerBase64 = await toBase64(cintilloInamujer.src);
}

loadImages();

function handleExportPDF(
    date_start: string | undefined,
    date_end: string | undefined,
    filterActividades: Agenda[] | undefined,
    dataInitial: Agenda[] | undefined,
    // filterActividadesMobile: MobileUnit[] | undefined,
    titleReport: string
) {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const maxWidthHeading = pageWidth - 20; // Maximum width for the text (with some padding)
    const title = titleReport;
    const generateReport = `Generado el: ${new Date().toLocaleString()}`;
    const dateRange = (date_start && date_end ? `En rango de fecha ${date_start} al ${date_end}` : "");

    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");

    doc.text(title, 25, 35, { maxWidth: maxWidthHeading });
    doc.addImage(cintilloInamujerBase64, "PNG", 0, 0, 210, 25);
    doc.addImage(inamujerLogoBase64, "PNG", 0, 25, 20, 20);

    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");


    // Use the maxWidth option to ensure the text wraps if it doesn't fit in the specified width
    doc.text(generateReport, 25, 45, { maxWidth: maxWidthHeading });
    doc.text(dateRange, 25, 55, { maxWidth: maxWidthHeading });

    // Define the columns
    const columns = [
        "#",
        "Usuario",
        "Gerencia",
        "Tipo de Acción",
      ];
      
      // Prepare the data
      const data = (filterActividades ?? dataInitial ?? []).map((record, index) => [
        index + 1,
        record.username,
        record.management_unit,
        record.type_action,
        {
          content: `
            Actividad: ${record.type_activity}
            Fecha de ejecución: ${record.date}
            Estado: ${record.state}
            Municipio: ${record.municipality}
            Parroquia: ${record.parish}
            Lugar: ${record.place}
            Responsable: ${record.responsible}
            N° de mujeres: ${record.n_womans}
            N° de hombres: ${record.n_man}
            Observaciones: ${record.observation}
          `,
          colSpan: 4,
          styles: { fontSize: 8, cellPadding: 2, lineHeight: 4 }
        }
      ]);

      
      // Add the table to the PDF
      autoTable(doc, {
        head: [columns],
        body: data.flatMap(row => [row.slice(0, 4), [row[4]]]),
        startY: 65,
        styles: { fontSize: 8, cellPadding: 2 },
        columnStyles: {
          0: { cellWidth: 10 }, // Adjust the width of the first column
          1: { cellWidth: 20 }, // Adjust the width of the second column
          // Add more column styles as needed
        },
        didDrawCell: (data) => {
          if (data.column.index === 0 && data.row.index === 0) {
            doc.setFontSize(10);
          }
        },
        theme: 'grid',
        headStyles: { fillColor: [22, 160, 133] },
        bodyStyles: { valign: 'top' },
        alternateRowStyles: { fillColor: [240, 240, 240] },
        margin: { top: 60, left: 30 },
        pageBreak: 'auto',
        tableWidth: 'wrap',
      });
      
    const blob = new Blob([doc.output("blob")], { type: "application/pdf" });

    // Create a URL from the blob
    const url = URL.createObjectURL(blob);

    // Open the URL in a new tab
    window.open(url, "_blank");
}

export default handleExportPDF;