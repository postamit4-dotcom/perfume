import { AdminPlaceholder } from '@/components/AdminPlaceholder';

export default function AdminCatalogPage() {
  return (
    <AdminPlaceholder
      title="Fragrance Catalog & SKUs"
      phase="Phase 02"
      description="Manage fragrances, product variants, volume sizes (ml), concentrations, and MRP/selling price constraints."
      capabilities={[
        'SKU variant matrix with volume (ml), concentration, and price-per-ml calculations',
        'Strict invariant enforcement: Selling price cannot exceed stored MRP',
        'Block publishing if any required perfume or compliance field is missing',
        'Cloudinary signed media uploads and primary image assignment',
      ]}
    />
  );
}

