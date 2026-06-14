import { EditableTaskArchiveRoute, taskMetadata } from '@/editable/pages/TaskArchivePage'
import { mediaDistributionRoute } from '@/config/media-distribution-route'

export const revalidate = 3
export const generateMetadata = () => taskMetadata('mediaDistribution', mediaDistributionRoute)

export default async function MediaDistributionPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string; page?: string }>
}) {
  return (
    <EditableTaskArchiveRoute
      task="mediaDistribution"
      searchParams={searchParams}
      basePath={mediaDistributionRoute}
    />
  )
}
