import { AdminPlaceholder } from '@/components/AdminPlaceholder';

export default function AdminSettingsPage() {
  return (
    <AdminPlaceholder
      title="Store Settings & Audit Logs"
      phase="Phase 11"
      description="Configure tax rates, COD eligibility rules, shipping fees, administrative roles, and inspect immutable audit logs."
      capabilities={[
        'Role-Based Access Control (RBAC) user assignment (Owner, Catalog, Warehouse, Support, Marketing, Finance)',
        'Comprehensive audit log inspection for price changes, inventory adjustments, and refunds',
        'COD order value cap and pincode whitelist configuration',
        'Integration health monitoring for Razorpay, Shiprocket, and Cloudinary',
      ]}
    />
  );
}

