import React from 'react'

import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels
} from '@chakra-ui/react'

// import ViewUserGeneral from 'components/users/view/ViewUserGeneral'
// import EditUserPermissions from 'components/users/edit/EditUserPermissions'
// import ViewUserLoginApprovals from 'components/users/view/ViewUserLoginApprovals'
// import ViewUserTickets from 'components/users/view/ViewUserTickets'

export default function ViewUser ({ user }) {
  return (
    <Tabs isLazy isFitted>
      <TabList>
        <Tab>General</Tab>
        <Tab>Permissions</Tab>
        <Tab>Login Approvals</Tab>
        <Tab>Tickets</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          {/* <ViewUserGeneral inline user={user} /> */}
        </TabPanel>
        <TabPanel d='flex' justifyContent='center'>
          {/* <EditUserPermissions inline user={user} /> */}
        </TabPanel>
        <TabPanel>
          {/* <ViewUserLoginApprovals inline user={user} /> */}
        </TabPanel>
        <TabPanel>
          {/* <ViewUserTickets inline user={user} /> */}
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
