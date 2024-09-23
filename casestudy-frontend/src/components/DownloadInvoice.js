// src/utils/downloadInvoice.js
import axios from 'axios';

export const downloadInvoice = async (invoiceId) => {
  try {
    const response = await axios.get(`http://localhost:9099/downloadInvoice/${invoiceId}`, {
      responseType: 'blob', // Important for receiving a binary file
    });

    if (response.status === 200) {
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice_${invoiceId}.pdf`); // Set the filename
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.remove();
      window.URL.revokeObjectURL(url);
    } else {
      console.error("Error downloading invoice:", response.data);
    }
  } catch (error) {
    console.error("Error downloading invoice:", error);
  }
};
