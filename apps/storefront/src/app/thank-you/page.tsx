'use client';

import React, { useEffect, useState } from 'react';
import { Wordmark, Button, Card, Badge } from '@lamaia/ui';

interface OrderDetails {
  orderId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  variantSelected: string;
  city: string;
  pincode: string;
  paymentMethod: string;
  amount: string;
  discountCode: string;
}

export default function ThankYouPage() {
  const [order, setOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('lamaia_reservation_order');
      if (stored) {
        setOrder(JSON.parse(stored));
      } else {
        // Fallback demo state
        setOrder({
          orderId: 'LM-' + Math.floor(100000 + Math.random() * 900000),
          customerName: 'Fragrance Connoisseur',
          customerPhone: '+91 98765 43210',
          customerEmail: 'connoisseur@lamaia.in',
          variantSelected: 'Chrono Woods (28% Extrait)',
          city: 'Mumbai',
          pincode: '400001',
          paymentMethod: 'Prepaid Express',
          amount: '₹1,399',
          discountCode: 'LASTING20',
        });
      }
    } catch {
      // Ignore
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-12">
      <div className="text-center space-y-4">
        <Badge variant="accent" className="px-3 py-1 text-xs">
          Order Reserved &amp; Scheduled for Surface Transit
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-display font-light text-ink">
          welcome to the atelier.
        </h1>
        <p className="text-ink-secondary font-sans text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Your order has been recorded in our dispatch vault. Your package includes the 100ml Extrait,
          the complimentary 2ml 12-hour wear-test vial, and the brass pocket atomizer.
        </p>
      </div>

      {order && (
        <Card className="bg-surface-raised border-line p-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-line gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-ink-secondary font-sans">
                Reservation Reference
              </span>
              <div className="text-2xl font-display text-accent font-medium mt-1">
                {order.orderId}
              </div>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs uppercase tracking-widest text-ink-secondary font-sans">
                Status
              </span>
              <div className="text-sm font-sans font-semibold text-emerald-800 flex items-center gap-1.5 mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                Allocated to FEFO Batch Vault
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-sans">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider text-ink-secondary">
                Selected Scent Profile
              </span>
              <div className="font-medium text-ink text-base">{order.variantSelected}</div>
              <p className="text-xs text-ink-secondary">
                28% pure oil concentration &bull; 45-day cold vault macerated
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider text-ink-secondary">
                Total Payable Amount
              </span>
              <div className="text-2xl font-display text-ink font-semibold">
                {order.amount}
              </div>
              <p className="text-xs text-emerald-800">
                Promo Code [{order.discountCode}] Applied &bull; Free Pan-India Delivery
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider text-ink-secondary">
                Recipient &amp; Delivery Destination
              </span>
              <div className="text-ink font-medium">{order.customerName}</div>
              <div className="text-xs text-ink-secondary">
                {order.customerPhone} &bull; {order.customerEmail}
              </div>
              <div className="text-xs text-ink-secondary">
                {order.city}, PIN: {order.pincode}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider text-ink-secondary">
                Compliance &amp; Dispatch Protocol
              </span>
              <div className="text-xs text-ink-secondary space-y-1">
                <div>&bull; Transport Class: FLAMMABLE_SURFACE_ONLY (Class 3)</div>
                <div>&bull; Transit: Secure Surface Express (BlueDart / Delhivery)</div>
                <div>&bull; Expected Dispatch: Within 24 hours</div>
              </div>
            </div>
          </div>

          <div className="bg-[#211D1A] text-surface p-6 rounded space-y-3">
            <h3 className="font-display text-lg text-accent">The 12-Hour Wear-Test Protocol</h3>
            <p className="text-xs sm:text-sm text-surface/80 leading-relaxed font-sans">
              1. When your package arrives, unbox the outer parcel and locate the separate <strong>2ml wear-test vial</strong>.
              <br />
              2. <strong>Keep the main 100ml box sealed in its original tamper-proof film</strong> while conducting your wear test.
              <br />
              3. Apply 3–4 sprays of the 2ml vial at 8:00 AM on clean pulse points. If you are not completely enchanted by 8:00 PM, contact our WhatsApp Concierge within 7 days for a 100% full refund upon return of the sealed 100ml box.
            </p>
          </div>
        </Card>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <a href="/">
          <Button variant="primary">Return to Homepage</Button>
        </a>
        <a href="/fragrances">
          <Button variant="secondary">Browse Scent Portfolio</Button>
        </a>
      </div>
    </div>
  );
}

