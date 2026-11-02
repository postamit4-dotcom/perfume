import { AdminPlaceholder } from '@/components/AdminPlaceholder';

export default function AdminCmsPage() {
  return (
    <AdminPlaceholder
      title="CMS, Journal & Editorial Content"
      phase="Phase 11"
      description="Manage the brand story, editorial journal articles, ingredients glossary, homepage banners, and navigation menus."
      capabilities={[
        'Editorial journal article publishing with rich text and Cloudinary imagery',
        'Botanical scent notes glossary definitions',
        'Homepage hero curation and seasonal festive banners',
        'SEO metadata, OpenGraph tags, and canonical URL management',
      ]}
    />
  );
}

