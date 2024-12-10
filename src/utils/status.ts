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
      return 'Almost like new; minimal wear and tear; delivers peak performance.';
    case Status.good:
      return 'Slightly degraded but still performs well; may hold slightly less charge.';
    case Status.fair:
      return 'Noticeable degradation; reduced battery life; may need charging more frequently.';
    case Status.poor:
      return 'Significant degradation; struggles to hold charge; likely needs replacement.';
    case Status.veryBad:
      return 'Severely degraded; may not last long or support normal device usage.';
    default:
      throw new Error('Unknown Status');
  }
}

export { getStatus, getStatusDesc };
