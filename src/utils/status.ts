import { Status } from '@ctypes/status.js';

function getStatus(health: number): Status {
  if (health >= 90) {
    return Status.excellent;
  } else if (health >= 80) {
    return Status.good;
  } else if (health >= 70) {
    return Status.fair;
  } else if (health >= 50) {
    return Status.poor;
  } else {
    return Status.veryBad;
  }
}

function getStatusDesc(status: Status): string {
  switch (status) {
    case Status.excellent:
      return 'The battery is in optimal condition, exhibiting minimal degradation and maintaining near-peak performance. It retains most of its original capacity.';
    case Status.good:
      return 'The battery demonstrates slight degradation, with a marginal reduction in its maximum capacity. Performance remains reliable, and the impact on usability is minimal.';
    case Status.fair:
      return 'The battery shows noticeable signs of wear, with a significant reduction in capacity. Users may experience shorter usage times between charges.';
    case Status.poor:
      return "The battery's capacity has degraded considerably, resulting in reduced functionality and the need for more frequent charging. Replacement is recommended.";
    case Status.veryBad:
      return 'The battery is severely degraded, with insufficient capacity to support normal device operation. Immediate replacement is advised to ensure functionality.';
    default:
      throw new Error('Unknown Status');
  }
}

export { getStatus, getStatusDesc };
