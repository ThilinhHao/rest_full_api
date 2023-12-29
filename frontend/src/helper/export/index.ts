import { colors } from 'constants/colorsBase';
import { getColorSite } from 'helper/colorSite';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { CONST_EXPORT_INVOICE } from 'constants/language';
import { formatDateCommon, formatDateJP, getDayjsByTimeZone } from 'helper/date';
import { message } from 'antd';
import { IAgencyBasicOperatorInvoice, ICompanyOperatorListAllDetailInvoice } from 'constants/invoice';
import images from '@assets/images-base';
import { getFile } from 'helper/api/axios';
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

const rowSpanNumberForAmount = [2, 3, 4];

const loadImage = new Promise((resolve, reject) => {
  const img = new Image();
  img.onload = () => resolve(img);
  img.onerror = (err) => reject(err);
  img.src = images.common.nextNovaSeal;
});

const addHeader = (doc: jsPDF, textDateRight: string) => {
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i += 1) {
    doc.setPage(i);
    // line header
    autoTable(doc, {
      startY: 0,
      margin: {
        left: 0,
        right: 0,
      },
      head: [
        [
          {
            content: '',
            styles: {
              minCellHeight: 5,
            },
          },
        ],
      ],
      headStyles: {
        fillColor: getColorSite(),
      },
    });
    // header text
    autoTable(doc, {
      startY: 10,
      margin: {
        left: 8,
        right: 2,
      },
      head: [
        [
          {
            content: CONST_EXPORT_INVOICE.TITLE_INVOICE,
            styles: {
              halign: 'left',
              fontSize: 16,
              fontStyle: 'bolditalic',
              minCellHeight: 10,
            },
          },
          {
            content: i === 1 ? textDateRight : '',
            styles: { halign: 'right', fontSize: 10 },
          },
        ],
      ],
      headStyles: {
        lineColor: 'white',
        fillColor: 'white',
        halign: 'center',
        fontSize: 15,
        textColor: 'black',
      },
      styles: {
        font: 'JPFont',
        fillColor: 'white',
        fontSize: 10,
        lineColor: 'white',
        lineWidth: 0.1,
        textColor: 'black',
        cellPadding: 0.5,
      },
    });
  }
};

const addPaginations = (doc: jsPDF) => {
  const pageCount = doc.getNumberOfPages();
  if (pageCount <= 1) return;
  for (let i = 1; i <= pageCount; i += 1) {
    doc.setPage(i);
    doc.setFillColor(getColorSite());
    doc.circle(doc.internal.pageSize.width / 2, 290, 4, 'F');
    doc.setTextColor('white');
    if (i >= 100) {
      doc.setFontSize(10);
      doc.text(i.toString(), doc.internal.pageSize.width / 2 - 3, 291.5);
    } else if (i >= 10) {
      doc.setFontSize(13);
      doc.text(i.toString(), doc.internal.pageSize.width / 2 - 2.5, 291.5);
    } else {
      doc.setFontSize(13);
      doc.text(i.toString(), doc.internal.pageSize.width / 2 - 1.25, 291.5);
    }
  }
};

const addImageSeal = async (doc: jsPDF) => {
  doc.setPage(1);
  await loadImage.then((img: any) => {
    doc.addImage(img, 'PNG', doc.internal.pageSize.width - 35, 30, 30, 30);
  });
};

export const createInvoicePDF = async (
  invoiceId: number,
  textDateRight: string,
  filename = '',
  isDownload = true,
  isNoStamp = false
) => {
  const pdf = new jsPDF();
  pdf.addFont('/fonts/MPLUS1p-Regular.ttf', 'JPFont', 'normal');
  pdf.setFont('JPFont');
  // information left
  autoTable(pdf, {
    startY: 23,
    margin: {
      left: 8,
      right: 6,
    },
    html: `#InvoiceExportLeftHeader${invoiceId}`,
    theme: 'grid',
    styles: {
      font: 'JPFont',
      fillColor: 'white',
      fontSize: 10,
      lineColor: 'white',
      lineWidth: 0.1,
      textColor: 'black',
      cellPadding: 0.5,
      cellWidth: pdf.internal.pageSize.width / 6 - 5,
    },
    didParseCell: ({ cell, section, row, pageNumber }: any) => {
      if (row.index === 2 || row.index === 5 || row.index === 8) {
        cell.styles.cellPadding = [0, 0, 0, 0];
      }
      if (row.index < 2) {
        cell.styles.fontSize = 12;
        cell.styles.cellPadding = [0.5, 0, 0.5, 3];
      }
      if (row.index === 3 || row.index === 4) {
        cell.styles.fontSize = 11;
        cell.styles.cellPadding = [0.5, 0, 0.5, 3];
      }
      if (row.index === 6) {
        cell.styles.fontSize = 9;
        cell.styles.cellPadding = [0.5, 0, 0.5, 3];
      }
      if (row.index === 7) {
        cell.styles.fontSize = 11;
        cell.styles.halign = 'right';
        cell.styles.cellPadding = [1, 0, 1, 0];
        if (cell.text[0] === CONST_EXPORT_INVOICE.TAX_INCLUDED) {
          cell.styles.cellWidth = 10;
          cell.styles.halign = 'left';
          cell.styles.cellPadding = [1, 1, 1, 1];
        } else if (cell.text[0] === CONST_EXPORT_INVOICE.PAY_AMOUNT) {
          cell.styles.fillColor = colors.colorColumnInvoice;
          cell.styles.halign = 'left';
          cell.styles.cellWidth = 20;
        } else if (cell.text[0]) {
          cell.styles.fillColor = colors.colorColumnInvoice;
          cell.styles.halign = 'right';
          cell.styles.cellPadding = [1, 1, 1, 1];
          cell.styles.cellWidth = 40;
        } else {
          cell.styles.cellWidth = 5;
        }
      }
    },
  });
  // information right
  autoTable(pdf, {
    startY: 33,
    margin: {
      left: pdf.internal.pageSize.width / 2 + 16,
      right: 6,
    },
    html: `#InvoiceExportRightHeader${invoiceId}`,
    theme: 'grid',
    styles: {
      font: 'JPFont',
      fillColor: 'white',
      fontSize: 10,
      lineColor: 'white',
      lineWidth: 0.1,
      textColor: 'black',
      cellPadding: 0.5,
      cellWidth: pdf.internal.pageSize.width / 2 - 20,
    },
    didParseCell: ({ cell, section, row, pageNumber }: any) => {
      if (cell.raw.className === 'resize') {
        cell.styles.fontSize = 12;
      }
    },
  });
  // invoice content
  autoTable(pdf, {
    margin: {
      left: 4,
      right: 4,
      top: 25,
    },
    html: `#InvoiceExportTable${invoiceId}`,
    theme: 'grid',
    headStyles: {
      lineColor: 'white',
      fillColor: getColorSite(),
      halign: 'center',
      textColor: 'black',
    },
    columnStyles: {
      0: { halign: 'left' },
      1: { halign: 'right' },
      2: { halign: 'right' },
      3: { halign: 'right' },
    },
    styles: {
      font: 'JPFont',
      fontSize: 10,
      lineColor: 'white',
      lineWidth: 1,
      textColor: 'black',
    },
    didParseCell: ({ cell, section, row, pageNumber }: any) => {
      // set width
      if (cell.colSpan === 10) {
        cell.styles.cellWidth = 120;
      }
      if (cell.colSpan === 2) {
        cell.styles.cellWidth = 15;
      }
      if (cell.colSpan === 3) {
        cell.styles.cellWidth = 25;
      }
      // set align
      if (rowSpanNumberForAmount.includes(cell.colSpan) && cell.section === 'body') {
        cell.styles.halign = 'right';
      }
      if (cell.colSpan === 5 && cell.section === 'body') {
        cell.styles.halign = 'center';
      }
      // set background or border
      if (section === 'body') {
        if (row.index % 2 === 1 && cell.rowSpan !== 3) {
          cell.styles.fillColor = colors.colorColumnInvoice;
        } else {
          cell.styles.fillColor = '#fff';
        }
        if (row.index >= 20) {
          if (cell.raw.className === 'hasBG') {
            cell.styles.fillColor = colors.colorColumnInvoice;
          } else if (cell.raw.className === 'noBG') {
            cell.styles.fillColor = '#fff';
          }
        }
        if (cell.rowSpan === 3) {
          cell.styles.cellPadding = -0.5;
        }
      }
      // set font size
      if (cell.colSpan === 10 && cell.raw.className === 'nameItem') {
        if (cell.text?.[0]?.length > 60) {
          cell.styles.fontSize = 7;
        } else if (cell.text?.[0]?.length > 90) {
          cell.styles.fontSize = 6;
        } else if (cell.text?.[0]?.length > 120) {
          cell.styles.fontSize = 5;
        } else if (cell.text?.[0]?.length > 150) {
          cell.styles.fontSize = 4;
        }
      }
    },
  });
  // paginations
  addPaginations(pdf);
  // header
  addHeader(pdf, textDateRight);
  // add seal
  if (!isNoStamp) {
    await addImageSeal(pdf);
  }
  if (isDownload) {
    // pdf.autoPrint();
    // This is a key for printing
    // pdf.output('dataurlnewwindow');
    pdf.save(`${filename}.pdf`);
  } else {
    return pdf.output('blob');
  }
};

export const exportPDFsToZipForAgency = (listInvoiceAllDetail?: IAgencyBasicOperatorInvoice[]) => {
  if (!listInvoiceAllDetail || listInvoiceAllDetail?.length === 0) {
    message.error('請求書データがありません。請求書ダウンロードできません。');
    return;
  }
  const zip = new JSZip();

  listInvoiceAllDetail?.forEach((invoice: IAgencyBasicOperatorInvoice, index: number) => {
    if (invoice && invoice?.id) {
      const filename = `${invoice?.agency_name}_${formatDateJP(invoice?.year_month, false, false)}_${
        CONST_EXPORT_INVOICE.EXPORT_FILE_NAME
      }`;
      zip.file(
        `${filename}.pdf`,
        createInvoicePDF(
          invoice.id,
          CONST_EXPORT_INVOICE.REQUEST_DATE + formatDateCommon(invoice?.request_date),
          filename,
          false
        ) as any
      );
    }
  });

  zip.generateAsync({ type: 'blob' }).then((content) => {
    saveAs(
      content,
      `${formatDateJP(listInvoiceAllDetail[0]?.year_month, false, false)}_${
        CONST_EXPORT_INVOICE.EXPORT_ALL_FILE_NAME
      }.zip`
    );
  });
};

export const exportPDFsToZipForCompany = (listInvoiceAllDetail?: ICompanyOperatorListAllDetailInvoice[]) => {
  if (!listInvoiceAllDetail || listInvoiceAllDetail?.length === 0) {
    message.error('請求書データがありません。請求書ダウンロードできません。');
    return;
  }
  const zip = new JSZip();

  listInvoiceAllDetail?.forEach((invoiceDetail: ICompanyOperatorListAllDetailInvoice, index: number) => {
    if (invoiceDetail && invoiceDetail.invoice?.id) {
      const filename = `${invoiceDetail.invoice?.company_name}_${formatDateJP(
        invoiceDetail.invoice?.year_month,
        false,
        false
      )}_${CONST_EXPORT_INVOICE.EXPORT_FILE_NAME}`;
      zip.file(
        `${filename}.pdf`,
        createInvoicePDF(
          invoiceDetail.invoice?.id,
          CONST_EXPORT_INVOICE.REQUEST_DATE + formatDateCommon(invoiceDetail.invoice?.request_date),
          filename,
          false
        ) as any
      );
    }
  });

  zip.generateAsync({ type: 'blob' }).then((content) => {
    saveAs(
      content,
      `${formatDateJP(listInvoiceAllDetail[0]?.invoice?.year_month, false, false)}_${
        CONST_EXPORT_INVOICE.EXPORT_ALL_FILE_NAME
      }.zip`
    );
  });
};

export interface IAgreedRegulationsSignatureData {
  fileName: string;
  companyName: string;
  userName: string;
}

export const createAgreedRegulationsFile = async (
  link: string,
  fileName: string,
  companyName: string,
  userName: string,
  hasAgreedDay: boolean | undefined = true
) => {
  const existingPdfBytes = await getFile('/v1/api/file/download', link);
  if (existingPdfBytes) {
    try {
      const pdfDoc = await PDFDocument.load(existingPdfBytes, { ignoreEncryption: true });
      pdfDoc.registerFontkit(fontkit);
      const fontBytes = await fetch('/fonts/MPLUS1p-Regular.ttf').then((res) => res.arrayBuffer());
      const JPFont = await pdfDoc.embedFont(fontBytes);
      const pages = pdfDoc.getPages() || 1;
      const lastPage = pages[pdfDoc.getPageCount() - 1];
      let text = `甲：${companyName || ''}\n乙：${userName || ''}\n同意日：`;
      if (hasAgreedDay) {
        text = text + `${formatDateJP(getDayjsByTimeZone().format('YYYY-MM-DD'))}`;
      }
      lastPage.drawText(text, {
        x: 20,
        y: 60,
        size: 12,
        lineHeight: 16,
        font: JPFont,
        color: rgb(0, 0, 0),
      });

      const pdfBytes = await pdfDoc.save();
      const fileNew = new File([pdfBytes], `${fileName}.pdf`);
      return fileNew;
    } catch (error) {
      message.error('システムエラー');
    }
  }
};
