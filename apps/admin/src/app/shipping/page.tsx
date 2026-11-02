import { AdminPlaceholder } from '@/components/AdminPlaceholder';

export default function AdminShippingPage() {
  return (
    <AdminPlaceholder
      title="Shipping & Dangerous Goods Transit"
      phase="Phase 09"
      description="Manage Shiprocket courier integration, enforce surface-only transit for flammable alcohol perfumes, and track delivery progress."
      capabilities={[
        'Courier capability table: Block air shipping for FLAMMABLE_SURFACE_ONLY SKUs',
        'Mixed shipping class resolution (order downgraded to most restrictive class)',
        'AWB generation, shipping label printing, and pickup scheduling',
        'NDR (Non-Delivery Report) and RTO (Return to Origin) handling workflows',
      ]}
    />
  );
}

