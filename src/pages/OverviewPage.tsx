import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Body1Strong,
  Button,
  Caption1,
  Card,
  CardHeader,
  Label,
  makeStyles,
  Select,
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
  filterBar: {
    display: 'flex',
    gap: tokens.spacingHorizontalL,
    marginBottom: tokens.spacingVerticalL,
    flexWrap: 'wrap',
    alignItems: 'flex-end',
  },
  filterItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
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
  const [selectedRessort, setSelectedRessort] = useState('')
  const [selectedTeam, setSelectedTeam] = useState('')

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

  const uniqueRessorts = [...new Set(jobs?.map((j) => j.ressort) ?? [])]
  const uniqueTeams = [...new Set(jobs?.map((j) => j.team) ?? [])]

  const filteredJobs = (jobs ?? [])
    .filter(
      (j) =>
        (!selectedRessort || j.ressort === selectedRessort) &&
        (!selectedTeam || j.team === selectedTeam),
    )
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title, 'de'))

  return (
    <div className={styles.root}>
      {(uniqueRessorts.length > 1 || uniqueTeams.length > 1) && (
        <div className={styles.filterBar}>
          {uniqueRessorts.length > 1 && (
            <div className={styles.filterItem}>
              <Label htmlFor="filter-ressort">Ressort</Label>
              <Select
                id="filter-ressort"
                value={selectedRessort}
                onChange={(_, data) => setSelectedRessort(data.value)}
              >
                <option value="">Alle Ressorts</option>
                {uniqueRessorts.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </Select>
            </div>
          )}
          {uniqueTeams.length > 1 && (
            <div className={styles.filterItem}>
              <Label htmlFor="filter-team">Team</Label>
              <Select
                id="filter-team"
                value={selectedTeam}
                onChange={(_, data) => setSelectedTeam(data.value)}
              >
                <option value="">Alle Teams</option>
                {uniqueTeams.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </Select>
            </div>
          )}
          {(selectedRessort || selectedTeam) && (
            <div className={styles.filterItem}>
              <Label>&nbsp;</Label>
              <Button appearance="subtle" onClick={() => { setSelectedRessort(''); setSelectedTeam('') }}>
                Filter zurücksetzen
              </Button>
            </div>
          )}
        </div>
      )}
      <div className={styles.grid}>
        {filteredJobs.map((job) => (
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
