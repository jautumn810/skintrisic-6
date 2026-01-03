'use client'

import SiteHeader from '../../../components/SiteHeader'
import { DiamondButton } from '../../../components/DiamondNav'
import BlinkingInput from '../../../components/BlinkingInput'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { isValidLettersOnly } from '../../../lib/validators'
import { loadUser, saveUser } from '../../../lib/storage'

export default function IntroducePage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [error, setError] = useState(null)

  useEffect(() => {
    const u = loadUser()
    if (u?.name) setName(u.name)
  }, [])

  function onProceed() {
    if (!isValidLettersOnly(name)) {
      setError("Enter a valid name (letters only).")
      return
    }
    setError(null)
    const prev = loadUser()
    saveUser({ name: name.trim(), location: prev?.location ?? "" })
    router.push("/analysis/city")
  }

  return (
    <div className="input-page">
      <SiteHeader section="INTRO" />
      <div className="input-top">TO START ANALYSIS</div>

      <BlinkingInput
        value={name}
        onChange={(v) => { setName(v); if (error) setError(null); }}
        placeholder="Introduce Yourself"
      />

      <div className="underline" />

      {error && (
        <div style={{ maxWidth: 980, margin: "14px auto 0", padding: "0 28px", color: "#b00020", fontWeight: 800 }}>
          {error}
        </div>
      )}

      <div className="back-fixed">
        <DiamondButton label="BACK" variant="white" onClick={() => router.back()} />
      </div>

      <div className="right-fixed">
        <DiamondButton label="PROCEED" variant="black" onClick={onProceed} />
      </div>
    </div>
  )
}

