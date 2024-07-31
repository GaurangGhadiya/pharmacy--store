// ** MUI Imports
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Custom Component Import
import Icon from 'src/@core/components/icon'
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { Box } from '@mui/material'

const CardStatsVertical = props => {
  // ** Props
  const {
    sx,
    stats,
    title,
    chipText,
    subtitle,
    avatarIcon,
    avatarSize = 44,
    iconSize = '1.75rem',
    avatarColor,
    color
  } = props
  console.log('color', color)

  return (
    <Card sx={{ ...sx }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <CustomAvatar
          skin='light'
          variant='rounded'
          color={avatarColor}
          sx={{ mb: 3.5, width: avatarSize, height: avatarSize }}
        >
          <Icon icon={avatarIcon} fontSize={iconSize} />
        </CustomAvatar>
        <Typography variant='h4' sx={{ mb: 4, mt: 2 }}>
          {title}
        </Typography>
        <Box display={'flex'} alignItems={'end'} mb={1}>
          <Typography variant='h3' color={color}>
            {stats}
          </Typography>
          <Typography variant='h6' mb={1} ml={1}>
            {chipText}
          </Typography>
        </Box>
        <Typography variant='h6' sx={{ color: 'text.disabled', fontWeight: 600 }}>
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CardStatsVertical
