import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useAuthStore } from '../store/authStore';
import { Check } from 'lucide-react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function Pricing() {
  const { user, isPremium } = useAuthStore();

  const handleSubscribe = async () => {
    const stripe = await stripePromise;
    
    // Create checkout session on your backend
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user.uid,
        priceId: 'price_H5ggYwtDq4fbrJ' // Your Stripe price ID
      }),
    });
    
    const session = await response.json();
    
    // Redirect to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    
    if (result.error) {
      console.error(result.error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Simple, transparent pricing
        </h2>
        <p className="mt-4 text-xl text-gray-600">
          Get unlimited access to all our premium courses
        </p>
      </div>

      <div className="mt-12 max-w-lg mx-auto">
        <div className="bg-white shadow-lg rounded-lg">
          <div className="px-6 py-8">
            <h3 className="text-center text-3xl font-bold text-gray-900">Premium Plan</h3>
            <div className="mt-4 flex justify-center">
              <span className="px-3 flex items-start text-6xl tracking-tight text-gray-900">
                <span className="mt-2 mr-2 text-4xl font-medium">$</span>
                <span className="font-extrabold">29</span>
              </span>
              <span className="text-xl font-medium text-gray-500 mb-2">/month</span>
            </div>

            <ul className="mt-8 space-y-4">
              {[
                'Access to all courses',
                'HD video quality',
                'Downloadable resources',
                'Certificate of completion',
                'Priority support'
              ].map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>

            {isPremium ? (
              <div className="mt-8">
                <div className="w-full text-center py-3 px-4 rounded-md bg-green-100 text-green-800">
                  You're already a premium member!
                </div>
              </div>
            ) : (
              <div className="mt-8">
                <button
                  onClick={handleSubscribe}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Get Premium Access
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
          Secure payment powered by Stripe. Cancel anytime.
        </p>
      </div>
    </div>
  );
}