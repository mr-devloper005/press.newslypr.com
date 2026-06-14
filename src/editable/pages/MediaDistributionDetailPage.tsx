import { EditableTaskDetailRoute, generateEditableDetailMetadata } from '@/editable/pages/TaskDetailPage'
export const revalidate = 3
export async function generateStaticParams() { return [] }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { return generateEditableDetailMetadata('mediaDistribution', params) }
export default async function MediaDistributionDetailPage({ params }: { params: Promise<{ slug: string }> }) { return <EditableTaskDetailRoute task="mediaDistribution" params={params} /> }
