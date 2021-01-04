const ROLE = {
    ADMIN: 'admin',
    HR: 'hr',
    EMP: 'employee'
  }

function adminPermissions(user) {
    return (
      user.role === ROLE.ADMIN
    )
}

function hrPermissions(user){
    return (
        user.role === ROLE.HR || user.role === ROLE.ADMIN
    )
}

  module.exports = { adminPermissions, hrPermissions};
  