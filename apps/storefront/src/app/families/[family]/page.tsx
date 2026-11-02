import { ComingSoon } from '@/components/ComingSoon';

export default function ScentFamilyDetailPage({
  params,
}: {
  params: { family: string };
}) {
  const familyName = params.family.charAt(0).toUpperCase() + params.family.slice(1);
  return (
    <ComingSoon
      title={`${familyName} Fragrances`}
      subtitle={`Curated expressions of the ${params.family} family`}
      description={`Discover our upcoming formulations featuring prominent ${params.family} notes, sustainably sourced and blended in India.`}
    />
  );
}

