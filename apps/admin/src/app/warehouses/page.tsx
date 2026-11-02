import { AdminPlaceholder } from '@/components/AdminPlaceholder';

export default function AdminWarehousesPage() {
  return (
    <AdminPlaceholder
      title="Warehouses & Fulfillment Locations"
      phase="Phase 03"
      description="Manage warehouse locations, inventory balances by site, and fulfillment center routing."
      capabilities={[
        'Multi-warehouse schema foundation (Single central warehouse initially in Bengaluru)',
        'Warehouse pincode serviceability and dispatch node allocation',
        'Stock transfers between warehouses with in-transit reconciliation',
      ]}
    />
  );
}

