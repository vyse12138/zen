import { Bar } from '../../src'
import { mock } from '../utils/mock'

export default function Examples() {
  return (
    <div>
      <Bar
        data={mock(52, 7)}
        size={500}
        xLabel={[
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ]}
        zLabel={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
      />
      <Bar
        data={[
          [98, 77, 101, 99, 40],
          [150, 182, 201, 154, 190],
          [220, 232, 191, 234, 290],
          [320, 332, 301, 334, 390]
        ]}
        size={500}
        xLabel={['2012', '2013', '2014', '2015', '2016']}
        zLabel={['Forest', 'Steppe', 'Desert', 'Wetland']}
        colors={['#f44336', '#4caf50', '#ffeb3b', '#2196f3']}
      />
    </div>
  )
}
