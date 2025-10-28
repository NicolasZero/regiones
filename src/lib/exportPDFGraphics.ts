import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function printGraphics () {
    const pdf = new jsPDF('landscape');
    const barChart = document.getElementById('bar-chart');
    const pieChart = document.getElementById('pie-chart');

    if (barChart && pieChart) {
      const barChartCanvas = await html2canvas(barChart);
      const pieChartCanvas = await html2canvas(pieChart);

      const barChartImage = barChartCanvas.toDataURL('image/png');
      const pieChartImage = pieChartCanvas.toDataURL('image/png');
      pdf.addImage(barChartImage, 'PNG', 10, 10, 280, 150);
      pdf.addPage();
      pdf.addImage(pieChartImage, 'PNG', 80, 10, 140, 110);

      const blob = new Blob([pdf.output("blob")], { type: "application/pdf" });

      // Create a URL from the blob
      const url = URL.createObjectURL(blob);
  
      // Open the URL in a new tab
      window.open(url, "_blank");
    }
    
  }