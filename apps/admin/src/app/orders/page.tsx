import { AdminPlaceholder } from '@/components/AdminPlaceholder';

export default function AdminOrdersPage() {
  return (
    <AdminPlaceholder
      title="Orders & Warehouse Fulfillment"
      phase="Phase 08"
      description="Manage order lifecycle, FEFO batch pick lists, packing checklists with leak-proof verification, and invoice printing."
      capabilities={[
        'Independent state machines for order, payment, and fulfillment',
        'Perfume packing checklist: cap secured, shrink seal intact, bubble leak-proof wrap, upright label',
        'Batch allocation recording per unit dispatched',
        'Tax invoice generation with HSN split and place of supply GST calculation',
      ]}
    />
  );
}

