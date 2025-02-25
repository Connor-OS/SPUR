// This is your test secret API key.
const stripe = Stripe("pk_test_51Nn0dyF8kAmUKEbnsHBixVYDrsbSqguXv7lKc0ibxaCCbYj13ZtJFeQMjWzhfmUHug2DItH2D6qckM8mUlkli3QX00Pg7hvSyw");

initialize();

// Create a Checkout Session
async function initialize() {
  const fetchClientSecret = async () => {
    const response = await fetch("/create-checkout-session", {
      method: "POST",
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  const checkout = await stripe.initEmbeddedCheckout({
    fetchClientSecret,
  });

  // Mount Checkout
  checkout.mount('#checkout');
}