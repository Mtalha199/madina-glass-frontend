// StepStatus enum values
export type StepStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "BLOCKED";

export interface TimelineStep {
  id: string;
  title: string;
  subtitle?: string;
  status: StepStatus;
}

export interface TimelineStepItemProps {
  step: TimelineStep;
  index: number;
  isLast: boolean;
  lineColorAbove: string;
  onUpdate?: (stepId: string) => void;
}

