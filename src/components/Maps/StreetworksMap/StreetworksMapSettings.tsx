import React from 'react'

import Section from '@components/Design/Section'
import { StreetworksMapPersistentSettingsAtom } from '@atoms'

import { useRecoilState } from 'recoil'
import Checkbox from '@components/Inputs/Checkbox'

export function StreetworksMapSettings() {
  const [persistentSettings, setPersistentSettings] = useRecoilState(StreetworksMapPersistentSettingsAtom)

  return (
    <Section darker style={{ marginBottom: 0 }}>
      <h2 className="text-loud">Map options</h2>

      <fieldset>
        <div>
          <Checkbox
            label="Use high performance map (beta)"
            checked={persistentSettings.useBetaHighPerfMode}
            onChange={e => {
              setPersistentSettings(prev => ({
                ...prev,
                useBetaHighPerfMode: e.target.checked,
              }))
            }}
          />
        </div>
      </fieldset>
    </Section>
  )
}
