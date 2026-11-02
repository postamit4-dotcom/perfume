import { AdminPlaceholder } from '@/components/AdminPlaceholder';

export default function AdminFinderPage() {
  return (
    <AdminPlaceholder
      title="Fragrance Finder Weight Matrix"
      phase="Phase 11"
      description="Configure quiz questions, answer options, and olfactive recommendation scoring weights."
      capabilities={[
        'Interactive question editor (Mood, Occasion, Preferred Notes, Intensity, Season)',
        'Olfactive weight matrix mapping answers to fragrances',
        'Deterministic, explainable recommendation preview simulator',
        'Saved user recommendation analytics and conversion metrics',
      ]}
    />
  );
}

