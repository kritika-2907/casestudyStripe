// src/utils/checkPlanStatus.js
import axios from 'axios';

export const checkPlanStatus = async (userEmail) => {
  try {
    const response = await axios.post('http://localhost:9099/checkCustomerPlanStatus', {
      customerMail: userEmail
    });
    
    if (response.status === 200) {
      console.log("Plan status updated:", response.data);
      return response.data;
    } else {
      console.error("Error in checking plan status:", response.data);
      return null;
    }
  } catch (error) {
    console.error("Error in checking plan status:", error);
    return null;
  }
};
