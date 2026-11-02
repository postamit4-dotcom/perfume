import { AdminPlaceholder } from '@/components/AdminPlaceholder';

export default function AdminProfilesPage() {
  return (
    <AdminPlaceholder
      title="Fragrance Profiles & Notes Library"
      phase="Phase 02"
      description="Manage structured olfactive data, pyramid tiers (Top, Heart, Base), moods, seasons, and occasions."
      capabilities={[
        'Structured notes library with canonical botanical names and slugs',
        'Top, Heart, and Base tier pyramid mapping with display ordering',
        'Scent family association (Primary and Secondary families)',
        'Perfumer background story and raw botanical extraction essays',
      ]}
    />
  );
}

