




const DeliveryPolicy = () => {
  return (
    <body className="bg-gray-100 text-gray-800">
    <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-3xl font-bold text-center mb-6 text-black">Shipping Policy</h1>
            
            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4 text-black">1. Digital Service Delivery</h2>
                <div className="pl-4">
                    <h3 className="text-xl font-medium mb-2">Delivery Method</h3>
                    <ul className="list-disc list-inside mb-4">
                        <li>All services delivered electronically via platform</li>
                        <li>Immediate digital download after payment</li>
                    </ul>
                    
                    <h3 className="text-xl font-medium mb-2">Delivery Timeframes</h3>
                    <ul className="list-disc list-inside">
                        <li>Standard project delivery: 3-7 business days</li>
                        <li>Rush delivery options available</li>
                    </ul>
                </div>
            </section>
            
            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4 text-black">2. Payment & Refund Policy</h2>
                <div className="pl-4">
                    <h3 className="text-xl font-medium mb-2">Payment Options</h3>
                    <ul className="list-disc list-inside mb-4">
                        <li>Multiple payment gateways</li>
                        <li>GST and taxes added to invoice</li>
                        <li>Accepts: Credit/Debit Cards, UPI, PayPal</li>
                    </ul>
                    
                    <h3 className="text-xl font-medium mb-2">Refund Conditions</h3>
                    <ul className="list-disc list-inside">
                        <li>100% refund if service not delivered</li>
                        <li>Refund requests within 7 days</li>
                        <li>Refunds processed in 5-10 business days</li>
                    </ul>
                </div>
            </section>
            
            <section className="text-center mt-8">
                <h3 className="text-xl font-semibold mb-4">Contact Support</h3>
                <p className="text-gray-600">
                    Email: support@jobber.phaseex.live 
                    Helpline: +91-7902965815
                </p>
            </section>
        </div>
    </div>
</body>
  )
}
export default DeliveryPolicy