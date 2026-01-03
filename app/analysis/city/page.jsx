'use client'

import SiteHeader from '../../../components/SiteHeader'
import { DiamondButton } from '../../../components/DiamondNav'
import BlinkingInput from '../../../components/BlinkingInput'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { isValidLettersOnly } from '../../../lib/validators'
import { loadUser, saveUser } from '../../../lib/storage'
import { postPhaseOne } from '../../../lib/api'

export default function CityPage() {
  const router = useRouter()
  const [city, setCity] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const u = loadUser()
    if (u?.location) setCity(u.location)
    
    // Debug: Check if buttons have small class and CSS rules
    setTimeout(() => {
      console.log('=== CITY PAGE BUTTON DEBUG ===');
      const buttons = document.querySelectorAll('.back-fixed .diamond-btn, .right-fixed .diamond-btn');
      console.log(`Found ${buttons.length} buttons`);
      
      buttons.forEach((btn, index) => {
        const computedStyle = window.getComputedStyle(btn);
        console.log(`\n--- Button ${index + 1} ---`);
        console.log('className:', btn.className);
        console.log('classList:', Array.from(btn.classList));
        console.log('has "small" class:', btn.classList.contains('small'));
        console.log('has "diamond-btn" class:', btn.classList.contains('diamond-btn'));
        console.log('Computed width:', computedStyle.width);
        console.log('Computed height:', computedStyle.height);
        
        // Check if CSS rule exists
        const stylesheets = Array.from(document.styleSheets);
        let smallRuleFound = false;
        stylesheets.forEach((sheet, sheetIndex) => {
          try {
            const rules = Array.from(sheet.cssRules || []);
            rules.forEach((rule, ruleIndex) => {
              if (rule.selectorText && rule.selectorText.includes('.diamond-btn.small')) {
                console.log(`Found .diamond-btn.small rule in stylesheet ${sheetIndex}, rule ${ruleIndex}:`, rule.cssText);
                smallRuleFound = true;
              }
            });
          } catch (e) {
            console.log(`Could not access stylesheet ${sheetIndex}:`, e.message);
          }
        });
        console.log('Small CSS rule found:', smallRuleFound);
      });
      console.log('=== END DEBUG ===\n');
    }, 100);
  }, [])

  async function onProceed() {
    if (!isValidLettersOnly(city)) {
      setError("Enter a valid city (letters only).")
      return
    }

    const u = loadUser()
    const name = (u?.name ?? "").trim()
    const location = city.trim()

    if (!isValidLettersOnly(name)) {
      setError("Name is missing/invalid. Go back and enter your name.")
      return
    }

    setError(null)
    setLoading(true)

    try {
      saveUser({ name, location })
      await postPhaseOne({ name, location })
      router.push("/analysis/permissions")
    } catch (e) {
      setError(e?.message ?? "Failed to submit Phase 1 API.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="input-page">
      <SiteHeader section="INTRO" />
      <div className="input-top">TO START ANALYSIS</div>

      <BlinkingInput
        value={city}
        onChange={(v) => { setCity(v); if (error) setError(null); }}
        placeholder="your city name"
      />

      <div className="underline" />

      {error && (
        <div style={{ maxWidth: 980, margin: "14px auto 0", padding: "0 28px", color: "#b00020", fontWeight: 800 }}>
          {error}
        </div>
      )}

      <div className="back-fixed">
        <DiamondButton label="BACK" variant="white" onClick={() => router.back()} className="small" />
      </div>

      <div className="right-fixed">
        <DiamondButton label={loading ? "..." : "PROCEED"} variant="black" onClick={() => { if (!loading) onProceed(); }} className="small" />
      </div>
    </div>
  )
}

