import React from 'react'

import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels
} from '@chakra-ui/react'

import ViewUserGeneral from 'components/users/view/ViewUserGeneral'
import EditUserPartner from 'components/users/edit/EditUserPartner'
import EditUserParents from 'components/users/edit/EditUserParents'
import EditUserChildren from 'components/users/edit/EditUserChildren'

export default function ViewUser ({ user, refetch, onClose }) {
  return (
    <Tabs isLazy isFitted>
      <TabList overflowX='auto' overflowY='hidden' pb='1'>
        <Tab>General</Tab>
        <Tab>Partner</Tab>
        <Tab>Parents</Tab>
        <Tab>Children</Tab>
        <Tab>Settings</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <ViewUserGeneral inline user={user} refetch={refetch} onClose={onClose} />
        </TabPanel>
        <TabPanel>
          <EditUserPartner inline user={user} refetch={refetch} />
        </TabPanel>
        <TabPanel>
          <EditUserParents inline user={user} refetch={refetch} />
        </TabPanel>
        <TabPanel>
          <EditUserChildren inline user={user} refetch={refetch} />
        </TabPanel>
        <TabPanel>
          TODO
          Notifications & Privacy settings
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
