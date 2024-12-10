import { Status } from '@ctypes/status.js';
import { StatusColor } from '@ctypes/statusColor.js';

function getStatusColor(status: Status): StatusColor {
  switch (status) {
    case Status.excellent:
      return 'green';
    case Status.good:
      return 'cyan';
    case Status.fair:
      return 'white';
    case Status.poor:
      return 'yellow';
    case Status.veryBad:
      return 'red';
  }
}

export { getStatusColor };
