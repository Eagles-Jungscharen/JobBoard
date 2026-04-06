import DOMPurify from 'dompurify'
import { useQuery } from '@tanstack/react-query'
import {
  Badge,
  Body1,
  Button,
  Divider,
  makeStyles,
  Spinner,
  Subtitle2,
  Title1,
  tokens,
} from '@fluentui/react-components'
import { ArrowLeft24Regular } from '@fluentui/react-icons'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchJobs } from '../api/jobsApi'

const useStyles = makeStyles({
  root: {
    padding: tokens.spacingHorizontalXXL,
    maxWidth: '800px',
    margin: '0 auto',
  },
  backButton: {
    marginBottom: tokens.spacingVerticalL,
  },
  meta: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
    flexWrap: 'wrap',
    marginBottom: tokens.spacingVerticalL,
  },
  section: {
    marginTop: tokens.spacingVerticalXL,
  },
  sectionTitle: {
    marginBottom: tokens.spacingVerticalM,
  },
  htmlContent: {
    lineHeight: '1.6',
  },
  error: {
    color: tokens.colorPaletteRedForeground1,
  },
})

export function DetailPage() {
  const styles = useStyles()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data: jobs, isLoading, isError, error } = useQuery({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
  })

  if (isLoading) return <Spinner label="Stelle wird geladen …" />

  if (isError) {
    return (
      <p className={styles.error}>
        Fehler beim Laden: {(error as Error).message}
      </p>
    )
  }

  const job = jobs?.find((j) => j.id === id)

  if (!job) {
    return <p className={styles.error}>Stelle nicht gefunden.</p>
  }

  return (
    <div className={styles.root}>
      <Button
        appearance="subtle"
        icon={<ArrowLeft24Regular />}
        className={styles.backButton}
        onClick={() => navigate('/')}
      >
        Zurück zur Übersicht
      </Button>

      <Title1>{job.title}</Title1>

      <div className={styles.meta}>
        <Badge appearance="tint" color="brand">{job.ressort}</Badge>
        <Badge appearance="tint" color="informative">{job.team}</Badge>
      </div>

      <Body1>
        <strong>Ressortleitung:</strong> {job.ressortLeader}
        {' · '}
        <strong>Teamleitung:</strong> {job.teamLeader}
      </Body1>

      <Divider className={styles.section} />

      <div className={styles.section}>
        <Subtitle2 className={styles.sectionTitle}>Aufgaben</Subtitle2>
        <div
          className={styles.htmlContent}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(job.jobDescription),
          }}
        />
      </div>

      <div className={styles.section}>
        <Subtitle2 className={styles.sectionTitle}>Das bringst du mit</Subtitle2>
        <div
          className={styles.htmlContent}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(job.expectation),
          }}
        />
      </div>
    </div>
  )
}
