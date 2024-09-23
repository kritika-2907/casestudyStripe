import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCreditCard, FaGooglePay, FaPaypal, FaPhone, FaWallet } from 'react-icons/fa';
import { UserContext } from '../UserContext';
// import { checkPlanStatus } from './CheckPlanStatus'; // Import the function
import './styles/payment-gateway.css';

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve both planId and planType from location state
  const { planId, planType ,changePlan,invoiceId } = location.state || {};
  const { userEmail } = useContext(UserContext);

  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [bankName, setBankName] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiOption, setUpiOption] = useState('');
  const [walletBalance, setWalletBalance] = useState('');
  
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare the data to send for payment processing
      const data = {
        planId,
        planType,
        userEmail,
        paymentMethod,
        ...(paymentMethod === 'card' && {
          cardNumber,
          cardName,
          bankName,
          cvv,
        }),
        ...(paymentMethod === 'upi' && {
          upiOption,
        }),
        ...(paymentMethod === 'wallet' && {
          walletBalance,
        }),
      };

      // Simulate payment processing
      console.log("Processing payment...", data);
      
      // Call the checkPlanStatus function after payment processing
      // const planStatus = await checkPlanStatus(userEmail);
      // console.log('Plan status fetched:', planStatus);

      // Redirect to the success page and pass planId and planType as state
      navigate('/Paymentsuccess', { state: { planId, planType ,changePlan,invoiceId } });
      
    } catch (error) {
      console.error('Error processing payment or fetching plan status:', error);
      setError('Error processing payment or fetching plan status. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Proceed for Payment</h2>
      {error && <p className="error">{error}</p>}
      <br />
      <p>Plan Type: {planType}</p> {/* Display the planType if needed */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              onChange={() => setPaymentMethod('card')}
            />
            <FaCreditCard size={30} color="#000" /> Credit/Debit Card
          </label>
          {paymentMethod === 'card' && (
            <div className="payment-details">
              <input
                type="text"
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Card Name"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Bank Name"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
              />
            </div>
          )}
        </div>

        <div className="form-group">
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="upi"
              onChange={() => setPaymentMethod('upi')}
            />
            <FaGooglePay size={30} color="#000" /> UPI
          </label>
          {paymentMethod === 'upi' && (
            <div className="payment-details">
              <label>
                <input
                  type="radio"
                  name="upiOption"
                  value="gpay"
                  onChange={() => setUpiOption('gpay')}
                />
                <FaGooglePay size={30} color="#000" /> Google Pay
              </label>
              <label>
                <input
                  type="radio"
                  name="upiOption"
                  value="paytm"
                  onChange={() => setUpiOption('paytm')}
                />
                <FaPaypal size={30} color="#000" /> Paytm
              </label>
              <label>
                <input
                  type="radio"
                  name="upiOption"
                  value="phonepe"
                  onChange={() => setUpiOption('phonepe')}
                />
                <FaPhone size={30} color="#000" /> PhonePe
              </label>
            </div>
          )}
        </div>

        <div className="form-group">
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="wallet"
              onChange={() => setPaymentMethod('wallet')}
            />
            <FaWallet size={30} color="#000" /> Wallet
          </label>
          {paymentMethod === 'wallet' && (
            <div className="payment-details">
              <input
                type="number"
                placeholder="Wallet Balance"
                value={walletBalance}
                onChange={(e) => setWalletBalance(e.target.value)}
                required
              />
            </div>
          )}
        </div>

        <button type="submit">Pay</button>
      </form>
    </div>
  );
}

export default Payment;
