import React, { useEffect, useRef, useState } from "react";
import Modal from "../components/Modal";

interface ITokenType {
  service_command: string;
  merchant_identifier: string;
  access_code: string;
  language: string;
  return_url: string;
  merchant_reference: string;
  signature: string;
  amount?: number;
  currency?: string;
}

const PaymentForm: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [paymentUrl] = useState(
    "https://sbpaymentservices.payfort.com/FortAPI/paymentPage"
  );
  const [paymentParams, setPaymentParams] = useState<ITokenType | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const fetchPaymentParams = async () => {
      const data = await fetch("http://localhost:4444/token");
      const token = await data.json();
      console.log(token);
      setPaymentParams(token);
    };
    fetchPaymentParams();
  }, []);

  const handlePayment = () => {
    if (!isSubmitted && paymentParams) {
      setModalOpen(true);
      setIsSubmitted(true);
    }
  };

  useEffect(() => {
    if (modalOpen && formRef.current) {
      formRef.current.submit();
    }
  }, [modalOpen]);
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  console.log(
    frameRef?.current?.contentWindow,
    " rameRef.current.contentWindo "
  );
  return (
    <>
      <button onClick={handlePayment} disabled={isSubmitted}>
        Pay Now
      </button>
      <Modal show={modalOpen} onClose={() => setModalOpen(false)}>
        {paymentParams && (
          <form
            method="POST"
            action={paymentUrl}
            target="payfortIframe"
            ref={formRef}
          >
            {Object.keys(paymentParams).map((key) => (
              <input
                type="hidden"
                name={key}
                value={paymentParams[key as keyof ITokenType] || ""}
                key={key}
              />
            ))}

            {/* card details */}
            <input type="hidden" name="card_number" value={4005550000000001} />
            {/* YYMM */}
            <input type="hidden" name="expiry_date" value={"2505"} />
            <input type="hidden" name="card_security_code" value={"123"} />
            <input type="hidden" name="card_holder_name" value="test" />
          </form>
        )}
        <iframe
          name="payfortIframe"
          width="100%"
          height="500px"
          ref={frameRef}
        ></iframe>
      </Modal>
    </>
  );
};

export default PaymentForm;
