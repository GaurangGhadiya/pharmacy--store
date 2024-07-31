// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimeline from '@mui/lab/Timeline'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Demo Component Imports
import UsersInvoiceListTable from './UsersInvoiceListTable'
import UsersProjectListTable from './UsersProjectListTable'

// ** Custom Components Imports
import OptionsMenu from 'src/@core/components/option-menu'
import CardStatsVertical from 'src/@core/components/card-statistics/card-stats-vertical'

// Styled Timeline component
const data = [
  {
    stats: '$2345',
    chipText: 'Credit Left',
    avatarColor: 'primary',
    color: 'primary',
    chipColor: 'primary',
    title: 'Account Balance',
    subtitle: 'Account balance for next purchase',
    avatarIcon: 'tabler:currency-rupee'
  },
  {
    stats: '4,571',
    chipText: 'Points earned',
    avatarColor: 'success',
    color: 'success',
    chipColor: 'default',
    title: 'Reward Points',
    subtitle: 'Earn reward points with every purchase.',
    avatarIcon: 'tabler:gift'
  },
  {
    stats: '15',
    chipText: 'Items in wishlist',
    avatarColor: 'warning',
    color: 'warning',
    chipColor: 'default',
    title: 'Wishlist',
    subtitle: 'Receive notification when items go on sale',
    avatarIcon: 'tabler:star'
  },
  {
    stats: '21',
    chipText: 'Coupons you win',
    avatarColor: 'info',
    color: 'info',

    chipColor: 'default',
    title: 'Coupons',
    subtitle: 'Use coupon on next purchase',
    avatarIcon: 'tabler:discount'
  }
]

const UserViewAccount = ({ invoiceData }) => {
  return (
    <Grid container spacing={6}>
      {data?.map(v => (
        <Grid item xs={12} md={6} key={v?.title}>
          <CardStatsVertical
            stats={v?.stats}
            chipText={v?.chipText}
            avatarColor={v?.avatarColor}
            color={v?.color}
            chipColor={v?.chipColor}
            title={v?.title}
            subtitle={v?.subtitle}
            avatarIcon={v?.avatarIcon}
          />
        </Grid>
      ))}

      <Grid item xs={12}>
        <UsersInvoiceListTable invoiceData={invoiceData} />
      </Grid>
    </Grid>
  )
}

export default UserViewAccount
