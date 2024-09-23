import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../UserContext"; // Adjust the import path as necessary
import axios from "axios";
import { checkPlanStatus } from './CheckPlanStatus'; // Import the checkPlanStatus function
import './styles/Thankyou.css';
import { downloadInvoice } from './DownloadInvoice';

const ThankYou = () => {
  const location = useLocation();
  const { userEmail } = useContext(UserContext); // Get userEmail from UserContext
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [planName, setPlanName] = useState(""); // To store planName

  useEffect(() => {
    const fetchPlanDetails = async () => {
      const { state } = location;
      console.log("**************");
      console.log(state);
      if (state && state.planId && state.planType) {
        try {
          // Fetch the plan name using the planId
          const planResponse = await axios.post("http://localhost:9099/viewPlan", {
            planId: state.planId,
          });

          if (planResponse.status === 201) {
            setPlanName(planResponse.data.plan.planName); // Set the planName

            if (state.planType === 'POSTPAID' && state.invoiceId) {
              // If the planType is POSTPAID, trigger the /payPostpaidInvoice endpoint
              const response = await axios.post("http://localhost:9099/payPostpaidInvoice", {
                customerMail: userEmail,
                invoiceId: state.invoiceId,
                changePlan: state.changePlan || false, // Default to false if not provided
              });

              if (response.status === 200) {
                setInvoice(response.data.invoice); // Set invoice data from the response
              } else {
                setMessage("Error paying invoice: " + response.data.message);
              }
            } else {
              // Otherwise, trigger the /buyPlan endpoint
              const buyPlanResponse = await axios.post("http://localhost:9099/choosePlan", {
                customerMail: userEmail,
                planName: planResponse.data.plan.planName,
                planType: state.planType,
              });

              if (buyPlanResponse.status === 201) {
                setInvoice(buyPlanResponse.data.invoice); // Set invoice data
              } else {
                setMessage("Error purchasing plan: " + buyPlanResponse.data.error);
              }
            }

            // Now check the plan status after the purchase
            const updatedPlanStatus = await checkPlanStatus(userEmail);
            if (updatedPlanStatus) {
              console.log("Updated plan status:", updatedPlanStatus);
              // You can handle the updated plan status if needed
            }
          } else {
            setMessage("Error fetching plan details.");
          }
        } catch (error) {
          console.error("Error fetching plan details or processing plan:", error.message);
          setMessage("Error: " + error.message);
        }
      } else {
        setMessage("No plan details provided.");
      }
      setLoading(false);
    };

    fetchPlanDetails();
  }, [location, userEmail]);

  const handleDownloadInvoice = (invoiceId) => {
    downloadInvoice(invoiceId);
  };

  return (
    <div>
      <h2>Thank You for Your Purchase!</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {message ? (
            <p>{message}</p>
          ) : (
            invoice && (
              <div className="details">
                <h3>Invoice Details</h3>
                <p ><strong>Customer Name:</strong> {invoice.customerName}</p>
                <p ><strong>Email:</strong> {userEmail}</p>
                <p><strong>Plan Name:</strong> {planName}</p>
                <p><strong>Plan Type:</strong> {invoice.planType}</p>
                <p><strong>Date Purchased:</strong> {new Date(invoice.date).toLocaleDateString()}</p>
                <p><strong>Due Date:</strong> {new Date(invoice.dueDate).toLocaleDateString()}</p>
                <p><strong>Units:</strong> {invoice.units}</p>
                <p><strong>Amount:</strong> Rs.{invoice.amount.toFixed(2)}</p>
                <p><strong>Status:</strong> {invoice.status}</p>
                <button className="button" onClick={() => handleDownloadInvoice(invoice.invoiceId)}>Download Invoice</button>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ThankYou;
