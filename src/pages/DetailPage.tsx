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
import { useMemo } from 'react'

const useStyles = makeStyles({
  root: {
    padding: tokens.spacingHorizontalXXL,
    maxWidth: '800px',
    margin: '0 auto',
  },
  backButton: {
    marginBottom: tokens.spacingVerticalL,
  },
  headerline : {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '800px',
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
  contactContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
    marginTop: tokens.spacingVerticalM,
  }
})

export function DetailPage() {
  const styles = useStyles()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data: jobs, isLoading, isError, error } = useQuery({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
  })

  const job = useMemo(() => {
    return jobs?.find((j) => j.id === id)
  }, [jobs, id])

  const startingAt = useMemo(() => job ? new Date(job.startingAt).toLocaleDateString() : "sofort", [job])
  if (isLoading) return <Spinner label="Dienst wird geladen …" />

  if (isError) {
    return (
      <p className={styles.error}>
        Fehler beim Laden: {(error as Error).message}
      </p>
    )
  }

  
  if (!job) {
    return <p className={styles.error}>Dienst nicht gefunden.</p>
  }

  return (
    <div className={styles.root}>
      <div className={styles.headerline}>
        <Button
          appearance="subtle"
          icon={<ArrowLeft24Regular />}
          className={styles.backButton}
          onClick={() => navigate('/')}
        >
          Zurück zur Übersicht
        </Button>
        <div className={styles.meta}>
          <Badge appearance="tint" color="brand">{job.ressort}</Badge>
          <Badge appearance="tint" color="informative">{job.team}</Badge>
        </div>
      </div>
      <Title1>{job.title}</Title1>

      <Divider className={styles.section} appearance='brand' />

      <div className={styles.section}>
        <Subtitle2 className={styles.sectionTitle}>Deine Aufgabe</Subtitle2>
        <div
          className={styles.htmlContent}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(job.jobDescription),
          }}
        />
      </div>

      <div className={styles.section}>
        <Subtitle2 className={styles.sectionTitle}>Dein Profil</Subtitle2>
        <div
          className={styles.htmlContent}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(job.expectation),
          }}
        />
      </div>
      <div className={styles.section}>
        <Body1>Per wann: {startingAt}</Body1>
      </div>
      <Divider className={styles.section} />
      <div className={styles.section}>
        <Subtitle2 className={styles.sectionTitle}>Deine Kontaktpersonen</Subtitle2>
        <div className={styles.contactContent}>
          <div>
            <Body1>
              <strong>Teamleitung:</strong> {job.teamLeader}
            </Body1>
          </div>
          <div>
            <Body1>
              <strong>Ressortleitung:</strong> {job.ressortLeader}
            </Body1>
          </div>
        </div>
      </div>
    </div>
  )
}
