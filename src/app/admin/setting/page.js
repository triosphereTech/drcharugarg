import { Topbar } from '@/components/admin/layout/Topbar'
import { SettingsContent } from '@/components/admin/settings/SettingsContent'
import React from 'react'

const page = () => {
  return (
    <>
      <Topbar
       title="Setting"
      />
      <SettingsContent />
    </>
  )
}

export default page