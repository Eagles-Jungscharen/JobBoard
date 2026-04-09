import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Title1, Caption1, makeStyles, tokens } from '@fluentui/react-components'

const useStyles = makeStyles({
  header: {
    display: 'flex',
    justifyContent:'center',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
    backgroundColor: tokens.colorNeutralBackground2,
    borderBottomWidth: tokens.strokeWidthThin,
    borderBottomStyle: 'solid',
    borderBottomColor: tokens.colorNeutralStroke2,
  },
  icon: {
    width: '160px',
    height: '160px',
    objectFit: 'contain',
    flexShrink: 0,
  },
  textGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
  },
})

export function AppHeader() {
  const styles = useStyles()
  const [searchParams] = useSearchParams()
  const [isEmbedded] = useState(() => {
    const stored = sessionStorage.getItem('isEmbedded')
    if (stored !== null) return stored === 'true'
    const value = searchParams.get('embedded') === 'true'
    sessionStorage.setItem('isEmbedded', String(value))
    return value
  })

  const title = import.meta.env.VITE_APP_TITLE as string | undefined
  const teaser = import.meta.env.VITE_APP_TEASER as string | undefined
  const iconUrl = import.meta.env.VITE_APP_ICON_URL as string | undefined

  useEffect(() => {
    document.title = title ?? 'Offene Dienste'
  }, [title])

  useEffect(() => {
    if (!iconUrl) return
    let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      document.head.appendChild(link)
    }
    link.href = iconUrl
  }, [iconUrl])

  if (isEmbedded) return null

  return (
    <header className={styles.header}>
      {iconUrl && (
        <img src={iconUrl} alt="" className={styles.icon} />
      )}
      <div className={styles.textGroup}>
        <Title1>{title ?? 'Dienstübersicht'}</Title1>
        {teaser && <Caption1>{teaser}</Caption1>}
      </div>
    </header>
  )
}
