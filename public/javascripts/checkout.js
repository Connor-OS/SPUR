// This is your test secret API key.
const stripe = Stripe("pk_test_51QuwexHFFVIxdMRvgRvDxgDurFQZ5TqXBw68IeFqfcqvU9WLyX7hA7qGVgtGdZJbaOl6BTFQxrqNp4twxzsUtM8I00zKgIChF4");

initialize();

// Create a Checkout Session
async function initialize() {

  const name = $('#checkout').data('name')
  const total = $('#checkout').data('total')
  
  const fetchClientSecret = async () => {
    const response = await fetch(`/create-checkout-session?name=${name}&total=${total}`, {
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