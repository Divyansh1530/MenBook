import React from 'react'

import UserDashboard from './UserDashboard'
import MentorDashboard from './MentorDashboard'

function Dashboard({
  user
}) {

  if (user?.role === "mentor") {

    return (
      <MentorDashboard
        user={user}
      />
    )
  }

  return (
    <UserDashboard
      user={user}
    />
  )
}

export default Dashboard