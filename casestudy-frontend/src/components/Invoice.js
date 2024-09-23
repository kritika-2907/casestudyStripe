import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext'; // Adjust the import path as necessary
import './styles/InvoiceDisplay.css'; // Import the CSS file
import { downloadInvoice } from './DownloadInvoice';

function InvoiceDisplay() {
  const { userEmail } = useContext(UserContext); // Get userEmail from UserContext
  const [invoices, setInvoices] = useState([]);
  const [planDetails, setPlanDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoiceHistory = async () => {
      try {
        // Fetch the invoice history using the userEmail
        const response = await axios.post('http://localhost:9099/viewInvoiceHistory', { customerMail: userEmail });
        const { invoiceList } = response.data;

        // Sort invoices in reverse order (most recent first)
        const sortedInvoices = invoiceList.sort((a, b) => new Date(b.date) - new Date(a.date));
        setInvoices(sortedInvoices);

        // Fetch plan details for each invoice
        const planRequests = sortedInvoices.map(invoice =>
          axios.post('http://localhost:9099/viewPlan', { planId: invoice.planId })
        );
        const planResponses = await Promise.all(planRequests);
        const plans = planResponses.reduce((acc, response) => {
          acc[response.data.plan.planId] = response.data.plan;
          return acc;
        }, {});
        setPlanDetails(plans);
      } catch (error) {
        setError('Customer has no previous Invoices.');
        console.error('Error fetching invoice history or plan details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchInvoiceHistory();
    }
  }, [userEmail]);

  const handleDownloadInvoice = (invoiceId) => {
    downloadInvoice(invoiceId);
  };

  return (
    <div className="invoice-container">
      {loading ? (
        <p>Loading invoice history...</p>
      ) : error ? (
        <p>{error}</p>
      ) : invoices.length > 0 ? (
        invoices.map((invoice) => {
          const plan = planDetails[invoice.planId];
          
          return (
            
            <div key={invoice.invoiceId} className="invoice-box">
              <div className="customer-details">
                <p className="detail"><strong>Name:</strong> {invoice.customerName}</p>
                <p className="detail"><strong>ID:</strong> {invoice.customerId}</p>
              </div>
              <h2 className="heading">Invoice Details</h2>
              <div className="detail-container">
                <div className="detail-label">Invoice ID:</div>
                <div className="detail-value">{invoice.invoiceId}</div>
              </div>
              <div className="detail-container">
                <div className="detail-label">Plan ID:</div>
                <div className="detail-value">{invoice.planId}</div>
              </div>
              <div className="detail-container">
                <div className="detail-label">Units:</div>
                <div className="detail-value">{invoice.units}</div>
              </div>
              <div className="detail-container">
                <div className="detail-label">Date:</div>
                <div className="detail-value">{new Date(invoice.date).toLocaleDateString()}</div>
              </div>
              <div className="detail-container">
                <div className="detail-label">Amount:</div>
                <div className="detail-value">Rs{invoice.amount.toFixed(2)}</div>
              </div>
              <div className="detail-container">
                <div className="detail-label">Plan Type:</div>
                <div className="detail-value">{invoice.planType}</div>
              </div>
              {plan && (
                <>
                  <h3 className="heading">Plan Details</h3>
                  <div className="detail-container">
                    <div className="detail-label">Plan Name:</div>
                    <div className="detail-value">{plan.planName}</div>
                  </div>
                  <div className="detail-container">
                    <div className="detail-label">Description:</div>
                    <div className="detail-value">{plan.description}</div>
                  </div>
                  <div className="detail-container">
                    <div className="detail-label">Rate Per Unit:</div>
                    <div className="detail-value">{plan.ratePerUnit}</div>
                  </div>
                  <div className="detail-container">
                    <div className="detail-label">Status</div>
                    <div className="detail-value">{invoice.status}</div>
                  </div>
                </>
              )}
              <button className="button" onClick={() => handleDownloadInvoice(invoice.invoiceId)}>Download Invoice</button>
            </div>
        
          );
        })
      ) : (
        <p>No invoices found.</p>
      )}
    </div>
  );
}

export default InvoiceDisplay;
