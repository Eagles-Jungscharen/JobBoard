import { useQuery } from '@tanstack/react-query'
import {
  Body1Strong,
  Caption1,
  Card,
  CardHeader,
  makeStyles,
  Spinner,
  tokens,
} from '@fluentui/react-components'
import { useNavigate } from 'react-router-dom'
import { fetchJobs } from '../api/jobsApi'

const useStyles = makeStyles({
  root: {
    padding: tokens.spacingHorizontalXXL,
    maxWidth: '900px',
    margin: '0 auto',
  },
  heading: {
    marginBottom: tokens.spacingVerticalXL,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: tokens.spacingHorizontalL,
  },
  card: {
    cursor: 'pointer',
  },
  error: {
    color: tokens.colorPaletteRedForeground1,
  },
})

export function OverviewPage() {
  const styles = useStyles()
  const navigate = useNavigate()
  const { data: jobs, isLoading, isError, error } = useQuery({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
  })

  if (isLoading) return <Spinner label="Stellen werden geladen …" />

  if (isError) {
    return (
      <p className={styles.error}>
        Fehler beim Laden: {(error as Error).message}
      </p>
    )
  }

  return (
    <div className={styles.root}>
      <div className={styles.grid}>
        {jobs?.map((job) => (
          <Card
            key={job.id}
            className={styles.card}
            onClick={() => navigate(`/jobs/${job.id}`)}
          >
            <CardHeader
              header={<Body1Strong>{job.title}</Body1Strong>}
              description={
                <Caption1>
                  {job.ressort} · {job.team}
                </Caption1>
              }
            />
          </Card>
        ))}
      </div>
    </div>
  )
}
